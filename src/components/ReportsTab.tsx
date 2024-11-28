import React, { useState } from 'react';
import { Filter, Download } from 'lucide-react';
import { ReportCard } from './ReportCard';

const REPORTS_DATA = [
  {
    date: '2024-03-01',
    type: 'Blood Sugar (HbA1c)',
    values: [
      {
        value: '6.8',
        unit: '%',
        normalRange: '4.0-5.7',
        status: 'high' as const,
      }
    ],
    doctor: 'Nishu Gupta',
    nextDue: '2024-06-01',
  },
  {
    date: '2024-02-15',
    type: 'Thyroid Profile (TSH)',
    values: [
      {
        value: '2.5',
        unit: 'mIU/L',
        normalRange: '0.4-4.0',
        status: 'normal' as const,
      },
      {
        value: '1.1',
        unit: 'ng/dL',
        normalRange: '0.8-1.8',
        status: 'normal' as const,
      }
    ],
    doctor: 'B N ghosh',
    nextDue: '2024-08-15',
  },
  {
    date: '2024-02-01',
    type: 'Lipid Profile',
    values: [
      {
        value: '210',
        unit: 'mg/dL',
        normalRange: '<200',
        status: 'high' as const,
      },
      {
        value: '45',
        unit: 'mg/dL',
        normalRange: '>40',
        status: 'normal' as const,
      }
    ],
    doctor: 'Santosh Shukla',
    nextDue: '2024-05-01',
  }
];

export function ReportsTab() {
  const [selectedType, setSelectedType] = useState('all');

  const filteredReports = selectedType === 'all' 
    ? REPORTS_DATA 
    : REPORTS_DATA.filter(report => report.type.toLowerCase().includes(selectedType.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Medical Reports</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select 
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">All Reports</option>
              <option value="blood">Blood Tests</option>
              <option value="thyroid">Thyroid</option>
              <option value="lipid">Lipid Profile</option>
              <option value="diabetes">Diabetes</option>
            </select>
          </div>
          <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600">
            <Download className="w-4 h-4" />
            Export Reports
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredReports.map((report, index) => (
          <ReportCard key={index} {...report} />
        ))}
      </div>

      {filteredReports.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No reports found for the selected filter.</p>
        </div>
      )}
    </div>
  );
}