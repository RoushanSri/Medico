import { Routes, Route } from 'react-router-dom';
import { Header } from '../components/Header';
import { PatientDashboard } from '../components/PatientDashboard';

export default function Dashboard() {

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Routes>
        <Route path="/" element={<PatientDashboard />} />
      </Routes>
    </div>
  );
}