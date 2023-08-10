import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"

function createData(name: string, onlineStatus: string, position: string, role: string) {
  return { name, onlineStatus, position, role }
}

const rows = [
  createData("PT. Makmur Sentosa", "online", "Manager", "Admin"),
  createData("PT. Makmur Sentosa", "online", "Manager", "Admin"),
  createData("PT. Makmur Sentosa", "online", "Manager", "Admin"),
  createData("PT. Makmur Sentosa", "online", "Manager", "Admin")
]

export function LastActivityTable() {
  return (
    <TableContainer component={Paper} className="p-6">
      <h1 className="font-semibold text-lg">Aktivitas Terbaru</h1>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className="bg-primary">
          <TableRow>
            <TableCell align="center" className="text-white">
              Nama
            </TableCell>
            <TableCell align="center" className="text-white">
              Status
            </TableCell>
            <TableCell align="center" className="text-white">
              Posisi
            </TableCell>
            <TableCell align="center" className="text-white">
              Role
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.onlineStatus}</TableCell>
              <TableCell align="center">{row.position}</TableCell>
              <TableCell align="center">{row.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
