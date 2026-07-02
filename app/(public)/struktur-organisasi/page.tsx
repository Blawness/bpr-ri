import { db } from "@/lib/db";
import { members } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { cacheTag } from "next/cache";
import Link from "next/link";
import Image from "next/image";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata = {
  title: "Struktur Organisasi",
  description: "Struktur organisasi BPR-RI",
  alternates: { canonical: "/struktur-organisasi" },
};

type Member = typeof members.$inferSelect;

async function getMembersForOrgChart() {
  "use cache";
  cacheTag("members");
  return db
    .select()
    .from(members)
    .where(eq(members.isActive, true))
    .orderBy(asc(members.sortOrder), asc(members.name));
}

function Connector() {
  return <div className="w-px h-6 bg-neutral-300" aria-hidden />;
}

function Avatar({ member, size = "md" }: { member: Member; size?: "sm" | "md" }) {
  const dims = size === "sm" ? "w-9 h-9 text-sm" : "w-12 h-12 text-base";
  const px = size === "sm" ? "36px" : "48px";
  return (
    <div
      className={`${dims} shrink-0 relative rounded-full overflow-hidden bg-neutral-100 flex items-center justify-center border-2 border-white shadow-sm`}
    >
      {member.photoUrl ? (
        <Image src={member.photoUrl} alt={member.name} fill sizes={px} className="object-cover" />
      ) : (
        <span className="text-brand-300 font-bold">{member.name.charAt(0)}</span>
      )}
    </div>
  );
}

/** Card for the vertical leadership spine (levels 1–5). */
function SpineCard({ member, no }: { member: Member; no?: number }) {
  return (
    <Link
      href={`/anggota/${member.slug}`}
      className="group flex items-center gap-3 w-64 bg-white border border-neutral-200 rounded-xl px-4 py-3 shadow-sm hover:shadow-md hover:border-brand-300 transition-all text-left"
    >
      <Avatar member={member} />
      <div className="min-w-0">
        <p className="text-xs font-medium text-brand-600 truncate">
          {no ? `${no}. ` : ""}
          {member.position}
        </p>
        <h3 className="font-semibold text-sm text-navy-900 truncate group-hover:text-brand-600 transition-colors">
          {member.name}
        </h3>
      </div>
    </Link>
  );
}

/** Compact card for a seksi (level 6), supports one or more people. */
function SeksiCard({ no, position, people }: { no: number; position: string; people: Member[] }) {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-3 shadow-sm hover:shadow-md hover:border-brand-300 transition-all">
      <div className="flex items-start gap-2.5">
        <span className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-navy-900 text-white text-xs font-bold flex items-center justify-center">
          {no}
        </span>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-navy-900 leading-snug">{position}</p>
          <div className="mt-1 flex flex-col gap-0.5">
            {people.map((p) => (
              <Link
                key={p.id}
                href={`/anggota/${p.slug}`}
                className="text-xs text-neutral-500 hover:text-brand-600 transition-colors truncate"
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
    <div className="flex flex-col">
      <JsonLd data={breadcrumbSchema([
        { name: "Beranda", path: "/" },
        { name: "Struktur Organisasi", path: "/struktur-organisasi" },
      ])} />
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 text-white py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/40 to-navy-950/90 z-0"></div>
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-1.5 bg-white/10 text-gold-300 rounded-full text-sm font-semibold tracking-wider uppercase mb-6 border border-white/20">
              Tata Kelola
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
              Struktur Organisasi
            </h1>
            <p className="text-lg text-neutral-300 leading-relaxed">
              Susunan kepengurusan Badan Pusat Reklasseering Republik Indonesia, dari Dewan Penasehat
              hingga seksi-seksi pelaksana.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto max-w-5xl px-4">
          {isEmpty ? (
            <div className="text-center text-neutral-500 py-12 bg-white rounded-2xl border border-neutral-100 shadow-sm max-w-md mx-auto">
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
                  <div className="w-full mt-2 rounded-2xl border border-dashed border-neutral-300 p-4 sm:p-6">
                    <p className="text-center text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">
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
      </section>
    </div>
  );
}
