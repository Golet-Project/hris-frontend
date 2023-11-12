"use server"

import { API_BASE_URL, APP_ID } from "@/lib/constant"
import { HttpBaseResponseBodyJson, HttpResponse } from "@/lib/http"
import { getAccessToken, getUserAgent } from "@/lib/server-utils"

type Employee = {
  uid: string
  full_name: string
  gender: string
  age: number
  email: string
  phone_number: string
  join_date: string
  end_date: string
  employee_status: string
}

type FindEmployeesResponse = Employee[]

type FindAllEmployeesOut = HttpResponse<FindEmployeesResponse>

export default async function findAllEmployees(): Promise<FindAllEmployeesOut> {
  try {
    const url = `${API_BASE_URL}/employee`

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

    const json = (await response.json()) as HttpBaseResponseBodyJson<FindEmployeesResponse>
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
