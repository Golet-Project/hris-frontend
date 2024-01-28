"use client"

import { useSearchParams } from "next/navigation"
import { NewPasswordSchema } from "../../_dto/newPassword"
import { putChangePassword } from "../../_repo/server/api/putChangePassword"
import { Dispatch, SetStateAction } from "react"

export async function handleChangePassword(
  data: NewPasswordSchema,
  setChangePasswordSuccess: Dispatch<SetStateAction<boolean>>
) {
  try {
    const searchParams = useSearchParams()

    const response = await putChangePassword({
      password: data.password,
      token: searchParams ? searchParams.get("token") ?? "" : "",
      uid: searchParams ? searchParams.get("uid") ?? "" : "",
      cid: searchParams ? searchParams.get("cid") ?? "" : ""
    })

    if ("error" in response) {
      alert(response.error?.message ?? "")
      return
    }

    setChangePasswordSuccess(true)
  } catch (error) {
    const err = error as Error
    alert(err.message)
  }
}
