import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import React from "react";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="site-scale min-h-screen flex flex-col font-sans bg-neutral-50 text-neutral-900 overflow-x-clip"
      style={{ zoom: 0.9 }}
    >
      <React.Suspense fallback={<div className="h-16" />}>
        <Navbar />
      </React.Suspense>
      <main className="flex-grow flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
}
