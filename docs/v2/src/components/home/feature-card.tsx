import { motion } from "motion/react"

import { FeatureType } from "@/lib/config"
import { cn } from "@/lib/utils"

const cardVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
    },
  },
}

export function FeatureCard(props: FeatureType) {
  const { title, description, icon: Icon, color } = props

  const colorMap: Record<typeof color, string> = {
    blue: "from-blue-500 to-blue-600 bg-blue-100 text-blue-600",
    purple: "from-purple-500 to-purple-600 bg-purple-100 text-purple-600",
    pink: "from-pink-500 to-pink-600 bg-pink-100 text-pink-600",
    amber: "from-amber-500 to-amber-600 bg-amber-100 text-amber-600",
    emerald: "from-emerald-500 to-emerald-600 bg-emerald-100 text-emerald-600",
    red: "from-red-500 to-red-600 bg-red-100 text-red-600",
  }

  const gradientColor = colorMap[color]?.split(" ")[0] || "from-primary"
  const iconBgColor = colorMap[color]?.split(" ")[2] || "bg-primary/10"
  const iconColor = colorMap[color]?.split(" ")[3] || "text-primary"

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5 }}
      whileFocus={{ y: -5 }}
      whileTap={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group bg-background relative rounded-lg border p-6 transition-shadow outline-none focus-within:shadow-lg hover:shadow-lg"
    >
      <div
        className={cn(
          "absolute inset-0 rounded-lg bg-linear-to-br to-transparent opacity-0 transition-opacity group-focus-within:opacity-10 group-hover:opacity-10 dark:group-focus-within:opacity-5 dark:group-hover:opacity-5",
          gradientColor,
        )}
      />
      <div
        className={cn(
          "mb-4 flex size-12 items-center justify-center rounded-lg",
          iconBgColor,
          iconColor,
        )}
      >
        <Icon className="size-6" />
      </div>

      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  )
}
