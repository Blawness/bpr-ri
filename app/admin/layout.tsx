import React from "react";
import { AdminLayout } from "@blawness/admin-kit/shell";
import { requireUser } from "@blawness/admin-kit/auth-helpers";
import { FileText, Users, ImageIcon } from "lucide-react";
// Belt-and-suspenders RBAC registration for page renders; instrumentation.ts
// covers server actions on cold start.
import "../../rbac";

export default async function Layout({ children }: { children: React.ReactNode }) {
  await requireUser();
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
