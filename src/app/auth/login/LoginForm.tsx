"use client"

import { Form, FormItem, FormLabel, FormControl, FormField, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useState } from "react"
import * as z from "zod"

import basicLoginRequest from "./_services/basicLoginRequestService"
import { HttpError } from "@/lib/http"

const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Password harus terdiri dari 8 karakter, mengandung angka, dan setidaknya 1 huruf kapital"
    )
})

type LoginSchema = z.infer<typeof loginSchema>

export default function LoginForm() {
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(false)
  const router = useRouter()

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (values: LoginSchema) => {
    try {
      const response = await basicLoginRequest({
        email: values.email,
        password: values.password
      })

      if ("error" in response) {
        alert(response.error?.message ?? "")
        setLoginButtonDisabled(false)
        return
      }

      router.refresh() // invalidating cache
      router.replace("/")
    } catch (error) {
      setLoginButtonDisabled(false)
      if (error instanceof HttpError) {
        // TODO: proper alert
        alert(error.message)
        return
      }

      /// TODO: proper alert
      alert("internal server error")
    }
  }

  return (
    <>
      <Form {...form}>
        <form className="lg:mt-9 xl:mt-10" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }: { field: any }) => (
              <FormItem className="my-3">
                <FormLabel>Email</FormLabel>
                <FormControl className="my-2">
                  <Input type="email" name="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }: { field: any }) => (
              <FormItem className="my-3">
                <FormLabel>Password</FormLabel>
                <FormControl className="my-2">
                  <Input type="password" name="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loginButtonDisabled} type="submit" className="w-full mt-6">
            Login
          </Button>
        </form>
      </Form>
    </>
  )
}
