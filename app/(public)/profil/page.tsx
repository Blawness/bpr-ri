import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Profil",
  description:
    "Profil, sejarah, dan landasan hukum Badan Pusat Reklasseering Republik Indonesia (BPR-RI).",
};

const profilKetua = {
  nama: "Harun Prayitno, S.E., S.H., M.H",
  jabatan: "Kepala BPR-RI",
  foto: "/profil/harun-prayitno-peci.webp",
  quote:
    "Reklasseering adalah ikhtiar memanusiakan kembali mereka yang pernah tersandung hukum. Bersama Negara dan masyarakat, kami hadir untuk membela kebenaran, menegakkan keadilan, dan membuka jalan pulih bagi setiap warga.",
  visi: "Menjadi lembaga reklasseering yang terpercaya, profesional, dan berintegritas dalam mendampingi penegakan hukum serta pembinaan narapidana dan ex-narapidana demi terwujudnya masyarakat yang adil dan beradab.",
  misi: [
    "Memberikan pendampingan dan bantuan hukum bagi masyarakat di dalam maupun di luar pengadilan.",
    "Melaksanakan pembinaan, pengawasan, dan perbaikan akhlak narapidana serta ex-narapidana.",
    "Mendukung reintegrasi sosial agar setiap warga binaan dapat kembali berdaya di tengah masyarakat.",
    "Menjadi mitra kerja Pemerintah Republik Indonesia dalam pelaksanaan pekerjaan negara.",
  ],
};

const dasarHukum = [
  "LN. 1870 Stbl. No. 64",
  "LN. 1937 Stbl. No. 574",
  "LN. 1938 Stbl. No. 276",
  "Pasal 1653 s/d Pasal 1665 KUH Perdata",
  "Pasal 13 s/d Pasal 16, Pasal 17, Pasal 50 KUH Pidana",
  "Mengingat UUD 1945 dan Pancasila",
];

const ahliHukum = [
  "Mr. Soeyudi",
  "Mr. Soeprapto",
  "Mr. Katidjan",
  "Mr. Soebagyo",
  "Prof. Dr. Mr. Prayoedi",
  "Prof. Dr. Drs. BRM Tjokrodiningrat, SH. P.hd.",
];

const pengakuan = [
  "Lembaran Berita Negara No. 105 Tahun 1954. Penetapan Menteri Kehakiman RI No. J.H.1.7/6/2/56, Jakarta 12 November 1954.",
  "Tambahan Lembaran Berita Negara No. 90 Tahun 1956. Keputusan Menteri Kehakiman RI No. J.H.1.7/6/2/56, Jakarta 9 Juni 1956.",
  "Buku Tata Negara cetakan ke-VI (Pradnya Paramita, Jakarta 1961), hal. 234 & 237 — mengenai lapangan kepidanaan dan pengawasan reklasseering.",
  "Surat Edaran Mahkamah Agung RI No. 7 Tahun 1985.",
  "Hukum Administrasi Negara.",
  "Surat Keputusan Mandat No. 254/SKEP/mandat/31/XII/BPPDRI/RKL/HUK/2006, Bogor 20 Desember 2006.",
];

const tugas = [
  {
    title: "Pidana Bersyarat / Lepas Bersyarat",
    desc: "Pendampingan terhadap pelaksanaan pidana bersyarat dan pembebasan bersyarat.",
  },
  {
    title: "Bantuan (van Bisten)",
    desc: "Pemberian bantuan hukum dan sosial bagi yang membutuhkan.",
  },
  {
    title: "Pengawasan Lanjutan Narapidana",
    desc: "Pengawasan atas narapidana yang telah kembali ke masyarakat.",
  },
  {
    title: "Sosial Control / Monitoring",
    desc: "Pemantauan sosial untuk menjaga ketertiban dan reintegrasi.",
  },
  {
    title: "Pencari – Pembela & Kebenaran",
    desc: "Berperan mencari serta membela kebenaran demi keadilan.",
  },
  {
    title: "Mitra Kerja Pemerintah RI",
    desc: "Bermitra dengan Pemerintah dalam pelaksanaan pekerjaan negara.",
  },
];

const sejarah = [
  {
    tahun: "17 Agustus 1945",
    text: "Pembentukan Badan Pusat Reklasseering, bersamaan dengan perjuangan Kemerdekaan Negara Republik Indonesia.",
  },
  {
    tahun: "19 Agustus 1945",
    text: "Pelaksanaan pembebasan dan penampungan tawanan perang serta narapidana dimulai.",
  },
  {
    tahun: "12 November 1954",
    text: "Penetapan Menteri Kehakiman RI Nomor: J.A.5/105/54. Diundangkan dalam Berita Negara No. 105 Tahun 1954.",
  },
  {
    tahun: "9 Juni 1956",
    text: "Keputusan Menteri Kehakiman RI No: J.H.7.1/6/2/56. Tambahan Lembaran Berita Negara No. 90 Tahun 1956.",
  },
  {
    tahun: "31 Desember 2006",
    text: "Surat Keputusan Mandat No. 254/SKEP/Mandat/31/XII/BPPDRI/HUK/RKL/2006, Bogor — dengan kantor-kantor di seluruh Indonesia.",
  },
];

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10">
      <div className="inline-block px-4 py-1.5 bg-brand-50 text-brand-700 rounded-full text-sm font-semibold tracking-wider uppercase mb-4 border border-brand-100">
        {eyebrow}
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-navy-900 leading-tight">{title}</h2>
    </div>
  );
}

export default function ProfilPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 text-white py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/40 to-navy-950/90 z-0"></div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center select-none"
        >
          <Image
            src="/profil/icj-seal.svg"
            alt=""
            width={231}
            height={231}
            className="w-3/4 max-w-md object-contain opacity-[0.07]"
          />
        </div>
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-1.5 bg-white/10 text-gold-300 rounded-full text-sm font-semibold tracking-wider uppercase mb-6 border border-white/20">
              Profil Lembaga
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
              Badan Pusat Reklasseering Republik Indonesia
            </h1>
            <p className="text-lg text-neutral-300 mb-8 leading-relaxed">
              Badan Peserta Hukum untuk Negara &amp; Masyarakat (BPR-RI – BPHNMS). Melayani Bantuan
              Hukum di Luar &amp; di Dalam Pengadilan.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm font-medium backdrop-blur-sm">
                Berita Negara No. 105 Tahun 1954
              </span>
              <span className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm font-medium backdrop-blur-sm">
                Tambahan Lembaran Berita Negara No. 90 Tahun 1956
              </span>
            </div>
            <p className="mt-8 text-gold-400 font-semibold tracking-wide uppercase text-sm">
              BPR-RI Untuk Negara &amp; Masyarakat
            </p>
          </div>
        </div>
      </section>

      {/* Profil Ketua */}
      <section className="relative overflow-hidden py-20 bg-white">
        {/* Backdrop penghormatan: Soekarno sebagai tokoh pendiri */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-0 w-full md:w-1/2 max-w-2xl select-none"
        >
          <Image
            src="/profil/soekarno-transparent.webp"
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain object-[center_70%] md:object-right-bottom opacity-25 [mask-image:linear-gradient(to_left,black_60%,transparent)]"
          />
        </div>

        <div className="container relative z-10 mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Kolom Kiri — Visual */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-sm lg:max-w-none">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-brand-50 rounded-2xl -z-10"></div>
                <div className="absolute -bottom-4 -right-4 w-28 h-28 bg-gold-50 rounded-2xl -z-10"></div>
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl shadow-navy-900/10 ring-1 ring-neutral-100 bg-neutral-100">
                  <Image
                    src={profilKetua.foto}
                    alt={`Foto ${profilKetua.nama}`}
                    fill
                    sizes="(max-width: 1024px) 24rem, 40vw"
                    className="object-cover object-center"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Kolom Kanan — Konten */}
            <div className="lg:col-span-7">
              <div className="inline-block px-4 py-1.5 bg-brand-50 text-brand-700 rounded-full text-sm font-semibold tracking-wider uppercase mb-4 border border-brand-100">
                Profil Pimpinan
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-navy-900 leading-tight">
                {profilKetua.nama}
              </h2>
              <p className="mt-2 text-brand-600 font-semibold tracking-wide uppercase text-sm">
                {profilKetua.jabatan}
              </p>

              <blockquote className="relative mt-6 pl-6 border-l-4 border-gold-400">
                <span className="absolute -top-3 left-3 text-5xl leading-none text-brand-100 font-serif select-none">
                  &ldquo;
                </span>
                <p className="italic text-lg text-neutral-700 leading-relaxed">
                  {profilKetua.quote}
                </p>
              </blockquote>

              <div className="mt-8 grid grid-cols-1 gap-5">
                <div className="bg-neutral-50 rounded-2xl border border-neutral-100 p-6">
                  <h3 className="text-xs font-bold tracking-wider uppercase text-brand-600 mb-2">
                    Visi
                  </h3>
                  <p className="text-neutral-700 leading-relaxed">{profilKetua.visi}</p>
                </div>
                <div className="bg-neutral-50 rounded-2xl border border-neutral-100 p-6">
                  <h3 className="text-xs font-bold tracking-wider uppercase text-brand-600 mb-3">
                    Misi
                  </h3>
                  <ul className="space-y-3">
                    {profilKetua.misi.map((m, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-brand-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-neutral-700 leading-relaxed">{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sejarah & Pembentukan */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHeading eyebrow="Sejarah" title="Sejarah & Pembentukan" />
          <ol className="relative border-l-2 border-brand-100 ml-3 space-y-10">
            {sejarah.map((s) => (
              <li key={s.tahun} className="ml-8">
                <span className="absolute -left-[11px] flex items-center justify-center w-5 h-5 rounded-full bg-brand-600 ring-4 ring-brand-50"></span>
                <h3 className="text-lg font-bold text-navy-900 mb-1">{s.tahun}</h3>
                <p className="text-neutral-600 leading-relaxed">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Dasar Hukum & Ahli Hukum */}
      <section className="py-20 bg-neutral-50 border-y border-neutral-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <SectionHeading eyebrow="Landasan Hukum" title="Dasar Pelaksanaan Pekerjaan Negara" />
              <ul className="space-y-3">
                {dasarHukum.map((d, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 bg-white p-4 rounded-xl border border-neutral-100 shadow-sm"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-navy-50 text-navy-700 text-xs font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-neutral-700 leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <SectionHeading eyebrow="Tokoh" title="Para Ahli Hukum sejak Berdirinya BPR-RI" />
              <ul className="space-y-3">
                {ahliHukum.map((a, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-4 bg-white p-4 rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gold-50 text-gold-600 font-bold flex items-center justify-center border border-gold-100">
                      {i + 1}
                    </span>
                    <span className="text-navy-900 font-medium">{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tugas / Pekerjaan Negara */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <SectionHeading
            eyebrow="Tugas & Fungsi"
            title="Pekerjaan Negara yang Dilaksanakan"
          />
          <p className="text-neutral-600 text-lg mb-10 max-w-3xl leading-relaxed">
            Di bawah induk organisasi Kementerian Hukum dan HAM RI, BPR-RI melaksanakan pekerjaan
            negara berikut:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tugas.map((t, i) => (
              <div
                key={i}
                className="bg-neutral-50 p-6 rounded-2xl border border-neutral-100 hover:shadow-md hover:border-brand-100 transition-all"
              >
                <div className="w-11 h-11 bg-brand-600 text-white rounded-xl flex items-center justify-center font-bold mb-4">
                  {i + 1}
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-2">{t.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pengakuan Pemerintah RI */}
      <section className="py-20 bg-navy-950 text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="inline-block px-4 py-1.5 bg-white/10 text-gold-300 rounded-full text-sm font-semibold tracking-wider uppercase mb-4 border border-white/20">
            Legalitas
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Pengakuan Pemerintah Republik Indonesia
          </h2>
          <p className="text-neutral-300 mb-10 leading-relaxed max-w-3xl">
            Keberadaan BPR-RI — Dewan Reklasseering Pusat Ambtenaar Der Reklasseering Independen (Non
            Departemen) selaku Badan Peserta Hukum Pelaksanaan Undang-Undang untuk negara dan
            masyarakat (Staatsblad 1870 No. 64) — diakui melalui:
          </p>
          <ul className="space-y-4">
            {pengakuan.map((p, i) => (
              <li
                key={i}
                className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gold-500/20 text-gold-300 font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-neutral-200 leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Mandat & CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-br from-brand-50 to-gold-50 rounded-3xl p-8 md:p-12 border border-brand-100">
            <h3 className="text-2xl font-bold text-navy-900 mb-3">Legalitas Mandat</h3>
            <p className="text-neutral-700 leading-relaxed mb-6">
              Surat Keputusan Mandat No.{" "}
              <span className="font-semibold text-navy-900">
                254/SKEP/Mandat/31/XII/BPPDRI/HUK/RKL/2006
              </span>
              , tanggal Bogor, 31 Desember 2006. BPR-RI mempunyai kantor-kantor di seluruh Indonesia,
              dengan DPD Tk.I/Tk.II Kabupaten dan Kota di seluruh wilayah hukum Republik Indonesia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/struktur-organisasi"
                className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-medium transition-all shadow-lg shadow-brand-600/20 text-center"
              >
                Lihat Struktur Organisasi
              </Link>
              <Link
                href="/kontak"
                className="px-6 py-3 bg-white hover:bg-neutral-50 text-navy-900 border border-neutral-200 rounded-lg font-medium transition-all text-center"
              >
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
