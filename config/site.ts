export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Al Akbar",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "🏠",
      href: "/",
    },
    {
      title: "Tentang Kami",
      href: "/#about-us",
    },
    {
      title: "Kegiatan",
      href: "/activities",
    },
  ],
  adminNav: [
    {
      title: "🏠",
      href: "/dashboard",
    },
    {
      title: "Tentang Kami",
      href: "/#about-us",
    },
    {
      title: "Kegiatan",
      href: "/activities",
    },
  ],
  links: {
    instagram: "https://www.instagram.com/pantiasuhan_alakbar",
  },
}
