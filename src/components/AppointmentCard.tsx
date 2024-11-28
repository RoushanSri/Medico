import React from 'react';
import { Calendar } from 'lucide-react';
import { SlOptionsVertical } from "react-icons/sl";

interface AppointmentCardProps {
  date: string;
  doctor: string;
  type: string;
  time: string;
}

export function AppointmentCard({ date, doctor, type, time }: AppointmentCardProps) {
  function handleAdd() {
    
  }
  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
        <Calendar className="w-6 h-6 text-blue-500" />
      </div>
      <div className="flex-grow">
        <h3 className="font-medium text-gray-900">{doctor}</h3>
        <p className="text-sm text-gray-500">{type}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-gray-900">{date}</p>
        <p className="text-sm text-gray-500">{time}</p>
      </div>
      <div onClick={handleAdd} id='option' className={`hover:bg-slate-50 p-3 rounded-full duration-500`}>
      <SlOptionsVertical/>
      {/* <div className={`absolute bg-blue-50 bg-opacity-80 text-white p-2 rounded-xl`}>
        <h5 className='text-green-400 font-semibold my-1'>Done</h5>
        <h5 className='text-orange-400 font-semibold my-1'>Reschedule</h5>
        <h5 className='text-red-600 font-semibold my-1'>Cancel</h5>
      </div> */}
      </div>

    </div>
  );
}