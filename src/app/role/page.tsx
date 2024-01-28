import { findAllUserRole } from "./_action/findAllUserRole"
import { UserRoleRow, UserRoleTable } from "./UserRoleTable"

export default function Page() {
  const response = findAllUserRole()

  let data: UserRoleRow[] = []
  if (!response.error) {
    data = response.success?.data ?? []
  }
  return (
    <div>
      <div className="flex">
        <p className="text-slate-500">Manajemen Role</p>
      </div>

      <UserRoleTable data={data}></UserRoleTable>
    </div>
  )
}
