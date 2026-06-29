import { generateRssXml } from "@blawness/admin-kit/public";

export async function GET() {
  const xml = await generateRssXml({
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    title: "Berita BPR-RI",
    description: "Artikel dan kegiatan terbaru BPR-RI",
  });
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml" } });
}
