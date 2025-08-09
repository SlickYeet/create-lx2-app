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
  // Fetch the latest release of the package from npm
  // If the version is "beta", fetch the beta release

  const response = await fetch("https://registry.npmjs.org/create-lx2-app", {
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

export interface VersionConfig {
  version: "latest" | "beta"
  text: string
  showBeta?: boolean
}

export async function getVersionConfig(): Promise<VersionConfig> {
  try {
    const response = await fetch(
      "https://cdn.famlam.ca/lx2/version-config.json",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 300 },
      },
    )
    if (!response.ok) {
      throw new Error("Failed to fetch version config")
    }

    const config = await response.json()
    return config
  } catch (error) {
    console.error("Failed to fetch version config, using defaults:", error)
    // Fallback config
    return {
      version: "latest",
      text: "{{name}} v{{version}} is now available!",
      showBeta: false,
    }
  }
}

export function formatVersionText(
  template: string,
  version: string,
  packageName: string,
): string {
  return template
    .replace(/\{\{version\}\}/g, version)
    .replace(/\{\{name\}\}/g, packageName)
}
