"use client";

import React, { useEffect, useState } from "react";

const banners = [
  { title: "Welcome Bonus", subtitle: "$3 USDT Free for New Users", bg: "from-pink-500 to-yellow-500" },
  { title: "Deposit Commission", subtitle: "Earn up to 5% Commission on Deposits", bg: "from-blue-500 to-indigo-500" },
  { title: "Referral Bonus", subtitle: "Profit from 3-Level Generations", bg: "from-green-500 to-emerald-500" },
  { title: "Rank Rewards", subtitle: "Up to $500 for Rank Achievements", bg: "from-purple-500 to-fuchsia-500" },
  { title: "Monthly Salary", subtitle: "Receive $100 - $200 Every Month", bg: "from-orange-500 to-amber-500" },
];

function BannerSlider() {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-40 md:h-48 text-white flex items-center justify-center overflow-hidden  shadow-md">
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`absolute transition-all duration-1000 ease-in-out w-full h-full flex items-center justify-center text-center bg-gradient-to-r ${banner.bg} ${
            currentBanner === index ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 z-0'
          }`}
        >
          <div>
            <h2 className="text-lg md:text-xl font-bold drop-shadow mb-1 uppercase tracking-wide animate-pulse">{banner.title}</h2>
            <p className="text-2xl md:text-3xl font-extrabold drop-shadow animate-fade-in-up">{banner.subtitle}</p>
          </div>
        </div>
      ))}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBanner(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentBanner === index ? 'bg-white scale-110' : 'bg-white/60'}`}
            aria-label={`Go to banner ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default BannerSlider;
