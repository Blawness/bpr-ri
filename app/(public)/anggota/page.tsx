import { db } from "@/lib/db";
import { members } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import Link from "next/link";


export const metadata = {
  title: "Anggota | BPR-RI",
  description: "Daftar anggota BPR-RI",
};

async function getMembers() {
  "use cache";
  return db
    .select()
    .from(members)
    .where(eq(members.isActive, true))
    .orderBy(asc(members.sortOrder), asc(members.name));
}

export default async function AnggotaPage() {
  const allMembers = await getMembers();

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">Anggota Kami</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allMembers.map((member) => (
          <Link 
            href={`/anggota/${member.slug}`} 
            key={member.id} 
            className="group flex flex-col items-center p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              {member.photoUrl ? (
                <img
                  src={member.photoUrl}
                  alt={member.name}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <span className="text-gray-400 dark:text-gray-500 text-4xl font-bold">
                  {member.name.charAt(0)}
                </span>
              )}
            </div>
            <h2 className="text-xl font-semibold text-center mb-1 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {member.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm text-center mb-1">{member.position}</p>
            <p className="text-gray-500 dark:text-gray-400 text-xs text-center">{member.division}</p>
          </Link>
        ))}
        {allMembers.length === 0 && (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-12">
            Belum ada anggota yang ditambahkan.
          </div>
        )}
      </div>
    </div>
  );
}
