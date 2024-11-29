import { useState, useRef, useEffect } from 'react';
import { Calendar, Check, CalendarCheck, Ban } from 'lucide-react';
import { SlOptionsVertical } from "react-icons/sl";

interface AppointmentCardProps {
  date: string;
  doctor: string;
  type: string;
  time: string;
  onRemove: () => void; 
}

export function AppointmentCard({ date, doctor, type, time, onRemove }: AppointmentCardProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  function togglePopover() {
    setIsPopoverOpen(!isPopoverOpen);
  }

  function handleDoneClick() {
    setIsDone(true);
      onRemove(); 
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsPopoverOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow ${isDone ? 'opacity-50' : ''}`}>
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
      <div className="relative">
        <div
          id="option"
          className="hover:bg-slate-50 p-3 rounded-full duration-500 cursor-pointer"
          onClick={togglePopover}
        >
          <SlOptionsVertical />
        </div>

        {isPopoverOpen && (
          <div
            ref={popoverRef}
            className="absolute right-0 mt-2 w-40 bg-blue-50  border rounded-lg shadow-lg z-10"
          >
            <button 
              className="flex justify-evenly w-full text-left text-sm hover:bg-gray-100 p-2 font-bold text-green-500"
              onClick={handleDoneClick}
            >
              Done <Check color='green' size={20} />
            </button>
            <button className="flex justify-evenly w-full text-left text-sm font-bold text-blue-400 hover:bg-gray-100 p-2">
              Reschedule <CalendarCheck size={20} color='blue' />
            </button>
            <button className="flex justify-evenly w-full text-left text-sm text-red-600 font-bold hover:bg-gray-100 p-2"
            onClick={handleDoneClick}
            >
              Cancel <Ban color='red' size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
