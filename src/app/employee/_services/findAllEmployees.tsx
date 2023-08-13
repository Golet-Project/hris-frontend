"use server"

import { API_BASE_URL, APP_ID } from "@/utils/constant"
import { HttpBaseResponseBodyJson, HttpResponse } from "@/utils/http"
import { getAccessToken, getUserAgent } from "@/utils/utils"

type FindEmployeesResponse = {
  id: string
  full_name: string
  gender: string
  age: number
  email: string
  phone_number: string
  join_date: string
  end_date: string
  employee_status: string
}

type FindAllEmployeesOut = HttpResponse<FindEmployeesResponse[]>

export default async function findAllEmployees(): Promise<FindAllEmployeesOut> {
  try {
    const url = `${API_BASE_URL}/employees`

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

    const json = (await response.json()) as HttpBaseResponseBodyJson<FindEmployeesResponse[]>
    return {
      success: json
    }
  } catch (error) {
    // TODO: proper error
    console.log(error)
    throw error
  }
}
