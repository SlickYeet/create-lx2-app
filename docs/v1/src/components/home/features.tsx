"use client"

import { motion } from "motion/react"

import { FeatureCard } from "@/components/feature-card"
import { FEATURES } from "@/constants"

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export function Features() {
  return (
    <section className="bg-muted/30 py-20">
      <div className="container">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-4 text-3xl font-bold md:text-4xl"
          >
            Explosive Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-muted-foreground mx-auto max-w-2xl text-xl"
          >
            Everything you need to detonate your development workflow
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map(({ title, description, icon, color }) => (
            <FeatureCard
              key={title}
              title={title}
              description={description}
              icon={icon}
              color={color}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
