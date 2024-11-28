import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" replace />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
  );
}


export default App;