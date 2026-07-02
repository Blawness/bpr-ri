import { generateRssXml } from "@blawness/admin-kit/public";
import { getSiteUrl } from "@/lib/seo/site";

export async function GET() {
  const xml = await generateRssXml({
    siteUrl: getSiteUrl(),
    title: "Berita BPR-RI",
    description: "Artikel dan kegiatan terbaru BPR-RI",
  });
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml" } });
}
