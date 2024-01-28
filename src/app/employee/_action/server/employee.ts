"use server"

import { EmployeeTableRow } from "../../_dto/employee"
import findAllEmployee from "../../_repo/server/api/findAllEmployee"

type FetchAllEmployeesOut = EmployeeTableRow[]
export async function fetchAllEmployee(): Promise<FetchAllEmployeesOut> {
  try {
    const response = await findAllEmployee()
    if (response.error || !response.success) {
      return []
    }

    const employees: EmployeeTableRow[] = []
    for (const employee of response.success.data) {
      employees.push(employee)
    }
    return employees
  } catch (error) {
    // TODO: proper error
    // eslint-disable-next-line no-console
    console.log("Error", error)
    throw error
  }
}
