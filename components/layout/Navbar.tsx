"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/profil", label: "Profil" },
    { href: "/struktur-organisasi", label: "Struktur Organisasi" },
    { href: "/anggota", label: "Anggota" },
    { href: "/berita", label: "Berita" },
    { href: "/kontak", label: "Kontak" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-neutral-200 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo.png"
            alt="Logo BPR-RI"
            width={44}
            height={44}
            quality={100}
            preload
            className="w-10 h-10 md:w-11 md:h-11 object-contain shrink-0"
          />
          {/* Mobile: acronym only */}
          <span className="font-serif font-bold text-lg text-navy-900 tracking-tight sm:hidden">
            BPR-RI
          </span>
          {/* sm+: full institutional lockup */}
          <span className="hidden sm:flex flex-col leading-none border-l border-neutral-200 pl-3">
            <span className="font-serif font-bold text-[15px] lg:text-base text-navy-900 tracking-tight">
              Badan Pusat Reklasseering
            </span>
            <span className="text-[10px] lg:text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-700 mt-1">
              Republik Indonesia
            </span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive ? "text-brand-600" : "text-neutral-600 hover:text-brand-600"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-neutral-600 hover:bg-neutral-100 rounded-md transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive 
                      ? "bg-brand-50 text-brand-700" 
                      : "text-neutral-700 hover:bg-neutral-50 hover:text-brand-600"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
