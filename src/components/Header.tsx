import { useState, useRef, useEffect } from 'react';
import { Bell, User, Search, CircleUserRound, Settings, LogOut } from 'lucide-react';
import img from '../../Public/Screenshot 2024-11-21 160510_processed.png';

export function Header() {
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [notifications, setNotifications] = useState([
    'Appointment with Dr. Nishu Gupta tomorrow at 2 PM.',
    'New lab results uploaded.',
    'Reminder: Take Vitamin D3 supplement at 10 AM.',
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<string[]>([]);

  const sampleData = [
    'Appointment with Dr. Nishu Gupta tomorrow at 2 PM.',
    'New lab results uploaded.',
    'Reminder: Take Vitamin D3 supplement at 10 AM.',
    'Update your health profile.',
    'Schedule a follow-up consultation.',
  ];

  const popoverRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  const togglePopover = () => {
    setPopoverVisible((prev) => !prev);
  };

  const toggleNotifications = () => {
    setNotificationsVisible((prev) => !prev);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setFilteredData([]); 
      return;
    }

    const filtered = sampleData.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        setPopoverVisible(false);
      }

      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setNotificationsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img className="w-16 h-16 text-blue-500" src={img} alt="Medico" />
            <h1 className="text-2xl font-bold text-gray-900">Medico</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {searchQuery && (
                <div className="absolute top-12 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-md z-10">
                  {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => alert(`You clicked: ${item}`)}
                      >
                        {item}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500">No results found.</div>
                  )}
                </div>
              )}
            </div>

            <div className="relative" ref={notificationsRef}>
              <button
                onClick={toggleNotifications}
                className="p-2 rounded-full hover:bg-gray-100 relative"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
              {notificationsVisible && (
                <div className="absolute right-0 mt-2 w-64 bg-gray-50 rounded-lg shadow-lg border border-gray-200">
                  <div className="py-2 px-4 text-violet-800 font-bold">
                    Notifications <span className="bg-red-500 text-white px-2 rounded-full">{notifications.length}</span>
                  </div>
                  <ul className="py-2">
                    {notifications.map((note, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 text-blue-500 font-semibold hover:bg-gray-100 cursor-pointer"
                      >
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="relative" ref={avatarRef}>
              <div
                onClick={togglePopover}
                className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer"
              >
                <User className="w-6 h-6 text-white" />
              </div>

              {popoverVisible && (
                <div
                  ref={popoverRef}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200"
                >
                  <ul className="py-2">
                    <li className="px-4 py-2 flex gap-2 text-blue-700 font-medium hover:bg-gray-100 cursor-pointer">
                      <CircleUserRound color="blue" /> Profile
                    </li>
                    <li className="px-4 py-2 flex gap-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                      <Settings /> Settings
                    </li>
                    <li className="px-4 py-2 flex gap-2 text-red-500 hover:bg-gray-100 cursor-pointer">
                      <LogOut color="red" /> Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
