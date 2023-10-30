import { NextRequest, NextResponse } from "next/server"
import { jwtDecode } from "jwt-decode"

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|static).*)"]
}

export function middleware(req: NextRequest) {
  // get cookies
  const token = req.cookies.get("token")
  const nextUrl = req.nextUrl
  let isTokenValid = false
  const customHeaders = new Headers(req.headers)
  customHeaders.set("x-path-name", nextUrl.pathname)

  if (token !== undefined) {
    const decoded = jwtDecode(token.value)

    if (decoded.exp && decoded.exp * 1000 > Date.now()) {
      isTokenValid = true
    }
  }

  if (nextUrl.pathname === "/auth/login" || nextUrl.pathname.startsWith("/oauth")) {
    if (token === undefined) {
      customHeaders.set("x-isAuthenticated", "false")
      return NextResponse.next({
        request: {
          headers: customHeaders
        }
      })
    }

    if (!isTokenValid) {
      req.cookies.delete("token")
      customHeaders.set("x-isAuthenticated", "false")
      return NextResponse.next({
        request: {
          headers: customHeaders
        }
      })
    }

    return NextResponse.redirect(new URL("/", req.url))
  }

  if (token === undefined) {
    return NextResponse.redirect(new URL("/auth/login", req.url))
  }

  customHeaders.set("x-isAuthenticated", "true")
  return NextResponse.next({
    request: {
      headers: customHeaders
    }
  })
}
