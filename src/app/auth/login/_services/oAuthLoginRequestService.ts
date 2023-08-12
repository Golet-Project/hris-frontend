"use server"

import { APP_ID } from "@/utils/constant"
import { HttpBaseResponseBodyJson, HttpResponse, HttpStatusCode, proxyUrl } from "@/utils/http"
import { headers } from "next/headers"

type OAuthLoginRespose = {
  url: string
}

type OAuthLoginOut = HttpResponse<OAuthLoginRespose>

export default async function oAuthLoginRequest(): Promise<OAuthLoginOut> {
  const url = proxyUrl("/oauth/google/login")
  const headerList = headers()

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-App-ID": APP_ID,
      "User-Agent": headerList.get("user-agent") ?? ""
    },
    redirect: "manual"
  })

  if (!response.ok && response.status !== HttpStatusCode.TemporaryRedirect) {
    return {
      error: {
        message: "Gagal Login",
        code: response.status
      }
    }
  }

  const json = (await response.json()) as HttpBaseResponseBodyJson<OAuthLoginRespose>

  return {
    success: json
  }
}
