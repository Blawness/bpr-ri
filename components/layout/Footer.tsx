import Image from "next/image";
import Link from "next/link";
import React from "react";

export function Footer() {
  return (
    <footer className="bg-navy-950 text-neutral-300 py-12 border-t border-navy-800 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
        <div className="md:col-span-5 lg:col-span-6">
          <div className="flex items-center gap-4 mb-5">
            <Image
              src="/logo.png"
              alt="Logo BPR-RI"
              width={56}
              height={56}
              quality={100}
              className="w-14 h-14 object-contain shrink-0"
            />
            <div className="flex flex-col leading-tight border-l border-white/15 pl-4">
              <span className="font-serif font-bold text-xl text-white tracking-tight">
                Badan Pusat Reklasseering
              </span>
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-400 mt-1">
                Republik Indonesia
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500 mt-1.5">
                BPR-RI
              </span>
            </div>
          </div>
          <p className="text-neutral-400 max-w-md leading-relaxed mb-6">
            Badan Pusat Reklasseering RI (BPR-RI). Badan Peserta Hukum independen (non-departemen) untuk Negara &amp; Masyarakat, dengan kantor-kantor di seluruh Indonesia, melayani bantuan hukum yang transparan dan akuntabel.
          </p>
          <div className="flex items-center space-x-4">
            {/* Social media placeholders */}
            <div className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center text-white hover:bg-brand-600 hover:text-white transition-colors cursor-pointer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center text-white hover:bg-brand-600 hover:text-white transition-colors cursor-pointer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-3 lg:col-span-3">
          <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">Tautan Cepat</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/" className="text-neutral-400 hover:text-gold-400 transition-colors">Beranda</Link></li>
            <li><Link href="/profil" className="text-neutral-400 hover:text-gold-400 transition-colors">Profil</Link></li>
            <li><Link href="/struktur-organisasi" className="text-neutral-400 hover:text-gold-400 transition-colors">Struktur Organisasi</Link></li>
            <li><Link href="/anggota" className="text-neutral-400 hover:text-gold-400 transition-colors">Anggota</Link></li>
            <li><Link href="/berita" className="text-neutral-400 hover:text-gold-400 transition-colors">Berita</Link></li>
            <li><Link href="/kontak" className="text-neutral-400 hover:text-gold-400 transition-colors">Kontak</Link></li>
          </ul>
        </div>
        
        <div className="md:col-span-4 lg:col-span-3">
          <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">Hubungi Kami</h4>
          <ul className="space-y-4 text-sm text-neutral-400">
            <li className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 flex-shrink-0 text-gold-500 mt-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <span>admin@bprri.or.id</span>
            </li>
            <li className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 flex-shrink-0 text-gold-500 mt-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span>
                Gedung Yayasan Purna Bakti (YARNATI), Lt. 4 Ruang 407&ndash;408, Jl. Proklamasi No. 44, Pegangsaan, Menteng, Jakarta Pusat 10320
              </span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-navy-800 text-sm flex flex-col md:flex-row justify-between items-center text-neutral-500">
        <p>&copy; 2026 Badan Pusat Reklasseering Republik Indonesia. Hak Cipta Dilindungi.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
          <Link href="#" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
        </div>
      </div>
    </footer>
  );
}
