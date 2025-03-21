import { CTA } from "@/components/home/cta"
import { Features } from "@/components/home/features"
import { Hero } from "@/components/home/hero"
import { Usage } from "@/components/home/usage"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Hero />
      <Features />
      <Usage />
      <CTA />
    </div>
  )
}
