import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, getAllArticles, getRelatedArticles } from "../data";
import BackToTop from "@/components/layout/BackToTop";

// Generate static paths for all articles at build time
export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  // ✅ IMPORTANT: Await the params Promise
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  const relatedArticles = getRelatedArticles(slug, 3);

  if (!article) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="page-spacing-wrapper">
      <div className="pt-[100px] sm:pt-[120px] lg:pt-[140px]">
        <article className="px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-12 sm:py-16 md:py-20 lg:py-24">
          
          {/* Date */}
          <div className="mb-4 sm:mb-5 lg:mb-6 text-center">
            <time className="text-xs sm:text-sm md:text-base text-orange-500 font-semibold tracking-wide uppercase">
              {formatDate(article.publishedDate)}
            </time>
          </div>

          {/* Title */}
          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-black uppercase text-center leading-tight mb-6 sm:mb-8 lg:mb-10">
            {article.title}
          </h1>

          {/* Featured Image */}
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-lg mb-8 sm:mb-10 lg:mb-12">
            <Image
              alt={article.title}
              fill
              className="object-cover"
              src={article.image}
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1000px"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-sm sm:prose-base md:prose-lg lg:prose-xl max-w-none mx-auto
            prose-headings:font-heading prose-headings:text-black prose-headings:uppercase
            prose-h1:text-2xl sm:prose-h1:text-3xl md:prose-h1:text-4xl prose-h1:mb-4 sm:prose-h1:mb-5 md:prose-h1:mb-6
            prose-h2:text-xl sm:prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-8 sm:prose-h2:mt-9 md:prose-h2:mt-10 prose-h2:mb-3 sm:prose-h2:mb-4 prose-h2:text-orange-600
            prose-h3:text-lg sm:prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-6 sm:prose-h3:mt-7 md:prose-h3:mt-8 prose-h3:mb-2 sm:prose-h3:mb-3
            prose-p:text-sm sm:prose-p:text-base md:prose-p:text-lg prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 sm:prose-p:mb-5
            prose-strong:text-black prose-strong:font-bold
            prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-lg prose-img:shadow-md prose-img:my-4 sm:prose-img:my-5 md:prose-img:my-6
            prose-ul:list-disc prose-ul:pl-5 sm:prose-ul:pl-6 prose-ul:my-3 sm:prose-ul:my-4
            prose-li:text-sm sm:prose-li:text-base md:prose-li:text-lg prose-li:mb-1
            [&_figure]:my-6 sm:[&_figure]:my-7 md:[&_figure]:my-8 [&_figure_img]:rounded-lg [&_figure_img]:shadow-md
          ">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>

          {/* Divider */}
          <div className="relative my-8 sm:my-10 lg:my-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 sm:px-4 text-xs sm:text-sm text-gray-400">✦ ✦ ✦</span>
            </div>
          </div>

          {/* Back to Articles Link */}
          <div className="text-center">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to All Articles
            </Link>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-12 sm:mt-16 lg:mt-20 pt-6 sm:pt-7 lg:pt-8 border-t border-gray-200">
              <h3 className="font-heading text-xl sm:text-2xl md:text-3xl text-black uppercase mb-6 sm:mb-7 lg:mb-8 text-center">
                You Might Also Like
              </h3>
              <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedArticles.map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    href={`/articles/${relatedArticle.slug}`}
                    className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden bg-gray-100">
                      <Image
                        alt={relatedArticle.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        src={relatedArticle.image}
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-4 sm:p-5">
                      <time className="text-[10px] sm:text-xs text-orange-500 font-semibold uppercase tracking-wide">
                        {formatDate(relatedArticle.publishedDate)}
                      </time>
                      <h4 className="font-heading text-sm sm:text-base md:text-lg text-black uppercase mt-2 line-clamp-3 group-hover:text-orange-500 transition-colors duration-300">
                        {relatedArticle.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
      <BackToTop/>
    </div>
  );
}