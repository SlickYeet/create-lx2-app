import path from "path"
import fs from "fs-extra"

import { PKG_ROOT } from "@/constants.js"
import type { Installer } from "@/installers/index.js"

// TODO: Install Next.js with this installer instead of hardcoding it
export const nextjsInstaller: Installer = ({ projectDir, packages }) => {
  const usingPayload = packages?.payload.inUse

  const nextConfigSrc = path.join(
    PKG_ROOT,
    "template/packages/config/next",
    `${usingPayload ? "with-payload" : "base"}.ts`
  )
  const nextConfigDest = path.join(projectDir, "next.config.ts")

  fs.copyFileSync(nextConfigSrc, nextConfigDest)
}
