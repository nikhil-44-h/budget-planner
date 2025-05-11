import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CreditCard, 
  IndianRupee, 
  PiggyBank, 
  Settings, 
  X 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  
  const menus = [
    { title: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { title: 'Expenses', path: '/expenses', icon: <CreditCard size={20} /> },
    { title: 'Income', path: '/income', icon: <IndianRupee size={20} /> },
    { title: 'Savings Goals', path: '/savings-goals', icon: <PiggyBank size={20} /> },
    { title: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside 
      className={`
        fixed top-0 left-0 z-40 h-full w-64 bg-white border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        <Link to="/dashboard" className="flex items-center">
          <IndianRupee className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-gray-800">EZY Tracker</span>
        </Link>
        <button 
          onClick={toggleSidebar} 
          className="p-1 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none md:hidden"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="flex flex-col h-[calc(100%-4rem)] overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-1">
          {menus.map((menu) => (
            <Link
              key={menu.path}
              to={menu.path}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                location.pathname === menu.path
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className={`${location.pathname === menu.path ? 'text-blue-600' : 'text-gray-500'}`}>
                {menu.icon}
              </span>
              <span className="ml-3 font-medium">{menu.title}</span>
            </Link>
          ))}
        </nav>
        
        <div className="p-4 space-y-3">
          <button className="w-full flex items-center justify-center px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
            <CreditCard size={16} className="mr-2" />
            Add Expense
          </button>
          
          <button className="w-full flex items-center justify-center px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
            <IndianRupee size={16} className="mr-2" />
            Add Income
          </button>
          
          <button className="w-full flex items-center justify-center px-4 py-2 text-sm text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-colors">
            <PiggyBank size={16} className="mr-2" />
            Add Saving Goal
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;