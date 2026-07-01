import React from "react";
import { AdminLayout } from "@blawness/admin-kit/shell";
import type { NavItem } from "@blawness/admin-kit/shell/sidebar";
import { requireUser } from "@blawness/admin-kit/auth-helpers";
import { LayoutDashboard, FolderOpen, Newspaper, Images, Settings, Users } from "lucide-react";
// Belt-and-suspenders RBAC registration for page renders; instrumentation.ts
// covers server actions on cold start.
import "../../../rbac";

// Grouped, collapsible nav mirroring the LIPAN RI admin shell.
const navItems: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },

  {
    label: "Konten",
    icon: <FolderOpen className="h-4 w-4" />,
    children: [
      { href: "/admin/articles", label: "Artikel", icon: <Newspaper className="h-4 w-4" />, requires: "articles.read" },
      { href: "/admin/media", label: "Galeri", icon: <Images className="h-4 w-4" />, requires: "media.read" },
    ],
  },

  {
    label: "Pengaturan",
    icon: <Settings className="h-4 w-4" />,
    children: [
      { href: "/admin/users", label: "Pengguna", icon: <Users className="h-4 w-4" />, requires: "users.read" },
    ],
  },
];

export default async function Layout({ children }: { children: React.ReactNode }) {
  await requireUser();
  return (
    <AdminLayout brandName="BPR-RI" navItems={navItems}>
      <React.Suspense fallback={<div className="p-8 text-neutral-500 flex items-center justify-center">Memuat...</div>}>
        {children}
      </React.Suspense>
    </AdminLayout>
  );
}
