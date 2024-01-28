import { AttendanceTable } from "./AttendanceTable"
import { FetchAttendanceTableDataResponse, fetchAttendanceTableData } from "./_action/server/attendanceTable"

export default async function Page() {
  const response = await fetchAttendanceTableData()

  let data: FetchAttendanceTableDataResponse = []
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
