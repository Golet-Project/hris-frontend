"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/text-area"
import { DatePicker } from "@/components/ui/date-picker"
import { District, Province, Regency, Village } from "@/entities"
import { HttpError } from "@/lib/http"
import { useState } from "react"
import {
  handleFindDistrictByRegencyId,
  handleFindRegencyByProvinceId,
  handleFindVillageByDistrictId
} from "./_action/client/addEmployeeForm"

const addEmployeeSchema = z.object({
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
  gender: z.enum(["M", "F"], { required_error: "Jenis Kelamin wajib diisi" })
})

type AddEmployeeSchema = z.infer<typeof addEmployeeSchema>

type AddEmployeeProps = {
  provinces: Province[]
}

export default function AddEmployeeForm(props: AddEmployeeProps) {
  const form = useForm<AddEmployeeSchema>({
    resolver: zodResolver(addEmployeeSchema)
  })

  const [regencies, setRegencies] = useState<Regency[]>([])
  const [districts, setDistricts] = useState<District[]>([])
  const [villages, setVillages] = useState<Village[]>([])

  const onSubmit = () => {
    try {
    } catch (error) {
      if (error instanceof HttpError) {
        alert(error.message)
        return
      }

      // TODO: proper log

      alert("internal server error")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-5">
          {/* Nama Depan */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Nama Depan</FormLabel>
                <FormControl className="my-2">
                  <Input type="text" name="firstName" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Nama Belakang */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Nama Belakang</FormLabel>
                <FormControl className="my-2">
                  <Input type="text" name="lastName" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl className="my-2">
                  <Input type="email" name="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Birth Date */}
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }: { field: any }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Tanggal Lahir</FormLabel>
                <DatePicker label="Tanggal Lahir" className="w-full" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* gender */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Jenis Kelamin</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl className="my-2">
                    <SelectTrigger>
                      <SelectValue placeholder="Jenis Kelamin" />
                    </SelectTrigger>
                  </FormControl>
                  <FormMessage />
                  <SelectContent>
                    <SelectItem value="L">Laki-Laki</SelectItem>
                    <SelectItem value="P">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {/* Provinces */}
          <FormField
            control={form.control}
            name="provinceId"
            render={() => (
              <FormItem>
                <FormLabel>Provinsi</FormLabel>
                <Select onValueChange={(provinceId: string) => handleFindRegencyByProvinceId(provinceId, setRegencies)}>
                  <FormControl className="my-2">
                    <SelectTrigger>
                      <SelectValue placeholder="Provinsi" />
                    </SelectTrigger>
                  </FormControl>
                  <FormMessage />
                  <SelectContent>
                    {props.provinces.map((province: Province, i: number) => {
                      return (
                        <SelectItem key={i} value={province.id}>
                          {province.name}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {/* Kabupaten */}
          <FormField
            control={form.control}
            name="regencyId"
            render={() => (
              <FormItem>
                <FormLabel>Kabupaten</FormLabel>

                <Select onValueChange={(regencyId: string) => handleFindDistrictByRegencyId(regencyId, setDistricts)}>
                  <FormControl className="my-2">
                    <SelectTrigger>
                      <SelectValue placeholder="Kabupaten" />
                    </SelectTrigger>
                  </FormControl>
                  <FormMessage />
                  <SelectContent>
                    {regencies.map((regency: Regency) => {
                      return (
                        <SelectItem key={regency.id} value={regency.id}>
                          {regency.name}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {/* Kecamatan */}
          <FormField
            control={form.control}
            name="districtId"
            render={() => (
              <FormItem>
                <FormLabel>Kecamatan</FormLabel>
                <Select onValueChange={(districtId: string) => handleFindVillageByDistrictId(districtId, setVillages)}>
                  <FormControl className="my-2">
                    <SelectTrigger>
                      <SelectValue placeholder="Kecamatan" />
                    </SelectTrigger>
                  </FormControl>
                  <FormMessage />
                  <SelectContent>
                    {districts.map((district: District) => {
                      return (
                        <SelectItem key={district.id} value={district.id}>
                          {district.name}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {/* Kelurahan */}
          <FormField
            control={form.control}
            name="villageId"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Desa/Kelurahan</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl className="my-2">
                    <SelectTrigger>
                      <SelectValue placeholder="Desa/Kelurahan" />
                    </SelectTrigger>
                  </FormControl>
                  <FormMessage />
                  <SelectContent>
                    {villages.map((village: Village) => {
                      return (
                        <SelectItem key={village.id} value={village.id}>
                          {village.name}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {/* Detail Alamat */}
          <FormField
            control={form.control}
            name="addressDetail"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Detail Alamat</FormLabel>
                <Textarea placeholder="Jl. melati No. 10" {...field} value={field.value ?? ""} />
              </FormItem>
            )}
          />

          {/* Join Date */}
          <FormField
            control={form.control}
            name="joinDate"
            render={({ field }: { field: any }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Tanggal Masuk</FormLabel>
                <DatePicker label="Tanggal Masuk" className="w-full" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="mt-4 align-items-end float-right" type="submit">
          Simpan
        </Button>
      </form>
    </Form>
  )
}
