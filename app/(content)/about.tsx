"use client"

import Image from "next/image"
import Link from "next/link"

import useDataList from "@/hooks/useDataList"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export default function About() {
  const { data, loading } = useDataList("detail", "/api/orphanage")

  if (loading)
    return (
      <div className="container grid h-96 place-items-center">
        <Icons.loader className="h-8 w-8 animate-spin" />
      </div>
    )

  return (
    <>
      <section className="container grid pb-8 pt-6 md:py-20" id="about-us">
        <h1 className="mb-10 text-center text-3xl font-bold md:text-left">
          Tentang Kami
        </h1>
        <div className="mb-10 flex flex-wrap items-center justify-evenly gap-4">
          {data && (
            <div className="relative h-[18rem] w-full md:w-[28rem]">
              <Image
                src={data.images.about.url}
                alt="about"
                className="object-cover"
                fill
              />
            </div>
          )}
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

      <section className="min-h-96 container grid bg-emerald-800 pb-8 pt-6 text-emerald-50 md:py-10">
        <div className="mx-auto grid gap-4 md:grid-cols-2">
          <div>
            <h2 className="mb-10 text-3xl font-bold">Informasi Kontak</h2>
            <div className="space-y-6">
              <div className="flex md:gap-4">
                <Icons.home className="hidden w-4 md:inline" /> {data?.address}
              </div>
              <div className="flex gap-4">
                <Icons.mail className="w-4" /> {data?.links.socials.email}
              </div>
              <div className="flex gap-4">
                <Icons.phone className="w-4" /> {data?.phoneNumber}
              </div>
              <div className="flex justify-end gap-4">
                <div className="flex gap-1">
                  <Link
                    href={data?.links?.socials?.instagram ?? "/"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div
                      className={buttonVariants({
                        size: "sm",
                        variant: "ghost",
                      })}
                    >
                      <Icons.instagram />
                    </div>
                  </Link>

                  <Link
                    href={data?.links.socials?.facebook ?? "/"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div
                      className={buttonVariants({
                        size: "sm",
                        variant: "ghost",
                      })}
                    >
                      <Icons.facebook />
                    </div>
                  </Link>
                </div>
                <Link
                  target="_blank"
                  href={data?.links?.donation ?? "/"}
                  className={buttonVariants({
                    size: "sm",
                    variant: "secondary",
                  })}
                >
                  <span className="font-bold">MULAI DONASI</span>{" "}
                  <Icons.arrowRight className="ml-3 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
          <div className="grid place-items-center">
            {data && (
              <div className="relative h-[11rem] w-full md:h-[18rem] md:w-[28rem]">
                <Image
                  src={data.images.footer.url}
                  alt="footer"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
