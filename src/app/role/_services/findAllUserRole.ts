import { HttpResponse } from "@/lib/http"

// TODO: API integration

export type UserRole = {
  id: string
  role: string
  description: string
  status: string
  updated_at: string
  updated_by: string
}

export type FindAllUserRoleFilter = {
  search?: string
  status?: string
  role?: string
}

export type FindAllUserRoleResponse = UserRole[]
type FindAllUserRoleOut = HttpResponse<FindAllUserRoleResponse>

export function findAllUserRole(filter?: FindAllUserRoleFilter): FindAllUserRoleOut {
  const data = [
    {
      id: "1",
      role: "Admin",
      description: "Nostrud culpa esse exercitation eu excepteur proident esse labore fugiat et voluptate magna.",
      status: "Aktif",
      updated_at: "2023-01-01 12:00:00",
      updated_by: "Elon"
    },

    {
      id: "2",
      role: "Super Admin",
      description:
        "Ea nostrud commodo magna incididunt laboris voluptate proident exercitation adipisicing proident sit.",
      status: "Aktif",
      updated_at: "2023-01-01 12:00:00",
      updated_by: "Elon"
    },
    {
      id: "3",
      role: "Finance",
      description:
        "Ea nostrud commodo magna incididunt laboris voluptate proident exercitation adipisicing proident sit.",
      status: "Nonaktif",
      updated_at: "2023-01-01 12:00:00",
      updated_by: "Elon"
    }
  ]

  let filtered: FindAllUserRoleResponse = data
  if (filter?.search) {
    filtered = filtered.filter((v) => {
      return v.role.toLowerCase() === filter.search?.toLocaleLowerCase()
    })
  }

  if (filter?.status) {
    filtered = filtered.filter((v) => {
      return v.status.toLowerCase() === filter.status?.toLocaleLowerCase()
    })
  }

  if (filter?.role) {
    filtered = filtered.filter((v) => {
      return v.role.toLowerCase() === filter.role?.toLocaleLowerCase()
    })
  }

  try {
    return {
      success: {
        message: "success",
        data: filtered
      }
    }
  } catch (error) {
    // TODO: proper error
    // eslint-disable-next-line no-console
    console.log("error", error)
    throw error
  }
}
