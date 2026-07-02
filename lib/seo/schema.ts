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
