/**
 * @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions &
 *        import("@ianvs/prettier-plugin-sort-imports").PluginConfig}
 */
const config = {
  arrowParens: "always",
  printWidth: 80,
  singleQuote: false,
  jsxSingleQuote: false,
  semi: false,
  trailingComma: "all",
  tabWidth: 2,
  proseWrap: "always",
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss", // This MUST come last
  ],
  importOrder: ["<THIRD_PARTY_MODULES>", "", "^@/", "", "^[.][.]/", "^[.]/"],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.0.0",
}

export default config
