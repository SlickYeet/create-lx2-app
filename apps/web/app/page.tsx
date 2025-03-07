import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-y-2">
      <h1>Welcome to the homepage!</h1>
      <Button asChild>
        <Link href="/docs">Get started</Link>
      </Button>
    </div>
  )
}
