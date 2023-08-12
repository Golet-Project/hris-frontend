"use server"

import { APP_ID } from "@/utils/constant"
import { HttpBaseResponseBodyJson, HttpResponse, proxyUrl } from "@/utils/http"
import { cookies, headers } from "next/headers"

type BasicLoginIn = {
  email: string
  password: string
}

type LoginActionApiResponse = {
  access_token: string
}

type SubmitFormOut = HttpResponse

/**
 * Handle an action to make a HTTP request to obtain a access token
 *
 * @param params request payload
 * @returns error or success object
 */
export default async function basicLoginRequest(params: BasicLoginIn): Promise<SubmitFormOut> {
  const url = proxyUrl("/auth/login")
  const headerList = headers()
  const body = {
    email: params.email,
    password: params.password
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-App-ID": APP_ID,
        "User-Agent": headerList.get("user-agent") ?? ""
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

    const json = (await response.json()) as HttpBaseResponseBodyJson<LoginActionApiResponse>

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
  } catch (error) {
    // TODO: send to logger
    console.log(error)
    throw error
  }
}
