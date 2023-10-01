import { NextRequest, NextResponse } from "next/server"

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|static).*)"]
}

export function middleware(req: NextRequest) {
  // get cookies
  // TODO: uncoment if already deployed
  // const cookies = req.cookies.get("token")

  // const nextUrl = req.nextUrl

  // if (nextUrl.pathname === "/auth/login" || nextUrl.pathname.startsWith("/oauth")) {
  //   if (cookies === undefined) {
  //     return NextResponse.next()
  //   }

  //   return NextResponse.redirect(new URL("/", req.url))
  // }

  // if (cookies === undefined) {
  //   return NextResponse.redirect(new URL("/auth/login", req.url))
  // }

  const res = NextResponse.next()

  return res
}
