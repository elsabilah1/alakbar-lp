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
      icon: <Icons.dashboard />,
    },
    {
      href: "/anak-asuh",
      icon: <Icons.child />,
    },
    {
      href: "/kegiatan",
      icon: <Icons.activity />,
    },
    {
      href: "/donasi",
      icon: <Icons.donation />,
    },
  ]
  return (
    <div className="fixed pr-1 py-4 border-r min-h-screen">
      <div className="grid gap-4 ">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={buttonVariants({
              variant: path === item.href ? "secondary" : "ghost",
              size: "sm",
            })}
          >
            {item.icon}
          </Link>
        ))}
      </div>
    </div>
  )
}
