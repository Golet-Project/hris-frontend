import cn from "classnames"
import Image from "next/image"
import dynamic from "next/dynamic"

const StatisticChart = dynamic(() => import("./StatisticChart"), { ssr: false }) // use this import method to prevent hydration mismatches

export default function Page() {
  const data = [
    {
      name: "Jan",
      count: 1
    },
    {
      name: "Feb",
      count: 2
    },
    {
      name: "Mar",
      count: 1
    },
    {
      name: "Apr",
      count: 0
    },
    {
      name: "Mei",
      count: 5
    },
    {
      name: "Jun",
      count: 4
    },
    {
      name: "Jul",
      count: 2
    },
    {
      name: "Agu",
      count: 1
    },
    {
      name: "Sep",
      count: 3
    },
    {
      name: "Okt",
      count: 10
    },
    {
      name: "Nov",
      count: 1
    },
    {
      name: "Des",
      count: 1
    }
  ]
  return (
    <>
      <div className="mt-10 grid grid-cols-12 gap-4">
        <main className={cn("col-span-9", "bg-transparent")}>
          {/* Banner */}
          <div className={cn("py-4 px-6", "flex flex-row", "bg-primary", "text-white", "rounded-lg")}>
            <div className="grow">
              <h3 className="my-2 text-2xl font-semibold">Selamat Datang</h3>
              <h3 className="my-2 text-xl font-semibold">User</h3>

              <p className="mt-3 mb-5">Berikut pintasan agar pekerjaan kamu lebih cepat</p>

              <button className={cn("px-4 py-3", "bg-white", "text-primary", "rounded-lg", "mr-4")}>
                Tambah Perusahaan
              </button>
              <button className={cn("px-4 py-3", "border border-white", "bg-transparent", "text-white", "rounded-lg")}>
                Tambah Role
              </button>
            </div>

            <div className="overflow-hidden rounded-full mr-10">
              <Image src="/static/images/default-profile-picture.jpeg" alt="person" width={200} height={200} />
            </div>
          </div>

          {/*  Summary */}
          <section className="grid grid-cols-4 gap-4 mt-4">
            <div className={cn("p-4 bg-white", "col-span-1 rounded-lg")}>
              <p>User aktif</p>
              <h4>100.000</h4>
            </div>
            <div className={cn("p-4 bg-white", "col-span-1 rounded-lg")}>
              <p>User aktif</p>
              <h4>100.000</h4>
            </div>
            <div className={cn("p-4 bg-white", "col-span-1 rounded-lg")}>
              <p>User aktif</p>
              <h4>100.000</h4>
            </div>
            <div className={cn("p-4 bg-white", "col-span-1 rounded-lg")}>
              <p>User aktif</p>
              <h4>100.000</h4>
            </div>
          </section>

          {/* Statistics */}
          <section className="p-6 bg-white mt-4 rounded-lg">
            <h4 className="font-semibold mb-4">Statistik Perusahaan</h4>
            <div className="overflow-auto">
              <StatisticChart data={data} />
            </div>
          </section>
        </main>

        {/* Right Side */}
        <aside className="col-span-3 flex flex-col">
          <div className="mb2 p-4 bg-white rounded-lg">
            <h3 className="text-center text-lg font-medium mb-2">Riwayat</h3>
            <ul>
              <li className="p-2 mt-2 flex flex-row">
                <span className="overflow-hidden rounded-full">
                  <Image src="/static/images/default-profile-picture.jpeg" alt="photo" width={50} height={50} />
                </span>
                <div className="ml-4">
                  <h4 className="font-semibold text-base">PT. ABC</h4>
                  <p className="text-sm from-neutral-200">Lorem ipsum dolor sit amet.</p>
                </div>
              </li>
              <li className="p-2 mt-2 flex flex-row">
                <span className="overflow-hidden rounded-full">
                  <Image src="/static/images/default-profile-picture.jpeg" alt="photo" width={50} height={50} />
                </span>
                <div className="ml-4">
                  <h4 className="font-semibold text-base">PT. ABC</h4>
                  <p className="text-sm from-neutral-200">Lorem ipsum dolor sit amet.</p>
                </div>
              </li>
              <li className="p-2 mt-2 flex flex-row">
                <span className="overflow-hidden rounded-full">
                  <Image src="/static/images/default-profile-picture.jpeg" alt="photo" width={50} height={50} />
                </span>
                <div className="ml-4">
                  <h4 className="font-semibold text-base">PT. ABC</h4>
                  <p className="text-sm from-neutral-200">Lorem ipsum dolor sit amet.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="mt-2 p-4 bg-white rounded-lg grow">
            <h3 className="text-center text-lg font-medium mb-2">Riwayat</h3>
            <ul>
              <li className="p-2 mt-2 flex flex-row">
                <span className="overflow-hidden rounded-full">
                  <Image src="/static/images/default-profile-picture.jpeg" alt="photo" width={50} height={50} />
                </span>
                <div className="ml-4">
                  <h4 className="font-semibold text-base">PT. ABC</h4>
                  <p className="text-sm from-neutral-200">Lorem ipsum dolor sit amet.</p>
                </div>
              </li>
              <li className="p-2 mt-2 flex flex-row">
                <span className="overflow-hidden rounded-full">
                  <Image src="/static/images/default-profile-picture.jpeg" alt="photo" width={50} height={50} />
                </span>
                <div className="ml-4">
                  <h4 className="font-semibold text-base">PT. ABC</h4>
                  <p className="text-sm from-neutral-200">Lorem ipsum dolor sit amet.</p>
                </div>
              </li>
              <li className="p-2 mt-2 flex flex-row">
                <span className="overflow-hidden rounded-full">
                  <Image src="/static/images/default-profile-picture.jpeg" alt="photo" width={50} height={50} />
                </span>
                <div className="ml-4">
                  <h4 className="font-semibold text-base">PT. ABC</h4>
                  <p className="text-sm from-neutral-200">Lorem ipsum dolor sit amet.</p>
                </div>
              </li>
            </ul>
          </div>
        </aside>
      </div>
      {/* Bottom Table */}
      <div className="mt-6 w-100"></div>
    </>
  )
}
