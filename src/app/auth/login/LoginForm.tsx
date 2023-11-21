"use client"

import { Form, FormItem, FormLabel, FormControl, FormField, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next-nprogress-bar"
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
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  })
  const { isDirty, isValid, isSubmitting, isSubmitSuccessful } = form.formState

  function toggleShowPassword() {
    setShowPassword((prevState) => !prevState)
  }

  const onSubmit = async (values: LoginSchema) => {
    try {
      const response = await basicLoginRequest({
        email: values.email,
        password: values.password
      })

      if ("error" in response) {
        alert(response.error?.message ?? "")
        return
      }

      router.push("/")
      return
    } catch (error) {
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
                  <Input type="email" name="email" placeholder="Email" {...field} value={field.value ?? ""} />
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
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      {...field}
                      value={field.value ?? ""}
                    />
                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      className="absolute top-1/2 right-0 -translate-y-1/2 flex items-center px-4 text-gray-600 h-max">
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            disabled={!isDirty || !isValid || isSubmitting || isSubmitSuccessful}
            type="submit"
            className="w-full mt-6">
            Login
          </Button>
        </form>
      </Form>
    </>
  )
}
