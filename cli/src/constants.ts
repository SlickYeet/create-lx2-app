import path from "path"
import { fileURLToPath } from "url"

import type { AvailablePackages } from "@/installers/index.js"

// Path is in relation to a single index.js file inside ./dist
const __filename = fileURLToPath(import.meta.url)
const distPath = path.dirname(__filename)
export const PKG_ROOT = path.join(distPath, "../")

export const TITLE_TEXT = `   ___ ___ ___   _ _____ ___   _         ___     _   ___ ___ 
  / __| _ \\ __| /_\\_   _| __| | |  __ __|_  )   /_\\ | _ \\ _ \\
 | (__|   / _| / _ \\| | | _|  | |__\\ \\ / / /   / _ \\|  _/  _/
  \\___|_|_\\___/_/ \\_\\_| |___| |____/_\\_\\/___| /_/ \\_\\_| |_|  
                                                             `

export const DEFAULT_APP_NAME = "my-lx2-app"
export const CREATE_LX2_APP = "create-lx2-app"

type PackageCompatibility = {
  packages: AvailablePackages[]
  message?: string
}

export const compatibilityMatrix: PackageCompatibility[] = [
  {
    packages: ["payload"],
    message: "Our Payload CMS integration does not yet support other packages.",
  },
  {
    packages: ["trpc", "payload"],
  },
]
