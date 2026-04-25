// app/about-ite/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PartnersSection from "@/components/home/PartnersSection";
import BackToTop from "@/components/layout/BackToTop";

export default function AboutITEPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-100 grid place-content-center bg-black">
        <div className="flex size-20 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-orange-500 text-4xl">
          <div className="flex size-16 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-orange-300 text-2xl"></div>
        </div>
      </div>
    );
  }

  const stats = [
    { value: "4 Mil+", label: "Database" },
    { value: "500,000+", label: "Visitors Per Year" },
    { value: "10,000+", label: "Exhibitors Per Year" },
    { value: "1,700+", label: "Media in Attendance" },
    { value: "30", label: "Events" },
    { value: "12+", label: "Industry Sectors" }
  ];

  const missionVisionValues = [
    {
      title: "The Mission",
      content: "To create unique and valuable events for the success of your business and the development of industries and economies.",
      image: "/images/image3.png"
    },
    {
      title: "The Vision",
      content: "Connecting businesses year-round, both online and in person, allowing professionals to establish long-term business partnerships.",
      image: "/images/image4.png"
    },
    {
      title: "Our Values",
      content: "Entrepreneurship, Integrity, Excellence, Positive Thinking, Commitment to Result",
      image: "/images/image5.png"
    }
  ];

  const exhibitions = [
    {
      title: "MITT",
      venue: "Crocus Expo, Moscow",
      description: "The international travel & hospitality show.",
      siteLink: "https://expomitt.com",
      startDate: "Mar 11th, 2026",
      endDate: "Mar 13th, 2026",
      image: "https://cdn.itegroupnews.com/mitt_2eb1a572e1.webp"
    },
    {
      title: "TranRussia",
      venue: "Crocus Expo, Moscow",
      description: "The international event for transportation and logistics market experts.",
      siteLink: "https://trstexpo.com/",
      startDate: "Mar 17th, 2026",
      endDate: "Mar 19th, 2026",
      image: "https://cdn.itegroupnews.com/transrussia_5ab92d93fe.webp"
    },
    {
      title: "SkladTech",
      venue: "Crocus Expo, Moscow",
      description: "The special exposition for warehouse and handling equipment, automation systems and solutions.",
      siteLink: "https://trstexpo.com/",
      startDate: "Mar 17th, 2026",
      endDate: "Mar 19th, 2026",
      image: "https://cdn.itegroupnews.com/skladtech_92b3cc7f1b.webp"
    },
    {
      title: "MosHome",
      venue: "Crocus Expo, Moscow",
      description: "The International exhibition of consumer goods for house, garden, sports and leisure MosHome.",
      siteLink: "https://moshomeexpo.com",
      startDate: "Mar 31st, 2026",
      endDate: "Apr 3rd, 2026",
      image: "https://cdn.itegroupnews.com/moshome_47a4df90fa.webp"
    },
    {
      title: "MosBuild",
      venue: "Crocus Expo, Moscow",
      description: "The international building and interiors trade show.",
      siteLink: "https://mosbuildexpo.com/",
      startDate: "Mar 31st, 2026",
      endDate: "Apr 3rd, 2026",
      image: "https://cdn.itegroupnews.com/mosbuild_6ef11a4b77.webp"
    },
    {
      title: "ExpoElectronica",
      venue: "Pavilion 3, Halls 13, 14, 15, Crocus Expo",
      description: "The international exhibition of electronica, components and technologies, materials and equipment, embedded systems and turnkey solutions.",
      siteLink: "https://electronicaexpo.com/",
      startDate: "Apr 14th, 2026",
      endDate: "Apr 16th, 2026",
      image: "https://cdn.itegroupnews.com/mosbuild_6ef11a4b77.webp"
    },
    {
      title: "ExpoCifra",
      venue: "Crocus Expo, Pavillion 3, Hall 13",
      description: "The international exhibition of information technologies and digital transformation solutions. Co-located with ExpoElectronica",
      siteLink: "https://expocifra.com/en/",
      startDate: "Apr 14th, 2026",
      endDate: "Apr 16th, 2026",
      image: "https://cdn.itegroupnews.com/expoelectronica_0a85ec1bd8.webp"
    },
    {
      title: "Analitika Expo",
      venue: "Crocus Expo, Moscow",
      description: "The international exhibition of laboratory equipment and chemical reagents.",
      siteLink: "https://analitikaexpo.com/en/",
      startDate: "Apr 22nd, 2026",
      endDate: "Apr 24th, 2026",
      image: "https://cdn.itegroupnews.com/expocifra_2c23f2988f.webp"
    },
    {
      title: "MiningWorld",
      venue: "Crocus Expo, Moscow",
      description: "The international exhibition of machines and equipment for mining, processing, and transportation of minerals.",
      siteLink: "https://miningworldexpo.com",
      startDate: "Apr 22nd, 2026",
      endDate: "Apr 24th, 2026",
      image: "https://cdn.itegroupnews.com/analitika_2b4d47e0a9.webp"
    },
    {
      title: "Securika Moscow",
      venue: "Crocus Expo, Moscow",
      description: "The international exhibition of security and fire protection equipment and products.",
      siteLink: "https://securika-moscow.ru/en/",
      startDate: "Apr 22nd, 2026",
      endDate: "Apr 24th, 2026",
      image: "https://cdn.itegroupnews.com/miningworld_5ce552a5d6.webp"
    },
    {
      title: "Printech",
      venue: "Crocus Expo, Moscow",
      description: "The international exhibition of equipment, technologies and supplies for printing and advertising production. Co-located with RosUpack.",
      siteLink: "https://printech-expo.ru/en/",
      startDate: "Jun 16th, 2026",
      endDate: "Jun 19th, 2026",
      image: "https://cdn.itegroupnews.com/printech_4fb4b37c6e.webp"
    },
    {
      title: "RosUpack",
      venue: "Crocus Expo, Moscow",
      description: "The international event for package manufacturers and consumers. Co-located with Printech.",
      siteLink: "https://rosupackexpo.com/",
      startDate: "Jun 16th, 2026",
      endDate: "Jun 19th, 2026",
      image: "https://cdn.itegroupnews.com/rosupack_746977fd87.webp"
    },
    {
      title: "WorldFood Moscow",
      venue: "Crocus Expo, Moscow",
      description: "The international food and drink exhibition.",
      siteLink: "https://expoworldfood.com/",
      startDate: "Sep 15th, 2026",
      endDate: "Sep 18th, 2026",
      image: "https://cdn.itegroupnews.com/worldfoodmoscow_f9a1d64bf8.webp"
    },
    {
      title: "Weldex",
      venue: "Pavilion 1, Hall 4, Crocus Expo",
      description: "The international exhibition of welding materials, equipment and technologies.",
      siteLink: "https://weldex.ru/en/",
      startDate: "Oct 6th, 2026",
      endDate: "Oct 9th, 2026",
      image: "https://cdn.itegroupnews.com/weldex_5dabc45563.webp"
    },
    {
      title: "Comtrans",
      venue: "Crocus Expo, Moscow",
      description: "The international exhibition of commercial vehicles.",
      siteLink: "https://www.comtransexpo.ru/en/",
      startDate: "Oct 6th, 2026",
      endDate: "Oct 9th, 2026",
      image: "https://cdn.itegroupnews.com/comtrans_1a2b3c4d5e.webp"
    },
    {
      title: "Fastenex",
      venue: "Hall 4, Pavilion 1, Crocus Expo, Moscow",
      description: "The international exhibition of fasteners and industrial supply.",
      siteLink: "https://fastenex.ru/en/",
      startDate: "Oct 6th, 2026",
      endDate: "Oct 9th, 2026",
      image: "https://cdn.itegroupnews.com/fastenex_396b02490f.webp"
    },
    {
      title: "YugAgro",
      venue: "Expograd Yug, Krasnodar",
      description: "The international exhibition of agricultural machinery, equipment, and materials for crop production.",
      siteLink: "https://yugagro.org/en/",
      startDate: "Nov 17th, 2026",
      endDate: "Nov 20th, 2026",
      image: "https://cdn.itegroupnews.com/yugagro_24d7ac61db.webp"
    },
    {
      title: "Pharmtech & Ingredients",
      venue: "Crocus Expo, Moscow",
      description: "The international exhibition for equipment, raw materials and technologies for pharmaceutical production.",
      siteLink: "https://expopharmtech.com/",
      startDate: "Nov 24th, 2026",
      endDate: "Nov 27th, 2026",
      image: "https://cdn.itegroupnews.com/pharmtech_e6f6e7a85a.webp"
    },
    {
      title: "Woodex",
      venue: "Crocus Expo, Moscow",
      description: "The international exhibition of equipment, materials and components for woodworking and furniture industry",
      siteLink: "https://woodexpo.ru/en/",
      startDate: "Dec 1st, 2026",
      endDate: "Dec 4th, 2026",
      image: "https://cdn.itegroupnews.com/woodex_73a50a4315.webp"
    },
    {
      title: "ToolMash",
      venue: "Pavilion 1, Crocus Expo, Moscow",
      description: "The international hardware exhibition. Co-located with Woodex",
      siteLink: "https://toolmash.ru/en/",
      startDate: "Dec 1st, 2026",
      endDate: "Dec 4th, 2026",
      image: "https://cdn.itegroupnews.com/toolmash_7d83889bed.webp"
    },
    {
      title: "DairyTech",
      venue: "Pavilion 1, Hall 4, Crocus Expo, Moscow",
      description: "The international exhibition of equipment for milk and dairy production.",
      siteLink: "https://dairytechexpo.com/",
      startDate: "Jan 26th, 2027",
      endDate: "Jan 28th, 2027",
      image: "https://cdn.itegroupnews.com/dairytech_d532416dae.webp"
    },
    {
      title: "Aquaflame by Aquatherm",
      venue: "Crocus Expo, Moscow",
      description: "The international exhibition for domestic and industrial heating, water supply, engineering systems, and equipment for swimming pools and spas.",
      siteLink: "https://aquaflameexpo.com",
      startDate: "Feb 1st, 2027",
      endDate: "Feb 4th, 2027",
      image: "https://cdn.itegroupnews.com/aquaflame_38fea93c6c.webp"
    },
    {
      title: "AirVent",
      venue: "Crocus Expo, Moscow",
      description: "The international exhibition of ventilation, air conditioning, and refrigeration equipment.",
      siteLink: "https://airventexpo.com/",
      startDate: "Feb 1st, 2027",
      endDate: "Feb 4th, 2027",
      image: "https://cdn.itegroupnews.com/airvent_b09e1eb665.webp"
    }
  ];

  return (
    <div className="intro-animation">
      <div className="page-spacing-wrapper">
        <div className="pt-[100px] sm:pt-[120px] lg:pt-[140px]">
          
          {/* About Us Section */}
          <div className="animated-block">
            <div className="animated-block-target">
              <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
                <div className="lg:col-span-3">
                  <div className="flex flex-col gap-4 sm:gap-5">
                    <h2 className="font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black">About Us</h2>
                    <p className="text-sm sm:text-base md:text-lg text-gray-700">
                      ITE Group is a business events organiser that has been operating in the Asian market since 1991. Every year, we host more than 30 of the largest industry events, including exhibitions, summits, and conferences. Powered by the Connect digital platform, the ITE ecosystem offers unique hybrid solutions for industry communities across Asia, the ASEAN countries, and beyond.
                      <br /><br />
                      With over 100 agents and hundreds of associations and partners spanning 150 countries and 5 continents, our global network seamlessly connects clients to opportunities around the world.
                      <br /><br />
                      ITE events contribute to business success and development, unlock the export potential of countries and regions, provide access to a broad target audience, and offer effective, innovative solutions for networking, growth, and professional development. They ensure dialogue between the business community and government.
                      <br /><br />
                      ITE offices are located in Bangkok, Dubai, Beijing, and New Delhi.
                    </p>
                  </div>
                  
                  {/* Stats Section - Responsive */}
                  <div className="mt-10 sm:mt-12 lg:mt-16 flex flex-wrap justify-start gap-y-8 sm:gap-y-12 border-t border-gray-200 pt-8 sm:pt-10">
                    {stats.map((stat, idx) => (
                      <div key={idx} className="flex w-1/2 sm:w-1/3 md:w-1/4 items-start justify-start">
                        <div className="px-4 sm:px-6 md:px-8 text-start">
                          <h3 className="font-bebas text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#F08400]">
                            {stat.value}
                          </h3>
                          <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-semibold uppercase text-black">
                            {stat.label}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission, Vision, Values Section */}
          <div className="animated-block mt-12 sm:mt-16 lg:mt-20">
            <div className="animated-block-target">
              <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
                <div className="mb-6 sm:mb-8 flex flex-col lg:flex-row justify-between lg:items-end gap-4">
                  <div className="lg:basis-2/3">
                    <h3 className="font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black">Working for Your Success</h3>
                    <p className="mt-3 text-sm sm:text-base md:text-lg text-gray-700">
                      At ITE Group, our goal is to empower businesses by creating impactful events that drive industry growth and foster valuable connections. We are dedicated to supporting our clients' success and facilitating meaningful opportunities for professionals worldwide.
                    </p>
                  </div>
                </div>
                <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {missionVisionValues.map((item, idx) => (
                    <div key={idx} className="group flex flex-col overflow-hidden rounded-lg bg-orange-50 transition-shadow duration-300 ease-in-out hover:shadow-lg">
                      <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-gray-300">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                      <div className="flex flex-col gap-3 sm:gap-4 p-4 sm:p-5">
                        <h4 className="text-xl sm:text-2xl font-bold text-black">{item.title}</h4>
                        <p className="text-sm sm:text-base text-gray-600">{item.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Exhibitions at a Glance Section */}
          <div className="animated-block mt-12 sm:mt-16 lg:mt-20">
            <div className="animated-block-target">
              <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
                <div className="flex w-full items-end justify-between gap-6 sm:gap-10 max-lg:flex-wrap lg:gap-20 2xl:gap-40">
                  <div>
                    <h3 className="font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black">Our Exhibitions at a Glance</h3>
                    <p className="mt-3 text-sm sm:text-base text-gray-700">
                      Each year, we organise and host over 30 leading industry events across key sectors, including exhibitions, summits, and conferences.
                      <br /><br />
                      Supported by the Connect digital platform, the ITE ecosystem offers innovative hybrid solutions for industry communities across Asia and beyond.
                    </p>
                  </div>
                </div>

                <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
                  {exhibitions.map((exhibition, idx) => (
                    <div key={idx} className="group flex flex-col gap-3 sm:gap-4 rounded-sm border border-black/10 bg-white p-4 sm:p-5 shadow-sm transition-all hover:shadow-md xl:p-6">
                      <div className="relative h-28 sm:h-32 w-full overflow-hidden rounded-sm">
                        <Image
                          src={exhibition.image}
                          alt={exhibition.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-black">{exhibition.title}</h4>
                      <p className="text-sm sm:text-base text-gray-600 line-clamp-2">{exhibition.description}</p>
                      <p className="text-xs sm:text-sm">Start Date: <span className="font-bold">{exhibition.startDate}</span></p>
                      <p className="text-xs sm:text-sm">End Date: <span className="font-bold">{exhibition.endDate}</span></p>
                      <p className="text-xs sm:text-sm">Venue: <span className="font-bold line-clamp-2">{exhibition.venue}</span></p>
                      <Link href={exhibition.siteLink} target="_blank" className="mt-auto block">
                        <button className="flex-center group gap-2 font-bebas text-xl sm:text-2xl text-[#F08400] transition-all hover:text-black">
                          Visit Website
                          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                            <path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path>
                          </svg>
                        </button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Partners Section */}
          <div className="mt-12 sm:mt-16 lg:mt-20">
            <PartnersSection />
          </div>
        </div>
        <BackToTop/>
      </div>

      <style jsx>{`
        .global-transition {
          transition: all 0.3s ease;
        }
        .flex-center {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .font-bebas {
          font-family: 'Bebas Neue', cursive;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}