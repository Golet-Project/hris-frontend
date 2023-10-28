import "@/styles/globals.css"
import LayoutProvider from "./LayoutProvider"
import { interRegular } from "@/styles/fonts"

type RootProps = {
  children: React.ReactNode
}

export const metadata = {
  title: "HROOST",
  description: "Make your HR process easier with HROOST"
}

export default function RootLayout({ children }: RootProps) {
  // const cookieStore = cookies()
  // const token = cookieStore.get("token")
  // TODO: for development only
  const authenticated = true
  // TODO: validate token if needed

  return (
    <html lang="en" className={interRegular.variable}>
      <body>
        <LayoutProvider isAuthenticated={authenticated}>{children}</LayoutProvider>
      </body>
    </html>
  )
}
