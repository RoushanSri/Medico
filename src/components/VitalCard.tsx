import React from 'react';
import { LucideIcon } from 'lucide-react';

interface VitalCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
}

export function VitalCard({ title, value, icon: Icon, trend }: VitalCardProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-600 text-sm">{title}</span>
        <Icon className="w-5 h-5 text-blue-500" />
      </div>
      <div className="flex items-baseline">
        <span className="text-2xl font-bold text-gray-800">{value}</span>
        {trend && (
          <span className={`ml-2 text-sm ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}