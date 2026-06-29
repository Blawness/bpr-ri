import { db } from "@/lib/db";
import { members } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import Link from "next/link";

export const metadata = {
  title: "Struktur Organisasi",
  description: "Struktur organisasi BPR-RI",
};

type Member = typeof members.$inferSelect;

async function getMembersForOrgChart() {
  "use cache";
  return db
    .select()
    .from(members)
    .where(eq(members.isActive, true))
    .orderBy(asc(members.sortOrder), asc(members.name));
}

function Connector() {
  return <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" aria-hidden />;
}

function Avatar({ member, size = "md" }: { member: Member; size?: "sm" | "md" }) {
  const dims = size === "sm" ? "w-9 h-9 text-sm" : "w-12 h-12 text-base";
  return (
    <div
      className={`${dims} shrink-0 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center border-2 border-white dark:border-gray-800 shadow-sm`}
    >
      {member.photoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover" />
      ) : (
        <span className="text-gray-400 dark:text-gray-500 font-bold">{member.name.charAt(0)}</span>
      )}
    </div>
  );
}

/** Card for the vertical leadership spine (levels 1–5). */
function SpineCard({ member, no }: { member: Member; no?: number }) {
  return (
    <Link
      href={`/anggota/${member.slug}`}
      className="group flex items-center gap-3 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 shadow-sm hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all text-left"
    >
      <Avatar member={member} />
      <div className="min-w-0">
        <p className="text-xs font-medium text-blue-600 dark:text-blue-400 truncate">
          {no ? `${no}. ` : ""}
          {member.position}
        </p>
        <h3 className="font-semibold text-sm text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {member.name}
        </h3>
      </div>
    </Link>
  );
}

/** Compact card for a seksi (level 6), supports one or more people. */
function SeksiCard({ no, position, people }: { no: number; position: string; people: Member[] }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all">
      <div className="flex items-start gap-2.5">
        <span className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-navy-900 text-white text-xs font-bold flex items-center justify-center">
          {no}
        </span>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-gray-900 dark:text-white leading-snug">{position}</p>
          <div className="mt-1 flex flex-col gap-0.5">
            {people.map((p) => (
              <Link
                key={p.id}
                href={`/anggota/${p.slug}`}
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate"
              >
                {p.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function StrukturOrganisasiPage() {
  const allMembers = await getMembersForOrgChart();
  const byLevel = (lvl: number) => allMembers.filter((m) => m.level === lvl);

  const penasehat = byLevel(1);
  const pembina = byLevel(2);
  const kepala = byLevel(3);
  const wakil = byLevel(4);
  const setara = byLevel(5); // Sekretariat & Keuangan
  const seksiMembers = byLevel(6);

  // Group seksi members that share the same position into a single card.
  const seksiGroups: { position: string; people: Member[] }[] = [];
  const groupIndex = new Map<string, number>();
  for (const m of seksiMembers) {
    if (!groupIndex.has(m.position)) {
      groupIndex.set(m.position, seksiGroups.length);
      seksiGroups.push({ position: m.position, people: [] });
    }
    seksiGroups[groupIndex.get(m.position)!].people.push(m);
  }

  // PDF numbering: Kepala=1, Wakil=2, then setara=3.., then seksi continue.
  let n = 2 + setara.length; // first seksi number

  const isEmpty = allMembers.length === 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white">
          Struktur Organisasi
        </h1>

        {isEmpty ? (
          <div className="text-center text-gray-500 py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm max-w-md mx-auto">
            Belum ada data struktur organisasi.
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {/* Penasehat */}
            {penasehat.length > 0 && (
              <div className="flex flex-wrap justify-center gap-4">
                {penasehat.map((m) => (
                  <SpineCard key={m.id} member={m} />
                ))}
              </div>
            )}

            {/* Pembina */}
            {pembina.map((m) => (
              <div key={m.id} className="flex flex-col items-center">
                <Connector />
                <SpineCard member={m} />
              </div>
            ))}

            {/* Kepala */}
            {kepala.map((m) => (
              <div key={m.id} className="flex flex-col items-center">
                <Connector />
                <SpineCard member={m} no={1} />
              </div>
            ))}

            {/* Wakil Kepala */}
            {wakil.map((m) => (
              <div key={m.id} className="flex flex-col items-center">
                <Connector />
                <SpineCard member={m} no={2} />
              </div>
            ))}

            {/* Sekretariat & Keuangan */}
            {setara.length > 0 && (
              <div className="flex flex-col items-center">
                <Connector />
                <div className="flex flex-wrap justify-center gap-4">
                  {setara.map((m, i) => (
                    <SpineCard key={m.id} member={m} no={3 + i} />
                  ))}
                </div>
              </div>
            )}

            {/* Seksi-seksi: responsive grid */}
            {seksiGroups.length > 0 && (
              <div className="flex flex-col items-center w-full">
                <Connector />
                <div className="w-full mt-2 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-4 sm:p-6">
                  <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
                    Seksi-seksi
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {seksiGroups.map((g) => (
                      <SeksiCard key={g.position} no={++n} position={g.position} people={g.people} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
