# frontend-standards

An opinionated, portable Agent Skill for building and reviewing Next.js interfaces with the team's approved stack:

- Next.js-first architecture
- Base UI on desktop and Vaul drawers on mobile
- Phosphor Icons with animated regular-to-fill state transitions
- Google Sans, no monospace, no custom letter spacing
- Motion and Apple-style direct manipulation
- TanStack Query with optimistic updates as the default
- Boneyard-generated skeletons
- NumberFlow, Sonner, Virtuoso, dnd-kit, Recharts, and the extended curated map

The skill is derived in part from Emil Kowalski's MIT-licensed `pick-ui-library` and `apple-design` skills. See `NOTICE.md` and `LICENSE`.

## Quick install, preferred

Give your coding agent this prompt. It installs a project copy for both Codex and Claude Code, so the skill is checked into the project and shared with the team.

```text
Install the frontend-standards skill in this project for Codex and Claude Code. Run:
npx skills add DananzMolt/frontend-standards --agent codex --agent claude-code --copy -y

Then confirm the skill is present and read its SKILL.md before doing frontend work.
```

To install it only for the current agent, replace the two `--agent` values with that agent's name. To update later, run:

```bash
npx skills update frontend-standards -y
```

## Package layout

```text
frontend-standards/
├── SKILL.md
├── agents/openai.yaml
├── references/
├── assets/
├── scripts/validate-skill.mjs
├── scripts/install-portable.mjs
├── evals/
├── LICENSE
├── NOTICE.md
└── SOURCES.md
```

The main `SKILL.md` contains only always-needed policy and routing. Detailed material lives in focused reference files so compatible agents can load it on demand.

## Other installation options

From the directory containing `frontend-standards/`:

```bash
npx skills add ./frontend-standards --agent '*' --skill frontend-standards
```

For a non-interactive project install:

```bash
npx skills add ./frontend-standards --agent '*' --skill frontend-standards --copy -y
```

For a global install across agents:

```bash
npx skills add ./frontend-standards --agent '*' --skill frontend-standards --copy -g -y
```

The `skills` CLI resolves agent-specific locations for Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot, Grok Build, OpenCode, and other supported clients. `--copy` is the safest choice for an extracted archive; omit it when you prefer a canonical install with symlinks. The package format works with Agent Skills-compatible agents; no package can make a client without Agent Skills support discover it automatically.

### Symlink-free fallback

If the multi-agent installer does not create a client-specific link, use the bundled zero-dependency copier:

```bash
node frontend-standards/scripts/install-portable.mjs --project /path/to/repository --force
```

That installs project copies into `.agents/skills`, `.claude/skills`, and `.grok/skills`. For common global locations:

```bash
node frontend-standards/scripts/install-portable.mjs --global --force
```

Pass `--target-dir /another/agent/skills` for any additional client's documented skills directory. Use `--dry-run` to inspect all destinations first.

## Manual installation

The most portable project location is:

```text
.agents/skills/frontend-standards/
```

Common agent-specific locations include:

```text
Claude Code: .claude/skills/frontend-standards/
Codex:       .agents/skills/frontend-standards/
Cursor:      .agents/skills/frontend-standards/
Gemini CLI:  .agents/skills/frontend-standards/
Copilot:     .agents/skills/frontend-standards/
Grok Build:  .grok/skills/frontend-standards/
```

Copy the entire folder, not only `SKILL.md`, because the skill references bundled assets and documentation.

## Validate

Run the bundled zero-dependency validator:

```bash
node frontend-standards/scripts/validate-skill.mjs frontend-standards
```

Also run the reference validator when available:

```bash
skills-ref validate ./frontend-standards
```

## Invoke

Agents may activate the skill implicitly for matching frontend tasks. Explicit examples:

```text
Use $frontend-standards to build this settings dialog.
Use the frontend-standards skill to review this Next.js page.
Apply frontend-standards to the loading, mutation, and responsive overlay states.
```

OpenAI clients also receive the optional `agents/openai.yaml` metadata. Other agents ignore it safely and use the standard `SKILL.md`.

## Updating dependencies

The skill intentionally contains no pinned package versions. At implementation time, the agent must inspect the repository and official release sources, then use the latest compatible stable release. Do not update an unrelated major version merely to add a component.
