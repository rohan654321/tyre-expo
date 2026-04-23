// app/media-gallery/page.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import BackToTop from "@/components/layout/BackToTop";

// Mock Data - In production, fetch from CMS
const galleryCategories = [
  {
    id: 21,
    title: "Exhibition 2025",
    slug: "exhibition-2025",
    image: "https://cdn.itegroupnews.com/mnng25_1198_ce8f5a92dd.webp",
  },
  {
    id: 22,
    title: "Conference Program 2025",
    slug: "conference-program-2025",
    image: "https://cdn.itegroupnews.com/MW_25_AMG_0827i_022377fa05.webp",
  },
  {
    id: 3,
    title: "Exhibition 2024",
    slug: "exhibition-2024",
    image: "https://cdn.itegroupnews.com/mw24_2_1077_1_e0df386c4c.webp",
  },
  {
    id: 18,
    title: "Conference Program 2024",
    slug: "conference-program-2024",
    image: "https://cdn.itegroupnews.com/MW_24_2304_0077_FORUM_i_ba5014d9cf.webp",
  },
  {
    id: 4,
    title: "Conference Programme 2024",
    slug: "conference-programme-2024",
    image: "https://cdn.itegroupnews.com/MW_24_2304_0077_FORUM_i_289a26be30.webp",
  },
  {
    id: 5,
    title: "Exhibition 2023",
    slug: "exhibition-2023",
    image: "https://cdn.itegroupnews.com/04_3b00db5ab1.webp",
  },
  {
    id: 6,
    title: "Conference Programme 2023",
    slug: "conference-programme-2023",
    image: "https://cdn.itegroupnews.com/MW_23_IMG_1167i_5878b45805.webp",
  },
  {
    id: 9,
    title: "Award Ceremony Mining Industry 4.0 2022",
    slug: "award-ceremony-mining-industry-4-0-2022",
    image: "https://cdn.itegroupnews.com/mw2022_gi_31_822c7f96d2.webp",
  },
  {
    id: 7,
    title: "Exhibition 2022",
    slug: "exhibition-2022",
    image: "https://cdn.itegroupnews.com/mw2022_exh_13_5eb7dd114b.webp",
  },
  {
    id: 8,
    title: "Conference Programme 2022",
    slug: "conference-programme-2022",
    image: "https://cdn.itegroupnews.com/mw2022_dp_15_5272bfa8da.webp",
  },
  {
    id: 10,
    title: "Exhibition 2021",
    slug: "exhibition-2021",
    image: "https://cdn.itegroupnews.com/mining_exh21_exh9_aefcb70926.webp",
  },
  {
    id: 11,
    title: "Conference Programme 2021",
    slug: "conference-programme-2021",
    image: "https://cdn.itegroupnews.com/mining_exh21_bip1_c30720d5b0.webp",
  },
  {
    id: 13,
    title: "Exhibition 2020",
    slug: "exhibition-2020",
    image: "https://cdn.itegroupnews.com/exhibition_2020_3_baa4271990.webp",
  },
  {
    id: 14,
    title: "Conference Programme 2020",
    slug: "conference-programme-2020",
    image: "https://cdn.itegroupnews.com/business_prog16_851c07f86b.webp",
  },
  {
    id: 15,
    title: "Exhibition 2019",
    slug: "exhibition-2019",
    image: "https://cdn.itegroupnews.com/mw24_2_1077_1_82887824ff.webp",
  },
  {
    id: 17,
    title: "Gala Event 2019",
    slug: "gala-event-2019",
    image: "https://cdn.itegroupnews.com/pr_20_16b0b652fa.webp",
  },
  {
    id: 16,
    title: "Conference Programme 2019",
    slug: "conference-programme-2019",
    image: "https://cdn.itegroupnews.com/MW_24_2504_0007_FORUM_i_e0c78dbe49.webp",
  },
];

export default function MediaGalleryPage() {
  return (
    <div className="page-spacing-wrapper">


      {/* Gallery Grid Section */}
      <div className="animated-block">
        <div className="animated-block-target">
          <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-16">
            <div className="mb-10 max-w-3xl space-y-5 lg:mb-20">
              <h4 className="title-70 text-black lg:basis-2/3">
                A Visual Journey Through Mining World
              </h4>
              <div className="text-gray-600">
                Discover the stories behind the images that have shaped Mining
                World's legacy as a key event in the mining sector.
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8 2xl:gap-10">
              {galleryCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/media-gallery/${category.slug}`}
                  target="_self"
                  className="group relative flex size-full flex-col bg-gray-800 text-white overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="overflow-hidden">
                    <Image
                      alt={category.title}
                      width={500}
                      height={500}
                      className="size-full h-[400px] object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                      src={category.image}
                    />
                  </div>
                  <div className="flex grow items-center p-5 bg-black/50 absolute bottom-0 left-0 right-0">
                    <h5 className="title-20 font-bold">{category.title}</h5>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <BackToTop/>
    </div>
  );
}