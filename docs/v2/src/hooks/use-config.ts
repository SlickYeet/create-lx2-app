import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"

export type PackageManager = "npm" | "pnpm" | "yarn" | "bun"

type Config = {
  packageManager: PackageManager
}

const configAtom = atomWithStorage<Config>("config", {
  packageManager: "pnpm",
})

export function useConfig() {
  return useAtom(configAtom)
}
