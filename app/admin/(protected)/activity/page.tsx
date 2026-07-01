import Link from "next/link";
import { Shield, ChevronLeft, ChevronRight } from "lucide-react";
import { listAuditLogs } from "@blawness/admin-kit";
import { requirePermission } from "@blawness/admin-kit/auth-helpers";

// Audit logs are sensitive; gate to roles that can read users (admins under
// presets.adminEditor). requirePermission redirects others to /admin.
// (No `export const dynamic` — this project uses cacheComponents, which forbids
// it; the page is already dynamic via auth + the DB read below.)

const PAGE_SIZE = 25;

const ACTION_LABELS: Record<string, string> = {
  "auth.login": "Login",
  "auth.login_blocked": "Login diblokir",
  "user.create": "Buat user",
  "user.delete": "Hapus user",
  "user.set_role": "Ubah role user",
  "user.reset_password": "Reset password user",
  "article.create": "Buat artikel",
  "article.update": "Edit artikel",
  "article.delete": "Hapus artikel",
  "article.submit": "Ajukan review artikel",
  "article.publish": "Publikasi artikel",
  "article.reject": "Tolak artikel",
  "category.create": "Buat kategori",
  "category.delete": "Hapus kategori",
  "tag.create": "Buat tag",
  "tag.delete": "Hapus tag",
  "media.upload": "Upload media",
  "media.delete": "Hapus media",
};

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function ActivityLogPage({ searchParams }: Props) {
  await requirePermission("users.read");

  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const offset = (page - 1) * PAGE_SIZE;

  // Fetch one extra row to know whether a next page exists (no total count API).
  const rows = await listAuditLogs({ limit: PAGE_SIZE + 1, offset });
  const hasNext = rows.length > PAGE_SIZE;
  const entries = rows.slice(0, PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-navy-900">Log Aktivitas</h1>
        <p className="mt-1 text-sm text-navy-500">Riwayat tindakan pengguna di panel admin.</p>
      </div>

      <div className="rounded-xl border border-navy-100 bg-white shadow-sm">
        {entries.length === 0 ? (
          <p className="p-8 text-center text-sm text-navy-400">Belum ada aktivitas.</p>
        ) : (
          <ul className="divide-y divide-navy-50">
            {entries.map((entry) => (
              <li key={entry.id} className="flex items-start gap-3 px-5 py-3">
                <Shield className="mt-0.5 h-4 w-4 shrink-0 text-navy-300" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-navy-900">
                    <span className="font-medium">
                      {entry.actorName ?? entry.actorEmail ?? `#${entry.actorId}`}
                    </span>
                    {" — "}
                    {ACTION_LABELS[entry.action] ?? entry.action}
                    {entry.entityId != null && (
                      <span className="text-navy-400">
                        {" "}
                        ({entry.entityType} #{entry.entityId})
                      </span>
                    )}
                  </p>
                  {entry.summary && (
                    <p className="truncate text-xs text-navy-500">{entry.summary}</p>
                  )}
                </div>
                <time className="shrink-0 text-xs text-navy-400">
                  {new Date(entry.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-navy-400">Halaman {page}</span>
        <div className="flex gap-2">
          <PagerLink page={page - 1} disabled={page <= 1} dir="prev" />
          <PagerLink page={page + 1} disabled={!hasNext} dir="next" />
        </div>
      </div>
    </div>
  );
}

function PagerLink({ page, disabled, dir }: { page: number; disabled: boolean; dir: "prev" | "next" }) {
  const base =
    "inline-flex items-center gap-1 rounded-lg border border-navy-100 px-3 py-1.5 text-sm font-medium";
  if (disabled) {
    return (
      <span className={`${base} cursor-not-allowed text-navy-300`}>
        {dir === "prev" ? <ChevronLeft className="h-4 w-4" /> : null}
        {dir === "prev" ? "Sebelumnya" : "Berikutnya"}
        {dir === "next" ? <ChevronRight className="h-4 w-4" /> : null}
      </span>
    );
  }
  return (
    <Link href={`/admin/activity?page=${page}`} className={`${base} text-navy-700 hover:bg-navy-50`}>
      {dir === "prev" ? <ChevronLeft className="h-4 w-4" /> : null}
      {dir === "prev" ? "Sebelumnya" : "Berikutnya"}
      {dir === "next" ? <ChevronRight className="h-4 w-4" /> : null}
    </Link>
  );
}
