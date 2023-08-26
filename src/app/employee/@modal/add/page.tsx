import AddEmployeeForm from "./AddEmployeeForm"

export default function Page() {
  return (
    // overlay
    <div className="absolute inset-0 bg-opacity-50 bg-black z-50 flex items-center justify-center">
      <div className="w-11/12 p-7 rounded-lg absolute bg-white">
        <h2 className="font-semibold text-lg">Tambah data karyawan2</h2>
        <hr className="border-t-2 border-gray-200 w-full mt-2 mb-4"></hr>
        <AddEmployeeForm />
      </div>
    </div>
  )
}
