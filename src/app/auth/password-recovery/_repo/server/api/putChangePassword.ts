"use server"

import { API_BASE_URL } from "@/lib/constant"
import { HttpBaseResponseBodyJson, HttpResponse } from "@/lib/http"
import { cookies } from "next/headers"

type PostChangePasswordIn = {
  password: string
  token: string
  uid: string
  cid: string
}

type PostChangePasswordOut = HttpResponse

export async function putChangePassword(data: PostChangePasswordIn): Promise<PostChangePasswordOut> {
  const cookieStore = cookies()

  const url = new URL("/auth/password", API_BASE_URL)

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": data.token,
        "X-Cid": data.cid
      },
      body: JSON.stringify({
        password: data.password,
        uid: data.uid
      }),

      next: {
        revalidate: 0
      }
    })

    if (!response.ok) {
      const json = (await response.json()) as HttpBaseResponseBodyJson<null>

      return {
        error: {
          message: json.message,
          code: response.status
        }
      }
    }

    const json = (await response.json()) as HttpBaseResponseBodyJson<null>

    cookieStore.delete("token")

    return {
      success: {
        message: json.message,
        data: undefined
      }
    }
  } catch (error) {
    // TODO: Proper error
    // eslint-disable-next-line no-console
    console.log(error)
    throw error
  }
}
