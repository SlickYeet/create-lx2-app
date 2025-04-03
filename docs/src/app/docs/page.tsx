import { redirect } from "next/navigation"

import { RELATIVE_INITIAL_DOCS_PATH } from "@/constants"

export default function DocsPage() {
  /**
   * ! This is a temporary solution until I build a proper landing page for the docs
   * Redirects to the initial docs page (/docs/introduction)
   */
  return redirect(RELATIVE_INITIAL_DOCS_PATH)
}
