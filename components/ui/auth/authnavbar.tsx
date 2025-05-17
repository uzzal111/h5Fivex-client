'use client';

import React from 'react';
import Image from 'next/image';
import { Bell } from 'lucide-react';

const AuthNavbar = () => {
  return (
    <header className="bg-gradient-to-br from-cyan-100 via-sky-200 to-indigo-100 px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo - Perfectly sized with aspect ratio maintained */}
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 md:w-16 md:h-16">
            <Image 
              src="/home/logo.png" 
              fill
              alt="Company Logo" 
              className="object-contain dark:invert"
              priority
              sizes="(max-width: 768px) 48px, 64px"
            />
          </div>
          <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            YourBrand
          </h1>
        </div>

        {/* Notification Bell */}
        <button 
          className="relative p-2.5 bg-white bg-opacity-60 rounded-full hover:bg-opacity-80 transition-all duration-200 shadow-sm hover:shadow-md"
          aria-label="Notifications"
        >
          <Bell className="w-6 h-6 text-gray-700" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-medium">
            3
          </span>
        </button>
      </div>
    </header>
  );
};

export default AuthNavbar;