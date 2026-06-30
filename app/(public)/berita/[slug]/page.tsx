import { getPublishedArticleBySlug, getPublishedArticleSlugs } from "@blawness/admin-kit/public";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPublishedArticleSlugs();
  if (slugs.length === 0) return [{ slug: "_empty_placeholder_" }];
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedArticleBySlug(slug);
  
  if (!post) {
    return { title: "Berita Tidak Ditemukan" };
  }
  
  return {
    title: post.title,
    description: post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      images: post.coverImageUrl ? [post.coverImageUrl] : [],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedArticleBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-navy-900 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-navy-950" />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {post.categoryName && (
            <span className="inline-block bg-brand-500/20 text-brand-300 border border-brand-500/30 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase mb-6 shadow-sm">
              {post.categoryName}
            </span>
          )}
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-8">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-center space-x-6 text-navy-200 text-sm md:text-base font-medium">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <time dateTime={post.publishedAt?.toISOString()}>
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                }) : ''}
              </time>
            </div>
            
            {post.authorName && (
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{post.authorName}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {post.coverImageUrl && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 lg:-mt-20 relative z-10">
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5 bg-neutral-100">
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-w-1280px) 100vw, 1280px"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div 
          className="prose prose-lg prose-neutral prose-a:text-brand-600 hover:prose-a:text-brand-700 prose-headings:text-navy-900 prose-img:rounded-xl mx-auto max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
        />
        
        {/* Back Link */}
        <div className="mt-16 pt-8 border-t border-neutral-100 text-center">
          <Link 
            href="/berita"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-navy-700 bg-navy-50 hover:bg-navy-100 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Indeks Berita
          </Link>
        </div>
      </div>
    </article>
  );
}
