"use client"

import useDataList from "@/hooks/useDataList"

export default function Footer() {
  const { data } = useDataList("detail", "/api/orphanage")

  return (
    <section className="container relative h-[3rem] bg-emerald-700">
      <footer className="absolute inset-0 grid place-items-center">
        <p className="text-sm font-semibold text-emerald-50">
          &copy; Copyright {data?.name} 2023
        </p>
      </footer>
    </section>
  )
}
