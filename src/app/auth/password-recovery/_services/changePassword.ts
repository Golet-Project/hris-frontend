"use server"

import { HttpBaseResponseBodyJson, HttpResponse } from "@/lib/http"
import { NewPasswordSchema } from "../_type/NewPasswordSchema"
import { API_BASE_URL } from "@/lib/constant"
import { cookies } from "next/headers"

type ChangePasswordIn = Omit<NewPasswordSchema, "confirmPassword"> & {
  token: string
  uid: string
  cid: string
}

type ChangePasswordOut = HttpResponse<HttpBaseResponseBodyJson<null>>

export async function changePassword(params: ChangePasswordIn): Promise<ChangePasswordOut> {
  const cookieStore = cookies()
  // api call
  const url = new URL(API_BASE_URL + "/auth/password")
  const body = {
    password: params.password,
    uid: params.uid
  }
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": params.token,
        "X-Cid": params.cid
      },
      body: JSON.stringify(body),

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

    // delete the cookies
    cookieStore.delete("token")

    return {
      success: {
        message: json.message
      }
    }
  } catch (error) {
    // TODO: send to logger
    // eslint-disable-next-line no-console
    console.log(error)
    throw error
  }
}
