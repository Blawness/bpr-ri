import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Beranda | BPR-RI",
  description: "Badan Pusat Reklasseering RI (BPR-RI) — portal informasi publik",
};

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-navy-950 text-white">
        {/* Backdrop layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/40 to-navy-950/95 z-0"></div>
        <div
          className="absolute inset-0 z-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        ></div>
        <div className="absolute top-0 right-0 -translate-y-16 translate-x-1/4 w-[30rem] h-[30rem] bg-brand-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: copy */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs font-semibold tracking-[0.15em] uppercase mb-7 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse"></span>
                Badan Peserta Hukum &middot; Non-Departemen
              </div>

              <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.4rem] font-bold tracking-tight mb-6 leading-[1.1]">
                Badan Pusat{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600">
                  Reklasseering
                </span>{" "}
                Republik Indonesia
              </h1>

              <p className="text-lg md:text-xl text-neutral-300 mb-9 leading-relaxed">
                Badan independen untuk Negara &amp; Masyarakat, dengan kantor-kantor di seluruh
                Indonesia. Melayani <span className="text-white font-medium">Bantuan Hukum</span> di
                Luar &amp; di Dalam Pengadilan.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link
                  href="/profil"
                  className="px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-semibold transition-all shadow-lg shadow-brand-600/30 transform hover:-translate-y-0.5 text-center flex items-center justify-center gap-2"
                >
                  <span>Profil Lembaga</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link
                  href="/struktur-organisasi"
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg font-medium transition-all backdrop-blur-sm text-center"
                >
                  Struktur Organisasi
                </Link>
              </div>

              {/* Mini legalitas strip */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-white/10">
                {["Berita Negara No. 105 / 1954", "Tambahan LBN No. 90 / 1956", "Sejak 17 Agustus 1945"].map(
                  (item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-neutral-400">
                      <svg className="w-4 h-4 text-gold-400 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span>{item}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Right: emblem */}
            <div className="relative hidden lg:flex items-center justify-center">
              <div className="absolute w-72 h-72 rounded-full bg-gold-500/10 blur-2xl"></div>
              <div className="absolute w-[24rem] h-[24rem] rounded-full border border-white/10"></div>
              <div className="absolute w-[28rem] h-[28rem] rounded-full border border-white/[0.06]"></div>
              <div className="absolute w-[20rem] h-[20rem] rounded-full bg-white/[0.03] backdrop-blur-sm border border-white/10"></div>
              <Image
                src="/logo.png"
                alt="Lambang Badan Pusat Reklasseering Republik Indonesia"
                width={460}
                height={460}
                quality={100}
                preload
                className="relative w-80 h-80 object-contain [filter:drop-shadow(0_4px_16px_rgba(255,255,255,0.12))]"
              />
            </div>
          </div>
        </div>

        {/* Gold accent line */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent z-10"></div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-4 py-1.5 bg-brand-50 text-brand-700 rounded-full text-sm font-semibold tracking-wider uppercase mb-6 border border-brand-100">
                Tentang Kami
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6 leading-tight">
                Badan Peserta Hukum untuk Negara &amp; Masyarakat
              </h2>
              <p className="text-neutral-600 text-lg mb-6 leading-relaxed">
                Badan Pusat Reklasseering Republik Indonesia (BPR-RI) dibentuk pada 17 Agustus 1945 dan diakui melalui Berita Negara No. 105 Tahun 1954 serta Tambahan Lembaran Berita Negara No. 90 Tahun 1956. BPR-RI melayani bantuan hukum di luar maupun di dalam pengadilan.
              </p>
              <p className="text-neutral-600 text-lg mb-8 leading-relaxed">
                Sebagai badan independen non-departemen, BPR-RI menjalankan pekerjaan negara — mulai dari pidana bersyarat, pengawasan lanjutan narapidana, hingga menjadi mitra kerja Pemerintah RI — dengan kantor-kantor di seluruh Indonesia.
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  "Bantuan Hukum di Luar & Di Dalam Pengadilan",
                  "Pengawasan & Pembinaan Reklasseering",
                  "Mitra Kerja Pemerintah Republik Indonesia"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold-50 flex items-center justify-center text-gold-600 border border-gold-100">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-neutral-700 font-medium text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                <Link href="/profil" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-medium transition-all shadow-lg shadow-brand-600/20">
                  <span>Profil Selengkapnya</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link href="/kontak" className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-700 transition-colors group">
                  <span>Hubungi Kami</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 transform group-hover:translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative bg-neutral-100 border-8 border-white">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-100 to-navy-50 flex items-center justify-center">
                  <div className="text-brand-200 flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-32 h-32 opacity-70 mb-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                    </svg>
                    <span className="text-brand-700/50 font-medium tracking-widest uppercase text-sm">Gedung BPR-RI</span>
                  </div>
                </div>
              </div>
              
              {/* Floating feature cards */}
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-neutral-100 max-w-[280px] hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-navy-900 text-lg">Struktur</div>
                    <div className="text-sm text-neutral-500">Organisasi Interaktif</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-8 -right-8 bg-white p-5 rounded-2xl shadow-xl border border-neutral-100 hidden lg:block animate-bounce-slow" style={{ animationDuration: '4s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gold-50 rounded-full flex items-center justify-center text-gold-600 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-navy-900 leading-tight">Transparan</div>
                    <div className="text-xs text-neutral-500">Layanan Publik</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legalitas Section */}
      <section className="relative overflow-hidden bg-navy-950 text-white py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/30 to-navy-950/90 z-0"></div>
        <div className="absolute bottom-0 right-0 translate-y-1/3 translate-x-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mb-12">
            <div className="inline-block px-4 py-1.5 bg-white/10 text-gold-300 rounded-full text-sm font-semibold tracking-wider uppercase mb-4 border border-white/20">
              Legalitas
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Diakui &amp; Berdasar Hukum Negara
            </h2>
            <p className="text-neutral-300 text-lg leading-relaxed">
              Keberadaan BPR-RI diakui Pemerintah Republik Indonesia melalui Berita Negara serta
              ketetapan Menteri Kehakiman RI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: "Berita Negara",
                value: "No. 105 Tahun 1954",
                detail: "Penetapan Menteri Kehakiman RI, 12 November 1954",
              },
              {
                label: "Tambahan Lembaran Berita Negara",
                value: "No. 90 Tahun 1956",
                detail: "Keputusan Menteri Kehakiman RI, 9 Juni 1956",
              },
              {
                label: "Surat Keputusan Mandat",
                value: "No. 254/SKEP/Mandat/2006",
                detail: "Bogor, 31 Desember 2006",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-gold-500/20 text-gold-300 flex items-center justify-center mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
                  {item.label}
                </p>
                <p className="text-xl font-bold text-white mb-2">{item.value}</p>
                <p className="text-sm text-neutral-400 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/profil"
              className="inline-flex items-center gap-2 text-gold-400 font-semibold hover:text-gold-300 transition-colors group"
            >
              <span>Lihat Landasan Hukum Lengkap</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 transform group-hover:translate-x-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-neutral-50 border-t border-neutral-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-navy-50 rounded-xl flex items-center justify-center text-navy-600 mb-6 group-hover:bg-navy-600 group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Berita & Publikasi</h3>
              <p className="text-neutral-600 mb-6 line-clamp-2">
                Dapatkan informasi terbaru mengenai kegiatan, pengumuman, dan artikel dari BPR-RI.
              </p>
              <Link href="/berita" className="text-brand-600 font-medium hover:text-brand-700 flex items-center gap-1">
                Lihat Berita
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600 mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Profil Anggota</h3>
              <p className="text-neutral-600 mb-6 line-clamp-2">
                Kenali lebih dekat profil jajaran pengurus dan anggota Badan Pusat Reklasseering RI.
              </p>
              <Link href="/anggota" className="text-brand-600 font-medium hover:text-brand-700 flex items-center gap-1">
                Lihat Anggota
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-gold-50 rounded-xl flex items-center justify-center text-gold-600 mb-6 group-hover:bg-gold-500 group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Layanan Kontak</h3>
              <p className="text-neutral-600 mb-6 line-clamp-2">
                Hubungi kami untuk pertanyaan, pengaduan, atau informasi lebih lanjut terkait layanan.
              </p>
              <Link href="/kontak" className="text-brand-600 font-medium hover:text-brand-700 flex items-center gap-1">
                Hubungi Kami
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
