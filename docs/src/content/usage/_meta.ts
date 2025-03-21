import { BookUp2Icon, BoxesIcon, FrameIcon } from "lucide-react"
import { MetaRecord } from "nextra"

import { RenderTitle } from "@/components/navigation/render-title"

const meta: MetaRecord = {
  "first-steps": {
    title: RenderTitle({ label: "First Steps", icon: BookUp2Icon }),
  },
  nextjs: {
    title: RenderTitle({ label: "Next.js", icon: FrameIcon }),
  },
  payloadcms: {
    title: RenderTitle({ label: "Payload CMS", icon: BoxesIcon }),
  },
}

export default meta
