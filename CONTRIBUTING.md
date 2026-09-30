# Contributing to the TrucklineMP documentation

Thanks for helping improve [docs.trucklinemp.com](https://docs.trucklinemp.com)! Most contributions are translations, and this guide covers what you need to get a pull request merged quickly.

New to translating? The friendlier, step-by-step guide lives on the site: [Contributing Translations](https://docs.trucklinemp.com/web-docs/contribute/contributing/). This file is the short reference for working in the repository.

---

## Checklist

Before you open a pull request:

- [ ] The PR changes **one language** (or only English), plus that language's sidebar labels in `src/lib/sidebar.mjs`.
- [ ] Every page has `title`, `description`, `version` and `lastUpdated` in its frontmatter.
- [ ] A translated page's `version` **matches the English page's `version`**.
- [ ] `lastUpdated` is **today's date** (`YYYY-MM-DD`) on every page you edited.
- [ ] Relative `import` / `file:` paths have **one extra `../`** compared to English.
- [ ] Internal links start with your language (`/fr/web-docs/…`), and `#anchors` use the **translated heading**.
- [ ] `npm run validate`, `npm run check` and `npm run build` pass.
- [ ] Commit messages follow `docs(<locale>): …`.

---

## Setup

The site is built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build). You need **Node 22.12 or later** (see `.nvmrc`).

```bash
npm install
npm run dev        # local site at http://localhost:4321
npm run validate   # quick content checks, no install needed
npm run check      # type checks
npm run build      # full build, including the internal link check
```

You don't need to run anything locally to contribute. Every pull request gets a **preview deployment** (Cloudflare Pages), and its link is posted on the PR.

### Where things live

| What | Where |
|---|---|
| English pages (source of truth) | `src/content/docs/<module>/…` |
| Translated pages | `src/content/docs/<locale>/<module>/…`, at the same relative path as English |
| Sidebar labels and their translations | `src/lib/sidebar.mjs` |
| Languages | `src/lib/locales.mjs` |
| Homepage components | `src/components/ModuleCard.astro`, `ModuleGrid.astro`, `ContributorAvatars.astro` |
| Legal URLs (Terms of Service, rules, …) | `src/lib/legal-urls.ts` |

Modules: `web-docs/`, `web-api/`, `game-docs/`, `game-sdk/`, plus the homepage `index.mdx`.

### Languages

| Folder / URL | `lang` (used for sidebar labels) | Language |
|---|---|---|
| *(root)* | `en` | English |
| `ru` | `ru` | Русский |
| `pl` | `pl` | Polski |
| `de` | `de` | Deutsch |
| `fr` | `fr` | Français |
| `ta` | `ta` | தமிழ் |
| `tr` | `tr` | Türkçe |
| `pt` | `pt-PT` | Português (Portugal) |
| `pt-br` | `pt-BR` | Português (Brasil) |

The folder name and the `lang` can differ (`pt-br` vs `pt-BR`). This matters for sidebar labels (see [Sidebar labels](#sidebar-labels)).

---

## `version` and `lastUpdated`

Every page, English or translated, starts with:

```yaml
---
title: Règles du Programme des VTC Vérifiées
description: Guide complet du Programme des VTC Vérifiées…
version: 1.3.0
lastUpdated: 2026-09-30
---
```

Both fields are shown in the page footer (`v1.3.0 · Updated Sep 30, 2026`). They also drive the [Translation Status](https://docs.trucklinemp.com/web-docs/contribute/translation-status/) page and the "outdated translation" banner. CI fails if either one is missing.

| You are… | `version` | `lastUpdated` |
|---|---|---|
| Translating a page, or syncing a translation | **Copy it from the current English page** | Today |
| Changing English content meaningfully (new section, changed rules or steps) | **Bump it** (e.g. `1.3.0` → `1.4.0`). Every translation of the page then shows as *Outdated*, which is intended. | Today |
| Fixing a typo, a link or formatting in English | Keep it, so translations aren't flagged for nothing | Today |
| Fixing a typo in a translation | Keep it | Today |

- `lastUpdated` is a plain date: `2026-09-30`. No quotes, no time.
- Only set a translation's `version` to the English one **once the content really matches**. A partially synced page keeps its old version, so it keeps showing as *Outdated*.
- Translate the values of `title` and `description`. Leave the other fields (`template`, `hero`, …) as they are.

---

## Translating a page

1. Open the English source, e.g. `src/content/docs/web-docs/vtc-programs/verified.mdx`.
2. Create or update the file at the same path under your language folder: `src/content/docs/fr/web-docs/vtc-programs/verified.mdx`. Keep the English file and folder names.
3. Translate it, following the rules below.
4. Add or update the page's label for your language in `src/lib/sidebar.mjs`.

### Relative paths: one more `../`

Translated files sit one folder deeper than English, so **every relative path needs one extra `../`**. This is the most common CI failure.

```mdx
<!-- English: src/content/docs/web-docs/vtc-programs/verified.mdx -->
import { LEGAL_URLS } from "../../../../lib/legal-urls";

<!-- French: src/content/docs/fr/web-docs/vtc-programs/verified.mdx -->
import { LEGAL_URLS } from "../../../../../lib/legal-urls";
```

The same applies to component imports and to the homepage's `hero.image.file` (`../../assets/…` → `../../../assets/…`).

### Links

- Start internal links with your language: `/web-docs/vtc/creating/` → `/fr/web-docs/vtc/creating/`.
- Keep the English path segments. Don't translate URLs.
- Always start with `/`. `de/web-docs/…` without the slash resolves relative to the current page and breaks.
- Linking to a page that isn't translated yet is fine: that URL shows the English page.
- Leave external links (`https://…`) unchanged.

### Anchors (`#section`)

Anchors are generated from the **translated** heading, so an anchor copied from English breaks the link (and the build):

```md
<!-- ❌ copied from English -->
[Avant de commencer](/fr/web-api/overview/#before-you-start)

<!-- ✅ matches the French heading "## Avant de commencer" -->
[Avant de commencer](/fr/web-api/overview/#avant-de-commencer)
```

To get the anchor, lowercase the heading, replace spaces with `-` and drop punctuation. Non-Latin scripts are kept as they are (`#перед-тем-как-начать`). If you rename a heading, update every link that points to it.

### Links built from variables

In MDX, `{…}` is **not** evaluated inside a Markdown link, and it produces a broken URL. Use an HTML link instead:

```mdx
<!-- ❌ -->
[Terms of Service]({LEGAL_URLS.termsOfService})

<!-- ✅ -->
<a href={LEGAL_URLS.termsOfService}>Terms of Service</a>
```

### Headings and structure

- Translate **every heading**, including step names (e.g. `Identity` → `Identité`).
- Keep the same headings (number, order, levels) as the English page.
- Don't add a `# Title` at the top of the page. The `title` from the frontmatter is already displayed.
- Keep lists, tables, callouts (`:::note`, `:::caution`, …), code blocks and components as they are in the source.

### Don't translate

- URLs, file paths, file names and image names
- Code blocks, inline code, API parameters, JSON keys
- Component names and settings (`icon`, `status`, `href` paths). Only text props like `title`, `description`, `tag`, `statusLabels`, `ctaLabel` are translated.
- Email addresses and Discord invite links
- **VTC**, **VBC** and **TrucklineMP**

For interface labels (button names, menus, error messages quoted from the website), follow what your language already does elsewhere in the docs. If you're unsure, mention it in the PR.

### Style

- Translate the meaning, not word for word. Keep the original tone: professional but approachable.
- Use **one term per concept** across your whole language. Read a few existing pages first and reuse their terms.
- Stick to one regional variant: `pt` is European Portuguese (*tu*, *precisas*), `pt-br` is Brazilian Portuguese (*você*, *precisa*).

### Homepage

The homepage cards and the contributors block take text props. Translate them, and start each `href` with your language:

```mdx
<ModuleCard
  title="Documentation Web"
  tag="Plateforme"
  icon="open-book"
  status="available"
  statusLabels={{ available: 'Disponible', soon: 'Bientôt' }}
  ctaLabel="Explorer"
  href="/fr/web-docs/vtc/creating/"
  description="…"
/>

<ContributorAvatars
  heading="Rendu possible grâce à vous"
  subheading="…"
  caption="…"
  emptyState="…"
/>
```

---

## Sidebar labels

Sidebar labels and their translations are in `src/lib/sidebar.mjs`.

Labels are keyed by the **`lang`** from the [Languages](#languages) table, not by the folder name: use `"pt-BR"`, not `"pt-br"`. Keys that contain `-` need quotes.

Pages and groups use `translations`:

```js
{
  slug: "web-docs/vtc-programs/verified",
  label: "Verified VTC Program",
  translations: {
    fr: "Programme des VTC Vérifiées",
    "pt-BR": "Programa de VTCs Verificadas",
  },
},
```

The four top-level sections (Web Docs, Web API, Game Docs, Game SDK) work differently. Their `label` is an object with one entry per language, and `translations` has no effect on them:

```js
{
  label: {
    en: "Web Docs",
    fr: "Documentation Web",
  },
  link: "web-docs/vtc/creating",
}
```

Only add or edit your language's entries. Leave `slug`, `link`, `icon` and the order unchanged.

---

## Other changes

- **New English page:** create it with complete frontmatter (`version: 1.0.0`, `lastUpdated`: today) and add its `slug` to `src/lib/sidebar.mjs`. CI fails if a page is missing from the sidebar, or if a sidebar entry has no page.
- **New language:** get in touch on Discord first (see [Questions](#questions)). A language is added with one entry in `src/lib/locales.mjs` and a folder `src/content/docs/<code>/`.
- **Code, components or config:** open a separate PR from any content change, and explain what it fixes.

---

## Checks

CI runs these on every pull request. You can run them yourself before pushing:

| Command | What it catches |
|---|---|
| `npm run validate` | Missing frontmatter, broken relative paths, translations without an English page, sidebar mistakes. Outdated translations appear as **warnings**, not errors. |
| `npm run check` | Type errors in components and configuration |
| `npm run build` | Invalid MDX, and **broken internal links and anchors** |

The **Summary** tab of the CI run lists any errors and shows a translation progress table for each language.

If a check fails, fix the content. Don't delete a link or heading just to make the check pass.

---

## Commits and pull requests

Keep **one topic per PR**: one language, or English-only changes. Don't mix translations with code, config or dependency changes.

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/), with the language as scope:

```
docs(fr): translate verified VTC program guide
docs(ru): sync outdated pages with English v1.3.0
fix(de): correct import path in livery guidelines
docs: add webhooks retry section
```

In the PR description, list:

- the pages you **added** and the pages you **updated**;
- anything you left untranslated on purpose, or weren't sure about.

---

## Using AI tools

Translation and coding assistants are welcome, as long as the result meets the same bar as any other contribution:

- **A fluent speaker reviews every translation** before it's submitted. Say in the PR if a tool was used.
- **Work from the current English page.** Never translate from another translation.
- **Don't invent content.** No sections, examples, limits or URLs that aren't in the English page, and no "improving" the source while translating.
- **Stay in scope.** A translation PR only touches its own language folder and its sidebar labels. Report problems in English pages or other languages in the PR description instead of fixing them.
- **Keep diffs small.** Don't reformat untouched lines or change line endings.
- **To sync an outdated page,** look at what changed in English (`git log -p -- src/content/docs/<path>`) and apply only those changes, rather than retranslating the whole page.
- **Read `version` from the English file.** Don't guess it.

Most assistants read `AGENTS.md` automatically, and it points to this file.

---

## Questions

- Contributors Discord: [discord.gg/jsuGrx4Rbv](https://discord.gg/jsuGrx4Rbv)
- Translation progress: [Translation Status](https://docs.trucklinemp.com/web-docs/contribute/translation-status/)
