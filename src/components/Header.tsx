import React, { useState, useRef, useEffect } from 'react';
import { Menu, ChevronDown, LogOut, User, Menu as MenuIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useOnClickOutside } from '../hooks/useOnClickOutside';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(profileRef, () => setProfileOpen(false));

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-6">
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none md:hidden"
      >
        <MenuIcon size={20} />
      </button>

      <div className="flex-1 md:pl-4">
        <h1 className="text-lg md:text-xl font-semibold text-gray-800">Welcome, {user?.username}!</h1>
      </div>

      <div className="relative" ref={profileRef}>
        <button
          onClick={() => setProfileOpen(!profileOpen)}
          className="flex items-center space-x-2 focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
            <User size={18} />
          </div>
          <span className="hidden md:block text-sm font-medium text-gray-700">{user?.username}</span>
          <ChevronDown size={16} className="text-gray-500" />
        </button>

        {profileOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
            <div className="px-4 py-3 border-b border-gray-200">
              <p className="text-sm font-medium text-gray-700">{user?.username}</p>
            </div>

            <div className="px-4 py-3">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Latest Expenses</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Groceries</span>
                  <span className="text-red-600">₹2,500</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Internet</span>
                  <span className="text-red-600">₹1,200</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Rent</span>
                  <span className="text-red-600">₹15,000</span>
                </div>
              </div>
            </div>

            <button
              onClick={logout}
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <LogOut size={16} className="mr-2 text-gray-500" />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;