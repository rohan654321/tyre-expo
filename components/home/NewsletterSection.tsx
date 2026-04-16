'use client';

import { Button } from '../ui/button';

export default function NewsletterSection() {
  return (
    <section className="bg-black py-24 text-white">

      <div className="max-w-[1400px] mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-10">

        {/* LEFT CONTENT */}
        <div className="max-w-[900px]">

          <h2 className="text-[24px] sm:text-[32px] lg:text-[40px] font-extrabold leading-[1.05]">
            JOIN OUR NEWSLETTER
          </h2>

          <p className="text-gray-400 mt-6 text-lg leading-relaxed">
            Don&apos;t miss out on the latest with our weekly newsletter, bringing you not only 
            the latest updates from the event but also cutting-edge insights from the entire industry.
          </p>

        </div>

        {/* RIGHT BUTTON */}
        <div className="flex-shrink-0">
          <Button
            href="/newsletter/"
            className="bg-[#F08400] px-8 py-4 text-lg font-bold uppercase hover:bg-orange-600"
          >
            SIGN UP TODAY
          </Button>
        </div>

      </div>

    </section>
  );
}