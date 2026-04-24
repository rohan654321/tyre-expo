'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X, ChevronDown } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  timeLeft: { days: number; hours: number; minutes: number };
}

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

export default function MobileMenu({ isOpen, onClose, timeLeft }: MobileMenuProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleDropdown = (title: string) => {
    if (openDropdown === title) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(title);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/70 z-50 lg:hidden" onClick={onClose} />
      
      {/* Sidebar Menu */}
      <div className="fixed top-0 right-0 h-full w-85 bg-[#1e1e1e] z-50 shadow-2xl overflow-y-auto animate-slide-in-right lg:hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700 sticky top-0 bg-[#1e1e1e]">
          <Link href="/" onClick={onClose}>
            <img 
              src="/ITS_logo_white.png" 
              alt="India Tyre Show" 
              className="h-8 w-auto"
            />
          </Link>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Timer Section in Mobile Menu */}
        <div className="p-4 border-b border-gray-700 bg-gray-800/50">
          <h3 className="text-xs text-gray-400 mb-3 uppercase tracking-wider">Countdown to Expo</h3>
          <div className="flex gap-2 justify-center">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Mins', value: timeLeft.minutes },
            ].map((item, i) => (
              <div
                key={i}
                className="flex-1 text-center bg-gray-700/50 rounded-lg py-2 px-1"
              >
                <div className="text-xl font-bold text-orange-500">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-[10px] text-gray-400 uppercase">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="py-4">
          {navItems.map((item) => (
            <div key={item.title} className="border-b border-gray-800">
              {item.links && item.links.length > 0 ? (
                <>
                  <button
                    onClick={() => toggleDropdown(item.title)}
                    className="w-full flex items-center justify-between px-4 py-3 text-white hover:bg-white/5 transition-colors"
                  >
                    <span className="text-sm font-medium">{item.title}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openDropdown === item.title ? 'rotate-180' : ''}`} />
                  </button>
                  {openDropdown === item.title && (
                    <div className="bg-black/20">
                      {item.links.map((link) => (
                        <Link
                          key={link.text}
                          href={link.href}
                          onClick={onClose}
                          className="block px-6 py-2.5 text-sm text-gray-300 hover:text-orange-500 transition-colors"
                        >
                          {link.text}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href || '#'}
                  onClick={onClose}
                  className="block px-4 py-3 text-sm font-medium text-white hover:bg-white/5 transition-colors"
                >
                  {item.title}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Login Button in Mobile Menu */}
        <div className="p-4 border-t border-gray-700 mt-4">
          <Link
            href="/login/"
            onClick={onClose}
            className="block w-full text-center bg-orange-500 text-white px-4 py-3 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
          >
            Exhibitor Login
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
    </>
  );
}