import { cookies, headers } from "next/headers"
import { jwtDecode } from "jwt-decode"
import { redirect } from "next/navigation"
import AppProvider from "./AppProvider"

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const headerList = headers()
  const cookieStore = cookies()

  const token = cookieStore.get("token")
  const pathName = headerList.get("x-path-name")

  if (!token && pathName === "/auth/login") {
    return <>{children}</>
  }

  if (token) {
    const decoded = jwtDecode(token.value)

    if (decoded.exp && decoded.exp * 1000 > Date.now()) {
      if (pathName !== "/auth/login") {
        return <AppProvider isAuthenticated>{children}</AppProvider>
      }

      return redirect("/")
    }

    cookieStore.delete("token")
  }
  return redirect("/auth/login")
}
