import * as z from "zod"

export const addEmployeeSchema = z.object({
  firstName: z.string({ required_error: "Namad Depan wajib diisi" }).min(1, "Nama Depan wajib diisi").max(255),
  lastName: z.string({ required_error: "Nama Belakang wajib diisi" }).min(1, "Nama Depan wajib diisi").max(255),
  email: z.string({ required_error: "Email wajib diisi" }).email("Email berupa email yang valid"),
  birthDate: z.date({ required_error: "Tanggal Lahir wajib diisi", invalid_type_error: "Tanggal Lahir tidak valid" }),
  addressDetail: z.string({ required_error: "Detail Alamat wajib diisi" }).min(1, "Detail Alamat wajib diisi").max(255),
  provinceId: z.string({ required_error: "Provinsi wajib diisi" }).min(1, "Provinsi wajib diisi").max(2),
  regencyId: z.string({ required_error: "Kabupaten wajib diisi" }).min(1, "Kabupaten wajib diisi").max(5),
  districtId: z.string({ required_error: "Kecamatan wajib diisi" }).min(1, "Kecamatan wajib diisi").max(8),
  villageId: z.string({ required_error: "Desa wajib diisi" }).min(1, "Desa wajib diisi").max(13),
  joinDate: z.date({
    required_error: "Tanggal Bergabung wajib diisi",
    invalid_type_error: "Tanggal Bergabung tidak valid"
  }),
  gender: z.enum(["M", "F"], { required_error: "Jenis Kelamin wajib diisi" }),
  employeeStatus: z.enum(["intern", "fulltime"], { required_error: "Status karyawan wajib diisi" })
})

export type AddEmployeeSchema = z.infer<typeof addEmployeeSchema>
