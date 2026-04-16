'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { Button } from '../ui/button';
import MobileMenu from '../common/MobileMenu';
import Navbar from '../common/Navbar';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 🔥 Countdown Logic
  const calculateTimeLeft = () => {
    const targetDate = new Date('2026-04-22T00:00:00').getTime();
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
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 w-full text-white">
      
      {/* Top bar */}
      <div className="bg-[#432500] py-2">
        <div className="container mx-auto flex items-center justify-between px-10">
          
          {/* Left side */}
          <div className="flex gap-6 text-sm sm:text-base font-medium">
            <span>22-24 April 2026</span>
            <span>Crocus Expo, Pavilion 1</span>
          </div>
          
          {/* Right side */}
          <div className="flex items-center gap-3">
            
            {/* 🔥 Countdown Timer */}
            <div className="flex items-center gap-4 text-sm font-semibold">
              <div className="bg-transparent px-2 py-1 rounded">
                {timeLeft.days} Days
              </div>
              <div className="bg-transparent px-2 py-1 rounded">
                {timeLeft.hours} Hours
              </div>
              <div className="bg-transparent px-2 py-1 rounded">
                {timeLeft.minutes} Mins
              </div>
            </div>


          </div>
        </div>
      </div>

      {/* Desktop header */}
      <div className="max-[1099px]:hidden bg-black">
        <div className="container mx-auto flex items-center justify-between px-10 py-3">
          
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/imgs/logo-1.png"
              alt="India Tyre Show"
              width={160}
              height={50}
              className="object-contain"
            />
          </Link>
          
          {/* Buttons */}
 <div className="flex items-center gap-4">
  <Link
    href="/exhibiting-enquiry/"
    className="bg-[#F08400] px-6 py-3 text-base font-bold uppercase tracking-wide hover:bg-transparent transition"
  >
    Exhibit
  </Link>

  <Link
    href="/visitor-registration/"
    className="bg-[#F08400] px-6 py-3 text-base font-bold uppercase tracking-wide hover:bg-transparent transition"
  >
    Register
  </Link>
</div>
        </div>
      </div>

      {/* Navbar */}
      <div className="max-[1099px]:hidden">
        <Navbar />
      </div>

      {/* Mobile header */}
      <div className="bg-black px-4 py-3 min-[1100px]:hidden">
        <div className="flex items-center justify-between">
          
          <Link href="/">
            <Image
              src="/imgs/logo-1.png"
              alt="India Tyre Show"
              width={140}
              height={40}
              className="object-contain"
            />
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-white"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}