"use server"

import { HttpResponse } from "@/lib/http"
import { findAllAttendance } from "@/app/attendance/_repo/server/api/findAllAttendance"
import { AttendanceTableRow } from "../../_dto/attendance"

export type FetchAttendanceTableDataResponse = AttendanceTableRow[]

type FetchAttendanceTableDataOut = HttpResponse<FetchAttendanceTableDataResponse>
export async function fetchAttendanceTableData(): Promise<FetchAttendanceTableDataOut> {
  try {
    const response = await findAllAttendance()
    return response
  } catch (error) {
    // TODO: proper error
    // eslint-disable-next-line no-console
    console.log("Error", error)
    throw error
  }
}
