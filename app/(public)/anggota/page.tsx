import { db } from "@/lib/db";
import { members } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { cacheTag } from "next/cache";
import Link from "next/link";
import Image from "next/image";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata = {
  title: "Anggota",
  description: "Daftar anggota BPR-RI",
  alternates: { canonical: "/anggota" },
};

async function getMembers() {
  "use cache";
  cacheTag("members");
  return db
    .select()
    .from(members)
    .where(eq(members.isActive, true))
    .orderBy(asc(members.sortOrder), asc(members.name));
}

export default async function AnggotaPage() {
  const allMembers = await getMembers();

  return (
    <div className="flex flex-col">
      <JsonLd data={breadcrumbSchema([
        { name: "Beranda", path: "/" },
        { name: "Anggota", path: "/anggota" },
      ])} />
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 text-white py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/40 to-navy-950/90 z-0"></div>
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-1.5 bg-white/10 text-gold-300 rounded-full text-sm font-semibold tracking-wider uppercase mb-6 border border-white/20">
              Jajaran Pengurus
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
              Anggota Kami
            </h1>
            <p className="text-lg text-neutral-300 leading-relaxed">
              Kenali lebih dekat jajaran pengurus dan anggota Badan Pusat Reklasseering Republik
              Indonesia.
            </p>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allMembers.map((member) => (
              <Link
                href={`/anggota/${member.slug}`}
                key={member.id}
                className="group flex flex-col items-center p-6 bg-white border border-neutral-100 rounded-2xl shadow-sm hover:shadow-md hover:border-brand-100 transition-all duration-300"
              >
                <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden bg-neutral-100 flex items-center justify-center border border-neutral-100">
                  {member.photoUrl ? (
                    <Image
                      src={member.photoUrl}
                      alt={member.name}
                      fill
                      sizes="128px"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <span className="text-brand-200 text-4xl font-bold">
                      {member.name.charAt(0)}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-center mb-1 text-navy-900 group-hover:text-brand-600 transition-colors">
                  {member.name}
                </h2>
                <p className="text-neutral-600 text-sm text-center mb-1">{member.position}</p>
                <p className="text-neutral-400 text-xs text-center">{member.division}</p>
              </Link>
            ))}
            {allMembers.length === 0 && (
              <div className="col-span-full text-center text-neutral-500 py-12 bg-white rounded-2xl border border-neutral-100 shadow-sm">
                Belum ada anggota yang ditambahkan.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
