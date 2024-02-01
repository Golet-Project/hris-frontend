"use client"

import { BasicLoginSchema } from "../../_dto/basic"
import { postBasicLogin } from "../../_repo/server/api/basic"
import { Dispatch, SetStateAction } from "react"
import { ProgressBarRouter } from "@/lib/client/type"

export async function handleLogin(data: BasicLoginSchema, router: ProgressBarRouter) {
  try {
    const response = await postBasicLogin({
      email: data.email,
      password: data.password
    })

    if ("error" in response) {
      alert(response.error?.message ?? "")
      return
    }

    router.push("/")
    return
  } catch (error) {
    // TODO: proper error
    alert("internal server error")
  }
}

export function toggleShowPassword(setShowPassword: Dispatch<SetStateAction<boolean>>) {
  setShowPassword((prevState) => !prevState)
}
