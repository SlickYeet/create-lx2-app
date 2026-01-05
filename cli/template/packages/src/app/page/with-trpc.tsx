import { fileURLToPath } from "url"

import { Greeting } from "@/components/greeting"
import { api, HydrateClient } from "@/lib/api/server"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  void api.post.greeting({ text: "from tRPC!" })

  return (
    <HydrateClient>
      <main className="mx-auto flex h-screen max-w-5xl flex-col items-center justify-between overflow-hidden p-6 sm:p-11.25">
        <div className="flex grow flex-col items-center justify-center">
          {/* Logo */}
          <picture className="relative">
            <div className="absolute inset-0 animate-pulse bg-linear-to-r from-[oklch(0.7468_0.1455_302.21)] via-[oklch(0.7345_0.0464_270.71)] to-[oklch(0.7563_0.1807_347.17)] opacity-20 blur-lg dark:via-[oklch(0.5567_0.0816_269.53)]" />

            <source srcSet="https://github.com/SlickYeet/create-lx2-app/blob/f1209465d59e03e284702d9f492f1bc1cfa49c32/docs/v2/public/android-chrome-192x192.png?raw=true" />
            <img
              src="https://github.com/SlickYeet/create-lx2-app/blob/f1209465d59e03e284702d9f492f1bc1cfa49c32/docs/v2/public/android-chrome-192x192.png?raw=true"
              alt="Logo"
              width={65}
              height={65}
              className="block h-auto max-w-full"
            />
          </picture>

          {/* Title & Description */}
          <h1 className="mt-6 text-5xl font-bold tracking-tight text-balance md:text-6xl lg:text-7xl">
            Create{" "}
            <span className="text-[oklch(0.7468_0.1455_302.21)]">Lx2</span> App
          </h1>
          <p className="text-center text-lg text-neutral-700 md:text-xl lg:mt-6 dark:text-neutral-300">
            The Most Opinionated Way to Build Next.js Apps
          </p>

          {/* Links */}
          <div className="mt-12 flex items-center gap-3">
            <a
              href="https://create.lx2.dev/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center rounded-md border border-white/25 px-2 py-1 outline-none hover:opacity-80 focus:opacity-80 active:opacity-70"
            >
              Docs
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mb-1.5 size-4 fill-none stroke-current stroke-2"
              >
                <title>Docs</title>
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </a>
            <a
              href="https://link.lx2.dev/discord"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center rounded-md border border-white/25 px-2 py-1 outline-none hover:opacity-80 focus:opacity-80 active:opacity-70"
            >
              Discord
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mb-1.5 size-4 fill-none stroke-current stroke-2"
              >
                <title>Discord</title>
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </a>
            <a
              href="https://github.com/SlickYeet/create-lx2-app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center rounded-md border border-white/25 px-2 py-1 outline-none hover:opacity-80 focus:opacity-80 active:opacity-70"
            >
              GitHub
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mb-1.5 size-4 fill-none stroke-current stroke-2"
              >
                <title>GitHub</title>
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </a>
          </div>

          {/* tRPC Greeting */}
          <Greeting />
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center gap-1 text-sm text-neutral-600 lg:flex-row lg:gap-2 dark:text-neutral-400">
          <p className="m-0">Get started by editing </p>
          <a
            href={fileURL}
            className="rounded-md bg-neutral-200 px-2 py-1 dark:bg-neutral-800"
          >
            <code>src/app/page.tsx</code>
          </a>
        </div>
      </main>
    </HydrateClient>
  )
}
