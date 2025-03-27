import fs from "fs"
import path from "path"
import matter from "gray-matter"

const contentDir = path.join(process.cwd(), "src/content")

export function getDocs() {
  const content = fs.readdirSync(contentDir)

  return content
    .filter((doc) => {
      const fullPath = path.join(contentDir, doc)
      return fs.statSync(fullPath).isFile()
    })
    .map((doc) => {
      try {
        const slug = doc.replace(/\.mdx$/, "")
        const fullPath = path.join(contentDir, doc)
        const content = fs.readFileSync(fullPath, "utf8")
        const { data } = matter(content)

        return {
          slug,
          title: data.title || slug.replace(/-/g, " "),
        }
      } catch (error) {
        console.error(`Error processing file ${doc}:`, error)
        return null
      }
    })
    .filter(Boolean)
}
