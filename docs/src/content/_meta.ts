import { CodeIcon, SquareStackIcon } from "lucide-react"
import { MetaRecord } from "nextra"

import { RenderTitle } from "@/components/navigation/render-title"

const meta: MetaRecord = {
  "create-tnt-stack": {
    title: RenderTitle({ label: "Create TNT Stack", icon: SquareStackIcon }),
  },
  usage: {
    title: RenderTitle({ label: "Usage", icon: CodeIcon }),
  },
}

export default meta
