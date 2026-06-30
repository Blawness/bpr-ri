import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Hubungi Dewan Perwakilan Daerah Tingkat I DKI Jakarta — bagian dari Badan Pusat Reklasseering Republik Indonesia (BPR-RI).",
};

export default function KontakLayout({ children }: { children: React.ReactNode }) {
  return children;
}
