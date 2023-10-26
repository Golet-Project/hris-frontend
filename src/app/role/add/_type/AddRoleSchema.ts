// import { RoleStatus } from "@/lib/primitive/role"
import * as z from "zod"

export const addRoleSchema = z
  .object({
    name: z
      .string({
        required_error: "Nama wajib diisi"
      })
      .min(1, "Nama role wajib diisi")
      .max(50, "Nama role tidak boleh lebih dari 50 karakter"),
    description: z
      .string({
        required_error: "Deskripsi wajib diisi"
      })
      .min(1, "Nama role wajib diisi")
      .max(200, "Deskripsi tidak boleh lebih dari 200 karakter"),

    accessMenuId: z.array(z.string()).nonempty()

    // status: z.nativeEnum(RoleStatus, {
    //   required_error: "Status wajib diisi"
    // })
  })
  .required()

export type AddRoleSchema = z.infer<typeof addRoleSchema>
