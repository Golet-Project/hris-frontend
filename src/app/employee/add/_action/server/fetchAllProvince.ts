"use server"

import { Province } from "@/entities"
import { HttpResponse } from "@/lib/http"
import findAllProvince from "../../_repo/server/api/findAllProvince"

type FindAllProvincesResponse = Province[]

type FindAllProvincesOut = HttpResponse<FindAllProvincesResponse>
export async function fetchAllProvince(): Promise<FindAllProvincesOut> {
  try {
    const response = await findAllProvince()
    return response
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    throw error
  }
}
