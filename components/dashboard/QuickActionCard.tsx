'use client';

import { ReactNode } from 'react';

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  onClick: () => void;
}

export default function QuickActionCard({ 
  title, 
  description, 
  icon: Icon, 
  color, 
  onClick 
}: QuickActionCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-start gap-3 p-4 border rounded-xl text-left hover:bg-gray-50 transition-all duration-200 group w-full"
    >
      <div className={`p-2.5 rounded-xl ${color} group-hover:scale-110 transition-transform duration-200`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h4 className="font-semibold text-sm text-gray-800">{title}</h4>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
    </button>
  );
}