import Link from "next/link"
import { getServerSession } from "next-auth"

import { siteConfig } from "@/config/site"
import { authOptions } from "@/lib/auth"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import LogoutButton from "./logout-button"

export async function SiteHeader() {
  const session = await getServerSession(authOptions)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav
          isAdmin={session ? true : false}
          items={session ? siteConfig.adminNav : siteConfig.mainNav}
        />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {!session && (
              <>
                <Link
                  href={siteConfig.links.instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}
                  >
                    <Icons.instagram className="h-5 w-5" />
                  </div>
                </Link>
              </>
            )}
            <ThemeToggle />
            {session ? (
              <LogoutButton />
            ) : (
              <Link href="/signin" className={buttonVariants()}>
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
