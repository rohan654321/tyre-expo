'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import Container from '../ui/container';
import { Article, formatDate } from '@/app/articles/data'

interface ArticlesSectionProps {
  articles: Article[];
}

export default function ArticlesSection({ articles }: ArticlesSectionProps) {
  const [featuredArticle, ...restArticles] = articles;

  return (
    <section className="py-20 bg-[#f5f5f5] overflow-hidden">
      <Container>
        {/* HEADER */}
        <div className="flex justify-between items-end mb-12 gap-6 flex-wrap">
          <div className="max-w-[900px]">
            <p className="text-[#F08400] font-sans text-[14px] uppercase tracking-[1.5px]">
              Articles
            </p>
            <h2 className="font-bebas font-bold text-[46px] leading-[1.05] tracking-[2px] uppercase text-black">
              EVENT INSIGHTS & INDUSTRY TRENDS
            </h2>
            <p className="text-gray-600 mt-3 text-base">
              Stay up to date with the latest updates in the industry and the show
            </p>
          </div>

          <Button
            href="/articles/"
            className="border border-[#F08400] !text-[#F08400] px-6 py-3 text-sm font-semibold bg-transparent hover:bg-[#F08400] hover:!text-white transition"
          >
            VIEW ALL ARTICLES
          </Button>
        </div>

        {/* CONTENT */}
        <div className="grid lg:grid-cols-[minmax(0,65%)_minmax(0,35%)] gap-8">
          {/* LEFT FEATURED ARTICLE */}
          {featuredArticle && (
            <div className="group cursor-pointer min-w-0">
              <div className="relative h-[360px] rounded-xl overflow-hidden">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="mt-4">
                <p className="text-[#F08400] text-sm font-semibold">
                  {formatDate(featuredArticle.publishedDate)}
                </p>
                <Link href={`/articles/${featuredArticle.slug}`}>
                  <h3 className="text-[24px] font-bold text-black mt-2 leading-snug hover:text-[#F08400] transition">
                    {featuredArticle.title}
                  </h3>
                </Link>
                <p className="text-gray-600 mt-3 text-base leading-relaxed">
                  {featuredArticle.excerpt}
                </p>
              </div>
            </div>
          )}

          {/* RIGHT ARTICLES */}
          <div className="flex flex-col gap-6 min-w-0">
            {restArticles.map((article) => (
              <div key={article.slug} className="grid grid-cols-[40%_60%] gap-4 items-start group cursor-pointer">
                <div className="relative h-[120px] rounded-lg overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div>
                  <p className="text-[#F08400] text-xs font-semibold">
                    {formatDate(article.publishedDate)}
                  </p>
                  <Link href={`/articles/${article.slug}`}>
                    <h4 className="text-[16px] font-bold text-black mt-1 leading-snug hover:text-[#F08400] transition">
                      {article.title}
                    </h4>
                  </Link>
                  <p className="text-gray-600 text-sm mt-2 leading-relaxed line-clamp-4">
                    {article.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}