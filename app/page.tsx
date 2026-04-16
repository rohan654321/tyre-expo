'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/layout/BackToTop';
import LoadingSpinner from '@/components/ui/loadingSpinner';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import CountriesSection from '@/components/home/CountriesSection';
import OutcomesSection from '@/components/home/OutcomesSection';
import WhyExhibitSection from '@/components/home/WhyExhibitSection';
import SectorsSection from '@/components/home/SectorsSection';
import BrochureSection from '@/components/home/BrochureSection';
import ArticlesSection from '@/components/home/ArticlesSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import PartnersSection from '@/components/home/PartnersSection';

// Sample data - replace with actual data from API
const countriesData = [
  { name: 'India', flag: 'https://cdn.itegroupnews.com/India_77390bec7a.webp' },
  { name: 'Germany', flag: 'https://cdn.itegroupnews.com/Germany_3dc8a515f9.png' },
  { name: 'China', flag: 'https://cdn.itegroupnews.com/Flag_icons_3e3608eca2.png' },
  { name: 'Japan', flag: 'https://cdn.itegroupnews.com/Japan_flag.png' },
  { name: 'USA', flag: 'https://cdn.itegroupnews.com/USA_flag.png' },
  { name: 'South Korea', flag: 'https://cdn.itegroupnews.com/South_Korea_flag.png' },
  { name: 'Thailand', flag: 'https://cdn.itegroupnews.com/Thailand_flag.png' },
  { name: 'Vietnam', flag: 'https://cdn.itegroupnews.com/Vietnam_flag.png' },
];

const outcomesData = [
  {
    title: '70%',
    content: 'of exhibitors engaged with and sold to existing customers, reinforcing long-term business relationships.',
    image: 'https://cdn.itegroupnews.com/M_Wr_106471c763.png',
  },
  {
    title: '62%',
    content: 'of exhibitors strengthened brand visibility and market positioning among key industry players',
    image: 'https://cdn.itegroupnews.com/2_edefccdfd0.png',
  },
  {
    title: '61%',
    content: 'of exhibitors acquired new leads and expanded their client base, unlocking fresh opportunities in the global market.',
    image: 'https://cdn.itegroupnews.com/3_5ab1f32ff9.png',
  },
];

const articlesData = [
  {
    title: 'Innovations in Tyre Manufacturing Technology That Are Improving Sustainability and ROI',
    slug: 'innovations-in-tyre-manufacturing-technology',
    excerpt: 'Sustainable tyre manufacturing technology combines advanced materials, AI, and low-impact processes...',
    image: 'https://cdn.itegroupnews.com/mw24_1074_1_min_ff15b1a4db.webp',
    date: '20.09.2025',
  },
  {
    title: 'The Future of Smart Tyres: How IoT is Revolutionizing the Industry',
    slug: 'future-of-smart-tyres-iot',
    excerpt: 'Smart tyre technology with IoT sensors is transforming vehicle safety and performance monitoring...',
    image: 'https://cdn.itegroupnews.com/2_1_27606a9b16.webp',
    date: '03.09.2025',
  },
  {
    title: 'Sustainable Materials: The Next Frontier in Tyre Production',
    slug: 'sustainable-materials-tyre-production',
    excerpt: 'Eco-friendly materials and green manufacturing processes are reshaping the tyre industry...',
    image: 'https://cdn.itegroupnews.com/mnng25_2100_540e751921.webp',
    date: '29.08.2025',
  },
];

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Header />
      <main className="intro-animation">
        <HeroSection />
        <AboutSection />
        <CountriesSection countries={countriesData} />
        <OutcomesSection outcomes={outcomesData} />
        <WhyExhibitSection />
        <SectorsSection />
        <BrochureSection />
        <ArticlesSection articles={articlesData} />
        <NewsletterSection />
        <PartnersSection />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}