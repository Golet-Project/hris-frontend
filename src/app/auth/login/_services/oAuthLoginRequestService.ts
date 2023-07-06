"use server"

import { HttpBaseResponseBodyJson, HttpResponse, HttpStatusCode, proxyUrl } from "@/utils/http"

type OAuthLoginRespose = {
  url: string
}

type OAuthLoginOut = HttpResponse<OAuthLoginRespose>

export default async function oAuthLoginRequest(): Promise<OAuthLoginOut> {
  const url = proxyUrl("/oauth/google/login")

  const response = await fetch(url, {
    method: "POST",
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
