'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { Button } from '../ui/button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { title: 'About', href: '/about-indiatyreshow/' },
  { title: 'Exhibit', href: '/exhibiting-enquiry/' },
  { title: 'Attend', href: '/why-visit/' },
  { title: 'Connect', href: '/connect/' },
  { title: 'Insights', href: '/articles/' },
  { title: 'Contact us', href: '/contact-us/' },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black lg:hidden">
      <div className="flex justify-end p-4">
        <button onClick={onClose} className="text-white">
          <X size={32} />
        </button>
      </div>
      <div className="flex flex-col items-center gap-6 p-8">
        {navItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="text-xl text-white hover:text-mainColor1"
            onClick={onClose}
          >
            {item.title}
          </Link>
        ))}
        <div className="mt-4 flex flex-col gap-3 w-full">
          <Button href="/exhibiting-enquiry/" variant="primary" size="lg" className="w-full justify-center">
            Exhibit
          </Button>
          <Button href="/visitor-registration/" variant="primary" size="lg" className="w-full justify-center">
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}