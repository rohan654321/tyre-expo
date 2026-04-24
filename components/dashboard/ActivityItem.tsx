'use client';

import { ClockIcon } from "@heroicons/react/24/outline";

interface ActivityItemProps {
  title: string;
  description: string;
  time: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export default function ActivityItem({ 
  title, 
  description, 
  time, 
  icon: Icon, 
  color 
}: ActivityItemProps) {
  return (
    <div className="flex items-start gap-3 p-4 border rounded-xl hover:bg-gray-50 transition-all duration-200">
      <div className={`p-2 rounded-xl ${color}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-gray-800">{title}</h4>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        <div className="flex items-center gap-2 mt-2">
          <ClockIcon className="h-3 w-3 text-gray-400" />
          <span className="text-xs text-gray-400">{time}</span>
        </div>
      </div>
    </div>
  );
}