'use client';

import Image from 'next/image';
import { Button } from '../ui/button';
import Container from '../ui/container';

export default function BrochureSection() {
  return (
    <section className="relative overflow-hidden py-28 text-white">
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
        className="absolute right-0 top-1/2 w-[500px] -translate-y-1/2 opacity-30"
      />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT IMAGE */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative w-[320px] lg:w-[380px]">
              <Image
                src="https://cdn.itegroupnews.com/Sales_Brochure_84b3c56f9d.png"
                alt="Brochure"
                width={380}
                height={380}
                className="absolute top-6 left-6 rotate-[-8deg] opacity-80 shadow-xl"
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
          <div className="flex flex-col gap-6">
            <h2 className="text-[36px] lg:text-[48px] font-extrabold leading-[1.05]">
              UNLOCK OPPORTUNITIES IN TYRE <br />
              <span className="block mt-2">INDUSTRY</span>
            </h2>
            <p className="text-lg text-white/80">
              Discover how India Tyre Show helps your business grow.
            </p>
            <p className="text-base text-white/70 max-w-[650px] leading-relaxed">
              Download the Event Brochure to explore participation options, audience insights, and industry sectors and learn how exhibiting can connect you with key buyers, strengthen your market presence, and accelerate your growth across the global market.
            </p>
            <Button
              href="/event-brochure/"
              className="bg-[#F08400] px-8 py-4 text-base font-bold uppercase hover:bg-orange-600 w-fit"
            >
              Download Your Event Brochure
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}