'use client';

import { ArrowTrendingUpIcon, MinusIcon } from "@heroicons/react/24/outline";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  trend: "up" | "down" | "stable" | "warning";
  href: string;
  onClick?: () => void;
}

export default function StatsCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  color, 
  trend, 
  href,
  onClick 
}: StatsCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />;
      case "down":
        return <ArrowTrendingUpIcon className="h-4 w-4 text-red-500 rotate-180" />;
      case "warning":
        return <div className="h-3 w-3 rounded-full bg-amber-500" />;
      default:
        return <MinusIcon className="h-4 w-4 text-gray-400" />;
    }
  };

  const getTrendText = () => {
    switch (trend) {
      case "up":
        return "text-green-600 bg-green-50";
      case "down":
        return "text-red-600 bg-red-50";
      case "warning":
        return "text-amber-600 bg-amber-50";
      default:
        return "text-gray-500 bg-gray-100";
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      window.location.href = href;
    }
  };

  return (
    <div
      onClick={handleClick}
      className="relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group cursor-pointer"
    >
      <div className={`absolute inset-0 opacity-5 bg-gradient-to-br ${color}`} />
      <div className="relative p-6">
        <div className="flex items-center justify-between mb-6">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${color} shadow-md`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${getTrendText()}`}>
            {getTrendIcon()}
            <span>{change}</span>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 tracking-tight">{value}</p>
        </div>
      </div>
    </div>
  );
}