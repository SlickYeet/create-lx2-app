import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { LegacyBanner } from "@/components/legacy-banner"
import { ThemeProvider, WrapLinesProvider } from "@/components/provider"
import { SITE_DESCRIPTION, SITE_IMAGE, SITE_TITLE } from "@/constants"
import { getMdxDocuments } from "@/lib/mdx"

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
    default: SITE_TITLE,
    template: `%s | ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    siteName: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    url: "https://create.tntstack.org",
    images: [
      {
        url: SITE_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: "create.tntstack.org",
    creator: "@slickyeet",
    images: [SITE_IMAGE],
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const docs = await getMdxDocuments()

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <WrapLinesProvider>
            <div className="flex min-h-screen flex-col">
              <LegacyBanner />
              <Header docs={docs} />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </WrapLinesProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
