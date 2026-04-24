'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

const navItems = [
  {
    title: 'About',
    links: [
      { text: 'About India Tyre Show', href: '/about/' },
      { text: 'About ITE', href: '/about-ite/' },
      { text: 'Partners & Sponsors', href: '/partners-and-sponsors/' },
    ],
  },
  {
    title: 'Exhibit',
    links: [
      { text: 'Why Exhibit', href: '/why-exhibit/' },
      { text: 'Event Sectors', href: '/sectors/' },
      { text: 'Plan Your Travel', href: '/plan-your-travel/' },
      { text: 'Exhibitor Resource Center', href: '/exhibitor-resource-center/' },
      { text: 'Become an Exhibitor', href: '/exhibiting-enquiry/' },
      { text: 'Advertising Opportunities', href: '/advertising-details/' },
      { text: 'View Exhibitor List 2026', href: '/exhibition-directory/' },
    ],
  },
  {
    title: 'Attend',
    links: [
      { text: 'Why Visit', href: '/why-visit/' },
      { text: 'Event Sectors', href: '/sectors/' },
      { text: 'Conference Programme', href: '/conference-programme/' },
      { text: 'Partners and Sponsors', href: '/partners-and-sponsors/' },
    ],
  },
  {
    title: 'Insights',
    links: [
      { text: 'Articles and Latest News', href: '/articles/' },
      { text: 'Why India Report', href: '/insights/' },
      { text: 'Event Brochure', href: '/event-brochure/' },
      { text: 'Post-Show Report', href: '/post-show-report/' },
      { text: 'Media Gallery', href: '/media-gallery/' },
      { text: 'Conference Programme', href: '/conference-programme/' },
    ],
  },
  { title: 'Contact us', href: '/contact-us/', links: [] },
  { title: 'Conference', href: '/conference/', links: [] },
];

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const calculateTimeLeft = () => {
    const targetDate = new Date('2026-04-22T09:00:00').getTime();
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0 };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleMouseEnter = (title: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setOpenDropdown(title);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  return (
    <>
      <div className="bg-[#1e1e1e]/80 py-3 text-white sticky top-0 z-50">
        <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
          <div className="flex items-center">
            {/* Logo on left */}
            <div className="flex-shrink-0">
              <Link href="/">
                <Image 
                  src="/imgs/logo-sm.png" 
                  alt="India Tyre Show" 
                  width={40} 
                  height={40} 
                  className="h-8 sm:h-10 w-auto cursor-pointer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </Link>
            </div>
            
            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-8">
              {navItems.map((item) => (
                <div 
                  key={item.title} 
                  className="relative"
                  onMouseEnter={() => item.links && item.links.length > 0 && handleMouseEnter(item.title)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.links && item.links.length > 0 ? (
                    <>
                      <button
                        className="flex items-center gap-1 text-sm xl:text-base hover:text-orange-500 transition-colors whitespace-nowrap py-2"
                      >
                        {item.title}
                        <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${openDropdown === item.title ? 'rotate-180' : ''}`} />
                      </button>
                      {openDropdown === item.title && (
                        <div 
                          className="absolute left-0 top-full z-50 w-56 rounded-md bg-[#1e1e1e] shadow-lg border border-gray-700"
                          onMouseEnter={() => handleMouseEnter(item.title)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <div className="py-2">
                            {item.links.map((link) => (
                              <Link
                                key={link.text}
                                href={link.href}
                                className="block px-4 py-2 text-sm hover:bg-orange-500 hover:text-white transition-colors"
                              >
                                {link.text}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link 
                      href={item.href || '#'} 
                      className="text-sm xl:text-base hover:text-orange-500 transition-colors whitespace-nowrap block py-2"
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timer and Login Button Container - Separate from navbar */}
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`absolute -bottom-17 z-50 transition-all duration-500 flex gap-4 ${
              isScrolled
                ? 'opacity-0 -translate-y-5 pointer-events-none'
                : 'opacity-100 translate-y-0'
            }`}
            style={{
              right: 'clamp(0rem, 0vw, 0rem)'
            }}
          >
            {/* Timer */}
            <div className="flex gap-0.5">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Mins', value: timeLeft.minutes },
              ].map((item, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden flex flex-col items-center justify-center 
                    bg-gray-700/70 backdrop-blur-md px-2 py-1.5 min-w-[55px]
                    border border-white/10 shadow-md
                    transition-all duration-300 
                    hover:bg-[#F08400] hover:text-black hover:scale-105"
                >
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="w-full h-full bg-gradient-to-br 
                      from-white/10 via-transparent to-white/5 
                      opacity-40 blur-xl"></div>
                  </div>

                  <span className="text-lg font-bold relative z-10">
                    {String(item.value).padStart(2, '0')}
                  </span>
                  <span className="text-xs uppercase tracking-wide relative z-10">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Exhibitor Login Button */}
            <Link
              href="/login/"
              className="inline-block bg-[#2A2A2A] text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base shadow-xl border border-white/20 
              hover:bg-[#F08400] hover:text-black hover:scale-105 transition-all duration-300 whitespace-nowrap"
            >
              Exhibitor Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}