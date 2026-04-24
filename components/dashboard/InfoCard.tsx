interface InfoCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  subtitle?: string;
}

export default function InfoCard({ title, value, icon: Icon, color, subtitle }: InfoCardProps) {
  return (
    <div className={`flex items-center gap-3 p-3 bg-gradient-to-r ${color} rounded-xl`}>
      <Icon className="h-5 w-5 text-white/80" />
      <div className="flex-1">
        <p className="text-xs text-white/70">{title}</p>
        <p className="text-sm font-semibold text-white">{value}</p>
        {subtitle && <p className="text-xs text-white/50 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}