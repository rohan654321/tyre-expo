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
  const [isScrolled, setIsScrolled] = useState(false);

  // 🔥 Scroll Detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <>
      <header className="w-full text-white">

        {/* 🔥 Top Bar */}
        <div
          className={`bg-[#432500] py-2 transition-all duration-300 ${
            isScrolled ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
          }`}
        >
          <div className="container mx-auto flex items-center justify-between px-10">

            {/* Left */}
            <div className="flex gap-6 text-sm sm:text-base font-medium">
              <span>22-24 April 2026</span>
              <span>Crocus Expo, Pavilion 1</span>
            </div>

            {/* Right - Countdown */}
            <div className="flex items-center gap-4 text-sm font-semibold">
              <span>{timeLeft.days} Days</span>
              <span>{timeLeft.hours} Hours</span>
              <span>{timeLeft.minutes} Mins</span>
            </div>
          </div>
        </div>

        {/* 🔥 Logo Header */}
        <div
          className={`max-[1099px]:hidden bg-black transition-all duration-300 ${
            isScrolled ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
          }`}
        >
          <div className="container mx-auto flex items-center justify-between px-10 py-3">

            {/* Logo */}
            <Link href="/">
              <Image
                src="/ITS.png"
                alt="India Tyre Show"
                width={100}
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

        {/* 🔥 Sticky Navbar */}
        <div
          className={`max-[1099px]:hidden transition-all duration-300 ${
            isScrolled
              ? 'fixed top-0 left-0 w-full z-50 bg-[#1e1e1e]/90 backdrop-blur-md shadow-lg'
              : 'relative'
          }`}
        >
          <Navbar />
        </div>

        {/* 🔥 Mobile Header */}
        <div className="bg-black px-4 py-3 min-[1100px]:hidden fixed top-0 left-0 w-full z-50">
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

            <button onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}