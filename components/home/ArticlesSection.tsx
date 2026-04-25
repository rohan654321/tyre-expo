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
    <section className="py-12 sm:py-16 lg:py-20 bg-[#f5f5f5] overflow-hidden">
      <Container>
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-6 mb-8 sm:mb-10 lg:mb-12 flex-wrap">
          <div className="max-w-[900px]">
            <p className="text-[#F08400] font-sans text-[12px] sm:text-[14px] uppercase tracking-[1.5px]">
              Articles
            </p>
            <h2 className="font-bebas font-bold text-[32px] sm:text-[38px] md:text-[42px] lg:text-[46px] leading-[1.05] tracking-[2px] uppercase text-black">
              EVENT INSIGHTS & INDUSTRY TRENDS
            </h2>
            <p className="text-gray-600 mt-2 sm:mt-3 text-sm sm:text-base">
              Stay up to date with the latest updates in the industry and the show
            </p>
          </div>

          <Button
            href="/articles/"
            className="border border-[#F08400] !text-[#F08400] px-5 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold bg-transparent hover:bg-[#F08400] hover:!text-white transition w-full sm:w-auto text-center"
          >
            VIEW ALL ARTICLES
          </Button>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT FEATURED ARTICLE */}
          {featuredArticle && (
            <div className="lg:w-[65%] group cursor-pointer min-w-0">
              <div className="relative h-[250px] sm:h-[300px] md:h-[340px] lg:h-[360px] rounded-xl overflow-hidden">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="mt-4">
                <p className="text-[#F08400] text-xs sm:text-sm font-semibold">
                  {formatDate(featuredArticle.publishedDate)}
                </p>
                <Link href={`/articles/${featuredArticle.slug}`}>
                  <h3 className="text-xl sm:text-[22px] lg:text-[24px] font-bold text-black mt-2 leading-snug hover:text-[#F08400] transition">
                    {featuredArticle.title}
                  </h3>
                </Link>
                <p className="text-gray-600 mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed line-clamp-3">
                  {featuredArticle.excerpt}
                </p>
              </div>
            </div>
          )}

          {/* RIGHT ARTICLES */}
          <div className="lg:w-[35%] flex flex-col gap-5 sm:gap-6 min-w-0">
            {restArticles.map((article) => (
              <div key={article.slug} className="grid grid-cols-[35%_65%] sm:grid-cols-[40%_60%] gap-3 sm:gap-4 items-start group cursor-pointer">
                <div className="relative h-[90px] sm:h-[100px] md:h-[110px] lg:h-[120px] rounded-lg overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div>
                  <p className="text-[#F08400] text-[10px] sm:text-xs font-semibold">
                    {formatDate(article.publishedDate)}
                  </p>
                  <Link href={`/articles/${article.slug}`}>
                    <h4 className="text-[14px] sm:text-[15px] lg:text-[16px] font-bold text-black mt-1 leading-snug hover:text-[#F08400] transition line-clamp-2">
                      {article.title}
                    </h4>
                  </Link>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1 sm:mt-2 leading-relaxed line-clamp-3 sm:line-clamp-4">
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