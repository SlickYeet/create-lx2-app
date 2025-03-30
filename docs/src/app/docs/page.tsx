import { redirect } from "next/navigation"

import { RELATIVE_INITIAL_DOCS_PATH } from "@/constants"

export default function DocsPage() {
  return redirect(RELATIVE_INITIAL_DOCS_PATH)
}
