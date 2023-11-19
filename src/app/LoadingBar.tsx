"use client"

import { AppProgressBar as ProgressBar } from "next-nprogress-bar"

export default function LoadingBar() {
  return <ProgressBar color="#00b4bd" options={{ showSpinner: false }} />
}
