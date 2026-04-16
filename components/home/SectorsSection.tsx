'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import Section from '../ui/section';
import SectionHeader from '../ui/sectionHeader';
import Link from 'next/link';

const sectorsData = [
  {
    id: 1,
    title: 'Tyre Manufacturing Equipment',
    shortText:
      'State-of-the-art machinery for tyre production including mixing mills and curing presses.',
    image: 'https://cdn.itegroupnews.com/Mining_World_Sectors_Images_7d57d82790.png',
  },
  {
    id: 2,
    title: 'Raw Materials & Compounds',
    shortText:
      'Natural and synthetic rubber, carbon black, silica, oils, and chemicals.',
    image: 'https://cdn.itegroupnews.com/Mining_World_Sectors_Images_1_ce66f08346.png',
  },
  {
    id: 3,
    title: 'Retreading & Repair',
    shortText:
      'Advanced retreading systems and repair tools for extending tyre life.',
    image: 'https://cdn.itegroupnews.com/Mining_World_Sectors_Images_2_5de8dcc6a6.png',
  },
  {
    id: 4,
    title: 'Tyre Recycling & Sustainability',
    shortText:
      'Eco-friendly recycling solutions and circular economy initiatives.',
    image: 'https://cdn.itegroupnews.com/Mining_World_Sectors_Images_3_cabcb4d92e.png',
  },
  {
    id: 5,
    title: 'Testing & Quality Control',
    shortText:
      'Inspection systems, testing machines, and QA solutions.',
    image: 'https://cdn.itegroupnews.com/Mining_World_Sectors_Images_4_eac11c7a2e.png',
  },
  {
    id: 6,
    title: 'Tyre Management & IoT',
    shortText:
      'Smart tyre tech, RFID tracking, and fleet management systems.',
    image: 'https://cdn.itegroupnews.com/Mining_World_Sectors_Images_5_46733f0b8f.png',
  },
];

export default function SectorsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <Section className="bg-[#f5f5f5] py-24">

      <div className="relative">

        {/* HEADER */}
        <SectionHeader
          topText="Event Sectors"
          title="Explore Key Sectors Driving the Tyre Industry"
        />

        {/* SLIDER */}
        <div className="relative mt-12">

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
          >
            {sectorsData.map((sector) => (
      <div
  key={sector.id}
  className="min-w-[320px] lg:min-w-[420px] flex-shrink-0 rounded-2xl overflow-hidden group relative"
>

  {/* IMAGE */}
  <div className="relative h-[260px] lg:h-[320px]">
    <Image
      src={sector.image}
      alt={sector.title}
      fill
      className="object-cover group-hover:scale-105 transition duration-500"
    />
  </div>

  {/* GRADIENT OVERLAY */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

  {/* TEXT + BUTTON */}
  <div className="absolute bottom-0 left-0 p-5 text-white w-full">

    <h3 className="text-xl font-bold leading-tight">
      {sector.title}
    </h3>

    <p className="text-sm text-white/90 mt-2 line-clamp-2">
      {sector.shortText}
    </p>

    {/* 🔥 READ MORE BUTTON */}
    <Link
    href={'#'}
    //   href={`/sectors/${sector.slug}/`}
      className="inline-block mt-3 text-sm font-semibold text-[#F08400] hover:underline"
    >
      Read More →
    </Link>

  </div>

</div>
            ))}
          </div>

        </div>

        {/* BUTTON */}
        <div className="mt-12 px-6">
          <Button href="/sectors/" variant="primary" size="lg">
            Explore All The Sectors
          </Button>
        </div>

      </div>
    </Section>
  );
}