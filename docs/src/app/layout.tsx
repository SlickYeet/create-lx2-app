import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import { Layout } from "nextra-theme-docs"
import { getPageMap } from "nextra/page-map"

import { navbar } from "@/components/navigation/navbar"

import "nextra-theme-docs/style.css"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "TNT-Powered | TypeScript, Next.js, Tailwind CSS Starter",
    template: "%s | TNT-Powered",
  },
  description:
    "Start building with the TNT stack today and experience the power of TypeScript, Next.js, and Tailwind CSS combined with todays most popular tools.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <Layout
          navbar={navbar}
          footer={<></>}
          sidebar={{ autoCollapse: true }}
          docsRepositoryBase="https://github.com/slickyeet/create-tnt-stack/tree/main/web"
          pageMap={await getPageMap()}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
