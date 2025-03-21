import { MetaRecord } from "nextra"

import { RenderTitle } from "@/components/navigation/render-title"

const meta: MetaRecord = {
  introduction: {
    title: RenderTitle({ label: "Introduction" }),
  },
  why: {
    title: RenderTitle({ label: "Why?" }),
  },
  "getting-started": {
    title: RenderTitle({ label: "Getting Started" }),
  },
}

export default meta
