// app/conference-programme/page.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import PartnersSection from "@/components/home/PartnersSection";
import BackToTop from "@/components/layout/BackToTop";

// Mock Data (Replace with actual data fetching)
const statsData = [
  { value: "100+", label: "Speakers" },
  { value: "14", label: "Conference Events" },
  { value: "3", label: "Days" },
];

const mainEventsData = [
  {
    title:
      "Mining Leaders Forum – 3 Days of High-Level Discussions and Insightful Sessions",
    content: (
      <ul className="list-bullet-style space-y-3">
        <li>
          <strong>Main Plenary Session: </strong>Featuring top executives from
          Norilsk Nickel, EVRAZ, Mikhailovsky GOK (named after A. V. Varichev),
          and ALROSA.
          <br />
          Focus: The impact of industrial technologies – how mining enterprises
          are accelerating growth, improving efficiency, and boosting
          profitability.
        </li>
        <li>
          <strong>Mining Industry 4.0 Competition: </strong>A showcase of the
          most effective digital projects in the mining sector.
        </li>
      </ul>
    ),
  },
  {
    title: "New for This Year – Exclusive Forums and Round Tables",
    content: (
      <ul className="list-bullet-style space-y-3">
        <li>
          <strong>MINGEO Forum – Debut Edition: </strong>Mineral Resources in a
          Multipolar World: Investments. Knowledge. Technologies.
        </li>
        <li>
          <strong>Round Table: The Future of Procurement in Mining and Metallurgy: </strong>
          In-depth dialogue on modernising procurement strategies and
          partnerships.
        </li>
        <li>
          <strong>Round Table: Coal Industry Perspectives: </strong>Energy of
          Change: New Paths and Solutions for the Coal Industry. Held in
          collaboration with TeDo and featuring SUEK representatives.
        </li>
        <li>
          <strong>Round Table: Safety in the Workplace: </strong>From Theory to
          Practice – actionable strategies for operational safety in mining.
        </li>
        <li>
          <strong>Round Table: Engineering Skills & Innovation: </strong>
          Exploring the evolving demands for engineering expertise and the
          realities of innovation adoption in the mining sector.
        </li>
      </ul>
    ),
  },
  {
    title: "Technical Conferences",
    content: (
      <ul className="list-bullet-style space-y-3">
        <li>
          <strong>Processing & Enrichment of Mineral Raw Materials: </strong>
          Featuring mining and processing plant experts and presentations of
          cutting-edge technologies.
        </li>
        <li>
          <strong>Gold & Technology Conference:</strong> Latest innovations,
          methods, and insights at the intersection of gold mining and
          technology.
        </li>
      </ul>
    ),
  },
];

const keyEventsData = [
  {
    title: "The Mining Industry Leaders' Forum",
    image:
      "https://cdn.itegroupnews.com/MW_24_2304_0005_G_i_2_6f286bd05f.jpg",
  },
  {
    title: "Mining Industry 4.0",
    image: "https://cdn.itegroupnews.com/mw2022_gi_31_fe2e3e372e.jpg",
  },
  {
    title: "Expert conferences",
    image: "https://cdn.itegroupnews.com/4_C4_A3872_1202c590ba.jpg",
  },
  {
    title: "Round Tables",
    image: "https://cdn.itegroupnews.com/4_C4_A5222_ad4a659bdc.jpg",
  },
];

const conferencePartners = [
  {
    name: "Zyfra",
    logo: "https://cdn.itegroupnews.com/2_48e8e636ac.png",
    type: "Co-organiser",
    url: "https://www.zyfra.com/ru/",
  },
  {
    name: "Modern Women in Industries",
    logo: "https://cdn.itegroupnews.com/3_c5c5637a9c.png",
    type: "Strategic Partner",
    url: "https://wim-industries.ru/",
  },
];

export default function ConferenceProgrammePage() {
  return (
    <>
      <div className="pt-[60px] min-[1100px]:pt-[170px]">
        
        {/* Innovate Through Knowledge Section */}
        <div className="animated-block">
          <div className="animated-block-target">
            {/* Added px-10 for horizontal spacing like navbar */}
            <div className="relative z-10 overflow-hidden px-8 py-16 lg:py-24">
              <div className="px-6 md:px-10 lg:px-12">
                <div className="grid gap-10 lg:grid-cols-5 lg:gap-20">
                  <div className="lg:col-span-5">
                    <div className="flex flex-col gap-5">
                      <h5 className="font-heading text-2xl font-bold tracking-tight text-black lg:text-6xl xl:text-7xl uppercase">
                        Innovate Through Knowledge
                      </h5>
                      <p className="font-sans text-base leading-relaxed text-gray-700 lg:text-lg">
                        A dynamic three-day conference featuring industry leaders
                        from mining companies, processing plants, and geological
                        exploration firms. Designed for decision-makers, engineers,
                        and specialists, the program tackles key challenges,
                        innovations, and trends shaping the mining sector.
                        <br />
                        <br />
                        Engage, collaborate, and stay ahead in the industry!
                      </p>
                    </div>
                    <div className="mt-10 flex flex-wrap gap-10 border-y border-gray-200 py-8 2xl:gap-20">
                      {statsData.map((stat, idx) => (
                        <div
                          key={idx}
                          className="flex w-fit flex-col justify-center lg:border-r lg:pr-10 2xl:pr-20"
                        >
                          <h3 className="font-heading text-4xl font-bold text-[#F08400] lg:text-5xl xl:text-6xl">
                            {stat.value}
                          </h3>
                          <p className="font-sans text-base font-medium text-black lg:text-lg">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-10">
                      <Link
                        href="https://cdn-ite.prismetic.com/CP_Agenda_MWR_2025_f934b33dd5.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                      >
                        <button className="flex-center global-transition group gap-2 overflow-hidden bg-[#F08400] px-8 py-3 font-heading text-xl font-bold uppercase tracking-wide text-white transition-colors hover:bg-black lg:px-10 lg:text-2xl">
                          View Agenda
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
  
              </div>
            </div>
          </div>
        </div>

        {/* Main Events Section */}
        <div className="animated-block bg-gray-50">
          <div className="animated-block-target">
            {/* Added px-10 for horizontal spacing like navbar */}
            <div className="px-6 py-10 lg:py-14">
              <div className="px-6 md:px-10 lg:px-12">
                <h2 className="font-heading text-3xl font-bold text-black lg:text-4xl xl:text-5xl uppercase">
                  Main events of the business program <br /> April 23-25, 2025
                </h2>
                <div className="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-2 lg:gap-8">
                  {mainEventsData.map((event, idx) => (
                    <div
                      key={idx}
                      className="relative flex min-h-[500px] flex-col bg-[#F08400]/10 p-6 text-black lg:p-10"
                    >
                      <div className="z-10 flex flex-col gap-5">
                        <h3 className="font-heading text-2xl font-bold leading-tight lg:text-3xl xl:text-4xl">
                          {event.title}
                        </h3>
                        <div className="font-sans text-base leading-relaxed lg:text-lg">
                          {event.content}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Events Carousel Section */}
        <div className="animated-block">
          <div className="animated-block-target">
            {/* Added px-10 for horizontal spacing like navbar */}
            <div className="px-6 py-10 lg:py-14">
              <div className="px-6 md:px-10 lg:px-12">
                <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div className="lg:basis-2/3">
                    <h4 className="font-heading text-3xl font-bold text-black lg:text-4xl xl:text-5xl uppercase">
                      Key Events
                    </h4>
                    <p className="mt-4 font-sans text-base leading-relaxed text-gray-700 lg:text-lg">
                      The MiningWorld 2025 conference program united top experts and
                      industry leaders for three days of in-depth discussions.
                      Participants shared valuable insights and explored
                      sustainability in mining, with a focus on innovations,
                      business processes, and management strategies vital for the
                      sector’s future.
                    </p>
                  </div>
                </div>
                <div className="relative mt-10 w-full">
                  <Carousel>
                    <CarouselContent className="-ml-4">
                      {keyEventsData.map((event, idx) => (
                        <CarouselItem
                          key={idx}
                          className="pl-4 md:basis-1/2 lg:basis-1/3"
                        >
                          <div className="flex flex-col overflow-hidden bg-white transition-shadow duration-300 hover:shadow-lg">
                            <div className="relative h-56 w-full lg:h-64">
                              <Image
                                alt={event.title}
                                fill
                                className="object-cover"
                                src={event.image}
                              />
                            </div>
                            <div className="flex flex-col gap-3 p-5">
                              <h5 className="font-heading text-xl font-bold text-black lg:text-2xl">
                                {event.title}
                              </h5>
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conference Partners Section */}
        <div className="animated-block bg-gray-50">
          <div className="animated-block-target">
            {/* Added px-10 for horizontal spacing like navbar */}
            <div className="px-6 py-10 lg:py-14">
              <div className="px-6 md:px-10 lg:px-12">
                <h2 className="font-heading text-3xl font-bold text-black lg:text-4xl xl:text-5xl uppercase">
                  Conference Partners
                </h2>
                <div className="mt-10 flex flex-wrap gap-8 lg:mt-12">
                  {conferencePartners.map((partner, idx) => (
                    <div
                      key={idx}
                      className="flex w-full max-w-[280px] flex-col items-center gap-5 border border-mainColor1 bg-white p-6 text-center"
                    >
                      <div className="relative h-24 w-32">
                        <Image
                          alt={partner.name}
                          fill
                          className="object-contain"
                          src={partner.logo}
                        />
                      </div>
                      <h3 className="font-heading text-xl font-semibold text-black">
                        {partner.name}
                      </h3>
                      <p className="font-sans text-sm text-gray-600">{partner.type}</p>
                      <Link
                        href={partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto w-full"
                      >
                        <button className="flex-center global-transition w-full gap-2 bg-mainColor1 px-4 py-2 font-heading text-lg font-bold uppercase tracking-wide text-white transition-colors hover:bg-black">
                          Visit Website
                        </button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <PartnersSection />
        <BackToTop/>
      </div>
    </>
  );
}