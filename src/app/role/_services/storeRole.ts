"use server"

import { HttpResponse } from "@/lib/http"
import { AddRoleSchema } from "../add/_type/AddRoleSchema"

type StoreRoleIn = AddRoleSchema

// TODO: proper schema
type StoreRoleOut = HttpResponse

export async function storeRole(role: StoreRoleIn): Promise<StoreRoleOut> {
  // TODO: implement API call to store role

  await console.log(role)
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: {
            message: "Role berhasil ditambahkan"
          }
        })
      }, 5000)
    })
  } catch (error) {
    return Promise.reject(error)
  }
}
