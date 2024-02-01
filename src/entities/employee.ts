import { EmployeeStatus } from "@/lib/primitive/employee"
import { Gender } from "@/lib/primitive/gender"

export type Employee = {
  first_name: string
  last_name: string
  email: string
  birth_date: string
  address_detail: string
  province_id: string
  regency_id: string
  district_id: string
  village_id: string
  join_date: string
  gender: Gender
  employee_status: EmployeeStatus
}
