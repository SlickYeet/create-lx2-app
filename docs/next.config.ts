import type { NextConfig } from "next"
import nextra from "nextra"

const nextConfig: NextConfig = {
  // ... Other Next.js config options
}

const withNextra = nextra({
  contentDirBasePath: "/docs",
})

export default withNextra(nextConfig)
