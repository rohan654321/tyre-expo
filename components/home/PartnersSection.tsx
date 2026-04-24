'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Section from '../ui/section';
import SectionHeader from '../ui/sectionHeader';

const partnersData = [
  { name: 'ProfiMiner', logo: 'https://cdn.itegroupnews.com/Profi_Miner_5d476ae93b.webp', type: 'Media Partner' },
  { name: 'Times International', logo: 'https://cdn.itegroupnews.com/1_c80a02899c.png', type: 'Media Partner' },
  { name: 'TotalExpo.ru', logo: 'https://cdn.itegroupnews.com/Total_Expo_ru_26b429a05b.webp', type: 'Media Partner' },
  { name: 'Vedomosti', logo: 'https://cdn.itegroupnews.com/Vedomosti_7814bd5d9d.webp', type: 'Media Partner' },
  { name: 'Industry of Eurasia', logo: 'https://cdn.itegroupnews.com/Industry_of_Eurasia_Mining_158b39f188.webp', type: 'Media Partner' },
  { name: 'Miners of Russia', logo: 'https://cdn.itegroupnews.com/miners_of_russia_78f659f949.webp', type: 'Media Partner' },
  { name: 'Zyfra', logo: 'https://cdn.itegroupnews.com/2_48e8e636ac.png', type: 'Co-organiser' },
  { name: 'Market and Business Analysis', logo: 'https://cdn.itegroupnews.com/2_8449eb4f62.png', type: 'Media Partner' },
];

export default function PartnersSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  let isDown = false;
  let startX: number;
  let scrollLeft: number;

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    // Auto-scrolling functionality
    let scrollAmount = 0;
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    let animationId: number;
    
    const autoScroll = () => {
      if (!scrollContainer) return;
      
      scrollAmount += 0.5;
      if (scrollAmount >= maxScroll) {
        scrollAmount = 0;
      }
      scrollContainer.scrollLeft = scrollAmount;
      animationId = requestAnimationFrame(autoScroll);
    };
    
    animationId = requestAnimationFrame(autoScroll);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Mouse/touch drag scrolling functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    
    isDown = true;
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
    scrollContainer.style.cursor = 'grabbing';
    scrollContainer.style.userSelect = 'none';
  };

  const handleMouseLeave = () => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    
    isDown = false;
    scrollContainer.style.cursor = 'grab';
    scrollContainer.style.userSelect = 'auto';
  };

  const handleMouseUp = () => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    
    isDown = false;
    scrollContainer.style.cursor = 'grab';
    scrollContainer.style.userSelect = 'auto';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown) return;
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainer.scrollLeft = scrollLeft - walk;
  };

  // Wheel scrolling
  const handleWheel = (e: React.WheelEvent) => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      e.preventDefault();
      scrollContainer.scrollLeft += e.deltaY;
    }
  };

  return (
    <section className="bg-mainColor2 py-24">
      <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Header - Same as SectorsSection */}
        <div className="max-w-[900px] mb-12">
          <p className="text-[#F08400] font-sans text-[14px] uppercase tracking-[1.5px]">
            Our Ecosystem
          </p>
          <h2 className="font-bebas font-bold text-[48px] leading-[1.05] tracking-[2px] uppercase text-black">
            Partners & Sponsors
          </h2>
          <p className="text-gray-600 mt-3 text-base">
            Meet our valued partners and sponsors who make ITS Tyre Expo possible
          </p>
        </div>
        
        {/* Scrolling Container */}
        <div className="relative w-full mt-8">
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide cursor-grab"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onWheel={handleWheel}
          >
            <div className="flex gap-6 pb-4" style={{ minWidth: 'max-content' }}>
              {[...partnersData, ...partnersData].map((partner, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center flex-shrink-0"
                  style={{ minWidth: '180px', maxWidth: '180px' }}
                >
                  <div className="overflow-hidden rounded-lg bg-white px-4 py-4 shadow-lg w-full flex items-center justify-center min-h-[100px]">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={100}
                      height={70}
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <small className="mt-3 text-sm text-center text-gray-600 line-clamp-1">{partner.name}</small>
                  <span className="text-xs text-mainColor1 mt-1">{partner.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}