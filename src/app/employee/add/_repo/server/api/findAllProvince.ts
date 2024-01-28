"use server"

import { Province } from "@/entities"
import { API_BASE_URL, APP_ID } from "@/lib/constant"
import { HttpBaseResponseBodyJson, HttpResponse } from "@/lib/http"
import { getAccessToken, getUserAgent } from "@/lib/server/utils"

type FindAllProvinceResponse = Province[]

type FindAllProvinceOut = HttpResponse<FindAllProvinceResponse>
export default async function findAllProvince(): Promise<FindAllProvinceOut> {
  const url = `${API_BASE_URL}/region/province`

  const token = getAccessToken()
  const userAgent = getUserAgent()

  // get the data
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-App-ID": APP_ID,
      "User-Agent": userAgent ?? "",
      Authorization: `Bearer ${token}`
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

  const json = (await response.json()) as HttpBaseResponseBodyJson<FindAllProvinceResponse>
  return {
    success: json
  }
}
