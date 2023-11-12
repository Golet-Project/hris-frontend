import { HttpBaseResponseBodyJson, HttpResponse } from "@/lib/http"
import { API_BASE_URL, APP_ID } from "@/lib/constant"
import { getAccessToken, getUserAgent } from "@/lib/server-utils"

type Attendance = {
  uid: string
  full_name: string
  date: string
  checkin_time: string
  checkout_time: string
  approved_at: string
  approved_by: string
}

export type FindAllAttendanceResponse = Attendance[]

type FindAllAttendanceOut = HttpResponse<FindAllAttendanceResponse>

// eslint-disable-next-line require-await
export async function findAllAttendance(): Promise<FindAllAttendanceOut> {
  try {
    const url = `${API_BASE_URL}/attendance`

    const token = getAccessToken()
    const userAgent = getUserAgent()

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

    const json = (await response.json()) as HttpBaseResponseBodyJson<FindAllAttendanceResponse>
    return {
      success: json
    }
  } catch (error) {
    // TODO: proper error
    // eslint-disable-next-line no-console
    console.log("Error", error)
    throw error
  }
}
