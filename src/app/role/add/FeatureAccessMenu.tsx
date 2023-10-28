"use client"

import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react"
import { AccessMenu, Feature } from "./_type/FeatureAccessMenu"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { FormControl, FormField, FormItem } from "@/components/ui/form"
import { useFormContext } from "react-hook-form"

//=== hook ===
function useFeatureAccessMenu(initialFeatureId: string) {
  const [featureId, setFeatureId] = useState<string>(initialFeatureId)
  const [accessMenu, setAccessMenu] = useState<AccessMenu[]>([])

  return {
    featureId,
    setFeatureId,
    accessMenu,
    setAccessMenu
  }
}

type FeatureContextValue = {
  featureId: string
  setFeatureId: Dispatch<SetStateAction<string>>

  accessMenu: AccessMenu[]
}
export const FeatureContext = createContext<FeatureContextValue>({} as FeatureContextValue)

type FeatureAccessMenuProviderProps = {
  features: Feature[]
  children: React.ReactNode
}
export function FeatureAccessMenuProvider(props: FeatureAccessMenuProviderProps) {
  const { featureId, setFeatureId, accessMenu, setAccessMenu } = useFeatureAccessMenu(props.features[0]?.id ?? "")
  const { formState } = useFormContext()

  useEffect(() => {
    const feature = props.features.find((v) => {
      return v.id === featureId
    })

    if (feature) {
      setAccessMenu(feature.accessMenu)
    }
  }, [featureId])

  return (
    <FeatureContext.Provider value={{ featureId, accessMenu, setFeatureId }}>
      {formState.errors.accessMenuId && <p className="text-red-400 mt-4 mb-2 text-sm">Akses menu wajib diisi</p>}
      <div
        className={cn("grid grid-cols-8 gap-4 h-full", {
          "ring-1 ring-red-400": formState.errors.accessMenuId,
          "mt-4": !formState.errors.accessMenuId
        })}>
        {props.children}
      </div>
    </FeatureContext.Provider>
  )
}

type FeatureListsProps = {
  id: string
  name: string
}
export function FeatureItem(props: FeatureListsProps) {
  const { featureId, setFeatureId } = useContext(FeatureContext)

  const handleClick = (id: string) => {
    setFeatureId(id)
  }

  return (
    <li
      key={props.id}
      className={cn("hover:bg-primary hover:text-white hover:opacity-80 px-4 py-2 cursor-pointer rounded-lg", {
        "bg-primary text-white": featureId === props.id
      })}
      onClick={() => handleClick(props.id)}>
      {props.name}
    </li>
  )
}

export function AccessMenuList() {
  const featureContext = useContext(FeatureContext)
  const form = useFormContext()
  return (
    <>
      {featureContext.accessMenu.map((accessMenu) => {
        return (
          <FormField
            key={accessMenu.id}
            control={form.control}
            name="accessMenuId"
            render={({ field }) => {
              return (
                <FormItem key={accessMenu.id}>
                  <FormControl>
                    <li key={accessMenu.id}>
                      <Checkbox
                        id={accessMenu.id}
                        checked={field.value?.includes(accessMenu.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, accessMenu.id])
                            : field.onChange(field.value.filter((value: string) => value !== accessMenu.id))
                        }}
                      />
                      <span className="ml-2">{accessMenu.name}</span>
                    </li>
                  </FormControl>
                </FormItem>
              )
            }}
          />
        )
      })}
    </>
  )
}

export function ChooseAll({ allAccessMenuId }: { allAccessMenuId: string[] }) {
  const form = useFormContext()

  return (
    <>
      <label htmlFor="select-all" className="cursor-pointer">
        Berikan semua akses
      </label>
      <Checkbox
        id="select-all"
        className="my-auto ml-2"
        onCheckedChange={(checked) => {
          if (checked) {
            form.setValue("accessMenuId", allAccessMenuId)
          } else {
            form.setValue("accessMenuId", [])
          }
        }}
        checked={form.watch("accessMenuId").length === allAccessMenuId.length}
      />
    </>
  )
}
