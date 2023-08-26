import { cookies, headers } from "next/headers"

export function getAccessToken(): string | undefined {
  const cookieStore = cookies()
  const c = cookieStore.get("token")
  return c?.value
}

export function getUserAgent(): string | null {
  const headerList = headers()

  return headerList.get("user-agent")
}
