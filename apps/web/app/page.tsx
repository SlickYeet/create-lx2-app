import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="flex flex-col gap-y-2 items-center justify-center h-screen">
      <h1>Welcome to the homepage!</h1>
      <Button asChild>
        <Link href="/docs">Get started</Link>
      </Button>
    </div>
  )
}
