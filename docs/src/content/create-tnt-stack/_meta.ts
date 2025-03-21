import {
  LightbulbIcon,
  MessageCircleQuestionIcon,
  RocketIcon,
} from "lucide-react"
import { MetaRecord } from "nextra"

import { RenderTitle } from "@/components/navigation/render-title"

const meta: MetaRecord = {
  introduction: {
    title: RenderTitle({ label: "Introduction", icon: LightbulbIcon }),
  },
  why: {
    title: RenderTitle({ label: "Why?", icon: MessageCircleQuestionIcon }),
  },
  "getting-started": {
    title: RenderTitle({ label: "Getting Started", icon: RocketIcon }),
  },
}

export default meta
