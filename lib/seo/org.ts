import { getSiteUrl } from "@/lib/seo/site";

const siteUrl = getSiteUrl();

/** Stable @id anchors so nodes can cross-reference each other. */
export const ORG_ID = `${siteUrl}/#organization`;
export const WEBSITE_ID = `${siteUrl}/#website`;

/** Organization facts — source of truth mirrors Footer.tsx & kontak/page.tsx. */
export const ORG = {
  legalName: "Badan Pusat Reklasseering Republik Indonesia",
  name: "DPD Tk.I DKI Jakarta — BPR-RI",
  alternateName: ["DPD Tk.I DKI Jakarta", "BPR-RI"],
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  email: "ketua@dpd-bprri-007.com",
  telephone: "+62-21-392-8018",
  address: {
    streetAddress:
      "Gedung Yayasan Purna Bakti (YARNATI), Lt. 4 Ruang 407–408, Jl. Proklamasi No. 44, Pegangsaan, Menteng",
    addressLocality: "Jakarta Pusat",
    addressRegion: "DKI Jakarta",
    postalCode: "10320",
    addressCountry: "ID",
  },
  // No verified public social profiles yet; fill when available.
  sameAs: [] as string[],
} as const;
