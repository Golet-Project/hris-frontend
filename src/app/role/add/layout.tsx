import Link from "next/link"
import { HiChevronRight } from "react-icons/hi"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* breadcrumb */}
      <div className="flex flex-row items-center gap-1">
        <Link href="/role" className="text-primary">
          Manajemen Role
        </Link>

        <HiChevronRight />

        <p className="text-slate-500">Tambah Role</p>
      </div>

      {children}
    </>
  )
}
