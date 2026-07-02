# Technical SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close every technical-SEO gap on the BPR-RI public portal (robots, JSON-LD, canonicals, manifest, icons, enriched metadata, per-article OG images).

**Architecture:** A small `lib/seo/` layer holds the single source of truth (site URL, org facts, JSON-LD builders) plus one `<JsonLd>` server component. Metadata-route files (`robots.ts`, `manifest.ts`, `opengraph-image.tsx`) and per-page `generateMetadata`/`metadata` consume that layer. URLs are always derived from `NEXT_PUBLIC_SITE_URL`.

**Tech Stack:** Next.js 16.2.9 App Router, React 19.2.4, TypeScript, `next/og` (`ImageResponse`), `@blawness/admin-kit/public`, Drizzle ORM.

## Global Constraints

- **No test harness exists.** There is no jest/vitest. Per-task verification is `npx tsc --noEmit` + `curl` against a running dev server + `grep`. A full `npm run build` is the final gate (Task 8). Do NOT add a test framework — out of scope.
- **This is a modified Next.js** (see `AGENTS.md`). Before writing any metadata code, READ the relevant doc under `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/` and `.../04-functions/generate-metadata.md`. Heed deprecation notices.
- **Never hardcode the domain.** Always read `process.env.NEXT_PUBLIC_SITE_URL` (value: `https://www.dpd-bprri-007.com`; localhost fallback for dev).
- **Metadata merge rule:** page-level `openGraph`/`robots`/`twitter` **replace** (not merge with) the root's. Pages that only need a canonical must set `alternates` **only** and must NOT set `openGraph` (so the root OG is inherited).
- **Locale:** `id_ID`. Single locale — no hreflang.
- **Import alias:** `@/*` → repo root.
- **Work directly on `main`.** Commit after each task. End every commit message with:
  `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`
- **Org facts are fixed** (from `components/layout/Footer.tsx` + `app/(public)/kontak/page.tsx`) — copy verbatim from Task 2.
- **Brand colors:** navy-950 `#0a192f`, navy-900 `#102a43`, gold-500 `#ffd700`, gold-400 `#ffcf1a`, white `#ffffff`.

**Setup for every session:** run the dev server once in the background before verifying:
```bash
cd /home/blawness/projects/bpr-ri && npm run dev
```
Assume it serves on `http://localhost:3000`. If a task's `curl` connection is refused, start it first.

---

### Task 1: Site-URL helper + `robots.ts`

**Files:**
- Create: `lib/seo/site.ts`
- Create: `app/robots.ts`

**Interfaces:**
- Produces: `getSiteUrl(): string` — absolute origin with no trailing slash, from `NEXT_PUBLIC_SITE_URL` (fallback `http://localhost:3000`). Used by every later task.

- [ ] **Step 1: Read the docs**

Read `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/robots.md`. Confirm the `MetadataRoute.Robots` shape (`rules`, `sitemap`, `host`).

- [ ] **Step 2: Create `lib/seo/site.ts`**

```ts
/** Absolute site origin, no trailing slash. Single source of truth for URLs. */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return raw.replace(/\/$/, "");
}
```

- [ ] **Step 3: Create `app/robots.ts`**

```ts
import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
```

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 5: Verify the rendered output**

Run: `curl -s http://localhost:3000/robots.txt`
Expected: contains `Allow: /`, `Disallow: /admin`, `Disallow: /api`, and `Sitemap: https://www.dpd-bprri-007.com/sitemap.xml` (or the localhost sitemap in dev).

- [ ] **Step 6: Commit**

```bash
git add lib/seo/site.ts app/robots.ts
git commit -m "feat(seo): add robots.ts and site-url helper

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: SEO lib (org facts, JSON-LD builders, `<JsonLd>`) + global Organization/WebSite + root metadata enrichment

**Files:**
- Create: `lib/seo/org.ts`
- Create: `lib/seo/schema.ts`
- Create: `components/seo/JsonLd.tsx`
- Modify: `app/layout.tsx`
- Modify: `.env`

**Interfaces:**
- Consumes: `getSiteUrl()` from Task 1.
- Produces:
  - `ORG` constant (org facts) and `ORG_ID`, `WEBSITE_ID` string constants (stable `@id` URIs).
  - `organizationSchema(): object`, `websiteSchema(): object`,
    `newsArticleSchema(a: ArticleSchemaInput): object`,
    `personSchema(m: PersonSchemaInput): object`,
    `breadcrumbSchema(items: { name: string; path: string }[]): object`.
  - Types `ArticleSchemaInput`, `PersonSchemaInput` (exact fields below).
  - `<JsonLd data={object} />` server component.

- [ ] **Step 1: Read the docs**

Read `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md` sections `robots`, `verification`, `authors`, `keywords`, `alternates`. Confirm field shapes.

- [ ] **Step 2: Create `lib/seo/org.ts`**

```ts
import { getSiteUrl } from "@/lib/seo/site";

const siteUrl = getSiteUrl();

/** Stable @id anchors so nodes can cross-reference each other. */
export const ORG_ID = `${siteUrl}/#organization`;
export const WEBSITE_ID = `${siteUrl}/#website`;

/** Organization facts — source of truth mirrors Footer.tsx & kontak/page.tsx. */
export const ORG = {
  legalName: "Badan Pusat Reklasseering Republik Indonesia",
  name: "DPD Tk.I DKI Jakarta — BPR-RI",
  alternateName: ["DPD Tk.I DKI Jakarta", "BPR-RI"],
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  email: "ketua@dpd-bprri-007.com",
  telephone: "+62-21-392-8018",
  address: {
    streetAddress:
      "Gedung Yayasan Purna Bakti (YARNATI), Lt. 4 Ruang 407–408, Jl. Proklamasi No. 44, Pegangsaan, Menteng",
    addressLocality: "Jakarta Pusat",
    addressRegion: "DKI Jakarta",
    postalCode: "10320",
    addressCountry: "ID",
  },
  // No verified public social profiles yet; fill when available.
  sameAs: [] as string[],
} as const;
```

- [ ] **Step 3: Create `lib/seo/schema.ts`**

```ts
import { getSiteUrl } from "@/lib/seo/site";
import { ORG, ORG_ID, WEBSITE_ID } from "@/lib/seo/org";

const siteUrl = getSiteUrl();

/** Absolute-ise a path or pass through an already-absolute URL. */
function abs(pathOrUrl: string): string {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return `${siteUrl}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["GovernmentOrganization", "Organization"],
    "@id": ORG_ID,
    name: ORG.name,
    legalName: ORG.legalName,
    alternateName: ORG.alternateName,
    url: ORG.url,
    logo: ORG.logo,
    email: ORG.email,
    telephone: ORG.telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress: ORG.address.streetAddress,
      addressLocality: ORG.address.addressLocality,
      addressRegion: ORG.address.addressRegion,
      postalCode: ORG.address.postalCode,
      addressCountry: ORG.address.addressCountry,
    },
    ...(ORG.sameAs.length > 0 ? { sameAs: ORG.sameAs } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteUrl,
    name: ORG.name,
    inLanguage: "id-ID",
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/berita?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export type ArticleSchemaInput = {
  title: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  publishedAt?: Date | null;
  updatedAt?: Date | null;
  authorName?: string | null;
  categoryName?: string | null;
};

export function newsArticleSchema(a: ArticleSchemaInput) {
  const url = abs(`/berita/${a.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: a.title,
    ...(a.description ? { description: a.description } : {}),
    ...(a.image ? { image: [abs(a.image)] } : {}),
    ...(a.publishedAt ? { datePublished: a.publishedAt.toISOString() } : {}),
    ...(a.updatedAt || a.publishedAt
      ? { dateModified: (a.updatedAt ?? a.publishedAt!)!.toISOString() }
      : {}),
    ...(a.categoryName ? { articleSection: a.categoryName } : {}),
    ...(a.authorName
      ? { author: { "@type": "Person", name: a.authorName } }
      : {}),
    publisher: { "@id": ORG_ID },
    inLanguage: "id-ID",
  };
}

export type PersonSchemaInput = {
  name: string;
  slug: string;
  position: string;
  photoUrl?: string | null;
  bio?: string | null;
};

export function personSchema(m: PersonSchemaInput) {
  const url = abs(`/anggota/${m.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${url}#person`,
    mainEntityOfPage: { "@type": "ProfilePage", "@id": url },
    name: m.name,
    jobTitle: m.position,
    ...(m.photoUrl ? { image: abs(m.photoUrl) } : {}),
    ...(m.bio ? { description: m.bio } : {}),
    worksFor: { "@id": ORG_ID },
    url,
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}
```

- [ ] **Step 4: Create `components/seo/JsonLd.tsx`**

Escapes `<` to `<` so a `</script>` inside DB content cannot break out.

```tsx
type Props = { data: object };

export function JsonLd({ data }: Props) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
```

- [ ] **Step 5: Wire global JSON-LD + enrich root metadata in `app/layout.tsx`**

Add imports at the top of `app/layout.tsx`:
```tsx
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";
```

In the existing `export const metadata: Metadata = { ... }`, add these keys (keep existing `metadataBase`, `title`, `description`, `openGraph`, `twitter`):
```tsx
  keywords: [
    "BPR-RI",
    "Badan Pusat Reklasseering",
    "Reklasseering Republik Indonesia",
    "DPD Tk.I DKI Jakarta",
    "bantuan hukum",
    "reklasering",
    "pidana bersyarat",
    "lepas bersyarat",
    "informasi publik",
  ],
  authors: [{ name: "Badan Pusat Reklasseering Republik Indonesia" }],
  publisher: "Badan Pusat Reklasseering Republik Indonesia",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { email: false, address: false, telephone: false },
  verification: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION }
    : undefined,
```

Inside the returned JSX, add the two schema scripts inside `<body>` (before `{children}`):
```tsx
      <body className="min-h-full flex flex-col">
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        {children}
      </body>
```

- [ ] **Step 6: Add the env placeholder to `.env`**

Append (commented — DNS Domain verification is the user's primary method; this is an optional extra):
```
# Optional: Google Search Console "HTML tag" verification token (content value only).
# Primary verification is done via DNS (Domain property) in Search Console.
# NEXT_PUBLIC_GOOGLE_VERIFICATION=
```

- [ ] **Step 7: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 8: Verify rendered JSON-LD on the homepage**

Run: `curl -s http://localhost:3000/ | grep -o 'application/ld+json'`
Expected: two matches (Organization + WebSite).

Run: `curl -s http://localhost:3000/ | grep -o '"@type":"WebSite"'` and `... grep -o 'GovernmentOrganization'`
Expected: one match each.

Run: `curl -s http://localhost:3000/ | grep -o 'name="robots"'`
Expected: at least one match (robots meta present).

- [ ] **Step 9: Commit**

```bash
git add lib/seo/org.ts lib/seo/schema.ts components/seo/JsonLd.tsx app/layout.tsx .env
git commit -m "feat(seo): add JSON-LD lib, global Organization/WebSite schema, enrich root metadata

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 3: Canonicals + breadcrumbs on static pages

Covers `/` (Beranda), `/profil`, `/struktur-organisasi`, `/anggota` (list), `/berita` (list), `/kontak`.

**Files:**
- Modify: `app/(public)/page.tsx`
- Modify: `app/(public)/profil/page.tsx`
- Modify: `app/(public)/struktur-organisasi/page.tsx`
- Modify: `app/(public)/anggota/page.tsx`
- Modify: `app/(public)/berita/page.tsx`
- Modify: `app/(public)/kontak/layout.tsx` (kontak page is a client component; its metadata lives in the sibling `layout.tsx` — verify this in Step 1)

**Interfaces:**
- Consumes: `breadcrumbSchema()` and `<JsonLd>` from Task 2.

- [ ] **Step 1: Confirm each page's metadata location**

Run: `grep -rn "export const metadata\|generateMetadata\|use client" app/(public)/page.tsx app/(public)/profil/page.tsx app/(public)/struktur-organisasi/page.tsx app/(public)/anggota/page.tsx app/(public)/berita/page.tsx app/(public)/kontak/page.tsx app/(public)/kontak/layout.tsx`

For any page marked `"use client"`, its `metadata` must live in a sibling/parent `layout.tsx` (client components cannot export `metadata`). `kontak` already uses this pattern.

- [ ] **Step 2: Add `alternates.canonical` to each page's `metadata`**

For each `export const metadata = { ... }`, add the matching canonical. Add ONLY `alternates` (do not add `openGraph` — root OG must be inherited per the merge rule).

- `app/(public)/page.tsx`: `alternates: { canonical: "/" }`
- `app/(public)/profil/page.tsx`: `alternates: { canonical: "/profil" }`
- `app/(public)/struktur-organisasi/page.tsx`: `alternates: { canonical: "/struktur-organisasi" }`
- `app/(public)/anggota/page.tsx`: `alternates: { canonical: "/anggota" }`
- `app/(public)/berita/page.tsx`: `alternates: { canonical: "/berita" }`
- `app/(public)/kontak/layout.tsx`: `alternates: { canonical: "/kontak" }`

Example patch for `app/(public)/profil/page.tsx` (merge into the existing object):
```tsx
export const metadata = {
  title: "Profil",
  description: /* keep existing */ "",
  alternates: { canonical: "/profil" },
};
```

- [ ] **Step 3: Add a breadcrumb `<JsonLd>` to each page component**

In each page's default-exported component, import and render a breadcrumb at the top of the returned JSX. Home page gets NO breadcrumb (it is the root). Imports for each file:
```tsx
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schema";
```

Render as the first child of the top-level returned element:

- `profil`:
```tsx
<JsonLd data={breadcrumbSchema([
  { name: "Beranda", path: "/" },
  { name: "Profil", path: "/profil" },
])} />
```
- `struktur-organisasi`:
```tsx
<JsonLd data={breadcrumbSchema([
  { name: "Beranda", path: "/" },
  { name: "Struktur Organisasi", path: "/struktur-organisasi" },
])} />
```
- `anggota` (list):
```tsx
<JsonLd data={breadcrumbSchema([
  { name: "Beranda", path: "/" },
  { name: "Anggota", path: "/anggota" },
])} />
```
- `berita` (list):
```tsx
<JsonLd data={breadcrumbSchema([
  { name: "Beranda", path: "/" },
  { name: "Berita", path: "/berita" },
])} />
```
- `kontak`: the page is a client component — render the breadcrumb `<JsonLd>` there too (client rendering of a `<script>` tag is fine), OR add it in `kontak/layout.tsx` around `{children}`. Prefer the layout to keep it server-rendered:
```tsx
<JsonLd data={breadcrumbSchema([
  { name: "Beranda", path: "/" },
  { name: "Kontak", path: "/kontak" },
])} />
```

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 5: Verify canonicals + breadcrumbs**

Run each and expect a match:
```bash
curl -s http://localhost:3000/profil | grep -o 'rel="canonical" href="[^"]*profil"'
curl -s http://localhost:3000/profil | grep -o '"@type":"BreadcrumbList"'
curl -s http://localhost:3000/kontak | grep -o 'rel="canonical" href="[^"]*kontak"'
curl -s http://localhost:3000/berita | grep -o '"@type":"BreadcrumbList"'
```
Expected: one match each.

- [ ] **Step 6: Commit**

```bash
git add "app/(public)"
git commit -m "feat(seo): add canonical URLs and breadcrumb JSON-LD to static pages

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 4: Article page — enriched metadata + NewsArticle & Breadcrumb JSON-LD

**Files:**
- Modify: `app/(public)/berita/[slug]/page.tsx`

**Interfaces:**
- Consumes: `newsArticleSchema()`, `breadcrumbSchema()`, `<JsonLd>` from Task 2; existing `getPublishedArticleBySlug` (fields: `title, slug, content, excerpt, coverImageUrl, metaTitle, metaDescription, ogImage, publishedAt, updatedAt, categoryName, categorySlug, authorName, tags[]`).

- [ ] **Step 1: Replace `generateMetadata`**

Prefer DB SEO fields, fall back to base fields; set article OG/Twitter + canonical.
```tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedArticleBySlug(slug);

  if (!post) {
    return { title: "Berita Tidak Ditemukan" };
  }

  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt || post.title;
  const image = post.ogImage || post.coverImageUrl || undefined;

  return {
    title,
    description,
    alternates: { canonical: `/berita/${post.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/berita/${post.slug}`,
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: (post.updatedAt ?? post.publishedAt)?.toISOString(),
      authors: post.authorName ? [post.authorName] : undefined,
      section: post.categoryName ?? undefined,
      tags: post.tags?.map((t) => t.name),
      images: image ? [image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}
```

- [ ] **Step 2: Render NewsArticle + Breadcrumb JSON-LD in the page component**

Add imports:
```tsx
import { JsonLd } from "@/components/seo/JsonLd";
import { newsArticleSchema, breadcrumbSchema } from "@/lib/seo/schema";
```
After the `if (!post) notFound();` guard, inside the returned `<article>` (as first children):
```tsx
<JsonLd data={newsArticleSchema({
  title: post.title,
  slug: post.slug,
  description: post.metaDescription || post.excerpt,
  image: post.ogImage || post.coverImageUrl,
  publishedAt: post.publishedAt,
  updatedAt: post.updatedAt,
  authorName: post.authorName,
  categoryName: post.categoryName,
})} />
<JsonLd data={breadcrumbSchema([
  { name: "Beranda", path: "/" },
  { name: "Berita", path: "/berita" },
  { name: post.title, path: `/berita/${post.slug}` },
])} />
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Verify on a real article**

Get a slug:
```bash
curl -s http://localhost:3000/berita | grep -oE '/berita/[a-z0-9-]+' | grep -v '^/berita$' | head -1
```
Then, with `<slug>` substituted:
```bash
curl -s http://localhost:3000/berita/<slug> | grep -o '"@type":"NewsArticle"'
curl -s http://localhost:3000/berita/<slug> | grep -o 'property="og:type" content="article"'
curl -s http://localhost:3000/berita/<slug> | grep -o 'rel="canonical"'
```
Expected: one match each.

- [ ] **Step 5: Commit**

```bash
git add "app/(public)/berita/[slug]/page.tsx"
git commit -m "feat(seo): enrich article metadata (meta fields, article OG) + NewsArticle/Breadcrumb JSON-LD

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 5: Member page — enriched metadata + Person & Breadcrumb JSON-LD

**Files:**
- Modify: `app/(public)/anggota/[slug]/page.tsx`

**Interfaces:**
- Consumes: `personSchema()`, `breadcrumbSchema()`, `<JsonLd>` from Task 2; existing `getMemberBySlug` (fields: `name, slug, position, division, photoUrl, bio`).

- [ ] **Step 1: Replace `generateMetadata`**

```tsx
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const member = await getMemberBySlug(slug);

  if (!member) return { title: "Tidak Ditemukan" };

  const description = `Profil ${member.name} — ${member.position} di BPR-RI`;
  return {
    title: member.name,
    description,
    alternates: { canonical: `/anggota/${member.slug}` },
    openGraph: {
      type: "profile",
      title: member.name,
      description,
      url: `/anggota/${member.slug}`,
      images: member.photoUrl ? [member.photoUrl] : undefined,
    },
    twitter: {
      card: "summary",
      title: member.name,
      description,
      images: member.photoUrl ? [member.photoUrl] : undefined,
    },
  };
}
```
Add `import { Metadata } from "next";` if not already imported.

- [ ] **Step 2: Render Person + Breadcrumb JSON-LD**

Add imports:
```tsx
import { JsonLd } from "@/components/seo/JsonLd";
import { personSchema, breadcrumbSchema } from "@/lib/seo/schema";
```
After the `if (!member) notFound();` guard, as the first children of the returned `<section>`:
```tsx
<JsonLd data={personSchema({
  name: member.name,
  slug: member.slug,
  position: member.position,
  photoUrl: member.photoUrl,
  bio: member.bio,
})} />
<JsonLd data={breadcrumbSchema([
  { name: "Beranda", path: "/" },
  { name: "Anggota", path: "/anggota" },
  { name: member.name, path: `/anggota/${member.slug}` },
])} />
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Verify on a real member**

```bash
curl -s http://localhost:3000/anggota | grep -oE '/anggota/[a-z0-9-]+' | grep -v '^/anggota$' | head -1
```
Then with `<slug>`:
```bash
curl -s http://localhost:3000/anggota/<slug> | grep -o '"@type":"Person"'
curl -s http://localhost:3000/anggota/<slug> | grep -o 'property="og:type" content="profile"'
curl -s http://localhost:3000/anggota/<slug> | grep -o 'rel="canonical"'
```
Expected: one match each.

- [ ] **Step 5: Commit**

```bash
git add "app/(public)/anggota/[slug]/page.tsx"
git commit -m "feat(seo): enrich member metadata (profile OG) + Person/Breadcrumb JSON-LD

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 6: Web app manifest + apple-touch icon

**Files:**
- Create: `app/manifest.ts`
- Create: `app/apple-icon.tsx`

**Interfaces:**
- Consumes: nothing new (uses `/logo.png` from `public/`).

- [ ] **Step 1: Read the docs**

Read `.../01-metadata/manifest.md` and `.../01-metadata/app-icons.md`. Confirm `MetadataRoute.Manifest` shape and the `apple-icon` generated-route convention (`size`, `contentType`, default-exported `ImageResponse`).

- [ ] **Step 2: Create `app/manifest.ts`**

```ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DPD Tk.I DKI Jakarta — Badan Pusat Reklasseering RI",
    short_name: "BPR-RI",
    description:
      "Portal informasi publik Badan Pusat Reklasseering Republik Indonesia (BPR-RI) — DPD Tk.I DKI Jakarta.",
    start_url: "/",
    display: "standalone",
    lang: "id-ID",
    background_color: "#ffffff",
    theme_color: "#0a192f",
    icons: [
      { src: "/logo.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/logo.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/logo.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
```

- [ ] **Step 3: Create `app/apple-icon.tsx`**

Generates a 180×180 navy tile with the logo (iOS ignores transparency, so a solid tile looks correct on the home screen).
```tsx
import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const logoData = await readFile(join(process.cwd(), "public/logo.png"));
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a192f",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={132} height={132} alt="BPR-RI" />
      </div>
    ),
    { ...size }
  );
}
```

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 5: Verify**

```bash
curl -s http://localhost:3000/manifest.webmanifest | grep -o '"short_name":"BPR-RI"'
curl -s -o /dev/null -w "%{http_code} %{content_type}\n" http://localhost:3000/apple-icon
curl -s http://localhost:3000/ | grep -o 'rel="manifest"'
curl -s http://localhost:3000/ | grep -o 'rel="apple-touch-icon"'
```
Expected: manifest match; apple-icon → `200 image/png`; both `<link>` tags present.

- [ ] **Step 6: Commit**

```bash
git add app/manifest.ts app/apple-icon.tsx
git commit -m "feat(seo): add web app manifest and apple-touch icon

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 7: Per-article dynamic OpenGraph image

**Files:**
- Create: `app/(public)/berita/[slug]/opengraph-image.tsx`

**Interfaces:**
- Consumes: `getPublishedArticleBySlug` (title, categoryName); `/logo.png`. Route receives `{ params }` for the `[slug]` segment.

- [ ] **Step 1: Read the docs**

Read `.../01-metadata/opengraph-image.md`. Confirm: `alt`, `size`, `contentType` exports; default function receives `{ params }` in a dynamic segment; must return `ImageResponse`.

- [ ] **Step 2: Create the route**

Branded 1200×630 card. Falls back to a generic title if the article is missing (route should never 500).
```tsx
import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";
import { getPublishedArticleBySlug } from "@blawness/admin-kit/public";

export const alt = "Berita BPR-RI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ArticleOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedArticleBySlug(slug).catch(() => null);

  const logoData = await readFile(join(process.cwd(), "public/logo.png"));
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  const title = post?.title ?? "Berita BPR-RI";
  const category = post?.categoryName ?? "Berita";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a192f",
          padding: "72px",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={72} height={72} alt="" />
          <span
            style={{
              fontSize: "26px",
              fontWeight: 700,
              letterSpacing: "6px",
              textTransform: "uppercase",
              color: "#ffd700",
            }}
          >
            BPR-RI
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <span
            style={{
              alignSelf: "flex-start",
              fontSize: "24px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "3px",
              color: "#0a192f",
              background: "#ffd700",
              padding: "8px 20px",
              borderRadius: "9999px",
            }}
          >
            {category}
          </span>
          <span
            style={{
              fontSize: title.length > 80 ? "52px" : "64px",
              fontWeight: 800,
              lineHeight: 1.15,
              display: "flex",
            }}
          >
            {title.length > 120 ? `${title.slice(0, 117)}…` : title}
          </span>
        </div>

        <span style={{ fontSize: "24px", color: "#9fb3c8" }}>
          Badan Pusat Reklasseering Republik Indonesia
        </span>
      </div>
    ),
    { ...size }
  );
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Verify**

With a real `<slug>` (from Task 4 Step 4):
```bash
curl -s -o /dev/null -w "%{http_code} %{content_type}\n" http://localhost:3000/berita/<slug>/opengraph-image
curl -s "http://localhost:3000/berita/<slug>" | grep -o 'property="og:image"'
```
Expected: `200 image/png`; and an `og:image` present in the article `<head>` (article's own `ogImage`/`coverImageUrl` wins if set; otherwise the generated route).

Optional visual check: open `http://localhost:3000/berita/<slug>/opengraph-image` in a browser and confirm the card renders with logo, category pill, and title.

- [ ] **Step 5: Commit**

```bash
git add "app/(public)/berita/[slug]/opengraph-image.tsx"
git commit -m "feat(seo): add per-article dynamic OpenGraph image

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 8: Final build gate

**Files:** none (verification only).

- [ ] **Step 1: Full production build**

Run: `npm run build`
Expected: build succeeds; `/robots.txt`, `/manifest.webmanifest`, `/sitemap.xml`, `/apple-icon`, and `berita/[slug]/opengraph-image` appear in the route list with no errors.

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: no new errors in changed files (pre-existing warnings elsewhere are acceptable).

- [ ] **Step 3: Spot-check the built output**

Start `npm run start` (or reuse dev) and re-run the key curls from Tasks 1–7 against the built server. Confirm robots, homepage Organization+WebSite JSON-LD, one article's NewsArticle JSON-LD + canonical, and the OG image all respond correctly.

- [ ] **Step 4: (No commit needed — verification only.)** If build surfaced fixes, commit them with a `fix(seo): ...` message.

---

## Self-Review

**Spec coverage:**
- robots.ts → Task 1 ✓
- JSON-LD infra (site/org/schema/JsonLd) → Task 2 ✓
- Global Organization + WebSite(+SearchAction) → Task 2 ✓
- Canonicals (all pages) → Tasks 3 (static), 4 (article), 5 (member) ✓
- Metadata enrichment root (keywords/authors/robots/formatDetection/verification) → Task 2 ✓
- Article metadata using metaTitle/metaDescription/ogImage + article OG → Task 4 ✓
- Member profile OG → Task 5 ✓
- NewsArticle / Person / Breadcrumb schema → Tasks 4, 5, 3 ✓
- manifest + apple icon → Task 6 ✓
- Per-article OG image → Task 7 ✓
- verification env hook + `.env` placeholder → Task 2 ✓
- Build gate → Task 8 ✓
- Out-of-scope items (hreflang, analytics, sameAs, DNS) correctly omitted ✓

**Placeholder scan:** No TBD/TODO; every code step shows full code; verification steps use concrete commands. `<slug>` in curl steps is an intentional runtime substitution, with the command to obtain it provided.

**Type consistency:** `getSiteUrl` (Task 1) used everywhere. Schema builder names (`organizationSchema`, `websiteSchema`, `newsArticleSchema`, `personSchema`, `breadcrumbSchema`) and `<JsonLd data={} />` prop match across Tasks 2–7. `ArticleSchemaInput`/`PersonSchemaInput` field names match the DB fields consumed in Tasks 4/5. `breadcrumbSchema` takes `{ name, path }[]` consistently.
