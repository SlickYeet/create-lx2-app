import path from "path"
import { fileURLToPath } from "url"

// Path is in relation to a single index.js file inside ./dist
const __filename = fileURLToPath(import.meta.url)
const distPath = path.dirname(__filename)
export const PKG_ROOT = path.join(distPath, "../")

export const TITLE_TEXT = `   ___ ___ ___   _ _____ ___   _____ _  _ _____   ___ _____ _   ___ _  __
  / __| _ \\ __| /_\\_   _| __| |_   _| \\| |_   _| / __|_   _/_\\ / __| |/ /
 | (__|   / _| / _ \\| | | _|    | | | .\` | | |   \\__ \\ | |/ _ \\ (__| ' <
  \\___|_|_\\___/_/ \\_\\_| |___|   |_| |_|\\_| |_|   |___/ |_/_/ \\_\\___|_|\\_\\
`

export const DEFAULT_APP_NAME = "my-tnt-stack"
export const CREATE_TNT_STACK = "create-tnt-stack"
