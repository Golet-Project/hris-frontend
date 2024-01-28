"use client"

import { District } from "@/entities"
import { HttpBaseResponseBodyJson, HttpResponse } from "@/lib/http"
import { getUserAgent } from "@/lib/client/utils"
import { API_BASE_URL, APP_DOMAIN, APP_ID } from "@/lib/constant"

type FetchDistrictByRegencyIdResponse = HttpResponse<District[]>
export async function fetchDistrictByRegencyId(regencyId: string): Promise<FetchDistrictByRegencyIdResponse> {
  const userAgent = getUserAgent()

  const urlBuilder = new URL("/region/district", API_BASE_URL)
  const queryStringBuilder = new URLSearchParams({
    regency_id: regencyId
  })
  const url = `${urlBuilder.toString()}?${queryStringBuilder.toString()}`

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-App-ID": APP_ID,
      "X-Domain": APP_DOMAIN,
      "User-Agent": userAgent,

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

  const json = (await response.json()) as HttpBaseResponseBodyJson<District[]>

  const districts: District[] = []
  for (const district of json.data) {
    districts.push({
      id: district.id,
      regency_id: district.regency_id,
      name: district.name
    })
  }

  return {
    success: {
      message: json.message,
      data: districts
    }
  }
}
