# Technical SEO — BPR-RI Public Portal

**Date:** 2026-07-02
**Status:** Approved
**Scope:** Full technical SEO for the public portal (`app/(public)/**`). Admin (`/admin`) and API (`/api`) routes are intentionally excluded from indexing.

## Goal

Close every technical-SEO gap on the public portal so that search engines and
social platforms can fully discover, understand, and render the site. Effort is
deliberately maximal ("kerahkan semua effort"), but bounded by YAGNI (see
Out of Scope).

## Context

- **Stack:** Next.js 16.2.9 (App Router), React 19.2.4.
- **Domain:** `https://www.dpd-bprri-007.com`, read from
  `process.env.NEXT_PUBLIC_SITE_URL`. URLs are **never** hardcoded.
- **Public routes:** `/` (Beranda), `/profil`, `/struktur-organisasi`,
  `/anggota`, `/anggota/[slug]`, `/berita`, `/berita/[slug]`, `/kontak`.
- **AGENTS.md constraint:** this is a modified Next.js; the relevant guide under
  `node_modules/next/dist/docs/` MUST be read before writing metadata-route or
  metadata code (sitemap, robots, manifest, opengraph-image, generateMetadata).

### Already in place (do not rebuild)
- Root `app/layout.tsx`: `metadataBase`, title template/default, description,
  OpenGraph, Twitter card.
- `app/sitemap.ts` via `@blawness/admin-kit/public` `getSitemapEntries`
  (includes articles under `/berita`).
- `app/rss.xml/route.ts` via `generateRssXml`.
- Root `app/opengraph-image.tsx` (generated 1200×630 with logo).
- Per-page `title`/`description` on all pages; `generateMetadata` on
  `berita/[slug]` and `anggota/[slug]`.

### Key gaps
- No `robots.ts`.
- No structured data (JSON-LD) anywhere.
- No `alternates.canonical` on any page.
- No web app manifest / apple-touch icon.
- Only a site-wide OG image (no per-article card).
- Article `generateMetadata` ignores existing DB fields `metaTitle`,
  `metaDescription`, `ogImage`.

## Organization facts (single source of truth)

Centralized in `lib/seo/org.ts`, sourced from `components/layout/Footer.tsx`
and `app/(public)/kontak/page.tsx`:

- **Legal name:** Badan Pusat Reklasseering Republik Indonesia
- **Alternate names:** DPD Tk.I DKI Jakarta, BPR-RI
- **Logo:** `/logo.png`
- **Email:** `ketua@dpd-bprri-007.com`
- **Phone:** `021-392-8018`
- **Address:** Gedung Yayasan Purna Bakti (YARNATI), Lt. 4 Ruang 407–408,
  Jl. Proklamasi No. 44, Pegangsaan, Menteng, Jakarta Pusat 10320, ID
- **sameAs:** `[]` — footer social icons are placeholders; leave empty until
  real profile URLs exist.

## Architecture / components

New, small, single-purpose units:

| Unit | Path | Purpose | Depends on |
|------|------|---------|-----------|
| `getSiteUrl()` | `lib/seo/site.ts` | Resolve `NEXT_PUBLIC_SITE_URL` with localhost fallback; one place. | env |
| Org constants | `lib/seo/org.ts` | Org facts above as typed constants. | `getSiteUrl` |
| Schema builders | `lib/seo/schema.ts` | Pure functions returning typed JSON-LD objects: `organizationSchema()`, `websiteSchema()`, `newsArticleSchema(article)`, `personSchema(member)`, `breadcrumbSchema(items)`. | org, site |
| `<JsonLd>` | `components/seo/JsonLd.tsx` | Server component rendering `<script type="application/ld+json">` with the object serialized. | none |

### Work items

1. **`app/robots.ts`** — `MetadataRoute.Robots`: `allow: "/"`,
   `disallow: ["/admin", "/api"]`, `sitemap: ${siteUrl}/sitemap.xml`,
   `host: siteUrl`.

2. **JSON-LD infrastructure** — create `lib/seo/site.ts`, `lib/seo/org.ts`,
   `lib/seo/schema.ts`, `components/seo/JsonLd.tsx` (as above).

3. **Global JSON-LD** — inject `organizationSchema()` (typed as
   Organization + GovernmentOrganization) and `websiteSchema()` (with a
   `SearchAction` `potentialAction`) once in root `app/layout.tsx`.

4. **Canonical URLs** — add `alternates: { canonical: "<path>" }` to every
   page: static pages via `export const metadata`, dynamic pages via their
   `generateMetadata`. Relative paths resolve against `metadataBase`.

5. **Article page (`berita/[slug]`)**
   - `generateMetadata`: prefer `metaTitle`/`metaDescription`/`ogImage`, fall
     back to `title`/`excerpt`/`coverImageUrl`; add `openGraph.type:"article"`,
     `publishedTime`, `modifiedTime`, `authors:[authorName]`,
     `section: categoryName`, `tags`; add Twitter card; add canonical.
   - Render `newsArticleSchema(post)` + `breadcrumbSchema(...)` via `<JsonLd>`.

6. **Member page (`anggota/[slug]`)**
   - `generateMetadata`: add `openGraph.type:"profile"`, member photo as OG
     image, canonical.
   - Render `personSchema(member)` (`worksFor` → Organization) +
     `breadcrumbSchema(...)`.

7. **Breadcrumbs on other deep pages** — `profil`,
   `struktur-organisasi`, `anggota` (list), `berita` (list), `kontak`: add
   `breadcrumbSchema(...)` via `<JsonLd>`.

8. **Root metadata enrichment** (`app/layout.tsx`) — add `keywords`,
   `authors`/`publisher`, `robots` directives (`index, follow` +
   `googleBot: { "max-image-preview": "large", "max-snippet": -1 }`),
   `formatDetection`, and **optional** `verification.google` fed from
   `process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION` (undefined → field omitted).

9. **`app/manifest.ts`** — `MetadataRoute.Manifest`: name, short_name
   ("BPR-RI"), description, `start_url:"/"`, `display:"standalone"`,
   theme/background colors (navy), icons from `/logo.png` (192 + 512).

10. **Apple touch icon** — `app/apple-icon.png` (or `apple-icon.tsx`
    generated) so iOS gets a proper home-screen icon.

11. **Per-article OG image** —
    `app/(public)/berita/[slug]/opengraph-image.tsx`: `ImageResponse`
    1200×630 branded card (title + category + logo, navy/gold). Reuses the
    logo base64 pattern from root `opengraph-image.tsx`. When an article has
    its own `ogImage`/`coverImageUrl`, that image still wins in metadata; the
    generated route is the fallback social card.

## Data flow

- Env → `getSiteUrl()` → `metadataBase` + all absolute URLs in schema/robots/
  sitemap/manifest.
- DB (`getPublishedArticleBySlug`, `members`) → `generateMetadata` + schema
  builders → `<head>` tags + inline JSON-LD.

## Error handling / edge cases

- Missing article/member → existing `notFound()` path; no schema emitted.
- Null optional fields (`ogImage`, `publishedAt`, member photo) → schema
  builders omit those keys rather than emitting `null`/empty.
- `NEXT_PUBLIC_GOOGLE_VERIFICATION` unset → `verification` omitted entirely.
- Empty article/member tables → existing `_empty_placeholder_`
  `generateStaticParams` behavior unchanged.

## Verification

- `next build` passes.
- `curl` dev `/robots.txt`, `/manifest.webmanifest`, `/sitemap.xml` return
  valid content.
- View-source one article: canonical present, `og:type=article`,
  NewsArticle + BreadcrumbList JSON-LD present and valid.
- One article's `/berita/<slug>/opengraph-image` renders a PNG.
- Root page: Organization + WebSite JSON-LD present.

## Out of scope (YAGNI)

- hreflang / i18n alternates (single `id` locale).
- Third-party SEO libraries.
- Analytics / tag-manager install.
- Content/copy rewriting.
- Real `sameAs` social URLs (none exist yet).
- Completing DNS verification (user handles this in Search Console via the
  Domain-type property; no code needed).

## Environment

- `.env`: add commented placeholder
  `# NEXT_PUBLIC_GOOGLE_VERIFICATION=` (optional; DNS Domain verification is
  the primary method the user is using).
