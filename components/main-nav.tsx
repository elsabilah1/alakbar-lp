"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import axios from "axios"
import useSwr from "swr"

import { NavItem } from "@/types/nav"
import { cn } from "@/lib/utils"

interface MainNavProps {
  isAdmin: boolean
  items?: NavItem[]
}

export function MainNav({ isAdmin, items }: MainNavProps) {
  const path = usePathname()
  const userPath = path === "/" || path.includes("/activities" || "#about")

  async function getData() {
    const { data } = await axios.get("/api/orphanage")
    return data.data
  }

  const { data } = useSwr("orphanage", getData)

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        {data && (
          <>
            <Image
              src={data.logoUrl}
              alt="logo"
              width={24}
              height={24}
              className="object-contain"
            />
            <span className="inline-block font-bold">{data.name}</span>
          </>
        )}
      </Link>
      <span className="text-muted-foreground">|</span>
      {isAdmin && !userPath ? null : items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium",
                    item.disabled && "cursor-not-allowed opacity-80",
                    !path.includes(item.href) && "text-muted-foreground"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  )
}
