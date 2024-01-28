import * as z from "zod"

export const basicLoginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Password harus terdiri dari 8 karakter, mengandung angka, dan setidaknya 1 huruf kapital"
    )
})

export type BasicLoginSchema = z.infer<typeof basicLoginSchema>
