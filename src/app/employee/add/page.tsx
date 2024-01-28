import Link from "next/link"
import { HiChevronRight } from "react-icons/hi"
import AddEmployeeForm from "./AddEmployeeForm"
import { fetchAllProvince } from "./_action/server/fetchAllProvince"
import { Province } from "@/entities"

export default async function Page() {
  // TODO: get the province
  const provinceResponse = await fetchAllProvince()
  let provinceData: Province[] = []
  if (!provinceResponse.error) {
    provinceData = provinceResponse.success?.data ?? []
  }

  return (
    <>
      <div className="flex flex-row items-center gap-1">
        <Link href="/role" className="text-primary">
          Karyawan
        </Link>

        <HiChevronRight />

        <p className="text-slate-500">Tambah Data Karyawan</p>
      </div>
      <div className="w-full p-7 rounded-lg absolute bg-white mt-2">
        <h3 className="font-semibold text-lg">Tambah data karyawan</h3>
        <hr className="border-t-2 border-gray-200 w-full mt-2 mb-4"></hr>
        <AddEmployeeForm provinces={provinceData} />
      </div>
    </>
  )
}
