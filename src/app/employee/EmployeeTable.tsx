"use client"

import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid"
import Box from "@mui/material/Box"

type EmployeeTableData = {
  id: string
  full_name: string
  gender: string
  age: number
  email: string
  phone_number: string
  join_date: string
  end_date: string
  employee_status: string
}

export default function EmployeeTable({ data }: { data: EmployeeTableData[] }) {
  const columns: GridColDef[] = [
    { field: "no", headerName: "No.", width: 70, align: "center", headerAlign: "center" },
    { field: "full_name", headerName: "Nama Karyawan", headerAlign: "center", minWidth: 200 },
    { field: "gender", headerName: "Jenis Kelamin", headerAlign: "center", align: "center", minWidth: 150 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "center",
      align: "center",
      minWidth: 100
    },
    { field: "email", headerName: "E-Mail", headerAlign: "center", minWidth: 200 },
    { field: "phone_number", headerName: "No. Telepon", headerAlign: "center", minWidth: 200 },
    { field: "join_date", headerName: "Tanggal Masuk", headerAlign: "center", minWidth: 200 },
    { field: "end_date", headerName: "Tanggal Keluar", headerAlign: "center", minWidth: 200 },
    { field: "employee_status", headerName: "Status Karyawan", headerAlign: "center", align: "center", minWidth: 200 }
  ]

  return (
    <>
      {/* Table */}
      <Box sx={{ height: 400, width: 1 }}>
        <div style={{ height: 400, width: "100%" }} className="bg-white mt-6">
          <DataGrid
            getRowId={(row) => row.uid}
            rows={data.map((v, i) => ({ no: i + 1, ...v }))}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 }
              }
            }}
            pageSizeOptions={[5, 10]}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 }
              }
            }}
          />
        </div>
      </Box>
    </>
  )
}
