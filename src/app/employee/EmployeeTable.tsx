"use client"

import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { EmployeeTableRow } from "./_dto/employee"

const employeeColumn: ColumnDef<EmployeeTableRow>[] = [
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
    id: "gender",
    accessorKey: "gender",
    header: "Jenis Kelamin"
  },
  {
    id: "age",
    accessorKey: "age",
    header: "Usia",
    cell: ({ renderValue }) => {
      return `${renderValue()} tahun`
    }
  },
  {
    id: "email",
    accessorKey: "email",
    header: "Email"
  },
  {
    id: "phone_number",
    accessorKey: "phone_number",
    header: "No. Telp."
  },
  {
    id: "join_date",
    accessorKey: "join_date",
    header: "Tanggal Bergabung"
  },
  {
    id: "end_date",
    accessorKey: "end_date",
    header: "Tanggal Keluar"
  },
  {
    id: "employee_status",
    accessorKey: "employee_status",
    header: "Status Karyawan"
  }
]

type EmployeeTableProps = {
  data: EmployeeTableRow[]
}

export function EmployeeTable(props: EmployeeTableProps) {
  return <DataTable columns={employeeColumn} data={props.data}></DataTable>
}
