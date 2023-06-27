import { API_BASE_URL } from "@/utils/constant"
import { HttpBaseResponseBodyJson } from "@/utils/http"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"

type ExchangeResponse = {
  access_token: string
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const query = url.search

  const exchangeUrl = API_BASE_URL + "/oauth/google/callback" + query

  // send to the backend, to exchange the code
  const response = await fetch(exchangeUrl, {
    method: "GET"
  })

  if (!response.ok) {
    // TODO: handle alert user not registred
    return redirect("/auth/login")
  }

  const json = await response.json() as HttpBaseResponseBodyJson<ExchangeResponse>

  // make a cookies
  const now = new Date()
  const time = now.getTime()
  now.setTime(time + 1000 * 604800)
  const cookiesExpiredIn = now.toUTCString()
  const cookies = `token=${json.data.access_token}; HttpOnly; SameSite=Lax; Path=/; Expires=${cookiesExpiredIn};`

  return new NextResponse("login success", {
    status: 302,
    headers: {
      "Set-Cookie": cookies,
      Location: "http://localhost:3000"
    }
  })
}