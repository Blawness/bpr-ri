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
