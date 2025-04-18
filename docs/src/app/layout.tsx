import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { ThemeProvider, WrapLinesProvider } from "@/components/provider"
import { SITE_CONFIG } from "@/constants"
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
  ...SITE_CONFIG,
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
