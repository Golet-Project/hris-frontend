import * as z from "zod"

export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .regex(
        /^(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Password harus terdiri dari 8 karakter, mengandung angka, dan setidaknya 1 huruf kapital"
      ),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak sama",
    path: ["confirmPassword"]
  })

export type NewPasswordSchema = z.infer<typeof newPasswordSchema>
