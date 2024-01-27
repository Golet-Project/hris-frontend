"use server"

import { API_BASE_URL, APP_DOMAIN, APP_ID } from "@/lib/constant"
import { HttpBaseResponseBodyJson, HttpResponse, HttpStatusCode } from "@/lib/http"
import { jwtDecode } from "jwt-decode"
import { cookies, headers } from "next/headers"

type PostBasicLoginIn = {
  email: string
  password: string
}

type PostBasciLoginResponse = {
  access_token: string
}

type PostBasicLoginOut = HttpResponse

export async function postBasicLogin(req: PostBasicLoginIn): Promise<PostBasicLoginOut> {
  const url = new URL(API_BASE_URL + "/auth/login")
  const headerList = headers()
  const requestBody = {
    email: req.email,
    password: req.password
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
      body: JSON.stringify(requestBody)
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

    const json = (await response.json()) as HttpBaseResponseBodyJson<PostBasciLoginResponse>
    const cookiesStore = cookies()

    // set expire base on toke ttl
    const decodedToken = jwtDecode(json.data.access_token)

    const cookiesExpiredIn = new Date()
    const now = cookiesExpiredIn.getTime()

    cookiesExpiredIn.setTime(now + 1000 * 86400)

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

    cookiesStore.set({
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
        message: json.message,
        data: undefined
      }
    }
  } catch (error) {
    // TODO: proper error
    // eslint-disable-next-line no-console
    console.log(error)
    throw error
  }
}
