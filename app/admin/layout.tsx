import React from "react";
import { AdminLayout } from "@blawness/admin-kit/shell";
import { FileText, Users, ImageIcon } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AdminLayout
      brandName="BPR-RI"
      navItems={[
        { href: "/admin/articles", label: "Artikel", icon: <FileText />, requires: "articles.read" },
        { href: "/admin/media", label: "Media", icon: <ImageIcon />, requires: "media.read" },
        { href: "/admin/users", label: "Pengguna", icon: <Users />, requires: "users.read" },
      ]}
    >
      <React.Suspense fallback={<div className="p-8 text-neutral-500 flex items-center justify-center">Memuat...</div>}>
        {children}
      </React.Suspense>
    </AdminLayout>
  );
}
