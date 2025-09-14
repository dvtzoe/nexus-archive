# Nexus Archive

A publishing platform.

## Development

### Setup

```bash
pnpm install
```

### Running

```bash
# Start the web app in development mode
pnpm dev:web

# Start the repository server
pnpm start:repo
```

### Linting and Formatting

This project uses **Biome** for linting and formatting TypeScript/JavaScript files in the repository server and types package, and **Prettier** for the web app (which uses Astro).

#### Commands

```bash
# Lint all packages (fails if there are issues)
pnpm lint

# Auto-fix all linting and formatting issues
pnpm format
# or
pnpm lint:fix
```

#### Per-package commands

```bash
# Repository server (uses Biome)
cd apps/repository
pnpm lint        # Check for issues
pnpm lint:fix    # Auto-fix issues

# Types package (uses Biome)
cd packages/types
pnpm lint        # Check for issues
pnpm lint:fix    # Auto-fix issues

# Web app (uses Prettier)
cd apps/web
pnpm lint        # Check for issues
pnpm lint:fix    # Auto-fix issues
```

### Configuration

- **Biome configuration**: `biome.json` (for apps/repository and packages/types)
- **Prettier configuration**: `apps/web/.prettierrc` (for apps/web only)
- **Ignored by Biome**: `.biomeignore`

The setup ensures that:
- `apps/repository/` and `packages/` use Biome for consistent formatting and linting
- `apps/web/` uses Prettier with Astro and Tailwind plugins for better compatibility

## CI

GitHub Actions automatically runs linting checks on pull requests and pushes to main. All checks must pass before merging.