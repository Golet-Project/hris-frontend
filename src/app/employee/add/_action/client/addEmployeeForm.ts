"use client"

import { District, Regency, Village } from "@/entities"
import { Dispatch, SetStateAction } from "react"
import { fetchRegencyByProvinceId } from "@/app/employee/add/_repo/client/api/fetchRegencyByProvinceId"
import { fetchDistrictByRegencyId } from "@/app/employee/add/_repo/client/api/fetchDistrictByRegencyId"
import { fetchVillageByDistrictId } from "@/app/employee/add/_repo/client/api/fetchVillageByDistrictId"

export async function handleFindRegencyByProvinceId(provinceId: string, dispatch: Dispatch<SetStateAction<Regency[]>>) {
  const results = await fetchRegencyByProvinceId(provinceId)
  if (results.error) {
    // TODO: proper alert
    alert(results.error.message)
    return
  }

  if (results.success) {
    dispatch(results.success.data)
  }
}

export async function handleFindDistrictByRegencyId(regencyId: string, dispatch: Dispatch<SetStateAction<District[]>>) {
  const results = await fetchDistrictByRegencyId(regencyId)
  if (results.error) {
    // TODO: proper alert
    alert(results.error.message)
    return
  }

  if (results.success) {
    dispatch(results.success.data)
  }
}

export async function handleFindVillageByDistrictId(districtId: string, dispatch: Dispatch<SetStateAction<Village[]>>) {
  const results = await fetchVillageByDistrictId(districtId)
  if (results.error) {
    // TODO: proper alert
    alert(results.error.message)
    return
  }

  if (results.success) {
    dispatch(results.success.data)
  }
}
