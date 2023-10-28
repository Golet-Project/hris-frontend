import "@/styles/globals.css"
import localFont from "next/font/local"

const interRegular = localFont({
  src: "./Inter-Regular.woff",
  weight: "400",
  style: "normal",
  variable: "--font-inter"
})

export { interRegular }
