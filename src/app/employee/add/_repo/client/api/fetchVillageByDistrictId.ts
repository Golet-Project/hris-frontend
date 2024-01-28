"use client"

import { Village } from "@/entities"
import { getUserAgent } from "@/lib/client/utils"
import { API_BASE_URL, APP_DOMAIN, APP_ID } from "@/lib/constant"
import { HttpBaseResponseBodyJson, HttpResponse } from "@/lib/http"

type FetchVillageByDistrictIdResponse = HttpResponse<Village[]>
export async function fetchVillageByDistrictId(districtId: string): Promise<FetchVillageByDistrictIdResponse> {
  const userAgent = getUserAgent()

  const urlBuilder = new URL("/region/village", API_BASE_URL)
  const queryStringBuilder = new URLSearchParams({
    district_id: districtId
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

  const json = (await response.json()) as HttpBaseResponseBodyJson<Village[]>

  const villages: Village[] = []
  for (const village of json.data) {
    villages.push({
      id: village.id,
      district_id: village.district_id,
      name: village.name
    })
  }

  return {
    success: {
      message: json.message,
      data: villages
    }
  }
}
