"use client"

import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"

export type AttendanceRow = {
  uid: string
  full_name: string
  date: string
  checkin_time: string
  checkout_time: string
  approved_at: string
  approved_by: string
}

const attendanceColumn: ColumnDef<AttendanceRow>[] = [
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
    accessorKey: "date",
    header: "Tanggal"
  },
  {
    id: "checkin_time",
    accessorKey: "checkin_time",
    header: "Absen Masuk"
  },
  {
    id: "checkout_time",
    accessorKey: "checkout_time",
    header: "Absen Keluar"
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
  data: AttendanceRow[]
}

export function AttendanceTable(props: AttendanceTableProps) {
  return <DataTable columns={attendanceColumn} data={props.data}></DataTable>
}
