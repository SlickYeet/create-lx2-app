import { generateStaticParamsFor, importPage } from "nextra/pages"

import { useMDXComponents as getMDXComponents } from "@/mdx-components"

export const generateStaticParams = generateStaticParamsFor("mdxPath")

interface Params {
  params: Promise<{
    mdxPath: string[]
  }>
}

export async function generateMetadata(props: Params) {
  const params = await props.params
  const { metadata } = await importPage(params.mdxPath)
  return metadata
}

const Wrapper = getMDXComponents({}).wrapper

export default async function Page(props: Params) {
  const params = await props.params
  const result = await importPage(params.mdxPath)
  const { default: MDXContent, toc, metadata } = result

  if (!Wrapper) {
    throw new Error("MDX Wrapper component is undefined.")
  }

  return (
    <Wrapper toc={toc} metadata={metadata}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  )
}
