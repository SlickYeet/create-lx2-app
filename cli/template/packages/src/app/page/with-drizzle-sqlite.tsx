import { fileURLToPath } from "url"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

import { db } from "@/server/db"
import { posts as postsTable } from "@/server/db/schema"

export default async function HomePage() {
  const posts = await db.query.posts.findMany()

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <main className="mx-auto flex h-screen max-w-5xl flex-col items-center justify-between overflow-hidden p-6 sm:p-[45px]">
      <div className="flex grow flex-col items-center justify-center">
        {/* Logo */}
        <picture className="relative">
          <div className="absolute inset-0 animate-pulse rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 opacity-20 blur-xl dark:from-purple-800 dark:to-cyan-800" />
          <source srcSet="https://github.com/SlickYeet/create-lx2-app/blob/main/docs/v1/public/logo.light.png?raw=true" />
          <img
            src="https://github.com/SlickYeet/create-lx2-app/blob/main/docs/v1/public/logo.light.png?raw=true"
            alt="Logo"
            width={65}
            height={65}
            className="block h-auto max-w-full"
          />
        </picture>

        <h1 className="mt-6 bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-center text-4xl leading-10 text-transparent sm:text-5xl sm:leading-14 md:text-6xl md:leading-20 lg:mt-10 lg:text-7xl lg:font-bold">
          Lx2 Next.js App
        </h1>
        <p className="mt-4 text-center text-lg text-neutral-700 md:text-xl lg:mt-6 dark:text-neutral-300">
          Build modern web applications with today&apos;s most popular tools
        </p>

        <div className="mt-12 flex items-center gap-3">
          <a
            href="https://create.lx2.dev"
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
            href="https://create.lx2.dev/docs"
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
            href="https://github.com/SlickYeet/create-lx2-app"
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

        <div className="mt-12 flex flex-col items-center gap-3">
          <div className="mb-4">
            <h1 className="mb-4 text-center">
              <span className="text-2xl text-neutral-700 dark:text-neutral-300">
                Posts {posts.length}
              </span>
            </h1>

            <form
              action={async (formData: FormData) => {
                "use server"

                const name =
                  formData.get("name")?.toString() ||
                  `New Post ${posts.length + 1}`

                await db.insert(postsTable).values({ name })

                revalidatePath("/")
              }}
            >
              <input
                type="text"
                name="name"
                placeholder="New Post"
                className="h-8 rounded-md border border-neutral-300 px-2 outline-none dark:border-neutral-700 dark:bg-neutral-800"
              />
              <button
                type="submit"
                className="ml-2 size-8 cursor-pointer rounded-md bg-neutral-200 outline-none hover:opacity-80 focus:opacity-80 dark:bg-neutral-800"
              >
                +
              </button>
            </form>
          </div>

          <div className="grid w-full grid-cols-1 gap-2 space-y-2 sm:grid-cols-2">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex h-10 max-w-40 items-center rounded-md bg-neutral-200 px-2 py-1 dark:bg-neutral-800"
              >
                <span className="truncate text-sm text-neutral-700 dark:text-neutral-300">
                  {post.name}
                </span>
                <form
                  action={async () => {
                    "use server"

                    await db
                      .delete(postsTable)
                      .where(eq(postsTable.id, post.id))

                    revalidatePath("/")
                  }}
                  className="ml-auto"
                >
                  <button
                    type="submit"
                    className="ml-2 cursor-pointer rounded-md text-rose-500 outline-none hover:opacity-80 focus:opacity-80"
                  >
                    x
                  </button>
                </form>
              </div>
            ))}
          </div>
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
