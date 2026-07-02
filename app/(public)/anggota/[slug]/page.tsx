import { db } from "@/lib/db";
import { members } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cacheTag } from "next/cache";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { personSchema, breadcrumbSchema } from "@/lib/seo/schema";


async function getMemberBySlug(slug: string) {
  "use cache";
  cacheTag("members");
  const data = await db.select().from(members).where(eq(members.slug, slug)).limit(1);
  return data[0];
}

export async function generateStaticParams() {
  const allMembers = await db.select({ slug: members.slug }).from(members);
  if (allMembers.length === 0) return [{ slug: "_empty_placeholder_" }];
  return allMembers.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const member = await getMemberBySlug(slug);

  if (!member) return { title: "Tidak Ditemukan", robots: { index: false, follow: false } };

  const description = `Profil ${member.name} — ${member.position} di BPR-RI`;
  return {
    title: member.name,
    description,
    alternates: { canonical: `/anggota/${member.slug}` },
    openGraph: {
      type: "profile",
      title: member.name,
      description,
      url: `/anggota/${member.slug}`,
      images: member.photoUrl ? [member.photoUrl] : undefined,
    },
    twitter: {
      card: "summary",
      title: member.name,
      description,
      images: member.photoUrl ? [member.photoUrl] : undefined,
    },
  };
}

export default async function MemberProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = await getMemberBySlug(slug);

  if (!member) {
    notFound();
  }

  return (
    <section className="py-16 lg:py-20 bg-neutral-50 min-h-screen">
      <JsonLd data={personSchema({
        name: member.name,
        slug: member.slug,
        position: member.position,
        photoUrl: member.photoUrl,
        bio: member.bio,
      })} />
      <JsonLd data={breadcrumbSchema([
        { name: "Beranda", path: "/" },
        { name: "Anggota", path: "/anggota" },
        { name: member.name, path: `/anggota/${member.slug}` },
      ])} />
      <div className="container mx-auto px-4">
        <Link
          href="/anggota"
          className="inline-flex items-center text-brand-600 hover:text-brand-700 mb-8 transition-colors font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          Kembali ke Daftar Anggota
        </Link>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden max-w-4xl mx-auto border border-neutral-100">
          <div className="md:flex">
            <div className="md:shrink-0 bg-neutral-50 md:w-80 flex flex-col items-center justify-center p-8 border-b md:border-b-0 md:border-r border-neutral-100">
              <div className="relative w-48 h-48 rounded-full overflow-hidden mb-6 bg-neutral-100 shadow-inner flex items-center justify-center border-4 border-white">
                {member.photoUrl ? (
                  <Image
                    src={member.photoUrl}
                    alt={member.name}
                    fill
                    sizes="192px"
                    className="object-cover"
                  />
                ) : (
                  <span className="text-brand-200 text-6xl font-bold">
                    {member.name.charAt(0)}
                  </span>
                )}
              </div>
            </div>
            <div className="p-8 md:p-10 flex-1">
              <div className="uppercase tracking-wide text-sm text-brand-600 font-semibold mb-2">
                {member.division}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-2">
                {member.name}
              </h1>
              <p className="text-xl text-neutral-600 mb-8 font-medium pb-6 border-b border-neutral-100">
                {member.position}
              </p>

              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold mb-4 text-navy-900">Biografi</h3>
                {member.bio ? (
                  <div className="whitespace-pre-line text-neutral-700 leading-relaxed text-lg">
                    {member.bio}
                  </div>
                ) : (
                  <p className="text-neutral-500 italic bg-neutral-50 p-4 rounded-lg border border-neutral-100">
                    Belum ada informasi biografi yang ditambahkan.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
