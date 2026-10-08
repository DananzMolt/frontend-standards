# frontend-standards

An Agent Skill that teaches coding agents (Claude Code, Codex, Cursor, and others) how this team builds Next.js interfaces. It is both a library picker and an implementation standard: the agent inspects the repository, picks the right existing primitive, builds the smallest coherent solution, and validates it.

The full rules live in [`SKILL.md`](SKILL.md).

## Install

Give your coding agent this prompt. It checks a project copy into the repository for both Codex and Claude Code:

```text
Install the frontend-standards skill in this project for Codex and Claude Code. Run:
npx skills add DananzMolt/frontend-standards --agent codex --agent claude-code --copy -y

Then confirm the skill is present and read its SKILL.md before doing frontend work.
```

Update later with `npx skills update frontend-standards -y`. For a global install, add `-g`. For every supported agent, use `--agent '*'`.

## Core ideas

- **Inspect before deciding.** Read the repository first and reuse what exists. Pick one clear default instead of offering a menu, and never churn dependencies or architecture as a side effect.
- **Next.js first.** Keep the existing router, default to Server Components, and add client boundaries only where interaction needs them.
- **URL state by default.** Filters, tabs, selections, open dialogs, and multi-step progress live in query parameters, so they survive reloads, back and forward, and sharing.
- **Drawers on mobile, dialogs and dropdowns on desktop.** Every dialog, menu, select, picker, and other task overlay becomes a Base UI Drawer on mobile and stays a regular Base UI primitive on desktop, with one shared source of state.
- **Optimistic by default.** Every mutation updates the UI immediately through TanStack Query, with rollback on error and safe handling of concurrent mutations. Opting out needs a stated reason.
- **Skeletons, not spinners.** Initial loading uses Boneyard skeletons captured from the real DOM. Background refetches keep the existing content visible.
- **Apple-style motion.** Look for real direct-manipulation moments (drag, swipe, scrub), track the finger 1:1, carry release velocity into springs, and respect reduced motion.
- **Consistent detail.** Phosphor icons that cross-fade from regular to fill for real state, Google Sans with no monospace and no custom letter spacing, and a shared sticky bottom action bar.
- **Done means verified.** Desktop, mobile, keyboard, touch, RTL, loading, error, and rollback paths are checked, and the formatter, typecheck, lint, tests, and build pass.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js |
| UI primitives | Base UI |
| Mobile drawers | Base UI Drawer |
| Icons | Phosphor Icons |
| Typeface | Google Sans |
| Motion | Motion for React, Auto Animate for drawer layout changes |
| Server state | TanStack Query |
| Skeletons | Boneyard |
| Animated numbers | NumberFlow |
| Toasts | Sonner |
| Shared UI state | Zustand, only when nothing smaller fits |
| Long lists | Virtuoso |
| Drag and drop | dnd-kit |
| Charts | Recharts, Liveline for streaming data |

The skill pins no versions. Agents check official sources for the latest stable release that fits the repository.

## Develop

```bash
node scripts/validate-skill.mjs .   # validate SKILL.md
node --test scripts/                # contract tests
node scripts/package-skill.mjs      # build dist/frontend-standards.zip
```

Maintenance rules are in [`AGENTS.md`](AGENTS.md). Pushing a `v*` tag publishes a GitHub release with the zip.

## License

MIT. Derived in part from Emil Kowalski's MIT-licensed skills. See [`LICENSE`](LICENSE) and [`NOTICE.md`](NOTICE.md).
