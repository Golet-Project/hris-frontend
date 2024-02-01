"use client"

import { Dispatch } from "react"
import { fetchRegencyByProvinceId } from "@/app/employee/add/_repo/client/api/fetchRegencyByProvinceId"
import { fetchDistrictByRegencyId } from "@/app/employee/add/_repo/client/api/fetchDistrictByRegencyId"
import { fetchVillageByDistrictId } from "@/app/employee/add/_repo/client/api/fetchVillageByDistrictId"
import { RegionDto } from "../../_dto/region"
import { District, Province, Regency, Village } from "@/entities"

export enum RegionReducerActionType {
  PROVINCE,
  REGENCY,
  DISTRICT,
  VILLAGE
}

export type RegionReducerAction<T = Province | Regency | District | Village> = {
  type: RegionReducerActionType
  payload: T[]
}

export function regionReducer(state: RegionDto, action: RegionReducerAction): RegionDto {
  switch (action.type) {
    case RegionReducerActionType.REGENCY:
      const regencies = action.payload as Regency[]
      return {
        ...state,
        regencies: regencies,
        districts: [],
        villages: []
      }

    case RegionReducerActionType.DISTRICT:
      const districts = action.payload as District[]
      return {
        ...state,
        districts: districts,
        villages: []
      }

    case RegionReducerActionType.VILLAGE:
      const villages = action.payload as Village[]
      return {
        ...state,
        villages: villages
      }

    default:
      throw Error("invalid action type")
  }
}

export type RegionReducer = {
  state: RegionDto
  dispatch: Dispatch<RegionReducerAction>
}

export async function handleFindRegencyByProvinceId(
  provinceId: string,
  dispatch: Dispatch<RegionReducerAction<Regency>>
) {
  const results = await fetchRegencyByProvinceId(provinceId)
  if (results.error) {
    // TODO: proper alert
    alert(results.error.message)
    return
  }

  if (results.success) {
    dispatch({
      type: RegionReducerActionType.REGENCY,
      payload: results.success.data
    })
  }
}

export async function handleFindDistrictByRegencyId(
  regencyId: string,
  dispatch: Dispatch<RegionReducerAction<District>>
) {
  const results = await fetchDistrictByRegencyId(regencyId)
  if (results.error) {
    // TODO: proper alert
    alert(results.error.message)
    return
  }

  if (results.success) {
    dispatch({
      type: RegionReducerActionType.DISTRICT,
      payload: results.success.data
    })
  }
}

export async function handleFindVillageByDistrictId(
  districtId: string,
  dispatch: Dispatch<RegionReducerAction<Village>>
) {
  const results = await fetchVillageByDistrictId(districtId)
  if (results.error) {
    // TODO: proper alert
    alert(results.error.message)
    return
  }

  if (results.success) {
    dispatch({
      type: RegionReducerActionType.VILLAGE,
      payload: results.success.data
    })
  }
}
