import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Halaman Tidak Ditemukan",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-navy-950 text-center px-6 py-24">
      <span className="text-7xl md:text-8xl font-extrabold tracking-tight text-gold-500">
        404
      </span>
      <h1 className="mt-6 text-2xl md:text-3xl font-bold text-white">
        Halaman Tidak Ditemukan
      </h1>
      <p className="mt-4 max-w-md text-neutral-400 leading-relaxed">
        Maaf, halaman yang Anda cari tidak tersedia atau mungkin telah dipindahkan.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
        Kembali ke Beranda
      </Link>
    </main>
  );
}
