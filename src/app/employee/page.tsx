import { Link } from "@/components/ui/button"
import findAllEmployees from "./_services/findAllEmployees"
import { EmployeeTable, EmployeeRow } from "./EmployeeTable"

export default async function Page() {
  const response = await findAllEmployees()

  let data: EmployeeRow[] = []
  if (!response.error) {
    data = response.success?.data ?? []
  }

  return (
    <div>
      <div className="flex flex-row items-center gap-1">
        <p className="text-slate-500">Karyawan</p>
      </div>

      <div className="flex justify-end mb-4">
        <Link href="/employee/add">Tambah Karyawan</Link>
      </div>
      <EmployeeTable data={data}></EmployeeTable>
    </div>
  )
}
