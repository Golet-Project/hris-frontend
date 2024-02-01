"use server"

import { Employee } from "@/entities/employee"
import { API_BASE_URL, APP_ID } from "@/lib/constant"
import { HttpBaseResponseBodyJson, HttpResponse } from "@/lib/http"
import { getAccessToken } from "@/lib/server/utils"

type AddEmployeeIn = Employee & {
  user_agent: string
}

export default async function addEmployee(data: AddEmployeeIn): Promise<HttpResponse> {
  const url = `${API_BASE_URL}/employee`

  const token = getAccessToken()

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-App-ID": APP_ID,
      "User-Agent": data.user_agent,
      Authorization: `Beareer ${token}`
    },
    body: JSON.stringify(data)
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

  const json = (await response.json()) as HttpBaseResponseBodyJson<undefined>
  return {
    success: json
  }
}
