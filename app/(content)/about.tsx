"use client"

import Image from "next/image"

import useDataList from "@/hooks/useDataList"

export default function About() {
  const { data } = useDataList("detail", "/api/orphanage")

  return (
    <>
      <section className="container grid pb-8 pt-6 md:py-20" id="about-us">
        <h1 className="mb-10 text-center text-3xl font-bold md:text-left">
          Tentang Kami
        </h1>
        <div className="mb-10 flex flex-wrap items-center justify-evenly gap-4">
          <Image
            src="/test.jpg"
            alt="about"
            width={400}
            height={300}
            className="object-contain"
          />
          <p className="max-w-md">{data?.description}</p>
        </div>
        <div className="mx-auto flex max-w-7xl justify-between gap-4">
          <div>
            <h2 className="mb-2 text-3xl font-bold">VISI</h2>
            <p>{data?.visi}</p>
          </div>
          <div>
            <h2 className="mb-2 text-3xl font-bold">MISI</h2>
            <p>{data?.misi}</p>
          </div>
        </div>
      </section>

      <section className="container grid h-96 bg-emerald-800 pb-8 pt-6 text-emerald-50 md:py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4">
          <div>
            <h2 className="mb-2 text-3xl font-bold">Alamat</h2>
            <p>{data?.address}</p>
          </div>
          <div className=""></div>
        </div>
      </section>
    </>
  )
}
