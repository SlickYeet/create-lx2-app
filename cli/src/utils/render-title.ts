import gradient from "gradient-string"

import { TITLE_TEXT } from "@/constants.js"
import { getUserPkgManager } from "@/utils/get-user-pkg-manager.js"

// Colors brought in from vscode poimandres theme
const poimandresTheme = {
  blue: "#add7ff",
  cyan: "#89ddff",
  green: "#5de4c7",
  magenta: "#fae4fc",
  red: "#d0679d",
  yellow: "#fffac2",
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
