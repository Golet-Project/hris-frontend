"use server"

import { HttpBaseResponseBodyJson, HttpResponse, proxyUrl } from "@/utils/http"
import { cookies } from "next/headers"

type SubmitFormIn = {
  email: string
  password: string
}

type SubmitFormApiResponse = {
  access_token: string
}

type SubmitFormOut = HttpResponse

export default async function passwordLoginAction(params: SubmitFormIn): Promise<SubmitFormOut> {
  const url = proxyUrl("/auth/login")
  const body = {
    email: params.email,
    password: params.password
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),

    next: {
      revalidate: 0
    }
  })

  if (!response.ok) {
    const json = await response.json() as HttpBaseResponseBodyJson<null>
    return {
      error: {
        message: json.message,
        code: response.status
      }
    }
  }

  const json = await response.json() as HttpBaseResponseBodyJson<SubmitFormApiResponse>

  const cookiesExpiredIn = new Date()
  const time = cookiesExpiredIn.getTime()
  cookiesExpiredIn.setTime(time + 1000 * 604800)

  if (json.data !== undefined) {
    cookies().set({
      name: "token",
      value: json.data.access_token,
      httpOnly: true,
      sameSite: "lax",
      expires: cookiesExpiredIn,
      path: "/"
      // TODO: add secure option
    })
  }

  return {
    success: {
      message: "Berhasil Login",
      data: undefined
    }
  }
}