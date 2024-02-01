import { District, Province, Regency, Village } from "@/entities"

export type RegionDto = {
  provinces: Province[]
  regencies: Regency[]
  districts: District[]
  villages: Village[]
}
