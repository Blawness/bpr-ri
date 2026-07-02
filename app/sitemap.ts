import { getSitemapEntries } from "@blawness/admin-kit/public";
import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return getSitemapEntries({
    siteUrl: getSiteUrl(),
    articleBasePath: "/berita",
  });
}
