"use server"

import { Province } from "@/entities"
import { API_BASE_URL, APP_ID } from "@/lib/constant"
import { HttpBaseResponseBodyJson, HttpResponse } from "@/lib/http"
import { getAccessToken, getUserAgent } from "@/lib/server-utils"

type FindAllProvincesResponse = Province[]

type FindAllProvincesOut = HttpResponse<FindAllProvincesResponse>

export async function findAllProvinces(): Promise<FindAllProvincesOut> {
  try {
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

    const json = (await response.json()) as HttpBaseResponseBodyJson<FindAllProvincesResponse>
    return {
      success: json
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    throw error
  }
}
