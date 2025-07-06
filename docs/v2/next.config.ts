import { createMDX } from "fumadocs-mdx/next"
import type { NextConfig } from "next"

import "./src/env"

const nextConfig: NextConfig = {
  /* config options here */
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
