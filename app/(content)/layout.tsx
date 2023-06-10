"use client"

import { PropsWithChildren } from "react"

import useDataList from "@/hooks/useDataList"

export default function Layout({ children }: PropsWithChildren) {
  const { data } = useDataList("detail", "/api/orphanage")

  return (
    <div>
      <main>{children}</main>

      <section className="container relative h-[3rem] bg-emerald-700">
        <footer className="absolute inset-0 grid place-items-center">
          <p className="text-sm font-semibold text-emerald-50">
            &copy; Copyright {data?.name} 2023
          </p>
        </footer>
      </section>
    </div>
  )
}
