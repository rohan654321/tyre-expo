"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllArticles, type Article } from "./data";
import BackToTop from "@/components/layout/BackToTop";

// Get articles from data.ts
const articlesData = getAllArticles();

const ITEMS_PER_PAGE = 9;

export default function ArticlesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter articles based on search term
  const filteredArticles = articlesData.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedArticles = filteredArticles.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="page-spacing-wrapper">
      <div className="pt-[100px] sm:pt-[120px] lg:pt-[140px]">
        {/* Articles Grid Section */}
        <div className="animated-block">
          <div className="animated-block-target">
            <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-12 sm:py-16">
              
              {/* Search Bar */}
              <div className="mb-8 sm:mb-10 lg:mb-12">
                <div className="max-w-md mx-auto">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full px-4 sm:px-5 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Articles Grid */}
              <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                {paginatedArticles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/articles/${article.slug}`}
                    className="group block bg-[#F08400]/5 overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-100">
                      <Image
                        alt={article.title}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        src={article.image}
                      />
                    </div>
                    <div className="p-4 sm:p-5">
                      <p className="text-xs sm:text-sm text-gray-500 mb-2">
                        {formatDate(article.publishedDate)}
                      </p>
                      <h2 className="text-base sm:text-lg md:text-xl font-extrabold text-black line-clamp-3 group-hover:text-orange-500 transition-colors duration-300 uppercase">
                        {article.title}
                      </h2>
                      {article.excerpt && (
                        <p className="text-xs sm:text-sm text-gray-600 mt-2 line-clamp-3">
                          {article.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              {/* No Results Message */}
              {filteredArticles.length === 0 && (
                <div className="text-center py-12 sm:py-16 lg:py-20">
                  <p className="text-base sm:text-lg md:text-xl text-gray-600">
                    No articles found matching your search.
                  </p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-wrap justify-center gap-2 mt-8 sm:mt-10">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg transition-colors ${
                          currentPage === page
                            ? "bg-orange-500 text-white"
                            : "border border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <BackToTop/>
    </div>
  );
}