import { compatibilityMatrix } from "@/constants.js"
import { logger } from "@/utils/logger.js"

export function renderCompatibilityWarning() {
  logger.warn("Compatibility Warnings:")
  for (const rule of compatibilityMatrix) {
    const pkgs = rule.packages
    let msg = ""
    if (rule.message) {
      msg = `- ${rule.message}`
    } else if (pkgs.length === 2) {
      msg = `- Using ${pkgs[0]} with ${pkgs[1]} is not supported yet.`
    } else if (pkgs.length > 2) {
      msg = `- Using ${pkgs[0]} with ${pkgs.slice(1, -1).join(", ")}, or ${pkgs.slice(-1)} is not supported yet.`
    }
    logger.warn(msg)
  }
  console.log("")
}
