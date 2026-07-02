import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Hubungi Dewan Perwakilan Daerah Tingkat I DKI Jakarta — bagian dari Badan Pusat Reklasseering Republik Indonesia (BPR-RI).",
  alternates: { canonical: "/kontak" },
};

export default function KontakLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Beranda", path: "/" },
        { name: "Kontak", path: "/kontak" },
      ])} />
      {children}
    </>
  );
}
