"use client"

import { api } from "@/lib/api/client"

export function Greeting() {
  const [greeting] = api.post.greeting.useSuspenseQuery({
    text: "from tRPC!",
  })

  return (
    <div className="mt-12 flex flex-col items-center gap-3">
      <div className="mb-4">
        <h2 className="mb-4 text-center">
          <span className="text-2xl text-neutral-700 dark:text-neutral-300">
            {greeting}
          </span>
        </h2>
      </div>
    </div>
  )
}
