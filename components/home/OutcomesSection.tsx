import Image from 'next/image';
import Section from '../ui/section';

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
    <Section className="bg-[#f5f5f5] py-24">

      {/* HEADER */}
      <div className="max-w-[1000px] px-6 mb-12">
        <p className="text-[#F08400] font-semibold text-lg">
          Key Outcomes of Exhibiting
        </p>

        <h2 className="mt-4 text-[36px] sm:text-[48px] lg:text-[64px] font-extrabold leading-[1.1] text-black">
          DELIVERING MEASURABLE BUSINESS IMPACT
        </h2>

        <p className="mt-6 text-gray-700 text-lg leading-relaxed max-w-[800px]">
          At MiningWorld, exhibitors don’t just showcase, they achieve.
          <br /><br />
          Year after year, exhibitors report tangible returns through new partnerships,
          strengthened brand presence, and increased sales opportunities across the mining
          and mineral processing value chain.
        </p>
      </div>

      {/* IMAGES GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">

        {outcomes.map((outcome, index) => (
          <div key={index} className="relative group overflow-hidden">

            {/* IMAGE */}
            <div className="relative h-[260px] lg:h-[300px]">
              <Image
                src={outcome.image}
                alt={outcome.title}
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            {/* TEXT OVERLAY (OPTIONAL LIKE MODERN SITES) */}
            <div className="mt-4">
              <h3 className="text-xl font-bold text-black">
                {outcome.title}
              </h3>

              <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                {outcome.content}
              </p>
            </div>

          </div>
        ))}

      </div>

      {/* BUTTON */}
      <div className="px-6 mt-12">
        <a
          href="/post-show-report/"
          className="inline-block bg-[#F08400] text-white px-8 py-4 font-bold uppercase hover:bg-orange-600 transition"
        >
          Download Post-Show Report
        </a>
      </div>

    </Section>
  );
}