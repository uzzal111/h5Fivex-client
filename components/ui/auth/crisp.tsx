"use client";
import Script from 'next/script';
import { useEffect } from 'react';

const CrispChat = () => {
  useEffect(() => {
    const adjustCrispPosition = () => {
      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        const crispButton = document.querySelector('.crisp-client') as HTMLElement;

        if (crispButton) {
          // Position the chat icon higher by adjusting the bottom value
          crispButton.style.position = 'fixed'; // Ensure it's fixed in place
          crispButton.style.bottom = '120px';  // Move the chat button higher, you can change 120px to any value that suits your need
          crispButton.style.right = '16px';    // Keep it to the right
          crispButton.style.width = '48px';    // Adjust size
          crispButton.style.height = '48px';   // Adjust size
          crispButton.style.zIndex = '900';    // Ensure it's on top of other elements
          crispButton.style.opacity = '1';     // Make sure it's fully visible
          crispButton.style.visibility = 'visible'; // Ensure visibility
          crispButton.style.transform = 'none';  // Prevent any transformations
        }
      }
    };

    // Wait until the Crisp button is loaded and then adjust its position
    const interval = setInterval(() => {
      if (document.querySelector('.crisp-client')) {
        clearInterval(interval);
        adjustCrispPosition();
      }
    }, 100);

    // Adjust positioning on window resize
    window.addEventListener('resize', adjustCrispPosition);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', adjustCrispPosition);
    };
  }, []);

  return (
    <Script
      id="crisp-chat"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `
          window.$crisp = [];
          window.CRISP_WEBSITE_ID = "c0eba656-d32d-4db5-a99c-346afc39caad";
          (function() {
            var d = document;
            var s = d.createElement("script");
            s.src = "https://client.crisp.chat/l.js";
            s.async = 1;
            d.getElementsByTagName("head")[0].appendChild(s);
          })();
        `,
      }}
    />
  );
};

export default CrispChat;
