"use client"

import cn from "classnames"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { usePathname } from "next/navigation"

import { BiHomeAlt, BiLockAlt } from "react-icons/bi"
import { FiUserPlus } from "react-icons/fi"
import { BiSearch } from "react-icons/bi"
import { FaUserTie } from "react-icons/fa6"
import { RxDoubleArrowLeft } from "react-icons/rx"
import { Input } from "@/components/ui/input"

const menuIconClassName = {
  collapse: ["block", "mx-auto", "mb-1"],
  expand: ["mr-2", "inline"]
}

type SidebarProps = {
  isCollapse: boolean
}

function Sidebar({ isCollapse }: SidebarProps) {
  const currentPathName = usePathname()

  //=== Sidebar Menu List ===
  const sidebarMenuList = [
    {
      icon: (
        <BiHomeAlt
          className={cn("text-lg lg:text-xl", isCollapse ? menuIconClassName.collapse : menuIconClassName.expand)}
        />
      ),
      pathName: "/",
      activePattern: /^\/$/i,
      title: "Beranda"
    },
    {
      icon: (
        <FaUserTie
          className={cn("text-lg lg:text-xl", isCollapse ? menuIconClassName.collapse : menuIconClassName.expand)}
        />
      ),
      pathName: "/employee",
      activePattern: /^\/employee\/?.*/i,
      title: "Karyawan"
    },
    {
      icon: (
        <BiLockAlt
          className={cn("text-lg lg:text-xl", isCollapse ? menuIconClassName.collapse : menuIconClassName.expand)}
        />
      ),
      pathName: "/role",
      activePattern: /^\/role\/?.*/i,
      title: "Role"
    },
    {
      icon: (
        <FiUserPlus
          className={cn("text-lg lg:text-xl", isCollapse ? menuIconClassName.collapse : menuIconClassName.expand)}
        />
      ),
      pathName: "/user",
      activePattern: /^\/user\/?.*/i,
      title: "User"
    }
  ]

  return (
    <aside
      className={cn(
        "p-4 bg-white h-full m-0", // decorating
        "absolute", // positioning
        "transition-all duration-300 ease-in-out", // animate
        {
          // collapse
          "-left-[280px] lg:left-0 lg:w-[80px]": isCollapse,

          // expand
          "left-0 w-[280px]": !isCollapse
        }
      )}>
      {/* Logo wrapper */}
      <div className="p-1 justify-center flex">
        <Image
          src="/static/images/Logo.svg"
          alt="Logo"
          loading="lazy"
          width={30}
          height={10}
          className="
              inline"></Image>
        <h1
          className={cn(
            "inline",
            "text-2xl xl:text-4xl",
            "font-semibold",
            "my-auto",
            "ml-4",

            // collapse
            {
              hidden: isCollapse
            }
          )}>
          HROOST
        </h1>
      </div>

      {/* Sidebar Item */}
      <div className={cn("mt-6")}>
        {/* Sidebar Menu List */}
        <ul>
          {sidebarMenuList.map((menu, index) => {
            const isActive = menu.activePattern.test(currentPathName ?? "")

            return (
              <li
                key={index}
                className={cn(
                  "py-2 my-2 rounded-lg", // decorating
                  {
                    "text-white bg-primary": isActive
                  },
                  "hover:text-white hover:bg-primary hover:opacity-80 hover:cursor-pointer",
                  {
                    // collapse
                    "px-2 text-[9px] text-center": isCollapse,

                    // expand
                    "px-5": !isCollapse
                  }
                )}>
                <Link className={!isCollapse ? "flex items-center" : ""} href={menu.pathName ? menu.pathName : "#"}>
                  {menu.icon}
                  <span>{menu.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}

function TopBar() {
  return (
    <nav className="py-3 px-5 bg-white rounded-lg">
      <span className="flex flex-row items-center bg-slate-100 w-[300px] rounded-lg px-3 py-2">
        <BiSearch className="text-lg lg:text-xl" />

        <Input placeholder="search" className="border-none shadow-none text-lg focus-visible:ring-0" />
      </span>
    </nav>
  )
}

type ProviderProps = {
  children?: React.ReactNode
  isAuthenticated: boolean
}

export default function LayoutProvider({ children, isAuthenticated }: ProviderProps) {
  //== State ===
  const [isCollapse, setIsCollapse] = useState(false)

  return (() => {
    if (isAuthenticated) {
      return (
        <div className={cn("2xl:max-w-[1900px]", "m-auto", "min-h-screen", "relative")}>
          <Sidebar isCollapse={isCollapse} />
          <main
            className={cn("p-4", "transition-all duration-300 ease-in-out relative", {
              // collapse
              "ml-0 lg:ml-[80px]": isCollapse,

              // expand
              "ml-[280px]": !isCollapse
            })}>
            {/* Collapse Button */}
            <span
              className={cn(
                "p-2 text-2xl font-semibold border border-white bg-white rounded-full cursor-pointer", // decorating
                "hover:bg-primary hover:opacity-80 hover:text-white", // decorating
                "block absolute top-9 -left-5", // positioning
                {
                  "rotate-180 -left-2 lg:-left-5": isCollapse
                }
              )}
              onClick={() => setIsCollapse(!isCollapse)}>
              <RxDoubleArrowLeft />
            </span>
            {/* Top Bar */}
            <TopBar />
            {children}
          </main>
        </div>
      )
    } else {
      return <>{children}</>
    }
  })()
}
