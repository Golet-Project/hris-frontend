import "@/styles/globals.css"
import localFont from "next/font/local"
import { headers } from "next/headers"
import AppProvider from "./AppProvider"
import LoadingBar from "./LoadingBar"

type RootProps = {
  children: React.ReactNode
}

const inter = localFont({
  src: "./_fonts/Inter-Regular.woff",
  weight: "400",
  style: "normal"
})

export const metadata = {
  title: "HROOST",
  description: "HR Management system"
}

export default function RootLayout({ children }: RootProps) {
  const headerList = headers()
  const isAuthenticated = (headerList.get("x-isAuthenticated") ?? "false") === "true"

  return (
    <html lang="en">
      <body className={inter.className}>
        <LoadingBar />
        <AppProvider isAuthenticated={isAuthenticated}>{children}</AppProvider>
      </body>
    </html>
  )
}
