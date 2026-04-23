// app/sectors/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PartnersSection from "@/components/home/PartnersSection";
import BackToTop from "@/components/layout/BackToTop";

export default function SectorsPage() {
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

  const sectors = [
    {
      title: "Raw Materials & Rubber Compounds",
      slug: "raw-materials-and-rubber-compounds",
      description: "Natural rubber, synthetic rubber, carbon black, silica, processing oils, and specialty chemicals for tyre manufacturing.",
      image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png"
    },
    {
      title: "Tyre Manufacturing Machinery",
      slug: "tyre-manufacturing-machinery",
      description: "Banbury mixers, calenders, extruders, tyre building machines, curing presses, and finishing equipment.",
      image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png"
    },
    {
      title: "Rubber Processing Equipment",
      slug: "rubber-processing-equipment",
      description: "Two-roll mills, internal mixers, strainers, pelletizers, and rubber bale cutters for efficient processing.",
      image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png"
    },
    {
      title: "Tyre Testing & Quality Control",
      slug: "tyre-testing-and-quality-control",
      description: "Durability testers, uniformity machines, balance testers, X-ray inspection, and laboratory testing equipment.",
      image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png"
    },
    {
      title: "Retreading & Repair Materials",
      slug: "retreading-and-repair-materials",
      description: "Pre-cure and mold cure tread rubber, cushion gum, repair patches, and retreading machinery and accessories.",
      image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png"
    },
    {
      title: "Recycling & Sustainability Solutions",
      slug: "recycling-and-sustainability-solutions",
      description: "Tyre recycling machinery, crumb rubber production, pyrolysis systems, and sustainable material innovations.",
      image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png"
    },
    {
      title: "Mold & Tooling Solutions",
      slug: "mold-and-tooling-solutions",
      description: "Tyre molds, bladder molds, engraving services, and precision tooling for tyre manufacturing.",
      image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png"
    },
    {
      title: "Tyre Reinforcement Materials",
      slug: "tyre-reinforcement-materials",
      description: "Steel cord, textile cord (nylon, polyester, rayon), bead wire, and fabric for tyre reinforcement.",
      image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png"
    },
    {
      title: "Additives & Performance Chemicals",
      slug: "additives-and-performance-chemicals",
      description: "Antioxidants, antiozonants, accelerators, activators, adhesion promoters, and specialty additives.",
      image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png"
    },
    {
      title: "Automation & Industry 4.0",
      slug: "automation-and-industry-40",
      description: "MES systems, AI quality inspection, predictive maintenance, and smart factory solutions for tyre plants.",
      image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png"
    },
    {
      title: "Material Handling & Logistics",
      slug: "material-handling-and-logistics",
      description: "Conveyor systems, automated guided vehicles (AGVs), warehouse solutions, and tyre handling equipment.",
      image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png"
    },
    {
      title: "Curing & Vulcanization Systems",
      slug: "curing-and-vulcanization-systems",
      description: "Curing presses, bladder systems, hot water circulation units, and vulcanization control systems.",
      image: "https://cdn.itegroupnews.com/Mining_World_Sectors_Images_6_196fe9e60d.png"
    }
  ];

  const quickGuideItems = [
    {
      title: "Become an Exhibitor",
      description: "Connect with 8,000+ mining professionals across 3 days for unparalleled networking opportunities.",
      buttonText: "Book A Stand",
      buttonLink: "/exhibiting-enquiry",
      image: "https://cdn.itegroupnews.com/mw24_1062_min_91b90d653f.jpg"
    },
    {
      title: "Download Your Event Brochure",
      description: "Not ready to become an exhibitor? Visit the exhibition for free and find out what to expect for the following edition.",
      buttonText: "Download Now",
      buttonLink: "/event-brochure",
      image: "https://cdn.itegroupnews.com/Untitled_500_x_500_px_cd8f081eec.png"
    },
    {
      title: "Become a Visitor",
      description: "Find out who we are, what we do, and how best we can help you achieve your strategic business goals all wrapped up in our concise event brochure.",
      buttonText: "Register Now",
      buttonLink: "/visitor-registration",
      image: "https://cdn.itegroupnews.com/mw24_1077_min_75a8122d24.jpg"
    }
  ];

  return (
    <div className="intro-animation">
      {/* Mobile Header */}
      <div className="fixed left-0 top-0 z-50 w-full bg-black px-5 py-2 lg:hidden">
        <div className="flex justify-between">
          <Link href="/">
            <Image src="/imgs/logo-its.png" alt="ITS Tyre Expo" width={140} height={40} className="h-auto w-auto object-contain" />
          </Link>
          <button className="z-10" aria-label="Menu">
            <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.66667 20C0.746193 20 0 19.2538 0 18.3333C0 17.4129 0.746193 16.6667 1.66667 16.6667H30.3333C31.2538 16.6667 32 17.4129 32 18.3333C32 19.2538 31.2538 20 30.3333 20H1.66667ZM1.66667 11.6667C0.746193 11.6667 0 10.9205 0 10C0 9.07952 0.746192 8.33333 1.66667 8.33333H30.3333C31.2538 8.33333 32 9.07952 32 10C32 10.9205 31.2538 11.6667 30.3333 11.6667H1.66667ZM1.66667 3.33333C0.746193 3.33333 0 2.58714 0 1.66667C0 0.746192 0.746192 0 1.66667 0H30.3333C31.2538 0 32 0.746192 32 1.66667C32 2.58714 31.2538 3.33333 30.3333 3.33333H1.66667Z" fill="#F08400"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Back to Top Button */}
      <div className="fixed bottom-3 right-3 z-50 opacity-0 transition-all duration-300 lg:bottom-10 lg:right-2">
        <button className="m-0 rounded-full border-none bg-white p-0 outline-hidden drop-shadow-lg" aria-label="Back to top">
          <svg className="size-10 fill-orange-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M22 12c0-5.522-4.476-10-10-10C6.479 2 2 6.479 2 12c0 5.524 4.478 10 10 10c5.524 0 10-4.476 10-10zm-14.53.28a.75.75 0 0 1-.073-.976l.073-.084l4-4a.75.75 0 0 1 .977-.073l.085.072l4 4.002a.75.75 0 0 1-.977 1.133l-.084-.073l-2.72-2.721v6.691a.75.75 0 0 1-.649.743l-.102.007a.75.75 0 0 1-.743-.648l-.007-.102v-6.69l-2.72 2.72a.75.75 0 0 1-.976.072l-.084-.072z"></path>
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className="page-spacing-wrapper pt-[120px] lg:pt-[140px]">
        {/* Sectors Grid Section */}
        <div className="animated-block">
          <div className="animated-block-target">
            <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
              {/* Header Section */}
              <div className="text-center lg:text-left">
                <h2 className="font-bebas text-5xl text-black md:text-6xl lg:text-7xl">
                  Sectors Showcased at <span className="text-[#F08400]">ITS Tyre Expo</span>
                </h2>
                <p className="mx-auto mt-5 max-w-4xl text-lg text-gray-700 lg:mx-0">
                  The event highlights key sectors including raw materials, tyre manufacturing machinery, 
                  testing equipment, and automation technologies tailored for the tyre industry. Whether 
                  you're seeking innovative solutions for rubber processing, cutting-edge machinery, or 
                  tools for optimizing tyre production, ITS Tyre Expo offers a platform for every professional 
                  in the tyre manufacturing and rubber processing sectors.
                </p>
              </div>

              {/* Sectors Grid with Images */}
              <div className="my-16 md:my-20">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {sectors.map((sector, idx) => (
                    <Link 
                      key={idx} 
                      href={`/sectors/${sector.slug}`} 
                      className="group relative block overflow-hidden rounded-xl shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
                    >
                      {/* Image Container with Next.js Image */}
                      <div className="relative h-56 w-full overflow-hidden bg-gray-200">
                        <Image
                          src={sector.image}
                          alt={sector.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          onError={(e) => {
                            // Fallback for broken images
                            const target = e.currentTarget;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              const fallback = document.createElement('div');
                              fallback.className = 'absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200';
                              fallback.innerHTML = `<span class="text-6xl">${getSectorIcon(idx)}</span>`;
                              parent.appendChild(fallback);
                            }
                          }}
                        />
                      </div>
                      {/* Title overlay at bottom */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 pt-8">
                        <h3 className="text-center font-bebas text-xl text-white transition-colors duration-300 group-hover:text-[#F08400] md:text-2xl">
                          {sector.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Guide Section - Only button position changed */}
        <div className="animated-block mt-12 lg:mt-20">
          <div className="animated-block-target">
            <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
              {/* Quick Guide Header */}
              <div className="mb-10 text-center lg:mb-12 lg:text-left">
                <p className="font-bold text-[#F08400]">Quick Guide</p>
                <h3 className="mt-2 font-bebas text-5xl text-black md:text-6xl lg:text-7xl">
                  Simplifying Your <span className="text-[#F08400]">Participation Journey</span>
                </h3>
              </div>

              {/* Quick Guide Cards - Original design, button over image */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {quickGuideItems.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="group flex flex-col overflow-hidden rounded-lg bg-orange-50 transition-all duration-300 ease-in-out hover:shadow-lg"
                  >
                    {/* Image Container with Button Overlay */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {/* Dark Overlay */}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
                      {/* Button Overlay - positioned at bottom center over image */}
                      <div className="absolute bottom-4 left-0 right-0 flex justify-start">
                        <Link href={item.buttonLink}>
                          <button className="bg-[#F08400] px-6 py-2.5 font-bebas text-xl text-white transition-all duration-300 hover:bg-black opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
                            {item.buttonText}
                          </button>
                        </Link>
                      </div>
                    </div>
                    
                    {/* Content - Rest of the card remains exactly the same */}
                    <div className="flex flex-1 flex-col gap-3 p-5">
                      <h4 className="font-bebas text-2xl text-black md:text-3xl">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 line-clamp-3">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <div className="mt-12 lg:mt-20">
          <PartnersSection />
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
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Smooth animations */
        .animated-block {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Stagger animation delays */
        .animated-block:nth-child(1) { animation-delay: 0.1s; }
        .animated-block:nth-child(2) { animation-delay: 0.3s; }
        .animated-block:nth-child(3) { animation-delay: 0.5s; }
      `}</style>
    </div>
  );
}

// Helper function for sector icons fallback
function getSectorIcon(index: number): string {
  const icons = ["🌿", "🏭", "⚙️", "🔬", "🔧", "♻️", "🔨", "📦", "🧪", "🤖", "🚚", "🔥"];
  return icons[index] || "🏭";
}