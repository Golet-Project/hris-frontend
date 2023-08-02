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

          <Image src="/static/images/google.svg" alt="person" width={150} height={100} />
        </div>

        {/*  Summary */}
        <section className="grid grid-cols-4 gap-4 mt-4">
          <div className={cn("p-4 bg-white", "col-span-1 rounded-lg")}>
            <p>User aktif</p>
            <h1 className="text-xl font-bold">100.000</h1>
          </div>
          <div className={cn("p-4 bg-white", "col-span-1 rounded-lg")}>
            <p>User aktif</p>
            <h1 className="text-xl font-semibold">100.000</h1>
          </div>
          <div className={cn("p-4 bg-white", "col-span-1 rounded-lg")}>
            <p>User aktif</p>
            <h1 className="text-xl font-semibold">100.000</h1>
          </div>
          <div className={cn("p-4 bg-white", "col-span-1 rounded-lg")}>
            <p>User aktif</p>
            <h1 className="text-xl font-semibold">100.000</h1>
          </div>
        </section>

        {/* Statistics */}
        <section className="p-6 bg-white mt-4 rounded-lg">
          <h1 className="text-xl font-semibold mb-4">Statistik Perusahaan</h1>
          <div className="overflow-auto">
            <StatisticChart data={data} />
          </div>
        </section>
      </main>
      <aside className={cn("col-span-3", "bg-white")}>Aside</aside>
    </div>
  )
}
