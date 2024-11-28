import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, Stethoscope } from 'lucide-react';
import img from "../../Public/Screenshot 2024-11-21 160510_processed.png"

export default function SignIn() {
  const [userType, setUserType] = useState<'patient' | 'doctor'>('patient');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would validate credentials here
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex items-center justify-center gap-2">
          <img className="w-16 h-16 text-blue-500" src={img} />
          <h1 className="text-3xl font-bold text-gray-900">Medico</h1>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setUserType('patient')}
              className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center gap-2 ${
                userType === 'patient'
                  ? 'bg-blue-50 text-blue-700 border-2 border-blue-500'
                  : 'bg-gray-50 text-gray-500 border-2 border-transparent'
              }`}
            >
              <User className="w-5 h-5" />
              Patient
            </button>
            <button
              onClick={() => setUserType('doctor')}
              className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center gap-2 ${
                userType === 'doctor'
                  ? 'bg-blue-50 text-blue-700 border-2 border-blue-500'
                  : 'bg-gray-50 text-gray-500 border-2 border-transparent'
              }`}
            >
              <Stethoscope className="w-5 h-5" />
              Doctor
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                {userType === 'patient' ? 'Patient ID' : 'Doctor ID'}
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="id"
                  name="id"
                  type="text"
                  required
                  placeholder={userType === 'patient' ? 'P-XXXXXXXX' : 'D-XXXXXXXX'}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Don't have an account?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/register"
                className="w-full flex justify-center py-2 px-4 border border-blue-300 rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50"
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}