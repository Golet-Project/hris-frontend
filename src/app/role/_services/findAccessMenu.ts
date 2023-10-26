import { HttpResponse } from "@/lib/http"

// TODO: API Integration

type AccessMenuDTO = {
  id: string
  name: string
}

type FeatureDTO = {
  id: string
  name: string
  accessMenu: AccessMenuDTO[]
}

export type FindAccessMenuResponse = FeatureDTO[]
type FindAccessMenuOut = HttpResponse<FindAccessMenuResponse>

export function findAccessMenu(): FindAccessMenuOut {
  const data: FindAccessMenuResponse = [
    {
      id: "1",
      name: "Profile",
      accessMenu: [
        {
          id: "1.1",
          name: "Tambah data akun"
        },
        {
          id: "1.2",
          name: "Ubah data akun"
        },
        {
          id: "1.3",
          name: "Lihat data akun"
        },
        {
          id: "1.4",
          name: "Hapus akun"
        }
      ]
    },
    {
      id: "2",
      name: "Finance",
      accessMenu: [
        {
          id: "2.1",
          name: "Lihat gaji"
        },
        {
          id: "2.2",
          name: "Ubah gaji"
        },
        {
          id: "2.3",
          name: "Input keuangan"
        }
      ]
    },
    {
      id: "3",
      name: "Lorem",
      accessMenu: [
        {
          id: "3.1",
          name: "Enim adipisicing aliqua amet Lorem magna. Elit tempor elit consequat eiusmod ipsum laboris dolor pariatur occaecat voluptate tempor pariatur. Id nulla et veniam enim adipisicing aute. Irure elit et do irure duis esse exercitation elit enim mollit excepteur incididunt. Aute culpa excepteur enim fugiat reprehenderit ea in velit magna aute labore minim eiusmod ut. Sit aliqua cupidatat ex ex sint adipisicing aliqua deserunt ex ipsum."
        },
        {
          id: "3.2",
          name: "Sit incididunt amet enim minim fugiat aliqua."
        },
        {
          id: "3.3",
          name: "Cillum aliquip exercitation in deserunt labore."
        },
        {
          id: "3.4",
          name: "Proident laboris exercitation officia cillum occaecat duis ex qui. Labore reprehenderit officia amet irure in consectetur eiusmod esse voluptate magna dolor nostrud aute sit. Lorem ea non minim mollit magna aliqua est. Velit ex deserunt consequat elit commodo cupidatat fugiat labore. Enim reprehenderit deserunt magna proident consectetur qui. Est consectetur occaecat enim irure culpa ex ullamco."
        },
        {
          id: "3.5",
          name: "Cupidatat deserunt Lorem ea officia non ex voluptate."
        }
      ]
    }
  ]

  try {
    return {
      success: {
        message: "success",
        data: data
      }
    }
  } catch (error) {
    // TODO: Proper error
    // eslint-disable-next-line no-console
    console.log("error", error)
    throw error
  }
}
