import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"
import { nextJsConfig } from "@repo/eslint-config/next-js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

/** @type {import("eslint").Linter.Config} */
const eslintConfig = [
  nextJsConfig,
  ...compat.extends("next/core-web-vitals", "next/typescript"),
]

export default eslintConfig
