'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import Container from '../ui/container';
import Link from 'next/link';

// Use working image URLs or local fallbacks
const slides = [
  { id: 1, image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=1920&q=75' }, // Mining/industry fallback
  { id: 2, image: 'https://images.unsplash.com/photo-1581092335871-4c5c5d4b5b5b?w=1920&q=75' },
];

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleImageError = (id: number) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <section className="relative flex h-screen items-end justify-end overflow-hidden text-white w-full">
      <div className="absolute inset-0 z-[-1] bg-gradient-to-t from-black from-10% via-black/40" />
      
      <div className="absolute inset-0 z-[-2] size-full bg-black">
        <div className="relative h-full w-full overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === activeSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {!imageErrors[slide.id] ? (
                <Image
                  src={slide.image}
                  alt="India Tyre Show"
                  fill
                  className="object-cover"
                  priority={index === 0}
                  onError={() => handleImageError(slide.id)}
                  unoptimized // Bypass Next.js image optimization for external URLs
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-800 to-black">
                  <div className="text-center">
                    <h2 className="text-4xl font-bold mb-4">India Tyre Show 2026</h2>
                    <p className="text-xl">Loading image...</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row items-end justify-between pb-24 gap-12 px-6 lg:px-16">

  {/* LEFT CONTENT */}
  <div className="max-w-8xl">
    
    {/* BIG HEADING */}
<h1 className="font-heading uppercase whitespace-nowrap 
text-[28px] sm:text-[52px] lg:text-[90px] 
leading-[0.9] tracking-[1px] 
max-w-[900px]">
  <span className="text-white">MINING WORLD </span>
  <span className="text-[#F08400]">2026</span>
</h1>

    {/* DESCRIPTION */}
<p className="mt-6 font-sans text-[16px] sm:text-[18px] lg:text-[20px] 
text-white/90 leading-[1.5] max-w-7xl">
  Celebrating 30 Years of Driving Mining Innovation and Business Growth. 
  MiningWorld Russia unites equipment manufacturers, technology pioneers, 
  and buyers from across the CIS to accelerate the future of mining and mineral processing.
</p>
  </div>

  {/* RIGHT BUTTON */}
  <div className="flex-shrink-0">
    <Link
      href="/exhibiting-enquiry/"
      className="bg-[#F08400] px-10 py-4 text-sm font-semibold uppercase tracking-[1.5px] hover:bg-orange-600 transition-all duration-300"
    >
      Exhibit
    </Link>
  </div>
</div>

    </section>
  );
}