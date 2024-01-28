import { Link } from "@/components/ui/button"
import { fetchAllEmployee } from "./_action/server/employee"
import { EmployeeTable } from "./EmployeeTable"

export default async function Page() {
  const employees = await fetchAllEmployee()

  return (
    <div>
      <div className="flex flex-row items-center gap-1">
        <p className="text-slate-500">Karyawan</p>
      </div>

      <div className="flex justify-end mb-4">
        <Link href="/employee/add">Tambah Karyawan</Link>
      </div>
      <EmployeeTable data={employees}></EmployeeTable>
    </div>
  )
}
