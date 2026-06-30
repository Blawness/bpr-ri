import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const alt =
  "Dewan Perwakilan Daerah Tingkat I DKI Jakarta — menaungi BPR-RI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
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
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #102a43 0%, #0a192f 70%)",
          color: "white",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Gold accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "10px",
            background:
              "linear-gradient(to right, #ffda4d, #ffcf1a, #cca600)",
          }}
        />

        {/* Left: copy */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "660px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "22px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#9fb3c8",
              marginBottom: "28px",
              fontWeight: 600,
            }}
          >
            Badan Peserta Hukum · Non-Departemen
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: "64px",
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: "28px",
            }}
          >
            <span>Dewan Perwakilan Daerah Tingkat I&nbsp;</span>
            <span style={{ color: "#ffcf1a" }}>DKI Jakarta</span>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "26px",
              color: "#bcccdc",
              lineHeight: 1.4,
            }}
          >
            Menaungi Badan Pusat Reklasseering Republik Indonesia (BPR-RI)
          </div>
        </div>

        {/* Right: emblem */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={300} height={300} alt="" />
        </div>
      </div>
    ),
    { ...size }
  );
}
