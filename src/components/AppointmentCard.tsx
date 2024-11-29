import { useState, useRef, useEffect } from "react";
import { Calendar, Check, CalendarCheck, Ban, X } from "lucide-react";
import { SlOptionsVertical } from "react-icons/sl";

interface AppointmentCardProps {
  date: string;
  doctor: string;
  type: string;
  time: string;
  onRemove: () => void;
  onReschedule: (newDate: string, newTime: string) => void; // Updated for rescheduling
}

export function AppointmentCard({ date, doctor, type, time, onRemove, onReschedule }: AppointmentCardProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDate, setNewDate] = useState(date);
  const [newTime, setNewTime] = useState(time);
  const popoverRef = useRef<HTMLDivElement>(null);

  function togglePopover() {
    setIsPopoverOpen(!isPopoverOpen);
  }

  function handleRescheduleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onReschedule(newDate, newTime);
    setIsModalOpen(false);
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
    <div className="relative bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
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
              className="absolute right-0 mt-2 w-40 bg-blue-50 border rounded-lg shadow-lg z-10"
            >
              <button
                className="flex justify-evenly w-full text-left text-sm hover:bg-gray-100 p-2 font-bold text-green-500"
                onClick={() => setIsPopoverOpen(false)}
              >
                Done <Check color="green" size={20} />
              </button>
              <button
                className="flex justify-evenly w-full text-left text-sm font-bold text-blue-400 hover:bg-gray-100 p-2"
                onClick={() => {
                  setIsPopoverOpen(false);
                  setIsModalOpen(true);
                }}
              >
                Reschedule <CalendarCheck size={20} color="blue" />
              </button>
              <button
                className="flex justify-evenly w-full text-left text-sm text-red-600 font-bold hover:bg-gray-100 p-2"
                onClick={onRemove}
              >
                Cancel <Ban color="red" size={20} />
              </button>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">Reschedule Appointment</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="text-gray-500 hover:text-gray-700" />
              </button>
            </div>
            <form onSubmit={handleRescheduleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">New Date</label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">New Time</label>
                <input
                  type="time"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
