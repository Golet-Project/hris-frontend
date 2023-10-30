"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const addEmployeeSchema = z.object({
  fullName: z.string().min(1, "Nama Lengkap wajib diisi").max(255),
  email: z.string().email("Email berupa email yang valid"),
  birthDate: z.string(),
  gender: z.enum(["L", "P"])
})

type AddEmployeeSchema = z.infer<typeof addEmployeeSchema>

export default function AddEmployeeForm() {
  const form = useForm<AddEmployeeSchema>({
    resolver: zodResolver(addEmployeeSchema)
  })

  const onSubmit = (values: AddEmployeeSchema) => {
    // TODO: handle on submit
    if (values) {
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-5">
          {/* Nama Lengkap */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Nama Lengkap</FormLabel>
                <FormControl className="my-2">
                  <Input type="text" name="fullName" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}></FormField>

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
            )}></FormField>

          {/* Birth Date */}
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Tanggal Lahir</FormLabel>
                <FormControl className="my-2">
                  <Input type="date" name="birthDate" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}></FormField>

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
            )}></FormField>
        </div>
        <Button className="mt-4 align-items-end float-right" type="submit">
          Simpan
        </Button>
      </form>
    </Form>
  )
}
