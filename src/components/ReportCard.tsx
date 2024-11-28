import React from 'react';
import { FileText, TrendingUp, AlertCircle } from 'lucide-react';

interface ReportValue {
  value: string;
  unit: string;
  normalRange: string;
  status: 'normal' | 'high' | 'low';
}

interface ReportCardProps {
  date: string;
  type: string;
  values: ReportValue[];
  doctor: string;
  nextDue?: string;
}

export function ReportCard({ date, type, values, doctor, nextDue }: ReportCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'high':
        return 'text-red-500';
      case 'low':
        return 'text-yellow-500';
      default:
        return 'text-green-500';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
            <FileText className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{type}</h3>
            <p className="text-sm text-gray-500">{date}</p>
          </div>
        </div>
        {nextDue && (
          <div className="text-right">
            <span className="text-sm text-gray-500">Next Due</span>
            <p className="text-sm font-medium text-blue-600">{nextDue}</p>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {values.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className={`w-4 h-4 ${getStatusColor(item.status)}`} />
              <span className="text-sm text-gray-600">{item.value} {item.unit}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Normal: {item.normalRange}</span>
              <span className={`text-xs font-medium ${getStatusColor(item.status)}`}>
                {item.status.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Reviewed by Dr. {doctor}</span>
          {values.some(v => v.status !== 'normal') && (
            <div className="flex items-center gap-1 text-yellow-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-xs font-medium">Needs Attention</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}