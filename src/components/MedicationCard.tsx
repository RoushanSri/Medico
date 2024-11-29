import { Pill, Clock } from 'lucide-react';
interface MedicationCardProps {
  name: string;
  dosage: string;
  frequency: string;
  time: string;
}
export function MedicationCard({ name, dosage, frequency, time }: MedicationCardProps) {
  return (
    <div className="p-4 border border-gray-100 rounded-lg">
      <div className="flex items-center gap-3 mb-2">
        <Pill className="w-5 h-5 text-blue-500" />
        <h3 className="font-medium text-gray-900">{name}</h3>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-gray-500">Dosage: {dosage}</p>
        <p className="text-sm text-gray-500">Frequency: {frequency}</p>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}