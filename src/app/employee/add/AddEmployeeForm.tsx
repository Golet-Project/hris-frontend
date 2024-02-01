"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/text-area"
import { DatePicker } from "@/components/ui/date-picker"
import { District, Province, Regency, Village } from "@/entities"
import { Reducer, useReducer } from "react"
import {
  RegionReducerAction,
  handleFindDistrictByRegencyId,
  handleFindRegencyByProvinceId,
  handleFindVillageByDistrictId,
  handleSubmitForm,
  regionReducer
} from "./_action/client/addEmployeeForm"
import { RegionDto } from "./_dto/region"
import { AddEmployeeSchema, addEmployeeSchema } from "./_dto/employee"
import { useRouter } from "next-nprogress-bar"

type AddEmployeeProps = {
  provinces: Province[]
}

export default function AddEmployeeForm(props: AddEmployeeProps) {
  const form = useForm<AddEmployeeSchema>({
    resolver: zodResolver(addEmployeeSchema)
  })
  const { isDirty, isValid, isSubmitting, isSubmitSuccessful } = form.formState
  const router = useRouter()

  const [state, dispatch] = useReducer<Reducer<RegionDto, RegionReducerAction>>(regionReducer, {
    provinces: props.provinces,
    regencies: [],
    districts: [],
    villages: []
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => handleSubmitForm(data, router))}>
        <div className="grid grid-cols-2 gap-5">
          {/* Nama Depan */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Depan</FormLabel>
                <FormControl className="my-2">
                  <Input type="text" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Nama Belakang */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Belakang</FormLabel>
                <FormControl className="my-2">
                  <Input type="text" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl className="my-2">
                  <Input type="email" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Birth Date */}
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Tanggal Lahir</FormLabel>
                <DatePicker label="Tanggal Lahir" className="w-full" {...field} value={field.value ?? ""} />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* gender */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jenis Kelamin</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl className="my-2">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <FormMessage />
                  <SelectContent>
                    <SelectItem value="M">Laki-Laki</SelectItem>
                    <SelectItem value="F">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {/* Provinces */}
          <FormField
            control={form.control}
            name="provinceId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Provinsi</FormLabel>
                <Select
                  onValueChange={(provinceId: string) => {
                    field.onChange(provinceId)
                    handleFindRegencyByProvinceId(provinceId, dispatch)
                  }}>
                  <FormControl className="my-2">
                    <SelectTrigger>
                      <SelectValue />
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kabupaten</FormLabel>

                <Select
                  onValueChange={(regencyId: string) => {
                    field.onChange(regencyId)
                    handleFindDistrictByRegencyId(regencyId, dispatch)
                  }}>
                  <FormControl className="my-2">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <FormMessage />
                  <SelectContent>
                    {state.regencies.map((regency: Regency) => {
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kecamatan</FormLabel>
                <Select
                  onValueChange={(districtId: string) => {
                    field.onChange(districtId)
                    handleFindVillageByDistrictId(districtId, dispatch)
                  }}>
                  <FormControl className="my-2">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <FormMessage />
                  <SelectContent>
                    {state.districts.map((district: District) => {
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Desa/Kelurahan</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl className="my-2">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <FormMessage />
                  <SelectContent>
                    {state.villages.map((village: Village) => {
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
                <DatePicker className="w-full" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status karyawan */}
          <FormField
            control={form.control}
            name="employeeStatus"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Status Karyawan</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl className="my-2">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <FormMessage />
                  <SelectContent>
                    <SelectItem value="intern">Intern</SelectItem>
                    <SelectItem value="fulltime">Full Time</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <Button
          className="mt-4 align-items-end float-right"
          type="submit"
          disabled={!isDirty || !isValid || isSubmitting || isSubmitSuccessful}>
          Simpan
        </Button>
      </form>
    </Form>
  )
}
