import type { Metadata } from "next";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";
import { getSiteUrl } from "@/lib/seo/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "DPD Tk.I DKI Jakarta — BPR-RI",
    template: "%s | DPD DKI Jakarta — BPR-RI",
  },
  description: "Badan Pusat Reklasseering RI (BPR-RI) — portal informasi publik",
  openGraph: {
    title: "Dewan Perwakilan Daerah Tk.I DKI Jakarta | BPR-RI",
    description:
      "Dewan Perwakilan Daerah Tingkat I DKI Jakarta — menaungi Badan Pusat Reklasseering Republik Indonesia (BPR-RI). Portal informasi publik.",
    siteName: "DPD Tk.I DKI Jakarta",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dewan Perwakilan Daerah Tk.I DKI Jakarta | BPR-RI",
    description:
      "Menaungi Badan Pusat Reklasseering Republik Indonesia (BPR-RI). Portal informasi publik.",
  },
  keywords: [
    "BPR-RI",
    "Badan Pusat Reklasseering",
    "Reklasseering Republik Indonesia",
    "DPD Tk.I DKI Jakarta",
    "bantuan hukum",
    "reklasering",
    "pidana bersyarat",
    "lepas bersyarat",
    "informasi publik",
  ],
  authors: [{ name: "Badan Pusat Reklasseering Republik Indonesia" }],
  publisher: "Badan Pusat Reklasseering Republik Indonesia",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { email: false, address: false, telephone: false },
  verification: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION }
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        {children}
      </body>
    </html>
  );
}
