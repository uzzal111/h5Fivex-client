"use client";
import Script from 'next/script';
import { useEffect } from 'react';

const CrispChat = () => {
  useEffect(() => {
    const makeDraggable = (element: HTMLElement) => {
      let isDragging = false;
      let offsetX = 0;
      let offsetY = 0;
      let startX = 0;
      let startY = 0;

      const handleTouchStart = (e: TouchEvent) => {
        isDragging = true;
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        offsetX = startX - element.getBoundingClientRect().left;
        offsetY = startY - element.getBoundingClientRect().top;
        element.style.transition = 'none';
        e.preventDefault();
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        const newX = touch.clientX - offsetX;
        const newY = touch.clientY - offsetY;

        // Boundary checks to keep within viewport
        const maxX = window.innerWidth - element.offsetWidth;
        const maxY = window.innerHeight - element.offsetHeight;

        element.style.left = `${Math.min(Math.max(0, newX), maxX)}px`;
        element.style.top = `${Math.min(Math.max(0, newY), maxY)}px`;
        element.style.bottom = 'auto';
        element.style.right = 'auto';
      };

      const handleTouchEnd = () => {
        isDragging = false;
        element.style.transition = 'all 0.3s ease';
      };

      // Add event listeners
      element.addEventListener('touchstart', handleTouchStart, { passive: false });
      element.addEventListener('touchmove', handleTouchMove, { passive: false });
      element.addEventListener('touchend', handleTouchEnd);
      element.addEventListener('touchcancel', handleTouchEnd);

      return () => {
        element.removeEventListener('touchstart', handleTouchStart);
        element.removeEventListener('touchmove', handleTouchMove);
        element.removeEventListener('touchend', handleTouchEnd);
        element.removeEventListener('touchcancel', handleTouchEnd);
      };
    };

    const adjustCrispPosition = () => {
      if (typeof window !== 'undefined') {
        const crispButton = document.querySelector('.crisp-client') as HTMLElement;

        if (crispButton) {
          if (window.innerWidth < 768) {
            // Mobile - make draggable
            crispButton.style.position = 'fixed';
            crispButton.style.width = '60px';
            crispButton.style.height = '60px';
            crispButton.style.zIndex = '9999';
            crispButton.style.opacity = '1';
            crispButton.style.visibility = 'visible';
            crispButton.style.transform = 'none';
            crispButton.style.touchAction = 'none';
            crispButton.style.cursor = 'move';
            crispButton.style.transition = 'all 0.3s ease';

            // Set initial position if not already set
            if (!crispButton.dataset.initialized) {
              crispButton.style.bottom = '80px'; // Customize initial bottom position
              crispButton.style.right = '20px';  // Customize initial right position
              crispButton.dataset.initialized = 'true';
            }

            // Make it draggable
            makeDraggable(crispButton);
          } else {
            // Desktop - fixed position
            crispButton.style.position = 'fixed';
            crispButton.style.bottom = '24px';
            crispButton.style.right = '24px';
            crispButton.style.left = 'auto';
            crispButton.style.top = 'auto';
            crispButton.style.width = '';
            crispButton.style.height = '';
          }
        }
      }
    };

    const interval = setInterval(() => {
      if (document.querySelector('.crisp-client')) {
        clearInterval(interval);
        adjustCrispPosition();
      }
    }, 100);

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
        __html: `window.$crisp = [];
        window.CRISP_WEBSITE_ID = "c0eba656-d32d-4db5-a99c-346afc39caad";
        (function() {
          var d = document;
          var s = d.createElement("script");
          s.src = "https://client.crisp.chat/l.js";
          s.async = 1;
          d.getElementsByTagName("head")[0].appendChild(s);
        })();`,
      }}
    />
  );
};

export default CrispChat;
