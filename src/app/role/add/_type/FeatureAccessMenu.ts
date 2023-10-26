export type AccessMenu = {
  id: string
  name: string
}

export type Feature = {
  id: string
  name: string
  accessMenu: AccessMenu[]
}
