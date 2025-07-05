import { fileURLToPath } from "url"

export default function HomePage() {
  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <main className="mx-auto flex h-screen max-w-5xl flex-col items-center justify-between overflow-hidden p-6 sm:p-[45px]">
      <div className="flex grow flex-col items-center justify-center">
        {/* Logo */}
        <picture className="relative">
          <div className="absolute inset-0 animate-pulse rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 opacity-20 blur-xl dark:from-purple-800 dark:to-cyan-800" />
          <source srcSet="https://github.com/SlickYeet/create-tnt-stack/blob/main/docs/public/logo.light.png?raw=true" />
          <img
            src="https://github.com/SlickYeet/create-tnt-stack/blob/main/docs/public/logo.light.png?raw=true"
            alt="Logo"
            width={65}
            height={65}
            className="block h-auto max-w-full"
          />
        </picture>

        <h1 className="mt-6 bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-center text-4xl leading-10 text-transparent sm:text-5xl sm:leading-14 md:text-6xl md:leading-20 lg:mt-10 lg:text-7xl lg:font-bold">
          TNT-Powered Next.js App
        </h1>
        <p className="mt-4 text-center text-lg text-neutral-700 md:text-xl lg:mt-6 dark:text-neutral-300">
          Build modern web applications with today&apos;s most popular tools
        </p>

        <div className="mt-12 flex items-center gap-3">
          <a
            href="https://create.tntstack.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center rounded-md border border-white px-2 py-1 outline-none focus:opacity-80 active:opacity-70"
          >
            Website
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mb-1.5 size-4 fill-none stroke-current stroke-2"
            >
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </a>
          <a
            href="https://create.tntstack.org/introduction"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center rounded-md border border-white px-2 py-1 outline-none focus:opacity-80 active:opacity-70"
          >
            Docs
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mb-1.5 size-4 fill-none stroke-current stroke-2"
            >
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </a>
          <a
            href="https://github.com/SlickYeet/create-tnt-stack"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center rounded-md border border-white px-2 py-1 outline-none focus:opacity-80 active:opacity-70"
          >
            GitHub
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mb-1.5 size-4 fill-none stroke-current stroke-2"
            >
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </a>
        </div>
      </div>

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
  )
}
