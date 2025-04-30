'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const HomeNavbar = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleJoinNowClick = () => {
    router.push('/register');
  };

  return (
    <header className="bg-gradient-to-br from-cyan-100 via-sky-200 to-indigo-100 px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image src="/home/logo.png" alt="Bitnex Logo" width={40} height={40} />
          <span className="text-lg font-bold text-gray-800 tracking-wide">BITNEXECOMMERCE</span>
        </div>

        {/* Desktop Join Button */}
        <div className="hidden md:flex">
          <button
            onClick={handleJoinNowClick}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition-all text-sm"
          >
            Join Now
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle Menu">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 text-center">
          <button
            onClick={handleJoinNowClick}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition-all text-sm"
          >
            Join Now
          </button>
        </div>
      )}
    </header>
  );
};

export default HomeNavbar;
