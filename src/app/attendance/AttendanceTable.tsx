"use client"

import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { DateTime } from "luxon"
import { FetchAttendanceTableDataResponse } from "./_action/server/attendanceTable"
import { AttendanceTableRow } from "./_dto/attendance"

const attendanceColumn: ColumnDef<AttendanceTableRow>[] = [
  {
    id: "number",
    header: "No.",
    cell: ({ row }) => {
      return row.index + 1
    }
  },
  {
    id: "full_name",
    accessorKey: "full_name",
    header: "Nama Lengkap"
  },
  {
    id: "date",
    accessorKey: "checkin_time",
    header: "Tanggal",
    cell: ({ renderValue }) => {
      const time = renderValue<string>()
      const dt = DateTime.fromISO(time, { zone: "utc" }).toLocal().setLocale("id")
      if (!dt.isValid) return "-"

      return dt.toFormat("yyyy-LL-dd")
    }
  },
  {
    id: "checkin_time",
    accessorKey: "checkin_time",
    header: "Absen Masuk",
    cell: ({ renderValue }) => {
      const time = renderValue<string>()
      const dt = DateTime.fromISO(time, { zone: "utc" }).toLocal().setLocale("id")
      if (!dt.isValid) return "-"

      return `${dt.toFormat("HH:mm:ss")} ${dt.offsetNameShort}`
    }
  },
  {
    id: "checkout_time",
    accessorKey: "checkout_time",
    header: "Absen Keluar",
    cell: ({ renderValue }) => {
      const time = renderValue<string>()
      const dt = DateTime.fromISO(time, { zone: "utc" }).toLocal().setLocale("id")
      if (!dt.isValid) return "-"

      return `${dt.toFormat("HH:mm:ss")} ${dt.offsetNameShort}`
    }
  },
  {
    id: "approved_at",
    accessorKey: "approved_at",
    header: "Diverifikasi Pada"
  },
  {
    id: "approved_by",
    accessorKey: "approved_by",
    header: "Diverifikasi Oleh"
  }
]

type AttendanceTableProps = {
  data: FetchAttendanceTableDataResponse
}

export function AttendanceTable(props: AttendanceTableProps) {
  return <DataTable columns={attendanceColumn} data={props.data}></DataTable>
}
