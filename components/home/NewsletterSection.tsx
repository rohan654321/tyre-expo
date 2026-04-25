'use client';

import { Button } from '../ui/button';
import Container from '../ui/container';

export default function NewsletterSection() {
  return (
    <section className="bg-black py-16 sm:py-20 lg:py-24 text-white">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10">
          <div className="max-w-[900px] text-center lg:text-left">
            <h2 className="text-[32px] sm:text-[36px] lg:text-[40px] font-extrabold leading-[1.05]">
              JOIN OUR NEWSLETTER
            </h2>
            <p className="text-gray-400 mt-4 sm:mt-5 lg:mt-6 text-base sm:text-lg leading-relaxed">
              Don&apos;t miss out on the latest with our weekly newsletter, bringing you not only 
              the latest updates from the event but also cutting-edge insights from the entire industry.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Button
              href="/newsletter/"
              className="bg-[#F08400] px-6 sm:px-8 py-2.5 sm:py-3 lg:py-4 text-base sm:text-lg font-bold uppercase hover:bg-orange-600 w-full sm:w-auto text-center"
            >
              SIGN UP TODAY
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}