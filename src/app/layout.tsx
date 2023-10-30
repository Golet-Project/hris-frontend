import "@/styles/globals.css"
import localFont from "next/font/local"
import { cookies } from "next/headers"
import AppProvider from "./AppProvider"
import { jwtDecode } from "jwt-decode"

type RootProps = {
  children: React.ReactNode
}

const inter = localFont({
  src: "./_fonts/Inter-Regular.woff",
  weight: "400",
  style: "normal"
})

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
}

export default function RootLayout({ children }: RootProps) {
  const cookieStore = cookies()
  const token = cookieStore.get("token")
  let isAuthenticated = false

  if (token) {
    const decoded = jwtDecode(token.value)
    if (decoded.exp && decoded.exp * 1000 > Date.now()) {
      isAuthenticated = true
    }
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider isAuthenticated={isAuthenticated}>{children}</AppProvider>
      </body>
    </html>
  )
}
