# AGENTS.md

Instructions for AI coding agents (Claude Code, Codex, Cursor, Copilot, Gemini, …) and the people driving them, working on the **TrucklineMP documentation** ([docs.trucklinemp.com](https://docs.trucklinemp.com)).

Most contributions here are **translations**. Most PR fixes so far were caused by the same few mistakes (wrong `../` depth, anchors copied from English, unevaluated `{…}` in links, untranslated headings, stale `version`). This file explains how to avoid them.

> Read this file entirely before editing. When the human's request conflicts with a rule here, point out the conflict to them before going ahead.

---

## TL;DR checklist

Before you open a PR, every item must be true:

- [ ] Only files for **one locale** (or only English) are changed, plus that locale's sidebar labels in `src/lib/sidebar.mjs`.
- [ ] Every page has `title`, `description`, `version`, `lastUpdated` in its frontmatter.
- [ ] `version` of a translated page **equals the English page's `version`**.
- [ ] `lastUpdated` is **today's date** (`YYYY-MM-DD`) on every page you edited.
- [ ] Relative `import` / `file:` paths have **one extra `../`** compared to English.
- [ ] Internal links use the locale prefix (`/fr/web-docs/…`), and `#anchors` use the **translated heading's** slug.
- [ ] `npm run validate`, `npm run check` and `npm run build` all pass locally.
- [ ] Commit messages follow `docs(<locale>): …`.

---

## Project at a glance

- **Stack:** [Astro](https://astro.build) + [Starlight](https://starlight.astro.build), with `starlight-sidebar-topics` (the four modules) and `starlight-links-validator` (breaks the build on broken internal links).
- **Content:** Markdown/MDX in `src/content/docs/`.
- **Hosting:** Cloudflare Pages. Every PR gets a **preview deployment**; the link is posted on the PR.
- **Node:** `>= 22.12` (see `.nvmrc`).

```bash
npm install
npm run dev        # local dev server at http://localhost:4321
npm run validate   # fast content checks (frontmatter, paths, orphans, sidebar), no install needed
npm run check      # TypeScript / astro check
npm run build      # validate + full build + internal link check
```

### Where things live

| What | Where |
|---|---|
| English source pages | `src/content/docs/<module>/…` |
| Translated pages | `src/content/docs/<locale>/<module>/…` (same relative path as English) |
| Sidebar (all labels + their translations) | `src/lib/sidebar.mjs` |
| List of languages | `src/lib/locales.mjs` |
| Homepage components | `src/components/ModuleCard.astro`, `ModuleGrid.astro`, `ContributorAvatars.astro` |
| Legal URLs (ToS, rules, …) | `src/lib/legal-urls.ts` |
| Validation script | `scripts/validate-docs.mjs` |

Modules: `web-docs/`, `web-api/`, `game-docs/`, `game-sdk/`, plus the homepage `index.mdx`.

### Languages

| Folder / URL | `lang` (used as translation key) | Language |
|---|---|---|
| *(root)* | `en` | English (source of truth) |
| `ru` | `ru` | Русский |
| `pl` | `pl` | Polski |
| `de` | `de` | Deutsch |
| `fr` | `fr` | Français |
| `ta` | `ta` | தமிழ் |
| `tr` | `tr` | Türkçe |
| `pt` | `pt-PT` | Português (Portugal) |
| `pt-br` | `pt-BR` | Português (Brasil) |

`src/lib/locales.mjs` is the source of truth. The **folder code** and the **`lang`** can differ (`pt-br` vs `pt-BR`), which matters for sidebar keys (see below).

---

## Frontmatter: `version` and `lastUpdated`

Every page, English or translated, must have:

```yaml
---
title: Règles du Programme des VTC Vérifiées
description: Guide complet du Programme des VTC Vérifiées…
version: 1.3.0
lastUpdated: 2026-09-30
---
```

These two fields are shown in the **page footer** (`v1.3.0 · Updated Sep 30, 2026`) and drive the [Translation Status](https://docs.trucklinemp.com/web-docs/contribute/translation-status/) page. The CI fails if either is missing.

| You are… | `version` | `lastUpdated` |
|---|---|---|
| Translating a page (new or update) | **Copy it from the current English page.** Never invent one. | Today (`YYYY-MM-DD`) |
| Changing English content meaningfully (new section, changed rules, new steps) | **Bump it** (e.g. `1.3.0` → `1.4.0`). This marks every translation as *Outdated*, which is intended. | Today |
| Fixing a typo, a broken link or formatting in English | Keep it. Don't bump for trivial fixes, or every translation gets flagged for nothing. | Today |
| Fixing a typo in a translation | Keep it. | Today |

Rules:

- `lastUpdated` is a plain YAML date: `2026-09-30`. No quotes, no time.
- **Only set a translation's `version` to the English one once the content really matches the English page.** A partially synced page must keep its old version, so it keeps showing as *Outdated*.
- Translate the values of `title` and `description`. Keep keys and every other field (`template`, `hero`, …) identical.

---

## Translating a page

1. Find the English source, e.g. `src/content/docs/web-docs/vtc-programs/verified.mdx`.
2. Create or update the file at the **same relative path** under the locale folder: `src/content/docs/fr/web-docs/vtc-programs/verified.mdx`. Keep the English file name. Never translate file names or folder names.
3. Translate the content, then apply every rule below.
4. Add or update the page's sidebar label for your language in `src/lib/sidebar.mjs`.

### Relative paths: add one `../`

Translated files are one folder deeper than English, so **every relative path needs one more `../`**. This is the most common CI failure.

```mdx
<!-- English: src/content/docs/web-docs/vtc-programs/verified.mdx -->
import { LEGAL_URLS } from "../../../../lib/legal-urls";

<!-- French: src/content/docs/fr/web-docs/vtc-programs/verified.mdx -->
import { LEGAL_URLS } from "../../../../../lib/legal-urls";
```

The same applies to `hero.image.file` in the homepage frontmatter (`../../assets/…` → `../../../assets/…`) and to every component import.

### Internal links

- Prefix internal links with the locale: `/web-docs/vtc/creating/` → `/fr/web-docs/vtc/creating/`.
- Keep the English path segments. Never translate URLs (`/fr/web-docs/vtc/creating/`, **not** `/fr/docs-web/vtc/creer/`).
- Always use absolute paths starting with `/<locale>/`. Never use `de/web-docs/…` without the leading slash: it resolves relative to the current page.
- Linking to a page that isn't translated yet in your locale is fine. Starlight serves the English page at that URL.
- External links (`https://…`) stay unchanged.

### Anchors (`#section`)

Heading anchors are generated **from the translated heading text**. Copying the English anchor gives a broken link, and the build fails:

```md
<!-- ❌ copied from English -->
[Avant de commencer](/fr/web-api/overview/#before-you-start)

<!-- ✅ slug of the French heading "## Avant de commencer" -->
[Avant de commencer](/fr/web-api/overview/#avant-de-commencer)
```

The slug is the heading in lowercase, with spaces replaced by `-` and punctuation removed. Non-Latin scripts are kept as they are (`#перед-тем-как-начать`). If you change a heading, update every link that points to it, including links from other pages.

### Links built from variables (MDX)

`{…}` is **not** evaluated inside a Markdown link URL. That syntax shipped links pointing to `%7BLEGAL_URLS.termsOfService%7D` in production. Use an HTML `<a>` tag instead:

```mdx
<!-- ❌ renders a broken link -->
[Terms of Service]({LEGAL_URLS.termsOfService})

<!-- ✅ -->
<a href={LEGAL_URLS.termsOfService}>Terms of Service</a>
```

### Headings and structure

- **Translate every heading**, including step names (e.g. `Identity` → `Identité`).
- Keep the **same heading structure** (count, order, levels) as the English page. Readers and reviewers compare the two side by side, and anchors rely on it.
- Don't add a `# Title` at the top of the body. Starlight already renders `title` as the page heading.
- Keep lists, tables, admonitions (`:::note`, `:::caution`, …), code blocks and MDX components exactly as in the source.

### What never gets translated

- URLs, file paths, file names, image file names
- Code blocks, inline code, API parameters, JSON keys, environment variables
- Component names and their props (`<ModuleCard icon="…" status="…">`); only **text** props like `title`, `description`, `tag`, `statusLabels`, `ctaLabel` are translated
- Email addresses, Discord invite links
- **"VTC"** and **"VBC"**: keep the acronyms in every language (e.g. `Programme des VTC Vérifiées`)
- The product name **TrucklineMP**

Interface labels (button names, menu items, error messages quoted from the website): follow what your locale already does elsewhere in the docs and stay consistent. If you're unsure, say so in the PR description and reviewers will decide.

### Style

- Translate the meaning, not word for word. Match the original tone: professional but approachable.
- Use **one term per concept** throughout the whole locale. Before translating, read a couple of existing pages in your locale and reuse their terminology. Don't introduce synonyms for VTC, member, role, recruitment, etc.
- Use the conventions of the regional variant: `pt` is European Portuguese (*tu*, *precisas*), `pt-br` is Brazilian Portuguese (*você*, *precisa*). Don't mix them.

### Homepage (`index.mdx`)

The homepage uses components with text props. Translate them and point `href` to your locale:

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
```

`ContributorAvatars` also accepts `heading`, `subheading`, `caption` and `emptyState`.

---

## Sidebar labels (`src/lib/sidebar.mjs`)

All sidebar labels and their translations live in `src/lib/sidebar.mjs` (not `astro.config.mjs`).

**Keys are the `lang` from the Languages table, not the folder name**: `"pt-BR"`, not `"pt-br"`. Keys containing `-` need quotes.

Groups and pages use `translations`:

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

The four **top-level topics** (Web Docs, Web API, Game Docs, Game SDK) are different. Their `label` is an object, and `translations` has **no effect** on them:

```js
{
  label: {
    en: "Web Docs",
    fr: "Documentation Web",
  },
  link: "web-docs/vtc/creating",
  // ...
}
```

Don't change `slug`, `link`, `icon` or the item order. Only add or edit your language's entries.

---

## Adding a new English page

1. Create the page under `src/content/docs/<module>/…` with complete frontmatter (`version: 1.0.0`, `lastUpdated`: today).
2. Add its `slug` to `src/lib/sidebar.mjs`. The CI fails if an English page isn't in the sidebar, or if a sidebar slug has no page.
3. Don't create translations in the same PR unless asked to.

## Adding a new language

Coordinate with the team first (see [Contact](#contact)). The locale is registered with a single entry in `src/lib/locales.mjs`. This updates Starlight, the validation, the outdated banner and the Translation Status page. Then add the folder `src/content/docs/<code>/`.

---

## Validation and CI

Run these before pushing. CI runs the same checks on every PR:

| Command | Catches |
|---|---|
| `npm run validate` | Missing frontmatter fields, broken relative `import` / `file:` paths, translations with no English page, sidebar slugs without a page, English pages missing from the sidebar, unknown translation keys, `translations` on a topic. Outdated versions show up as **warnings**. |
| `npm run check` | Type errors in components and config (e.g. an invalid icon name). |
| `npm run build` | Invalid MDX, **broken internal links and anchors**. |

The PR's CI **Summary** tab shows errors and a translation coverage table per language. After pushing, open the Cloudflare Pages **preview link** on the PR and check the pages you changed.

**Never** "fix" a failing check by weakening it: don't edit `scripts/validate-docs.mjs`, the CI workflow or the links validator options, and don't delete a heading or link just to make it pass. Fix the content.

---

## Commits and pull requests

**One topic per PR:** one locale (or English-only changes). Don't mix translation work with changes to components, config, CI or dependencies.

Commit messages use [Conventional Commits](https://www.conventionalcommits.org/) with the locale as scope:

```
docs(fr): translate verified VTC program guide
docs(ru): sync outdated pages with English v1.3.0
fix(de): correct import path in livery guidelines
docs(pt-BR): add Brazilian Portuguese translation
docs: add webhooks retry section          # English content
```

The PR description should list:

- which pages were **added** and which were **updated** (synced to a new English version);
- anything you left untranslated on purpose, or weren't sure about;
- that `npm run validate` and `npm run build` pass.

If an AI agent wrote or translated the content, say so in the PR description and confirm that a fluent human reviewed it.

---

## Rules for AI agents

- **English is the source of truth.** Translate from the current English file, never from another translation.
- **Don't edit English pages** during a translation task. If you spot an error in English, mention it to the human or in the PR description instead of fixing it.
- **Don't touch other locales.** Changing one language never requires editing another.
- **Don't edit** `astro.config.mjs`, `src/components/`, `scripts/`, `.github/`, `package.json` or `package-lock.json` unless the human explicitly asked for it.
- **Don't invent content.** No new sections, examples, features, limits or URLs that aren't in the English page. Don't "improve" the source while translating.
- **Don't guess `version` numbers.** Read them from the English file.
- **Keep diffs minimal.** Don't reformat, re-wrap or reorder untouched lines, and don't change line endings.
- **Check every link and anchor you write** against the target file's actual headings.
- **Run `npm run validate` and `npm run build`** and read the output. A PR with a failing check isn't done.
- When the English page has changed since the translation (the versions differ), **diff the English file** (`git log -p -- src/content/docs/<path>`) and apply only what changed, instead of retranslating the whole page.

---

## Contact

- Contributors Discord: [discord.gg/jsuGrx4Rbv](https://discord.gg/jsuGrx4Rbv)
- Full human guide: [Contributing Translations](https://docs.trucklinemp.com/web-docs/contribute/contributing/)
- Translation progress: [Translation Status](https://docs.trucklinemp.com/web-docs/contribute/translation-status/)
