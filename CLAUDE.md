# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start dev server
npm run build      # production build
npm run preview    # preview production build
npm run check      # svelte-check (type checking)
npm run lint       # prettier + eslint
npm run format     # auto-format with prettier
```

## Architecture

SvelteKit app (Svelte 5, TypeScript, Vite). No test suite — `npm run check` is the primary correctness tool.

**Routing** follows SvelteKit file conventions:
- `src/routes/+layout.svelte` — shared shell: animated `NeuralBackground`, fixed header with back-nav, page title from `$page.data.title`
- `src/routes/+page.{svelte,ts}` — home/index, renders two nav cards
- `src/routes/brain-and-soul/` — Enneagram/SOUL tool
- `src/routes/prophecy-method/` — narrative structure reference

**Content pattern:** Each feature route has a `+page.server.ts` that reads a Markdown file from `DOCS/` at load time, converts it via `marked`, and passes rendered HTML as `data.content` to the page component. Adding a new content section means: create a `DOCS/*.md`, add a `+page.server.ts` that reads it, add a `+page.svelte` that renders `{@html data.content}` inside the shared `.docs` styling block, and add a nav card on `+page.svelte`.

**SOUL system** (`src/lib/soul-data.ts`): Enneagram-inspired character model. Nine types (`SOULS`, keyed 1–9), each with two core `words`, a `color`, and a `triad` (BODY/HEART/HEAD). Helpers: `wingsOf` (adjacent types on ring), `simpleOf`/`hardOf` (stress/growth arrows via `SIMPLE` pairs), `kinOf` (union of all four). The `brain-and-soul` page uses these to generate copy-pasteable `SOUL` blocks for AI prompting.

**Styling:**
- Global theme tokens in `src/app.css` as CSS custom properties (`--bg`, `--fg`, `--accent`, etc.) with light (`:root`) and dark (`:root.dark`) variants
- Body/heading fonts loaded from Google Fonts: Inter (body), Space Grotesk (headings), Cinzel (Enneagram/doc pages)
- Component styles are scoped; `.docs :global(...)` selectors are used to style `marked`-rendered HTML inside doc sections

**NeuralBackground** (`src/lib/components/NeuralBackground.svelte`): Canvas animation — 72 floating nodes that draw proximity lines and traveling pulse glows. Respects dark/light mode via `document.documentElement.classList.contains('dark')`.
