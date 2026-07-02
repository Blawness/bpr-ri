import { getSitemapEntries } from "@blawness/admin-kit/public";
import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo/site";
import { db } from "@/lib/db";
import { members } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

const STATIC_PATHS = [
  "",
  "/profil",
  "/struktur-organisasi",
  "/anggota",
  "/berita",
  "/kontak",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const allMembers = await db
    .select({ slug: members.slug, updatedAt: members.updatedAt })
    .from(members)
    .where(eq(members.isActive, true))
    .orderBy(asc(members.sortOrder), asc(members.name));

  const memberEntries: MetadataRoute.Sitemap = allMembers.map((m) => ({
    url: `${siteUrl}/anggota/${m.slug}`,
    lastModified: m.updatedAt ?? new Date(),
  }));

  const articleEntries = await getSitemapEntries({
    siteUrl,
    articleBasePath: "/berita",
  });

  return [...staticEntries, ...memberEntries, ...articleEntries];
}
