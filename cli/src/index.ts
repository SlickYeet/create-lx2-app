#!/user/bin/env node
import { execSync } from "child_process"
import path, { dirname } from "path"
import { fileURLToPath } from "url"
import chalk from "chalk"
import { Command } from "commander"
import fs from "fs-extra"
import inquirer from "inquirer"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const program = new Command()

program
  .name("create-tnt-app")
  .version("1.0.0")
  .description("CLI to scaffold a new TNT or TNT-Powered project")

program
  .argument("[project-name]", "Name of the project")
  .action(async (projectName = "my-tnt-app") => {
    console.log(chalk.blue("\n🚀 Welcome to TNT CLI!\n"))

    // Ask user for stack options
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "stackType",
        message: "Which version of TNT do you want?",
        choices: [
          "TNT (Next.js + TypeScript + Tailwind)",
          "TNT-Powered (With Payload CMS)",
        ],
      },
      {
        type: "confirm",
        name: "usePrisma",
        message: "Would you like to set up Prisma?",
        default: true,
      },
    ])

    // Determine template path
    const templateName = answers.stackType.includes("Powered")
      ? "tnt-powered"
      : "tnt"
    const templatePath = path.join(__dirname, "../templates", templateName)
    const targetPath = path.join(process.cwd(), projectName)

    console.log(chalk.green(`\n📦 Creating project in ${targetPath}...`))

    try {
      // Clone base template
      await fs.copy(templatePath, targetPath)
      console.log(chalk.green("✅ Project created successfully!"))

      console.log(chalk.yellow("\n📥 Installing dependencies...\n"))
      process.chdir(targetPath)
      execSync("npm install", { stdio: "inherit" })

      // Set up Prisma if selected
      if (answers.usePrisma) {
        console.log(chalk.yellow("\n🛠 Setting up Prisma...\n"))
        execSync("npm install @prisma/client", { stdio: "inherit" })
        execSync("npm install --save-dev prisma", { stdio: "inherit" })
        execSync("npx prisma init", { stdio: "inherit" })

        // Copy schema
        const prismaTemplatePath = path.join(
          __dirname,
          "../templates/packages/prisma/schema/base.prisma"
        )
        const prismaTargetPath = path.join(targetPath, "prisma/schema.prisma")

        if (fs.existsSync(prismaTemplatePath)) {
          await fs.copy(prismaTemplatePath, prismaTargetPath)
          console.log(chalk.green("✅ Custom Prisma schema applied!"))
        }
      }

      console.log(chalk.green("\n🎉 Setup complete! Happy coding!\n"))
    } catch (error) {
      console.error(chalk.red("❌ Failed to create project."), error)
    }
  })

program.parse(process.argv)
