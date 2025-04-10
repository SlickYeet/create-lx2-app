import Link from "next/link"

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      {/* Logo */}
      <div className="mb-8">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 animate-pulse rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 opacity-20 blur-xl dark:from-purple-800 dark:to-cyan-800" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 dark:from-purple-800 dark:to-cyan-800"
          >
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" x2="20" y1="19" y2="19" />
          </svg>
        </div>
      </div>

      <div className="max-w-xl text-balance">
        <h1 className="mb-8 bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text pb-1.5 text-6xl font-bold tracking-tighter text-transparent md:text-7xl lg:text-8xl">
          TNT-Powered Next.js App
        </h1>
        <p className="mb-12 text-xl text-neutral-700 md:text-2xl dark:text-neutral-300">
          Build modern web applications with todat&apos;s most popular tools
        </p>
      </div>

      <div className="mb-12 flex flex-col gap-10 sm:flex-row">
        <Link
          href="https://create.tntstack.org"
          target="_blank"
          referrerPolicy="no-referrer"
          className="hover:text-primary relative flex items-center justify-center gap-2 text-lg font-medium"
        >
          Website
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute top-0 -right-4 size-4 fill-none stroke-current stroke-2"
          >
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </Link>

        <Link
          href="https://create.tntstack.org/introduction"
          target="_blank"
          referrerPolicy="no-referrer"
          className="hover:text-primary relative flex items-center justify-center gap-2 text-lg font-medium"
        >
          Docs
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute top-0 -right-4 size-4 fill-none stroke-current stroke-2"
          >
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </Link>

        <Link
          href="https://github.com/SlickYeet/create-tnt-stack"
          target="_blank"
          referrerPolicy="no-referrer"
          className="hover:text-primary relative flex items-center justify-center gap-2 text-lg font-medium"
        >
          GitHub
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute top-0 -right-4 size-4 fill-none stroke-current stroke-2"
          >
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </Link>
      </div>

      <div className="mt-16 text-sm text-neutral-600 dark:text-neutral-400">
        <p>
          Get started by editing{" "}
          <code className="rounded-md bg-neutral-200 px-2 py-1 dark:bg-neutral-800">
            src/app/page.tsx
          </code>
        </p>
      </div>
    </main>
  )
}
