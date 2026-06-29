import { getSitemapEntries } from "@blawness/admin-kit/public";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return getSitemapEntries({
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    articleBasePath: "/berita",
  });
}
