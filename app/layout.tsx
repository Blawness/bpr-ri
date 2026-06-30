import type { Metadata } from "next";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import "./globals.css";

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
