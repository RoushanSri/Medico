import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Calendar, Activity } from 'lucide-react';
import img from '../../Public/Screenshot 2024-11-21 160510_processed.png'

type UserType = 'patient' | 'doctor';

export default function Register() {
  const [userType, setUserType] = useState<UserType>('patient');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement registration logic
    navigate('/signin');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2">
            <img className="w-16 h-16 text-blue-500" src={img}/>
            <h1 className="text-3xl font-bold text-gray-900">Medico</h1>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
        </div>

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
              Register as Patient
            </button>
            <button
              onClick={() => setUserType('doctor')}
              className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center gap-2 ${
                userType === 'doctor'
                  ? 'bg-blue-50 text-blue-700 border-2 border-blue-500'
                  : 'bg-gray-50 text-gray-500 border-2 border-transparent'
              }`}
            >
              <Activity className="w-5 h-5" />
              Register as Doctor
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1 relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="block w-full pl-10 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="mt-1 relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="block w-full pl-10 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <div className="mt-1 relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    required
                    className="block w-full pl-10 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {userType === 'patient' && (
                <>
                  <div>
                    <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700">
                      Blood Type
                    </label>
                    <select
                      id="bloodType"
                      name="bloodType"
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    >
                      <option value="">Select blood type</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">
                      Allergies
                    </label>
                    <input
                      type="text"
                      id="allergies"
                      name="allergies"
                      placeholder="Separate with commas"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                  </div>
                </>
              )}

              {userType === 'doctor' && (
                <>
                  <div>
                    <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
                      Specialization
                    </label>
                    <input
                      type="text"
                      id="specialization"
                      name="specialization"
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="license" className="block text-sm font-medium text-gray-700">
                      License Number
                    </label>
                    <input
                      type="text"
                      id="license"
                      name="license"
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                  </div>
                </>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Register
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => navigate('/signin')}
                className="w-full flex justify-center py-2 px-4 border border-blue-300 rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}