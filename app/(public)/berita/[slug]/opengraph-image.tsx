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
