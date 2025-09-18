import { CTA } from "@/components/home/cta"
import { Features } from "@/components/home/features"
import { Hero } from "@/components/home/hero"
import { Usage } from "@/components/home/usage"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { getNpmVersion, getVersionConfig } from "@/lib/utils"

export default async function HomePage() {
  const versionConfig = await getVersionConfig()
  const npmVersion = await getNpmVersion(versionConfig.version)

  return (
    <>
      <Header />
      <div className="flex min-h-screen flex-col">
        <Hero npmVersion={npmVersion} versionConfig={versionConfig} />
        <Features />
        <Usage />
        <CTA />
      </div>
      <Footer />
    </>
  )
}
