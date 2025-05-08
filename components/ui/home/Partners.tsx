'use client';

import React from "react";

const partners = [
  { logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg" },
  { logo: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Aliexpress_logo.svg" },
  { logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg" },
  { logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" },
  { logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" },
  { logo: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Bc-logo-dark.svg" },
  { logo: "https://upload.wikimedia.org/wikipedia/commons/7/76/Wix.com_website_logo.svg" },
  { logo: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Myntra_Logo.png" },
  
];

export default function Partners() {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = `https://via.placeholder.com/100x50?text=Logo`;
  };

  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8 md:mb-12">
          Our Partners
        </h2>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center p-3 aspect-square"
            >
              <img
                src={partner.logo}
                alt="Partner logo"
                className="w-full h-auto max-h-16 object-contain"
                onError={handleImageError}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}