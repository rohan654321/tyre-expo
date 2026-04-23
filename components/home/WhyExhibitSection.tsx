'use client';

import Link from 'next/link';
import Container from '../ui/container';

const reasons = [
  'ENTER A USD 75 BILLION TYRE MARKET',
  'MEET HIGH-VALUE BUYERS AND DECISION-MAKERS FROM ACROSS THE GLOBE',
  'SHOWCASE TECHNOLOGIES THAT IMPROVE EFFICIENCY AND REDUCE COSTS',
  'ALIGN WITH REGIONAL SUSTAINABILITY AND INNOVATION GOALS',
  'SECURE LONG-TERM PARTNERSHIPS AND MARKET PRESENCE',
];

export default function WhyExhibitSection() {
  return (
    <section className="bg-black text-white py-28">
      <Container>
        <div className="flex flex-col lg:flex-row gap-16 items-stretch">
          
          {/* LEFT SIDE */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h2 className="font-heading text-[48px] sm:text-[60px] lg:text-[72px] leading-[1.05] tracking-[2px] text-[#F08400] uppercase">
                WHY EXHIBIT
              </h2>
              <h2 className="font-heading text-[48px] sm:text-[60px] lg:text-[72px] leading-[1.05] tracking-[2px] text-white uppercase">
                AT TYRE SHOW?
              </h2>
            </div>

            <p className="font-sans text-[16px] sm:text-[18px] text-gray-400 leading-[1.8]">
              In a market defined by rapid modernisation, localisation, and sustainability demands,
              India Tyre Show provides direct access to decision-makers shaping the future of tyre
              manufacturing and rubber technology across the globe. It&apos;s where global suppliers connect
              with real projects, demonstrate ROI-driven technologies, and secure long-term growth opportunities.
            </p>

            <Link
              href="/why-exhibit/"
              className="mt-6 w-fit bg-[#F08400] px-8 py-4 font-sans text-sm font-semibold uppercase tracking-[1.5px] hover:bg-orange-600 transition"
            >
              Explore Benefits of Participating
            </Link>
          </div>

          {/* VERTICAL DIVIDER */}
          <div className="hidden lg:block w-px bg-white/20 self-stretch"></div>

          {/* RIGHT SIDE */}
          <div className="flex-1 flex flex-col">
            {reasons.map((text, index) => (
              <div
                key={index}
                className="flex items-start gap-6 border-b border-white/20 pb-6 pt-6 first:pt-0 last:border-b-0"
              >
                <span className="text-gray-500 text-lg font-semibold font-sans flex-shrink-0">
                  {index + 1}.
                </span>
                <p className="font-heading text-[18px] sm:text-[20px] lg:text-[24px] tracking-[1px] font-semibold leading-[1.4] text-gray-300 uppercase">
                  {text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}