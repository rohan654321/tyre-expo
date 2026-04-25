import Image from 'next/image';
import Container from '../ui/container';
import Link from 'next/link';

interface Outcome {
  title: string;
  content: string;
  image: string;
}

interface OutcomesSectionProps {
  outcomes: Outcome[];
}

export default function OutcomesSection({ outcomes }: OutcomesSectionProps) {
  return (
    <section className="bg-[#f5f5f5] py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="max-w-[1000px] mb-8 sm:mb-10 lg:mb-12">
          <p className="text-[#F08400] font-sans text-[12px] sm:text-[14px] uppercase tracking-[1.5px]">
            Key Outcomes of Exhibiting
          </p>
          <h2 className="mt-3 sm:mt-4 font-bebas text-[36px] sm:text-[42px] lg:text-[48px] leading-[1.05] tracking-[2px] uppercase text-black font-bold">
            DELIVERING MEASURABLE BUSINESS IMPACT
          </h2>
          <p className="mt-4 sm:mt-5 lg:mt-6 font-sans text-[14px] sm:text-[16px] lg:text-[18px] text-gray-700 leading-[1.8] max-w-[800px]">
            At MiningWorld, exhibitors don&apos;t just showcase, they achieve.
            <br /><br />
            Year after year, exhibitors report tangible returns through new partnerships,
            strengthened brand presence, and increased sales opportunities across the mining
            and mineral processing value chain.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {outcomes.map((outcome, index) => (
            <div key={index} className="relative group overflow-hidden">
              <div className="relative h-[220px] sm:h-[240px] lg:h-[260px] xl:h-[300px] rounded-lg overflow-hidden">
                <Image
                  src={outcome.image}
                  alt={outcome.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="mt-3 sm:mt-4">
                <h3 className="font-heading text-[18px] sm:text-[20px] lg:text-[22px] tracking-[0.5px] font-bold text-black leading-[1.3]">
                  {outcome.title}
                </h3>
                <p className="mt-1 sm:mt-2 font-sans text-gray-600 text-[13px] sm:text-[14px] leading-[1.7] line-clamp-3">
                  {outcome.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 lg:mt-12">
          <Link
            href="/post-show-report/"
            className="inline-block bg-[#F08400] text-white px-6 sm:px-8 py-2.5 sm:py-3 lg:py-4 font-sans text-xs sm:text-sm font-semibold uppercase tracking-[1.5px] hover:bg-orange-600 transition"
          >
            Download Post-Show Report
          </Link>
        </div>
      </Container>
    </section>
  );
}