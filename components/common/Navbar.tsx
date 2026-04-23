'use client';

import { useState, useEffect } from 'react';
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

  return (
    <div className="bg-[#1e1e1e]/80 py-3 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        {/* Logo and Navigation in one row */}
        <div className="flex items-center">
          {/* Logo on left */}
          <div className="flex-shrink-0">
            <Image 
              src="/imgs/logo-sm.png" 
              alt="India Tyre Show" 
              width={40} 
              height={40} 
              className="h-8 sm:h-10 w-auto"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
          
          {/* Navigation Links - Centered */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8">
            {navItems.map((item) => (
              <div key={item.title} className="relative">
                {item.links && item.links.length > 0 ? (
                  <>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.title ? null : item.title)}
                      className="flex items-center gap-1 text-sm xl:text-base hover:text-orange-500 transition-colors whitespace-nowrap"
                    >
                      {item.title}
                      <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${openDropdown === item.title ? 'rotate-180' : ''}`} />
                    </button>
                    {openDropdown === item.title && (
                      <div className="absolute left-0 top-full z-50 mt-2 w-56 rounded-md bg-[#1e1e1e] shadow-lg border border-gray-700">
                        <div className="py-2">
                          {item.links.map((link) => (
                            <Link
                              key={link.text}
                              href={link.href}
                              className="block px-4 py-2 text-sm hover:bg-orange-500 hover:text-white transition-colors"
                              onClick={() => setOpenDropdown(null)}
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
                    className="text-sm xl:text-base hover:text-orange-500 transition-colors whitespace-nowrap"
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button - visible only on mobile/tablet */}
          <div className="lg:hidden">
            {/* You can add mobile menu button here if needed */}
          </div>
          
          {/* Right side placeholder - maintains balance */}
          <div className="w-8 sm:w-10 flex-shrink-0 hidden lg:block"></div>
        </div>
      </div>

      {/* 🔥 Floating Exhibitor Login Button - Responsive positioning */}
      <div className="relative container mx-auto px-6 sm:px-8 lg:px-12">
        <div
          className={`absolute -bottom-17 z-50 transition-all duration-500 ${
            isScrolled
              ? 'opacity-0 -translate-y-5 pointer-events-none'
              : 'opacity-100 translate-y-0'
          }`}
          style={{
            right: 'clamp(1rem, 5vw, 2.5rem)'
          }}
        >
          <Link
            href="/exhibitor-login/"
            className="inline-block bg-[#2A2A2A] text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base shadow-xl border border-white/20 
            hover:bg-[#F08400] hover:text-black hover:scale-105 transition-all duration-300 whitespace-nowrap"
          >
            Exhibitor Login
          </Link>
        </div>
      
      </div>
      <div className="relative container mx-auto px-4 sm:px-8 lg:px-12">
  <div
    className={`absolute -bottom-17 z-50 transition-all duration-500 ${
      isScrolled
        ? 'opacity-0 -translate-y-5 pointer-events-none'
        : 'opacity-100 translate-y-0'
    }`}
    style={{
      right: 'clamp(6rem, 12vw, 15rem)' // adjust spacing from right
    }}
  >
    <div className="flex gap-3">
  {[
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Mins', value: timeLeft.minutes },
  ].map((item, i) => (
    <div
      key={i}
      className="relative overflow-hidden flex flex-col items-center justify-center 
bg-gray-700/70 backdrop-blur-md px-3 py-1.5 
border border-white/10 shadow-md
transition-all duration-300 
hover:bg-[#F08400] hover:text-black hover:scale-105"
    >
      {/* 🌫️ Mist Layer */}
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
  </div>
</div>
      
    </div>
  );
}