import React from 'react';
import { Plus } from 'lucide-react';
interface MedicationFormProps {
  type: 'add' | 'update';
  onSubmit: (data: any) => void;
  defaultValues?: {
    name: string;
    dosage: string;
    frequency: string;
    time: string;
  };
}
export function MedicationForm({ type, onSubmit, defaultValues }: MedicationFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    onSubmit(data);
    (e.target as HTMLFormElement).reset();
  };
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {type === 'add' ? 'Add New Medication' : 'Update Medication'}
      </h3>
      <div className="space-y-4">
        <div>
          <label htmlFor={`${type}-name`} className="block text-sm font-medium text-gray-700 mb-1">
            Medication Name
          </label>
          <input
            type="text"
            id={`${type}-name`}
            name="name"
            defaultValue={defaultValues?.name}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor={`${type}-dosage`} className="block text-sm font-medium text-gray-700 mb-1">
            Dosage
          </label>
          <input
            type="text"
            id={`${type}-dosage`}
            name="dosage"
            defaultValue={defaultValues?.dosage}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor={`${type}-frequency`} className="block text-sm font-medium text-gray-700 mb-1">
            Frequency
          </label>
          <select
            id={`${type}-frequency`}
            name="frequency"
            defaultValue={defaultValues?.frequency}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select frequency</option>
            <option value="Once daily">Once daily</option>
            <option value="Twice daily">Twice daily</option>
            <option value="Three times daily">Three times daily</option>
            <option value="As needed">As needed</option>
          </select>
        </div>
        <div>
          <label htmlFor={`${type}-time`} className="block text-sm font-medium text-gray-700 mb-1">
            Time of Day
          </label>
          <select
            id={`${type}-time`}
            name="time"
            defaultValue={defaultValues?.time}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select time</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
            <option value="Morning/Evening">Morning/Evening</option>
            <option value="With meals">With meals</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          {type === 'add' ? 'Add Medication' : 'Update Medication'}
        </button>
      </div>
    </form>
  );
}