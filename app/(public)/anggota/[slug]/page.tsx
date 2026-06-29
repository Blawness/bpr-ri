import { db } from "@/lib/db";
import { members } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";


async function getMemberBySlug(slug: string) {
  "use cache";
  const data = await db.select().from(members).where(eq(members.slug, slug)).limit(1);
  return data[0];
}

export async function generateStaticParams() {
  const allMembers = await db.select({ slug: members.slug }).from(members);
  if (allMembers.length === 0) return [{ slug: "_empty_placeholder_" }];
  return allMembers.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = await getMemberBySlug(slug);

  if (!member) return { title: "Not Found" };

  return {
    title: `${member.name} | Anggota BPR-RI`,
    description: `Profil ${member.name} - ${member.position} di BPR-RI`,
  };
}

export default async function MemberProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = await getMemberBySlug(slug);

  if (!member) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <Link href="/anggota" className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-8 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
        Kembali ke Daftar Anggota
      </Link>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto border border-gray-100 dark:border-gray-700">
        <div className="md:flex">
          <div className="md:shrink-0 bg-gray-50 dark:bg-gray-900 md:w-80 flex flex-col items-center justify-center p-8 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-700">
            <div className="relative w-48 h-48 rounded-full overflow-hidden mb-6 bg-gray-200 dark:bg-gray-700 shadow-inner flex items-center justify-center border-4 border-white dark:border-gray-800">
              {member.photoUrl ? (
                <img
                  src={member.photoUrl}
                  alt={member.name}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-gray-400 dark:text-gray-500 text-6xl font-bold">
                  {member.name.charAt(0)}
                </span>
              )}
            </div>
          </div>
          <div className="p-8 md:p-10 flex-1">
            <div className="uppercase tracking-wide text-sm text-blue-600 dark:text-blue-400 font-semibold mb-2">
              {member.division}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {member.name}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 font-medium pb-6 border-b border-gray-100 dark:border-gray-700">
              {member.position}
            </p>
            
            <div className="prose dark:prose-invert max-w-none">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Biografi</h3>
              {member.bio ? (
                <div className="whitespace-pre-line text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  {member.bio}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 italic bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-100 dark:border-gray-800">
                  Belum ada informasi biografi yang ditambahkan.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
