import gradient from "gradient-string"

import { TITLE_TEXT } from "@/constants.js"
import { getUserPkgManager } from "@/utils/get-user-pkg-manager.js"

// Colors brought in from vscode poimandres theme
const poimandresTheme = {
  magenta: "#765bc8",
  pink: "#a48897",
  yellow: "#c7b561",
  green: "#8bb8a0",
  blue: "#4b97d5",
  cyan: "#22b6d2",
}

export function renderTitle() {
  const tntGradient = gradient(Object.values(poimandresTheme))

  // Resolves weird behavior where the ascii is offset
  const pkgManager = getUserPkgManager()
  if (pkgManager === "yarn" || pkgManager === "pnpm") {
    console.log("")
  }
  console.log(tntGradient.multiline(TITLE_TEXT))
}
