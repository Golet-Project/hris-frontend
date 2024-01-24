export type Province = {
  id: string
  name: string
}

export type Regency = {
  id: string
  province_id: string
  name: string
}

export type District = {
  id: string
  regency_id: string
  name: string
}

export type Village = {
  id: string
  regency_id: string
  name: string
}
