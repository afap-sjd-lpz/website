# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

# AFAP Website

Official informational website for the Asociación de Familiares y Amigos de Pacientes con Discapacidad Mental y/o Psíquica de San Juan de Dios - La Paz, Bolivia.

## Technology stack

- Next.js 16 using the App Router.
- TypeScript.
- Tailwind CSS.
- HeroUI for UI components.
- pnpm as the package manager.
- Source code lives under `src/`.

## Project conventions

- Prefer `interface` over `type` for object shapes and component props when appropriate.
- Keep components small, focused, and reusable.
- Do not introduce abstractions, utilities, dependencies, or variants until they are actually needed.
- Prefer Server Components by default.
- Add `"use client"` only when client-side behavior is required.
- Use the `@/*` import alias for imports from `src/`.
- Use `next/link` for internal navigation.
- Use `next/image` for project images when appropriate.
- Keep component imports clean through local `index.ts` barrel files where the project already follows that pattern.

## Component organization

Base reusable UI components belong in:

`src/components/ui/`

Examples:

- Button
- Input
- Textarea
- Container
- Section

Application layout components belong in:

`src/components/layout/`

Examples:

- Brand
- Navbar
- Footer

Page-specific or larger content sections belong in:

`src/components/sections/`

Do not move components between these categories without a clear architectural reason.

## Styling

The site uses a warm and human visual identity.

Base design tokens:

- Background: `#FAF8F5`
- Foreground: `#1E2530`
- Primary: `#7AA4D4`
- Secondary: `#6BBF94`
- Accent: `#F05A30`
- Surface: `#FFFFFF`
- Muted: `#667085`
- Border: `#E5E1DC`

Use semantic Tailwind tokens such as:

- `bg-background`
- `text-foreground`
- `bg-primary`
- `bg-secondary`
- `bg-accent`
- `bg-surface`
- `text-muted`
- `border-border`

Avoid hardcoding these hexadecimal colors inside components.

The AFAP brand name should use the foreground color rather than the primary blue.

Use accent colors sparingly. In particular, orange should be reserved for actions or information that genuinely requires additional emphasis.

## Typography

- The primary font is Nunito Sans.
- Typography is configured globally using `next/font`.
- Maintain comfortable readability and accessible font sizes.
- Do not introduce additional font families without discussing the design need first.

## HeroUI

- Prefer HeroUI for components when an appropriate HeroUI primitive exists.
- Project components may wrap HeroUI components to provide AFAP-specific defaults and styling.
- Do not import and style the same HeroUI primitive independently throughout the application when a project wrapper already exists.
- Preserve useful HeroUI functionality and accessibility when creating wrappers.

## Accessibility

Accessibility is a project requirement.

- Use semantic HTML.
- Provide accessible names for interactive controls.
- Maintain sufficient color contrast.
- Ensure keyboard navigation works.
- Do not communicate important information through color alone.
- Images that convey information require meaningful alternative text.
- Decorative images should not create redundant screen-reader output.

## Scope

The initial website is primarily informational.

Planned areas include:

- Inicio
- Quiénes somos
- Recursos
- Contacto

The contact functionality will later use Resend and anti-spam protection.

Do not add authentication, databases, state-management libraries, or backend infrastructure unless explicitly required.

## Approval workflow

- Before implementing visual or architectural changes, first inspect the relevant files and present a clear proposal.
- Explain which files would be created or modified and the intended structure.
- Do not modify files until the user explicitly approves the proposal.
- After approval, implement only the agreed scope. If a new decision arises during implementation, pause and request approval again.

## Development workflow

Before considering a significant change complete:

1. Run `pnpm lint`.
2. Run `pnpm build`.
3. Resolve errors introduced by the change.
4. Do not modify unrelated files merely to clean them up.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
