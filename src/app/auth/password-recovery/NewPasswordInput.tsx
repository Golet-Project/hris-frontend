"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { NewPasswordSchema, newPasswordSchema } from "./_type/NewPasswordSchema"
import { useSearchParams } from "next/navigation"
import { changePassword } from "./_services/changePassword"
import { useState } from "react"

export default function NewPasswordInput() {
  const [changePasswordSuccess, setChangePasswordSuccess] = useState(false)

  const form = useForm<NewPasswordSchema>({
    resolver: zodResolver(newPasswordSchema),
    mode: "onChange"
  })
  const searchParams = useSearchParams()
  const formState = form.formState

  const handleSubmit = async (values: NewPasswordSchema) => {
    try {
      const response = await changePassword({
        password: values.password,
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

  if (changePasswordSuccess) {
    return <p className="block text-sm font- text-center">Password berhasil diubah!</p>
  } else {
    return (
      <>
        <label className="block text-sm font-bold text-center">Masukkan password baru</label>
        <hr className="mt-3 mb-6" />

        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Form {...form}>
            {/* New Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Password Baru</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Konfirmasi Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={!formState.isDirty || !formState.isValid}>
              Ubah
            </Button>
          </Form>
        </form>
      </>
    )
  }
}
