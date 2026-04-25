'use client';

import Image from 'next/image';
import { Button } from '../ui/button';
import Container from '../ui/container';

export default function BrochureSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-28 text-white">
      <Image
        src="https://cdn.itegroupnews.com/img_3_4b6edc76d1.jpg"
        alt="Background"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/70" />
      
      <Image
        src="/imgs/shape-1.svg"
        alt="Shape"
        width={500}
        height={500}
        className="absolute right-0 top-1/2 w-[300px] sm:w-[400px] lg:w-[500px] -translate-y-1/2 opacity-30 hidden md:block"
      />

      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          {/* LEFT IMAGE */}
          <div className="relative flex justify-center lg:justify-start w-full lg:w-auto">
            <div className="relative w-[250px] sm:w-[300px] lg:w-[380px]">
              <Image
                src="https://cdn.itegroupnews.com/Sales_Brochure_84b3c56f9d.png"
                alt="Brochure"
                width={380}
                height={380}
                className="absolute top-4 sm:top-6 left-4 sm:left-6 rotate-[-8deg] opacity-80 shadow-xl"
              />
              <Image
                src="https://cdn.itegroupnews.com/Sales_Brochure_84b3c56f9d.png"
                alt="Brochure"
                width={380}
                height={380}
                className="relative rotate-[-2deg] shadow-2xl"
              />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 text-center lg:text-left">
            <h2 className="text-[28px] sm:text-[34px] md:text-[42px] lg:text-[48px] font-extrabold leading-[1.05]">
              UNLOCK OPPORTUNITIES IN TYRE <br className="hidden sm:block" />
              <span className="block mt-1 sm:mt-2">INDUSTRY</span>
            </h2>
            <p className="text-base sm:text-lg text-white/80">
              Discover how India Tyre Show helps your business grow.
            </p>
            <p className="text-sm sm:text-base text-white/70 max-w-[650px] leading-relaxed mx-auto lg:mx-0">
              Download the Event Brochure to explore participation options, audience insights, and industry sectors and learn how exhibiting can connect you with key buyers, strengthen your market presence, and accelerate your growth across the global market.
            </p>
            <Button
              href="/event-brochure/"
              className="bg-[#F08400] px-6 sm:px-8 py-2.5 sm:py-3 lg:py-4 text-sm sm:text-base font-bold uppercase hover:bg-orange-600 w-fit mx-auto lg:mx-0"
            >
              Download Your Event Brochure
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}