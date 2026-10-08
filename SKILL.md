---
name: frontend-standards
description: Build, change, or review polished Next.js frontend UI with the team's opinionated stack and interaction rules. Use for Next.js pages, React components, frontend architecture, Base UI primitives, responsive overlays (Base UI Dialog and Menu on desktop, Base UI Drawer on mobile), Phosphor icons, Google Sans typography, Motion and Apple-style gestures, TanStack Query and optimistic mutations, Boneyard skeletons, animated numbers, accessibility, performance, or frontend-library selection.
license: "MIT; see LICENSE"
compatibility: "Portable Agent Skills open-standard skill for coding agents. Intended for TypeScript, React, and Next.js repositories. Reading the repository and official package documentation may be required; installing packages and running project checks may require network and shell access."
metadata:
  author: "Tomer Danan"
  version: "1.1.1"
  derived-from: "emilkowalski/skills"
---

# Frontend Standards

Use this skill as the default frontend playbook for Next.js work. It is both a library picker and an implementation standard. Do not merely recommend packages: inspect the repository, choose the correct existing primitive, implement the smallest coherent solution, and validate it.

## Instruction priority

Apply instructions in this order:

1. The user's explicit request for the current task.
2. Repository-local instructions and established architecture.
3. The house rules in this skill.
4. General framework and library best practices.

For a new project, use the house stack directly. In an existing project, do not create dependency churn or migrate architecture incidentally. Reuse a sound installed equivalent, mention the mismatch briefly, and migrate only when the task explicitly includes standardization or migration.

## Required workflow

1. **Inspect before deciding.** Read `package.json`, the lockfile, the package-manager field, the Next.js and React versions, `app/` versus `pages/`, providers, styling conventions, existing shared components, and relevant tests. Search for an existing implementation before creating another one.
2. **Classify the problem.** Decide whether it is server rendering, client server-state, local UI state, a primitive, a responsive overlay, loading feedback, motion, or a combination.
3. **Prefer the narrowest owner.** Use the web platform first where sufficient, then an existing Next.js capability, then an approved library, then custom code. Do not install a package for a trivial CSS transition or a small local state transition.
4. **Choose one default.** Do not present a menu of equal options when this skill has a clear choice. Explain a departure from the curated map.
5. **Verify current compatibility.** For every new install, check the package's official documentation, package registry, peer dependencies, and migration notes. Use the latest stable release compatible with the repository. Do not hardcode versions in generated guidance.
6. **Implement progressively.** Keep Server Components as the default, add client boundaries only where interaction requires them, preserve accessibility, and make advanced motion a progressive enhancement.
7. **Validate.** Run the repository's formatter, typecheck, lint, focused tests, and production build when available. Test desktop, mobile, keyboard, touch, reduced motion, RTL, loading, error, and optimistic rollback paths relevant to the change.

## Core stack and non-negotiables

| Concern | House default |
| --- | --- |
| Framework and routing | Next.js, preserving the repository's existing App Router or Pages Router architecture |
| UI primitives | Base UI |
| Mobile drawers and sheets | Base UI Drawer (`@base-ui/react/drawer`) |
| Icons | Phosphor Icons |
| Typeface | Google Sans |
| General and gesture motion | Motion for React (`motion/react`) |
| Dynamic drawer layout changes | Auto Animate, using `useAutoAnimate` from `@formkit/auto-animate/react` |
| Client server-state | TanStack Query (`@tanstack/react-query`) |
| Animated numbers | NumberFlow, via `@number-flow/react` |
| Initial content skeletons | `boneyard-js` |
| Toasts | Sonner |
| Shared client UI state | Zustand, only after local state, URL state, context, and server state are ruled out |
| Long-list virtualization | Virtuoso |
| Drag and drop / sortable UI | dnd-kit |
| General charts | Recharts |
| Streaming time-series charts | Liveline |


## Next.js-first architecture

- Preserve the current router. Never migrate between App Router and Pages Router as a side effect.
- In App Router, default to Server Components. Add `'use client'` only at the smallest boundary needing browser state, effects, handlers, or a client-only package.
- Prefer `next/image`, `next/link`, `next/navigation`, Metadata APIs, Route Handlers, Server Actions, route layouts, `loading.tsx`, `error.tsx`, `not-found.tsx`, caching/revalidation, and `next/dynamic` when they directly solve the problem.
- Do not duplicate ownership between the Next.js data cache and TanStack Query without a deliberate hydration and invalidation strategy.
- Do not force a Next.js abstraction when a simple accessible React or web-platform solution is clearer.

## URL state is the default

Query parameters are the default owner for recoverable UI state: searches, filters, sorting, pagination, selected records, tabs, open dialogs, popovers, drawers, and inner multi-step flow state. Use `next/navigation` and the existing router conventions to keep URLs shareable, back/forward-correct, reload-safe, and deep-linkable.

- Preserve unrelated query parameters and use explicit, stable names.
- Use history replacement for high-frequency typing and history pushes for meaningful navigations or user-confirmed state changes.
- Do not put transient animation, pointer, hover, focus, unsaved secret, or security-sensitive state in the URL.
- Local component state remains correct for ephemeral visual state; URL state wins whenever the user could reasonably bookmark, share, restore, or navigate back to it.


## Responsive overlays are mandatory

**Mobile gets drawers; desktop keeps dialogs and dropdowns.** On mobile, every overlay that holds a task or a choice is a Base UI Drawer (`@base-ui/react/drawer`). On desktop, the same task uses the regular Base UI primitive. Never show a centered dialog, floating menu, or popover task surface on mobile, and never replace a desktop dialog or dropdown with a drawer.

| Desktop | Mobile |
| --- | --- |
| Dialog | Bottom drawer with the same content; the primary action sits at the bottom. |
| Alert Dialog | Bottom drawer with full-width stacked actions; swiping it away cancels. |
| Menu, Menubar menus, Toolbar overflow ("…") | Bottom drawer listing the actions as full-width rows. |
| Context Menu | Long-press opens a bottom drawer with the same actions. |
| Select, Combobox, Autocomplete | Bottom drawer of option rows; searchable lists pin the search field at the top. |
| Popover task surfaces: filters and sort, share, date and time pickers, color, emoji, and icon pickers | Bottom drawer; filters end with Reset and Apply actions. |
| Preview Card (hover card) | Phones cannot hover. When the card's content matters, tapping the trigger opens it in a bottom drawer; otherwise the trigger simply navigates. |
| Command palette | Full-height bottom drawer with the search field pinned at the top. |
| Detail or preview side pane | Bottom drawer with snap points: a peek height and full height. |
| Sidebar, Navigation Menu | Side drawer from the leading edge (`swipeDirection` toward that edge, flipped for RTL), opened by its trigger or an edge swipe through `Drawer.SwipeArea`. |
| Multi-step flow that starts in a dialog | Nested drawers, one per step; dismissing the top drawer returns to the previous step. |

These stay out of drawers on every screen size:

- Tooltips and small informational popovers that hold no task.
- Long forms and editors: give them their own page or route.
- Image and media lightboxes: use a full-screen viewer.

Implementation rules:

- Decide mobile versus desktop in one place, using the repository's existing breakpoint hook (such as `useIsMobile`) or a single shared `matchMedia` hook. Build one shared responsive wrapper per surface type (for example `ResponsiveDialog`, `ResponsiveMenu`, `ResponsiveSelect`) instead of branching at each call site.
- Keep one source of truth for open state, selection, validation, and content. Do not render two live trigger controls or let the desktop and mobile versions drift.
- Every bottom drawer has a visible swipe handle, swipe-to-dismiss, and touch-sized actions.
- Preserve focus return, labels, descriptions, keyboard navigation, dismissal behavior, and destructive-action safeguards on both versions.
- Wrap drawers that contain form fields in `Drawer.VirtualKeyboardProvider` so inputs stay visible above the software keyboard.
- When drawer content is inserted, removed, reordered, or changes height, attach `useAutoAnimate` to the stable content container.
- Base UI Drawer is the house drawer. Do not add Vaul or another drawer package to new code. In an existing repository that already uses Vaul, follow the instruction priority above: keep it for incidental work and migrate to Base UI Drawer only when the task includes standardization or migration.


## Motion and direct manipulation

Use Emil Kowalski's Apple-style motion principles as a required design reference:

- Actively look for natural direct-manipulation opportunities: drag, swipe, scrub, pull, flick, reorder, compare, resize, or dismiss.
- Add a gesture only when it improves control, spatial understanding, preview, speed, or recoverability. Never add drag as decoration and never make it the sole input method.
- Gesture feedback starts on pointer-down, tracks 1:1, preserves the grab offset, carries release velocity into the destination spring, and remains interruptible and reversible.
- Use momentum-aware snap points, progressive rubber-banding beyond bounds, and critically damped springs by default. Bounce is earned by user-supplied momentum, not sprinkled on every transition.
- Enter and exit along the same spatial path. Prefer transforms and opacity. Respect reduced-motion and reduced-transparency preferences.
- Use Base UI Drawer's own swipe, snap-point, and nested-drawer gesture system. Do not layer a competing custom drag recognizer on top.

### Shared animated icon component

Never hard-swap icons. Reuse one `AnimatedIcon` / `IconSwap` component:

- fixed-size relative wrapper;
- outgoing and incoming icons absolutely overlaid;
- Motion `AnimatePresence` with `mode="sync"` and a meaningful state key;
- outgoing: opacity `1 → 0`, blur `0 → 6px`, scale `1 → 0.85`;
- incoming: opacity `0 → 1`, blur `6px → 0`, scale `0.85 → 1`;
- overlapping `180–220ms` ease-out transition;
- reduced motion falls back to a short opacity change;
- decorative icons are `aria-hidden`; the parent control owns its accessible name and state.


## Icons and typography

- Use Phosphor Icons first.
- Use the same glyph with `weight="fill"` for selected, active, toggled-on, favorited, checked, or current state; use `weight="regular"` when inactive. Include the state or weight in the animated-icon key.
- Fill communicates a real state, not hover or decoration. Also expose state with `aria-pressed`, `aria-selected`, `aria-current`, Base UI state attributes, or the correct semantic control.
- Only when Phosphor lacks a suitable glyph, the approved Kail Designs collection at `https://x.com/kail_designs/status/2093371585940038033` may be used as a discovery source. Verify the original icon source and license, prefer an official React package or clean SVG, normalize it to Phosphor, and avoid mixing visual families within one navigation or control group.
- Always use Google Sans through the current Next.js font APIs. Never use an unofficial font binary.
- Never use a monospace font, including for headings, numeric UI, code-looking labels, badges, or Hebrew text.
- Never set custom `letter-spacing`. This rule overrides generic Apple typography advice, especially for headings and Hebrew.


## TanStack Query and optimistic UI

Use TanStack Query for client-side server-state that needs caching, background refetch, polling, pagination, infinite queries, dependent queries, deduplication, mutations, or sharing across interactive client components. Do not use `useEffect` plus local state for ordinary client fetching when `useQuery` is the correct owner.

**Every mutation starts with an optimistic design.** The default cache-based sequence is:

1. cancel relevant queries;
2. snapshot previous cache values;
3. apply the predicted result immediately in `onMutate`;
4. return rollback context;
5. restore the snapshot in `onError` if this mutation is still authoritative;
6. reconcile with the server response in `onSuccess`;
7. invalidate only relevant keys in `onSettled` when reconciliation did not make refetch unnecessary.

Use variables-based optimistic UI when only one local surface needs the pending item. Use cache updates when multiple surfaces must agree. Give creates stable temporary IDs, remove deletes immediately and offer Undo when practical, and make toggles, favorites, inline edits, selections, sorting, and reordering instant. Protect concurrent mutations so an older failure cannot roll back a newer success.

Opt out only when the client cannot safely predict the result or the action is high-risk or irreversible, such as payment, authentication/security changes, destructive external side effects, server-generated outcomes, or conflict-sensitive writes. Put a concise code comment or implementation note explaining the opt-out.


## Skeleton and loading policy

- For initial content-bearing async UI whose final layout is knowable, use a skeleton rather than a centered spinner, blank area, or generic `Loading…` copy.
- Use Boneyard by default. Capture bones from the actual rendered DOM, provide representative fixtures when needed, run `npx boneyard-js build`, import the generated registry once, and recapture after material layout changes.
- Capture the project's actual responsive breakpoints. A skeleton mirrors hierarchy, shape, radius, spacing, and density and must prevent layout shift.
- In App Router, use local Suspense boundaries and `loading.tsx` where appropriate. With `useSuspenseQuery`, prefer Boneyard's `BoneSuspense` integration.
- Do not replace cached/stale content with a skeleton during background refetch. Keep the content visible and use subtle non-blocking feedback.
- Do not show a skeleton or blocking spinner for an optimistic mutation. The optimistic result is the immediate UI.
- Use a hand-built skeleton only when Boneyard cannot support the runtime or component, and document why.


## Definition of done

Before finishing a frontend task, confirm the applicable items:

- No duplicate component or dependency was introduced without checking the repository.
- Server/client boundaries and data-cache ownership are explicit.
- Every dialog, menu, select, picker, and other task overlay renders as a Base UI Drawer on mobile and as its regular Base UI primitive on desktop, and both versions work.
- The primary action is usable with keyboard, pointer, and touch; gestures have a non-gesture alternative.
- Focus, labels, error messages, selected state, and reduced-motion behavior are accessible.
- Hebrew/RTL layout works; animated numeric spans remain isolated LTR without a monospace font.
- Initial loading uses the correct Boneyard skeleton; background refetch preserves visible data.
- Every mutation has optimistic behavior or a documented safety exception, including rollback and concurrency behavior.
- Dependencies are current, compatible, and non-prerelease unless the mandated package has no stable channel and the exception was checked explicitly.
- Formatter, typecheck, lint, relevant tests, and production build pass, or any unavailable check is reported honestly.


## Sticky bottom actions

Treat a shared `StickyBottomActions` component as a house primitive for primary mobile actions and persistent form/navigation actions.

- **Mobile:** pin the action surface to the viewport bottom. Respect `env(safe-area-inset-bottom)` and keep tap targets comfortably sized.
- **Desktop:** keep the action surface sticky within the page's established max-width/container rather than stretching it edge-to-edge across the viewport.
- Let scrolling content travel behind the action surface. Add a generous upward fade/gradient above it so content visually dissolves into the bottom chrome instead of ending at a hard horizontal edge. The fade must be pointer-transparent.
- Prefer translucent/material treatment where it preserves contrast, following the Apple-design material rules. Do not add a hard divider when the gradient/scroll-edge effect communicates the boundary better.
- Add enough bottom content padding that the final content and focus targets can scroll fully above the actions; never let the fixed surface permanently cover content.
- Keep one shared implementation for single-button and multi-button layouts. Support primary + secondary actions, loading/pending state, disabled state, keyboard focus, RTL, and responsive container alignment.
- Do not use it for actions that should naturally scroll away with their content or when persistent chrome would obscure more than it helps.
