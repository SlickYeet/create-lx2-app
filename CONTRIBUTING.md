# Contribution Guidelines

When contributing to `create-tnt-stack`, whether on GitHub or in other community
spaces:

- Be respectful, civil, and open-minded.
- Before opening a new pull request, try searching through the
  [issue tracker](https://github.com/slickyeet/create-tnt-stack/issues) for
  known issues or fixes.
- If you want to make code changes based on your personal opinion(s), make sure
  you open an issue first describing the changes you want to make, and open a
  pull request only when your suggestions get approved by maintainers.

## How to Contribute

### Prerequisites

In order to not waste your time implementing a change that has already been
declined, or is generally not needed, start by
[opening an issue](https://github.com/slickyeet/create-tnt-stack/issues/new/choose)
describing the problem you would like to solve.

### Setup your environment locally

_Some commands will assume you have the Github CLI installed, if you haven't,
consider [installing it](https://github.com/cli/cli#installation), but you can
always use the Web UI if you prefer that instead._

In order to contribute to this project, you will need to fork the repository:

```bash
gh repo fork slickyeet/create-tnt-stack
```

then, clone it to your local machine:

```bash
gh repo clone <your-github-name>/create-tnt-stack
```

This project uses [pnpm](https://pnpm.io) as its package manager. Install it if
you haven't already:

```bash
npm install -g pnpm
```

Then, install the project's dependencies:

```bash
pnpm install
```

### Suggested Branching Strategy

To maintain a clear and structured repository, we follow a specific branching
strategy:

```
feature-area/feature/feature-description
```

- `feature-area` should be one of the following:
  - `cli` → Changes related to the CLI
  - `docs<v1/v2>` → Changes related to documentation
  - `core` → Changes related to the overall repository structure or
    configurations
- `feature` should be a short, descriptive name for the change being
  implemented.
- `feature-description` (optional) can provide additional context.

**Example Branch Names**:

- `cli/auth/add-lucia-auth`
- `docsv2/improve-installation-guide`
- `core/ci/update-build-scripts`

This structure ensures clear organization and easier navigation through
contributions.

### Implement your changes

This project is a [Turborepo](https://turbo.build/) monorepo. The code for the
CLI is in the `cli` directory, and the docs is in the `docs/v1` and `docs/v2`
directory. Now you're all setup and can start implementing your changes.

Here are some useful scripts for when you are developing:

| Command              | Description                                            |
| -------------------- | ------------------------------------------------------ |
| `pnpm dev:cli`       | Builds and starts the CLI in watch-mode                |
| `pnpm dev:docs:v1`   | Starts the development server for the v1 docs with HMR |
| `pnpm dev:docs`      | Starts the development server for the v2 docs with HMR |
| `pnpm build`         | Builds all packages                                    |
| `pnpm build:cli`     | Builds the CLI                                         |
| `pnpm build:docs:v1` | Builds the v1 docs                                     |
| `pnpm build:docs`    | Builds the v2 docs                                     |
| `pnpm lint`          | Lints the code                                         |
| `pnpm lint:fix`      | Lints the code and fixes any errors                    |
| `pnpm format`        | Formats the code                                       |
| `pnpm format:check`  | Check the code for formatting                          |
| `pnpm check`         | Checks the code for typeerrors, formatting and linting |
| `pnpm typecheck`     | Check the code for typeerrors                          |

When making commits, make sure to follow the
[conventional commit](https://www.conventionalcommits.org/en/v1.0.0/)
guidelines, i.e. prepending the message with `feat:`, `fix:`, `chore:`, `docs:`,
etc... You can use `git status` to double check which files have not yet been
staged for commit:

```bash
git add <file> && git commit -m "feat/fix/chore/docs: commit message"
```

### When you're done

Check that your code follows the project's style guidelines by running:

```bash
pnpm check
```

If your change should appear in the changelog, i.e. it changes some behavior of
either the CLI or the outputted application, it must be captured by `changeset`
which is done by running

```bash
pnpm changeset
```

and filling out the form with the appropriate information.

When all that's done, it's time to file a pull request to upstream:

```bash
gh pr create --web
```

and fill out the title and body appropriately. Again, make sure to follow the
[conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) guidelines
for your title.

## Credits

These guidelines were inspired by the contributing guidelines for
[cloudflare/wrangler2](https://github.com/cloudflare/wrangler2/blob/main/CONTRIBUTING.md).
