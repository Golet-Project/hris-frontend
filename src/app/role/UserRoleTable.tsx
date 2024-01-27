"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Link } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BiSearch } from "react-icons/bi"
import { FaFilter } from "react-icons/fa"
import { useEffect, useMemo, useRef, useState } from "react"
import { findAllUserRole } from "./_action/findAllUserRole"
import { CustomSelectLabel, Select, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select"
import { SelectTrigger } from "@/components/ui/select"
import { SelectValue } from "@/components/ui/select"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"

export type UserRoleRow = {
  role: string
  description: string
  status: string
  updated_at: string
  updated_by: string
}

type UserRoleTableProps = {
  data: UserRoleRow[]
}

const filterSchema = z.object({
  status: z.string().optional(),
  role: z.string().optional(),
  search: z.string().max(3, "Kata kunci tidak boleh lebih dari 100").optional()
})

type FilterSchema = z.infer<typeof filterSchema>

export function UserRoleTable(props: UserRoleTableProps) {
  const userRoleColumn = useMemo<ColumnDef<UserRoleRow>[]>(
    () => [
      {
        id: "number",
        header: "No.",
        cell: ({ row }) => {
          return row.index + 1
        }
      },
      {
        id: "role",
        accessorKey: "role",
        header: "Role"
      },
      {
        id: "description",
        accessorKey: "description",
        header: "Deskripsi"
      },
      {
        id: "status",
        accessorKey: "status",
        header: "Status"
      },
      {
        id: "updated_at",
        accessorKey: "updated_at",
        header: "Terakhir Diperbaharui"
      },
      {
        id: "updated_by",
        accessorKey: "updated_by",
        header: "Diperbaharui Oleh"
      }
    ],
    []
  )

  // state
  const [filter, setFilter] = useState<FilterSchema>({})
  const [data, setData] = useState(props.data)
  const shouldFetchData = useRef(false)

  const form = useForm<FilterSchema>({
    resolver: zodResolver(filterSchema),
    mode: "onChange",
    defaultValues: {}
  })
  const { isValid } = form.formState

  // state for filter changes
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    if (isValid) {
      const filterValue = form.getValues()

      // prevent fetching data during initial render
      if (shouldFetchData.current) {
        timeoutId = setTimeout(() => {
          const response = findAllUserRole(filterValue)

          let responseData: UserRoleRow[] = []
          if (!response.error) {
            responseData = response.success?.data ?? []
          }
          setData(responseData)
        }, 700)
      }

      shouldFetchData.current = true
    }

    return () => clearTimeout(timeoutId)
  }, [filter, isValid])

  const table = useReactTable({
    data: data,
    columns: userRoleColumn,
    getCoreRowModel: getCoreRowModel(),
    manualFiltering: true
  })

  function renderTableBody() {
    if (table.getRowModel().rows?.length) {
      return table.getRowModel().rows.map((row) => (
        <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
          {row.getVisibleCells().map((cell) => {
            return <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
          })}
        </TableRow>
      ))
    } else {
      return (
        <TableRow>
          <TableCell colSpan={userRoleColumn.length} className="h-24"></TableCell>
        </TableRow>
      )
    }
  }

  return (
    <div className="bg-white border rounded-lg border-slate-200 mt-4">
      {/* panel */}
      <div className="p-4 flex justify-between">
        <Form {...form}>
          <div className="flex gap-4">
            <span className="my-auto font-semibold">
              <FaFilter />
            </span>

            <FormField
              name="role"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={(e) => {
                      setFilter((prev) => ({ ...prev, role: e }))
                      field.onChange(e)
                    }}>
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectGroup>
                        <CustomSelectLabel>Role</CustomSelectLabel>

                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Super Admin">Super Admin</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="status"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={(e) => {
                      setFilter((prev) => ({ ...prev, status: e }))
                      field.onChange(e)
                    }}>
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectGroup>
                        <CustomSelectLabel>Status</CustomSelectLabel>

                        <SelectItem value="Aktif">Aktif</SelectItem>
                        <SelectItem value="Nonaktif">Nonaktif</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end gap-4">
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <span className="flex flex-row items-center border rounded-lg w-[300px] relative">
                      <BiSearch className="text-lg lg:text-xl left-3 absolute z-10" />
                      <Input
                        type="text"
                        placeholder="cari"
                        className="border-none shadow-none pl-10"
                        {...field}
                        onChange={(e) => {
                          setFilter((prev) => ({
                            ...prev,
                            search: String(e.target.value)
                          }))
                          field.onChange(e)
                        }}
                        name="search"
                        value={filter.search ?? ""}
                      />
                    </span>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link href="/role/add">Tambah Role</Link>
          </div>
        </Form>
      </div>

      {/* table */}
      <Table>
        <TableHeader className="bg-table-header">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>{renderTableBody()}</TableBody>
      </Table>
    </div>
  )
}
