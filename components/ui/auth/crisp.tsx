// components/CrispChat.tsx
'use client';

import { useEffect } from 'react';

const CrispChat = () => {
  useEffect(() => {
    // Initialize Crisp
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "c0eba656-d32d-4db5-a99c-346afc39caad"; // Replace with your ID

    // Create and inject custom CSS
    const style = document.createElement('style');
    style.innerHTML = `
      #crisp-chatbox {
        bottom: auto !important;
        top: 20px !important;
        right: 20px !important;
        width: 50px !important;
        height: 50px !important;
        border-radius: 50% !important;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1) !important;
      }
      #crisp-chatbox svg {
        width: 24px !important;
        height: 24px !important;
      }
      @media (max-width: 768px) {
        #crisp-chatbox {
          top: 15px !important;
          right: 15px !important;
          width: 45px !important;
          height: 45px !important;
        }
      }
    `;
    document.head.appendChild(style);

    // Load Crisp script
    const script = document.createElement('script');
    script.src = 'https://client.crisp.chat/l.js';
    script.async = true;
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      // Remove Crisp script
      const crispScript = document.querySelector('script[src="https://client.crisp.chat/l.js"]');
      if (crispScript) crispScript.remove();

      // Remove custom style
      const styles = document.querySelectorAll('style');
      styles.forEach((styleTag) => {
        if (styleTag.innerHTML.includes('crisp-chatbox')) {
          styleTag.remove();
        }
      });

    };
  }, []);

  return null;
};

export default CrispChat;