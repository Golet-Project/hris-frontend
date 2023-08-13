import dynamic from "next/dynamic"
import findAllEmployees from "./_services/findAllEmployees"

const EmployeeTable = dynamic(() => import("./EmployeeTable"), { ssr: false }) // use this import method to prevent hydration mismatches

export default async function Page() {
  const response = await findAllEmployees()

  if (response.error) {
    return <div>gagal</div>
  } else {
    return (
      <div>
        <div className="flex flex-row items-center gap-1">
          <p className="text-slate-500">Karyawan</p>
        </div>

        <EmployeeTable data={response.success?.data ?? []} />
      </div>
    )
  }
}
