import React, { useState } from 'react';
import { Activity, Heart, Weight, Thermometer} from 'lucide-react';
import { VitalCard } from './VitalCard';
import { AppointmentCard } from './AppointmentCard';
import { MedicationCard } from './MedicationCard';
import { HealthRecord } from './HealthRecord';
import { MedicationForm } from './MedicationForm';
import { ReportsTab } from './ReportsTab';

export function PatientDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'records' | 'medications' | 'reports'>('overview');
  const [selectedMedication, setSelectedMedication] = useState<any>(null);

  const medications = [
    { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', time: 'Morning' },
    { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', time: 'Morning/Evening' },
    { name: 'Vitamin D3', dosage: '2000 IU', frequency: 'Once daily', time: 'Morning' },
  ];

  const healthRecords = [
    {
      date: '2024-02-15',
      type: 'Annual Physical',
      doctor: 'Nishu Gupta',
      diagnosis: 'Generally healthy, mild hypertension',
      notes: 'Blood pressure slightly elevated. Recommended lifestyle changes and continued medication.',
    },
    {
      date: '2023-11-20',
      type: 'Cardiology Consultation',
      doctor: 'B N Ghosh',
      diagnosis: 'Stable cardiovascular health',
      notes: 'EKG shows normal sinus rhythm. Continue current medication regimen.',
    },
    {
      date: '2023-09-05',
      type: 'Laboratory Results',
      doctor: 'Santosh Shukla',
      diagnosis: 'Vitamin D deficiency',
      notes: 'Started on Vitamin D3 supplementation. Follow-up in 3 months.',
    },
  ];

  const handleAddMedication = (data: any) => {
    console.log('Adding medication:', data);
  };

  const handleUpdateMedication = (data: any) => {
    console.log('Updating medication:', data);
    setSelectedMedication(null);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <VitalCard title="Heart Rate" value="72 bpm" icon={Activity} trend="-2 bpm" />
              <VitalCard title="Blood Pressure" value="120/80" icon={Heart} trend="+5%" />
              <VitalCard title="Temperature" value="98.6°F" icon={Thermometer} />
              <VitalCard title="Weight" value="62 kg" icon={Weight} trend="-2 kgs" />
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Upcoming Appointments</h2>
                <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                <AppointmentCard
                  date="Today"
                  doctor="Dr. Seema Goyal"
                  type="General Checkup"
                  time="2:00 PM"
                />
                <AppointmentCard
                  date="Tomorrow"
                  doctor="Dr. Nishu Gupta"
                  type="Cardiology"
                  time="10:30 AM"
                />
                <AppointmentCard
                  date="Mar 15"
                  doctor="Dr. Amit Sharma"
                  type="Laboratory Tests"
                  time="9:00 AM"
                />
              </div>
              <div className='w-full h-10 text-nowrap bg-blue-500 flex justify-center items-center rounded-md mt-2 hover:bg-blue-600 cursor-pointer duration-200'>
                <p className='text-white'>+ Add Appointment</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Current Medications</h2>
                <button 
                  onClick={() => setActiveTab('medications')}
                  className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                >
                  Manage Medications
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {medications.map((med, index) => (
                  <MedicationCard key={index} {...med} />
                ))}
              </div>
            </div>
          </>
        );
      case 'records':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Health Records History</h2>
              <div className="flex items-center gap-4">
                <select className="rounded-lg border border-gray-200 px-4 py-2 text-sm">
                  <option>All Records</option>
                  <option>Consultations</option>
                  <option>Lab Results</option>
                  <option>Procedures</option>
                </select>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
                  Download Records
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {healthRecords.map((record, index) => (
                <HealthRecord key={index} {...record} />
              ))}
            </div>
          </div>
        );
      case 'medications':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MedicationForm type="add" onSubmit={handleAddMedication} />
              <MedicationForm 
                type="update" 
                onSubmit={handleUpdateMedication}
                defaultValues={selectedMedication}
              />
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Current Medications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {medications.map((med, index) => (
                  <div key={index} onClick={() => setSelectedMedication(med)} className="cursor-pointer">
                    <MedicationCard {...med} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'reports':
        return <ReportsTab />;
      default:
        return null;
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <img
            src="https://media.licdn.com/dms/image/v2/D4D03AQG43MGollHnSA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1698425138703?e=1737590400&v=beta&t=eDOEo6DWD1v9JvM8R9us5az4z1Uq6GXCOOXIiMOVKcU"
            alt="Patient"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Roushan Srivastav</h2>
            <p className="text-gray-500">Patient ID: P-2327cse1290</p>
          </div>
        </div>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === 'overview'
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('records')}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === 'records'
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          Health Records
        </button>
        <button
          onClick={() => setActiveTab('medications')}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === 'medications'
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          Manage Medications
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === 'reports'
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          Medical Reports
        </button>
      </div>

      {renderTabContent()}
    </main>
  );
}