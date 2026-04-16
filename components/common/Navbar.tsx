'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

const navItems = [
  {
    title: 'About',
    links: [
      { text: 'About India Tyre Show', href: '/about-indiatyreshow/' },
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
      { text: 'View Exhibitor List 2026', href: '/exhibitor-list/' },
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
    title: 'Connect',
    links: [
      { text: 'Lead Scanning', href: '/leadscanning/' },
      { text: 'India Tyre Show Connect', href: '/connect/' },
    ],
  },
  {
    title: 'Insights',
    links: [
      { text: 'Articles and Latest News', href: '/articles/' },
      { text: 'Why India Report', href: '/beyond-the-surface/' },
      { text: 'Event Brochure', href: '/event-brochure/' },
      { text: 'Post-Show Report', href: '/post-show-report/' },
      { text: 'Media Gallery', href: '/media-gallery/' },
      { text: 'Conference Programme', href: '/conference-programme/' },
    ],
  },
  { title: 'Contact us', href: '/contact-us/', links: [] },
];

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <div className="bg-[#1e1e1e] py-3 text-white">
      <div className="container mx-auto px-10">
        {/* Logo and Navigation in one row */}
        <div className="flex items-start">
          {/* Logo on left */}
          <div className="flex-shrink-0">
            <Image 
              src="/imgs/logo-sm.png" 
              alt="India Tyre Show" 
              width={40} 
              height={40} 
              className="h-10 w-auto"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
          
          {/* Navigation Links - Centered */}
          <div className="flex-1 flex justify-start">
            <div className="flex items-center gap-6 lg:gap-8">
              {navItems.map((item) => (
                <div key={item.title} className="relative">
                  {item.links && item.links.length > 0 ? (
                    <>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item.title ? null : item.title)}
                        className="flex items-center gap-1 text-sm lg:text-base hover:text-orange-500 transition-colors"
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
                      className="text-sm lg:text-base hover:text-orange-500 transition-colors"
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Right side - empty for balance (RU button is in header top bar) */}
          <div className="w-10"></div>
        </div>
      </div>
    </div>
  );
}