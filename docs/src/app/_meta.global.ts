import { FileCodeIcon, HomeIcon } from "lucide-react"
import { MetaRecord } from "nextra"

import { RenderTitle } from "@/components/navigation/render-title"

const meta: MetaRecord = {
  index: {
    type: "page",
    title: RenderTitle({
      label: "Home",
      icon: HomeIcon,
    }),
    display: "children",
  },
  docs: {
    type: "page",
    title: RenderTitle({ label: "Docs", icon: FileCodeIcon }),
    display: "children",
  },
}

export default meta
