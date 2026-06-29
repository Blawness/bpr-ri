import { getPublishedArticles } from "@blawness/admin-kit/public";
import Link from "next/link";
import Image from "next/image";

export default async function BeritaPage() {
  const posts = await getPublishedArticles({ limit: 12 });

  return (
    <div className="min-h-screen bg-neutral-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-navy-900 tracking-tight mb-4">
            Berita & Artikel
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Informasi terbaru, kegiatan, dan pengumuman resmi dari Badan Pusat Reklasseering RI.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-neutral-100">
            <p className="text-neutral-500 text-lg">Belum ada berita yang dipublikasikan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link 
                key={post.id} 
                href={`/berita/${post.slug}`}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100 hover:border-brand-200 transform hover:-translate-y-1"
              >
                <div className="relative h-56 w-full overflow-hidden bg-neutral-100">
                  {post.coverImageUrl ? (
                    <Image
                      src={post.coverImageUrl}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-navy-50 text-navy-200">
                      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                  )}
                  {post.categoryName && (
                    <div className="absolute top-4 left-4 bg-brand-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                      {post.categoryName}
                    </div>
                  )}
                </div>
                
                <div className="flex-1 p-6 flex flex-col">
                  <div className="flex items-center text-sm text-neutral-500 mb-3 space-x-4">
                    <time dateTime={post.publishedAt?.toISOString()}>
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      }) : ''}
                    </time>
                  </div>
                  
                  <h2 className="text-xl font-bold text-navy-900 mb-3 group-hover:text-brand-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-neutral-600 mb-6 line-clamp-3 text-sm leading-relaxed flex-1">
                    {post.excerpt || 'Baca selengkapnya...'}
                  </p>
                  
                  <div className="flex items-center text-brand-600 font-medium text-sm mt-auto group-hover:translate-x-1 transition-transform">
                    Baca Selengkapnya
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
