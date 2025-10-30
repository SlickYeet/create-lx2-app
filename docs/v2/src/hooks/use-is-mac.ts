import { useState } from "react"

export function useIsMac() {
  const [isMac] = useState<boolean>(() =>
    typeof navigator !== "undefined"
      ? navigator.userAgent.toUpperCase().includes("MAC")
      : false,
  )

  return isMac
}
