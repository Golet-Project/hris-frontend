"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { AddRoleSchema, addRoleSchema } from "./_type/AddRoleSchema"

export default function FormProvider({ children }: { children: React.ReactNode }) {
  const form = useForm<AddRoleSchema>({
    resolver: zodResolver(addRoleSchema),
    defaultValues: {
      name: "",
      description: "",
      accessMenuId: []
    }
  })

  return <Form {...form}>{children}</Form>
}
