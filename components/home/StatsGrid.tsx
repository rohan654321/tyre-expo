interface StatItem {
  number: string;
  label: string;
}

interface StatsGridProps {
  stats: StatItem[];
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="mt-10 bg-[#e9e5df] py-12 px-8 grid grid-cols-2 md:grid-cols-4">

      {stats.map((stat, index) => (
        <div
          key={index}
          className={`
            flex flex-col items-center justify-center text-center
            ${index !== stats.length - 1 ? 'border-r border-gray-300' : ''}
          `}
        >
          {/* NUMBER */}
          <h3 className="text-[36px] md:text-[44px] lg:text-[52px] font-extrabold text-[#F08400]">
            {stat.number}
          </h3>

          {/* LABEL */}
          <p className="mt-3 text-sm md:text-base font-semibold text-black uppercase tracking-wider">
            {stat.label}
          </p>
        </div>
      ))}

    </div>
  );
}