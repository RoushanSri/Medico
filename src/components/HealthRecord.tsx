import React from 'react';
import { FileText, Calendar } from 'lucide-react';

interface HealthRecordProps {
  date: string;
  type: string;
  doctor: string;
  diagnosis: string;
  notes: string;
}

export function HealthRecord({ date, type, doctor, diagnosis, notes }: HealthRecordProps) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
          <FileText className="w-6 h-6 text-blue-500" />
        </div>
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-lg text-gray-900">{type}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>{date}</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-2">Dr. {doctor}</p>
          <div className="space-y-2">
            <div>
              <span className="text-sm font-medium text-gray-700">Diagnosis:</span>
              <p className="text-sm text-gray-600">{diagnosis}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-700">Notes:</span>
              <p className="text-sm text-gray-600">{notes}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}