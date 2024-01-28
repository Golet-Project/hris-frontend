"use client"

import { Regency } from "@/entities"
import { getUserAgent } from "@/lib/client/utils"
import { API_BASE_URL, APP_DOMAIN, APP_ID } from "@/lib/constant"
import { HttpBaseResponseBodyJson, HttpResponse } from "@/lib/http"

type FetchRegencyByProvinceIdResponse = HttpResponse<Regency[]>
export async function fetchRegencyByProvinceId(provinceId: string): Promise<FetchRegencyByProvinceIdResponse> {
  const userAgent = getUserAgent()

  const urlBuilder = new URL("/region/regency", API_BASE_URL)
  const queryStringBuilder = new URLSearchParams({
    province_id: provinceId
  })
  const url = `${urlBuilder.toString()}?${queryStringBuilder.toString()}`

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-App-ID": APP_ID,
      "X-Domain": APP_DOMAIN,
      "User-Agent": userAgent,
      // TODO: remove this
      "Access-Control-Allow-Origin": "*"
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

  const json = (await response.json()) as HttpBaseResponseBodyJson<Regency[]>

  const regencies: Regency[] = []
  for (const regency of json.data) {
    regencies.push({
      id: regency.id,
      province_id: regency.province_id,
      name: regency.name
    })
  }

  return {
    success: {
      message: json.message,
      data: regencies
    }
  }
}
