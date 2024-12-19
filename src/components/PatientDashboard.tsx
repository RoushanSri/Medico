import { useState } from 'react';
import { Activity, Heart, Weight, Thermometer } from 'lucide-react';
import { VitalCard } from './VitalCard';
import { AppointmentCard } from './AppointmentCard';
import { MedicationCard } from './MedicationCard';
import { HealthRecord } from './HealthRecord';
import { MedicationForm } from './MedicationForm';
import { ReportsTab } from './ReportsTab';

export function PatientDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'records' | 'medications' | 'reports'>('overview');
  const [appointments, setAppointments] = useState([
    { date: '2024-11-30', doctor: 'Dr. Seema Goyal', type: 'Checkup', time: '10:00 AM', state: 'Delhi' },
    { date: '2024-12-01', doctor: 'Dr. Nishu Gupta', type: 'Cardiology', time: '2:00 PM', state: 'Uttrakhand' },
    { date: '2024-12-02', doctor: 'Dr. Amit Sharma', type: 'Gynecology', time: '4:00 PM', state: 'Uttar Pradesh' },
  ]);
  const [showAddAppointmentForm, setShowAddAppointmentForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    date: '',
    doctor: '',
    type: '',
    time: '',
    state: ''
  });

  const [selectedMedication, setSelectedMedication] = useState<any>(null);

  const handleReschedule = (index: number, newDate: string, newTime: string) => {
    setAppointments((prevAppointments) => {
      const updatedAppointments = [...prevAppointments];
      updatedAppointments[index] = {
        ...updatedAppointments[index],
        date: newDate,
        time: newTime,
      };
      return updatedAppointments;
    });
  };

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

  const handleAddAppointment = () => {
    if (newAppointment.date && newAppointment.doctor && newAppointment.type && newAppointment.time && newAppointment.state) {
      setAppointments([...appointments, newAppointment]);
      setShowAddAppointmentForm(false);
      console.log(newAppointment);
      
      setNewAppointment({ date: '', doctor: '', type: '', time: '' ,state: ''}); 
    }
    else{
      alert('Please fill all fields');
    }
  };

  const removeAppointment = (index: number) => {
    setAppointments((prevAppointments) => prevAppointments.filter((_, i) => i !== index));
  };

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
                
              </div>
              <div className="space-y-4">
                {appointments.map((appointment, index) => (
                  <AppointmentCard
                    key={index}
                    date={appointment.date}
                    doctor={appointment.doctor}
                    type={appointment.type}
                    time={appointment.time}
                    onRemove={() => removeAppointment(index)}
                    onReschedule={(newDate, newTime) => handleReschedule(index, newDate, newTime)}
                  />
                ))}
                <button
                  onClick={() => setShowAddAppointmentForm(true)}
                  className="text-white hover:bg-blue-600 text-md font-medium w-full bg-blue-500 rounded-md p-3"
                >
                  + Add Appointment
                </button>
              </div>
              {showAddAppointmentForm && (
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Add Appointment</h3>
          <div className="space-y-4">
            <input
              type="date"
              className="w-full px-4 py-2 border rounded-lg outline-indigo-400"
              value={newAppointment.date}
              onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
            />
            <input
              type="text"
              className="w-full px-4 py-2 border outline-indigo-400 rounded-lg"
              placeholder="Doctor"
              value={newAppointment.doctor}
              onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
            />
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg outline-indigo-400"
              placeholder="Type"
              value={newAppointment.type}
              onChange={(e) => setNewAppointment({ ...newAppointment, type: e.target.value })}
            />
        <select id="states" name="states" value={newAppointment.state} onChange={(e)=>setNewAppointment({...newAppointment, state: e.target.value})}>
        <option value="all">-----Select State-----</option>
        <option value="Andhra Pradesh">Andhra Pradesh</option>
        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
        <option value="Assam">Assam</option>
        <option value="Bihar">Bihar</option>
        <option value="Chhattisgarh">Chhattisgarh</option>
        <option value="Goa">Goa</option>
        <option value="Gujarat">Gujarat</option>
        <option value="Haryana">Haryana</option>
        <option value="Himachal Pradesh">Himachal Pradesh</option>
        <option value="Jharkhand">Jharkhand</option>
        <option value="Karnataka">Karnataka</option>
        <option value="Kerala">Kerala</option>
        <option value="Madhya Pradesh">Madhya Pradesh</option>
        <option value="Maharashtra">Maharashtra</option>
        <option value="Manipur">Manipur</option>
        <option value="Meghalaya">Meghalaya</option>
        <option value="Mizoram">Mizoram</option>
        <option value="Nagaland">Nagaland</option>
        <option value="Odisha">Odisha</option>
        <option value="Punjab">Punjab</option>
        <option value="Rajasthan">Rajasthan</option>
        <option value="Sikkim">Sikkim</option>
        <option value="Tamil Nadu">Tamil Nadu</option>
        <option value="Telangana">Telangana</option>
        <option value="Tripura">Tripura</option>
        <option value="Uttar Pradesh">Uttar Pradesh</option>
        <option value="Uttarakhand">Uttarakhand</option>
        <option value="West Bengal">West Bengal</option>
        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
        <option value="Chandigarh">Chandigarh</option>
        <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
        <option value="Delhi">Delhi</option>
        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
        <option value="Ladakh">Ladakh</option>
        <option value="Lakshadweep">Lakshadweep</option>
        <option value="Puducherry">Puducherry</option>
    </select>
            <input
              type="time"
              className="w-full px-4 py-2 border rounded-lg outline-indigo-400"
              value={newAppointment.time}
              onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
            />
            <div className='flex gap-[1vw]'>
            <button
              onClick={handleAddAppointment}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg"
            >
              Add Appointment
            </button>
            <button
              onClick={() => setShowAddAppointmentForm(false)}
              className="bg-red-500 text-white px-6 py-2 rounded-lg "
            >Close</button>
            </div>
            
          </div>
        </div>
      )}
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
          className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'overview' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('records')}
          className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'records' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
        >
          Health Records
        </button>
        <button
          onClick={() => setActiveTab('medications')}
          className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'medications' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
        >
          Manage Medications
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'reports' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
        >
          Medical Reports
        </button>
      </div>

      {renderTabContent()}      
    </main>
  );
}
