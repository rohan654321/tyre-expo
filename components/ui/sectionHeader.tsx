interface SectionHeaderProps {
  topText?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export default function SectionHeader({
  topText,
  title,
  description,
  align = 'left',
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 ${isCenter ? 'text-center' : 'text-left'}`}>

      {/* TOP TEXT */}
      {topText && (
        <p className="text-[#F08400] font-semibold text-lg mb-3">
          {topText}
        </p>
      )}

      {/* TITLE */}
      <h2
        className={`
          font-extrabold text-black leading-[1.05]
          text-[22px] sm:text-[38px] lg:text-[52px]
          max-w-[1200px]
          ${isCenter ? 'mx-auto' : ''}
        `}
      >
        {title}
      </h2>

      {/* DESCRIPTION */}
      {description && (
        <p
          className={`
            text-gray-600 mt-6 text-lg leading-relaxed
            ${isCenter ? 'mx-auto max-w-[700px]' : 'max-w-[700px]'}
          `}
        >
          {description}
        </p>
      )}
    </div>
  );
}