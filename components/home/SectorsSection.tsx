'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '../ui/container';

const sectorsData = [
  {
    id: 1,
    title: 'Tyre Manufacturing Equipment',
    slug: 'tyre-manufacturing-machinery',
    shortText: 'State-of-the-art machinery for tyre production including mixing mills and curing presses.',
    image: 'https://cdn.itegroupnews.com/Mining_World_Sectors_Images_7d57d82790.png',
  },
  {
    id: 2,
    title: 'Raw Materials & Compounds',
    slug: 'raw-materials-and-rubber-compounds',
    shortText: 'Natural and synthetic rubber, carbon black, silica, oils, and chemicals.',
    image: 'https://cdn.itegroupnews.com/Mining_World_Sectors_Images_1_ce66f08346.png',
  },
  {
    id: 3,
    title: 'Retreading & Repair',
    slug: 'retreading-and-repair-materials',
    shortText: 'Advanced retreading systems and repair tools for extending tyre life.',
    image: 'https://cdn.itegroupnews.com/Mining_World_Sectors_Images_2_5de8dcc6a6.png',
  },
  {
    id: 4,
    title: 'Tyre Recycling & Sustainability',
    slug: 'recycling-and-sustainability-solutions',
    shortText: 'Eco-friendly recycling solutions and circular economy initiatives.',
    image: 'https://cdn.itegroupnews.com/Mining_World_Sectors_Images_3_cabcb4d92e.png',
  },
  {
    id: 5,
    title: 'Testing & Quality Control',
    slug: 'tyre-testing-and-quality-control',
    shortText: 'Inspection systems, testing machines, and QA solutions.',
    image: 'https://cdn.itegroupnews.com/Mining_World_Sectors_Images_4_eac11c7a2e.png',
  },
  {
    id: 6,
    title: 'Tyre Management & IoT',
    slug: 'automation-and-industry-40',
    shortText: 'Smart tyre tech, RFID tracking, and fleet management systems.',
    image: 'https://cdn.itegroupnews.com/Mining_World_Sectors_Images_5_46733f0b8f.png',
  },
];

export default function SectorsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="bg-[#f5f5f5] py-24">
      <Container>
        <div>
          <div className="max-w-[900px] mb-12">
            <p className="text-[#F08400] font-sans text-[14px] uppercase tracking-[1.5px]">
              Event Sectors
            </p>
            <h2 className="font-bebas font-bold text-[48px] leading-[1.05] tracking-[2px] uppercase text-black">
              Explore Key Sectors Driving the Tyre Industry
            </h2>
          </div>

          <div className="relative mt-12">
            <div ref={scrollRef} className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar">
              {sectorsData.map((sector) => (
                <Link 
                  key={sector.id} 
                  href={`/sectors/${sector.slug}`}
                  className="min-w-[320px] lg:min-w-[420px] flex-shrink-0 overflow-hidden group relative block cursor-pointer"
                >
                  <div className="relative h-[260px] lg:h-[320px]">
                    <Image
                      src={sector.image}
                      alt={sector.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5 text-white w-full">
                    <h3 className="font-heading text-[22px] tracking-[1px] font-bold leading-[1.3]">
                      {sector.title}
                    </h3>
                    <p className="font-sans text-[14px] text-white/90 mt-2 leading-[1.7] line-clamp-2">
                      {sector.shortText}
                    </p>
                    <span className="inline-block mt-4 font-sans text-[13px] font-semibold uppercase tracking-[1px] text-[#F08400] hover:underline group-hover:underline">
                      Read More →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <Link href="/sectors/">
              <button className="bg-[#F08400] px-10 py-3 font-bebas text-2xl text-white hover:bg-black transition-all">
                Explore All The Sectors
              </button>
            </Link>
          </div>
        </div>
      </Container>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .font-bebas {
          font-family: 'Bebas Neue', cursive;
        }
        .font-heading {
          font-family: 'Bebas Neue', cursive;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}