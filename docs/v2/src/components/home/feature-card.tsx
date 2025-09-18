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
      tabIndex={0}
      className={cn(
        "group bg-background @container relative h-48 cursor-default rounded-lg border p-6 transition-shadow outline-none",
        "[--feature-icon-spacing:calc(var(--spacing)*12)]",
        "hover:shadow-lg",
        "focus-within:shadow-lg",
      )}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-lg bg-linear-to-br to-transparent opacity-0 transition-opacity",
          "group-focus-within:opacity-10 group-hover:opacity-10 dark:group-focus-within:opacity-5 dark:group-hover:opacity-5",
          gradientColor,
        )}
      />
      <div className="flex flex-col">
        <div
          className={cn(
            "mb-4 flex size-(--feature-icon-spacing) items-center justify-center rounded-lg",
            iconBgColor,
            iconColor,
          )}
        >
          <Icon className="size-6" />
        </div>
        <h3
          className={cn(
            "mb-2 text-base font-bold transition-all delay-50 duration-200 ease-in-out @2xs:text-lg @xs:text-xl @sm:text-2xl",
            "group-hover:translate-x-[calc(var(--feature-icon-spacing)+var(--spacing)*2)] group-hover:-translate-y-[calc(var(--feature-icon-spacing)+var(--spacing))] @sm:group-hover:translate-x-[calc(var(--feature-icon-spacing)+var(--spacing)*4)]",
            "group-focus-within:translate-x-[calc(var(--feature-icon-spacing)+var(--spacing)*4)] group-focus-within:-translate-y-[calc(var(--feature-icon-spacing)+var(--spacing))]",
          )}
        >
          {title}
        </h3>
      </div>

      <p
        className={cn(
          "text-muted-foreground -translate-y-4 opacity-0 transition-all delay-100 duration-200 ease-in-out",
          "group-hover:-translate-y-8 group-hover:opacity-100",
          "group-focus-within:-translate-y-8 group-focus-within:opacity-100",
        )}
      >
        {description}
      </p>
    </motion.div>
  )
}
