import { AttendanceTable } from "./AttendanceTable"
import { FindAllAttendanceResponse, findAllAttendance } from "./_services/findAllAttendance"

export default async function Page() {
  const response = await findAllAttendance()

  let data: FindAllAttendanceResponse = []
  if (!response.error) {
    data = response.success?.data ?? []
  }

  return (
    <div>
      <div className="flex flex-row items-center gap-1">
        <p className="text-slate-500">Kehadiran</p>
      </div>

      <AttendanceTable data={data}></AttendanceTable>
    </div>
  )
}
