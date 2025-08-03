import gradient from "gradient-string"

import { TITLE_TEXT } from "@/constants.js"
import { getUserPkgManager } from "@/utils/get-user-pkg-manager.js"

// Colors brought in from vscode poimandres theme
const poimandresTheme = {
  primary: "#bf95f9",
  accent: "#6071a4",
  secondary: "#ff7ac5",
}

export function renderTitle() {
  const lx2Gradient = gradient(Object.values(poimandresTheme))

  // Resolves weird behavior where the ascii is offset
  const pkgManager = getUserPkgManager()
  if (pkgManager === "yarn" || pkgManager === "pnpm") {
    console.log("")
  }
  console.log(lx2Gradient.multiline(TITLE_TEXT))
}
