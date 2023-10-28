import FormProvider from "./FormProvider"
import AddRole from "./AddRole"
import { findAccessMenu } from "../_services/findAccessMenu"
import { FeatureItem, FeatureAccessMenuProvider, AccessMenuList, ChooseAll } from "./FeatureAccessMenu"
import { useMemo } from "react"

type FeatureAccessMenu = {
  id: string
  name: string
  accessMenu: {
    id: string
    name: string
  }[]
}

export default function Page() {
  const response = findAccessMenu()

  let featureAccessMenu: FeatureAccessMenu[] = []
  if (!response.error) {
    featureAccessMenu = response.success?.data ?? []
  }

  const allAccessMenuId = useMemo<string[]>(() => {
    const accessMenuIdList: string[] = []

    featureAccessMenu.forEach((feature) => {
      feature.accessMenu.forEach((accessMenu) => {
        accessMenuIdList.push(accessMenu.id)
      })
    })
    return accessMenuIdList
  }, featureAccessMenu)

  return (
    <>
      <div className="grid grid-cols-12 mt-4 gap-2">
        <FormProvider>
          {/* add form */}
          <div className="col-span-3 p-4 bg-white rounded-md h-fit">
            <h3 className="text-primary font-semibold">Isi Data Role</h3>

            <AddRole />
          </div>

          {/* access menu catalog */}
          <div className="col-span-9 border border-red-400 border-opacity-10">
            <div className="py-2 px-3 bg-white">
              <h3 className="font-semibold text-primary">Pilih Fitur</h3>
            </div>

            <div className="p-4 h-screen">
              <ChooseAll allAccessMenuId={allAccessMenuId} />

              <FeatureAccessMenuProvider features={featureAccessMenu}>
                {/* Access menu catalog */}
                <div className="col-span-2 p-2 bg-white h-full">
                  <ul>
                    {featureAccessMenu.map((feature) => {
                      return <FeatureItem key={feature.id} id={feature.id} name={feature.name} />
                    })}
                  </ul>
                </div>

                <div className="col-span-6 p-6 bg-white h-full">
                  <ul className="space-y-2">
                    <AccessMenuList />
                  </ul>
                </div>
              </FeatureAccessMenuProvider>
            </div>
          </div>
        </FormProvider>
      </div>
    </>
  )
}
