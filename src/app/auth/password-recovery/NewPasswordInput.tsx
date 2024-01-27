"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { NewPasswordSchema, newPasswordSchema } from "./_dto/newPassword"
import { useState } from "react"
import { handleChangePassword } from "./_action/client/newPasswordInput"

export default function NewPasswordInput() {
  const [changePasswordSuccess, setChangePasswordSuccess] = useState(false)

  const form = useForm<NewPasswordSchema>({
    resolver: zodResolver(newPasswordSchema),
    mode: "onChange"
  })
  const formState = form.formState

  if (changePasswordSuccess) {
    return <p className="block text-sm font- text-center">Password berhasil diubah!</p>
  } else {
    return (
      <>
        <label className="block text-sm font-bold text-center">Masukkan password baru</label>
        <hr className="mt-3 mb-6" />

        <form
          onSubmit={form.handleSubmit((values: NewPasswordSchema) =>
            handleChangePassword(values, setChangePasswordSuccess)
          )}>
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
