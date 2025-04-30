'use client';

import React from "react";

const partners = [
  {
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    bg: "from-orange-100 to-orange-50"
  },
  {
    name: "Shopify",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg",
    bg: "from-emerald-100 to-emerald-50"
  },
  {
    name: "AliExpress",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Aliexpress_logo.svg",
    bg: "from-red-100 to-red-50"
  },
  {
    name: "eBay",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg",
    bg: "from-blue-100 to-blue-50"
  },
  {
    name: "Stripe",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
    bg: "from-purple-100 to-purple-50"
  },
  {
    name: "PayPal",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
    bg: "from-blue-100 to-indigo-50"
  },
  {
    name: "BigCommerce",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Bc-logo-dark.svg",
    bg: "from-gray-100 to-gray-50"
  },
  {
    name: "Wix",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/76/Wix.com_website_logo.svg",
    bg: "from-teal-100 to-teal-50"
  },
];

export default function Partners() {
  return (
    <section className="bg-gradient-to-br from-cyan-100 via-sky-200 to-indigo-100 px-6 py-12 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-indigo-800 mb-10">
          Trusted by Global Leaders in E-Commerce
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {partners.map((partner, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${partner.bg} rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
            >
              <div className="p-4 flex flex-col items-center justify-center h-full">
                <div className="flex-1 flex items-center justify-center p-2">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-16 object-contain grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="w-full pt-3 pb-4 px-2 bg-white/80 backdrop-blur-sm">
                  <p className="text-sm md:text-base font-semibold text-gray-800 text-center">
                    {partner.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}