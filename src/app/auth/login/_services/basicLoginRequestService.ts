"use server"

import { API_BASE_URL, APP_ID, APP_DOMAIN } from "@/lib/constant"
import { HttpBaseResponseBodyJson, HttpResponse, HttpStatusCode } from "@/lib/http"
import { jwtDecode } from "jwt-decode"
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
  const cookieStore = cookies()
  const url = new URL(API_BASE_URL + "/auth/login")
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
        "X-Domain": APP_DOMAIN,
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
    if (json.data === undefined) {
      throw new Error("required response data")
    }

    // set expire base on token ttl
    const decodedToken = jwtDecode(json.data.access_token)

    const cookiesExpiredIn = new Date()
    const now = cookiesExpiredIn.getTime()

    cookiesExpiredIn.setTime(now + 1000 * 86400) // set to default 1 day

    if (decodedToken.exp) {
      const tokenExpInMillis = decodedToken.exp * 1000

      // if returned token already expired
      if (tokenExpInMillis <= now) {
        return {
          error: {
            message: "token is expired",
            code: HttpStatusCode.Unauthorized
          },
          success: undefined
        }
      }

      // otherwise, set expires in 5 minutes before the token age -
      cookiesExpiredIn.setTime(tokenExpInMillis - 5 * 60 * 1000)
    }

    cookieStore.set({
      name: "token",
      value: json.data.access_token,
      httpOnly: true,
      sameSite: "lax",
      expires: cookiesExpiredIn,
      path: "/"
      // TODO: add secure option
    })

    return {
      success: {
        message: "Berhasil Login",
        data: undefined
      }
    }
  } catch (error) {
    // TODO: send to logger
    // eslint-disable-next-line no-console
    console.log(error)
    throw error
  }
}
