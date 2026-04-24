'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
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
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <header className="w-full text-white">

        {/* 🔥 Main Header */}
        <div
          className={`max-[1099px]:hidden transition-all duration-300 ${
            isScrolled
  ? '-translate-y-full opacity-0'
  : 'translate-y-0 opacity-100 bg-[#1e1e1e]/95 backdrop-blur-md'
          }`}
        >
          <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto flex items-center justify-between px-6 sm:px-8 lg:px-12 xl:px-16 py-4">

            {/* 🔥 Left Section */}
            <div className="flex items-center gap-6">

              {/* Logo */}
              <Link href="/">
                <Image
                  src="/ITS_logo_white.png"
                  alt="India Tyre Show"
                  width={130}
                  height={70}
                  className="object-contain"
                />
              </Link>

              {/* Divider */}
              <div className="h-10 w-[1px] bg-white/30"></div>

              {/* Event Info */}
              <div className="flex flex-col text-[20px] leading-tight">
                <span className="font-semibold">22–24 April 2026</span>
                <span className="text-white/70">Crocus Expo, Pavilion 1</span>
              </div>
            </div>

            {/* 🔥 Right Section */}
            <div className="flex items-center gap-6">

              {/* ⏱️ Countdown */}
          {/* ⏱️ Countdown */}
{/* <div className="flex gap-3">
  {[
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Mins', value: timeLeft.minutes },
  ].map((item, i) => (
<div
  key={i}
  className="relative overflow-hidden flex flex-col items-center justify-center 
  bg-gray-700 backdrop-blur-md px-4 py-2 rounded-sm 
  border border-white/10 shadow-md
  transition-all duration-300 
  hover:bg-[#F08400] hover:text-black hover:scale-105"
> */}
  {/* 🌫️ Mist Layer */}
  {/* <div className="absolute inset-0 pointer-events-none">
    <div className="w-full h-full bg-gradient-to-br 
    from-white/10 via-transparent to-white/5 
    opacity-40 blur-xl"></div>
  </div> */}

  {/* Content */}
  {/* <span className="text-lg font-bold relative z-10">
    {String(item.value).padStart(2, '0')}
  </span>
  <span className="text-xs uppercase tracking-wide relative z-10">
    {item.label}
  </span>
</div>
  ))}
</div> */}

              {/* 🔥 Buttons */}
         <div className="flex items-center gap-4">
  <Link
    href="/exhibiting-enquiry/"
    className="bg-[#F08400] px-8 py-5 text-base font-bold uppercase tracking-wide  shadow-md 
    hover:bg-white hover:text-black hover:shadow-lg hover:scale-105 transition-all duration-300"
  >
    Exhibit
  </Link>

  <Link
    href="/visitor-registration/"
    className="bg-[#F08400] px-8 py-5 text-base font-bold uppercase tracking-wide  shadow-md 
    hover:bg-white hover:text-black hover:shadow-lg hover:scale-105 transition-all duration-300"
  >
    Register
  </Link>
</div>
            </div>
          </div>
        </div>

        {/* 🔥 Navbar */}
{/* 🔥 Navbar */}
<div
  className={`max-[1099px]:hidden transition-all duration-300 ${
    isScrolled
      ? 'fixed top-0 left-0 w-full z-50 bg-[#1e1e1e] shadow-lg'
      : 'relative'
  }`}
>
  <Navbar />
</div>

        {/* 📱 Mobile Header */}
        <div className="bg-black px-4 py-3 min-[1100px]:hidden fixed top-0 left-0 w-full z-50">
          <div className="flex items-center justify-between">

            <Link href="/">
              <Image
                src="/ITS_logo final.png"
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

      {/* 📱 Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)} timeLeft={{
          days: 0,
          hours: 0,
          minutes: 0
        }}      />
    </>
  );
}