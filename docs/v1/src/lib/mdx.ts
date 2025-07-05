import fs from "fs/promises"
import path from "path"
import { serialize } from "next-mdx-remote/serialize"
import rehypeSlug from "rehype-slug"
import remarkFrontmatter from "remark-frontmatter"
import remarkMdxFrontmatter from "remark-mdx-frontmatter"

const workingDirectory = path.join(process.cwd(), "src/app/(content)")

export type MdxDocument = {
  slug: string
  title: string
  description: string
  content: string
}

export async function getMdxDocuments(): Promise<MdxDocument[]> {
  const fileNames = await getMdxFileNames(workingDirectory)

  const mdxDocuments = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = path.basename(path.dirname(fileName))

      const fullPath = path.join(workingDirectory, fileName)
      const fileContents = await fs.readFile(fullPath, "utf8")

      const { frontmatter, content } = await serializeMdx(fileContents)

      return {
        slug,
        title: frontmatter.title as string,
        description: frontmatter.description as string,
        content,
      }
    }),
  )

  return mdxDocuments
}

async function getMdxFileNames(dir: string): Promise<string[]> {
  const files = await fs.readdir(dir, { withFileTypes: true })
  let mdxFiles: string[] = []

  for (const file of files) {
    if (file.isDirectory()) {
      const subFiles = await getMdxFileNames(path.join(dir, file.name))
      mdxFiles = mdxFiles.concat(subFiles)
    } else if (file.name.endsWith(".mdx")) {
      mdxFiles.push(
        path.join(dir.substring(workingDirectory.length + 1), file.name),
      )
    }
  }

  return mdxFiles
}

async function serializeMdx(source: string) {
  const mdxSource = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      rehypePlugins: [rehypeSlug],
    },
    parseFrontmatter: true,
  })

  return {
    frontmatter: mdxSource.frontmatter,
    content: mdxSource.compiledSource,
  }
}
