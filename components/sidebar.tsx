"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Icons } from "./icons"
import { buttonVariants } from "./ui/button"

export default function Sidebar() {
  const path = usePathname()

  const menu = [
    {
      href: "/dashboard",
      title: "Dashboard",
      icon: <Icons.dashboard />,
    },
    {
      href: "/anak-asuh",
      title: "Anak Asuh",
      icon: <Icons.child />,
    },
    {
      href: "/kegiatan",
      title: "Kegiatan",
      icon: <Icons.activity />,
    },
    {
      href: "/donasi",
      title: "Donasi",
      icon: <Icons.donation />,
    },
  ]
  return (
    <div className="fixed min-h-screen border-r py-4 pr-2">
      <div className="grid gap-4 ">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={buttonVariants({
              variant: path === item.href ? "default" : "ghost",
              size: "sm",
              className: "space-x-2",
            })}
            style={{ justifyContent: "left" }}
          >
            {item.icon} <span className="hidden lg:block">{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
