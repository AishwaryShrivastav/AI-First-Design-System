# AI Tooling Guide

A compact reference to keep this repository predictable for AI coding and design tools.

## Core navigation
- **Monorepo layout:** packages live in `packages/` (core web components plus React/Vue/Svelte wrappers), documentation sits in `docs/`, and runnable examples live in `examples/`.
- **Primary entrypoints:** `packages/core/src` (web components), `packages/react/src` (React bindings), `docs` (principles and usage guides).
- **Critical commands:**
  - `npm install` — install dependencies.
  - `npm run dev` — start component playground for local exploration.
  - `npm run storybook` — launch docs and visual specs.
  - `npm test` — run unit and accessibility checks.

## Expectations for AI-generated changes
- **Ground everything in sources.** Each new prop, slot, or design pattern should cite a trusted guideline (e.g., WAI-ARIA APG, WCAG 2.2, Carbon for AI, PatternFly AI, Microsoft HAX, SAP Fiori) in docs or code comments.
- **Prefer structured outputs.** When using AI tools to modify files, keep changes small, add TODOs sparingly, and write concise commit messages that describe the user-visible effect.
- **Deterministic code style.** Use existing TypeScript, Lit, and Tailwind patterns—no new lint configs. Avoid try/catch around imports.

## Fast authoring templates
- **Component README snippet:** include purpose, accessibility defaults, AI affordances (labels, confidence, overrides), and references.
- **Pull request checklist:** tests run, documentation updated with references, accessibility validated, breaking changes noted.

## Accessibility and quality rails
- Always include ARIA roles and labels for interactive elements.
- Keep AI affordances discoverable but optional (user control first).
- Default focus order must remain logical; prefer roving tab index for composite widgets per WAI-ARIA.

## Lightweight collaboration cues
- Comment with short bullets instead of long narratives.
- Link to specific docs (see `docs/research-sources.md`) when justifying design trade-offs.
- Favor small, reviewable PRs so AI assistants can summarize diffs accurately.
