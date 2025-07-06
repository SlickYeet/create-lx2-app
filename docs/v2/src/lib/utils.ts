import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_URL}${path}`
}

export async function getNpmVersion(
  version: "latest" | "beta" = "latest",
): Promise<string> {
  // Fetch the latest version of the package from npm
  // If the beta flag is true, fetch the beta version

  const response = await fetch("https://registry.npmjs.org/create-tnt-stack", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  if (!response.ok) {
    throw new Error("Failed to fetch the latest version")
  }
  const data = await response.json()

  if (version === "latest") {
    return data["dist-tags"].latest
  } else {
    return data["dist-tags"].beta
  }
}
