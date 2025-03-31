'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Cookies from 'js-cookie';

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const trackPageView = async () => {
      try {
        // Get existing session ID from cookies
        const existingSessionId = Cookies.get('session_id');

        const response = await fetch('/api/analytics/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            path: pathname,
            sessionId: existingSessionId
          })
        });

        const data = await response.json();
        
        // If we got a new session ID, save it
        if (data.sessionId) {
          Cookies.set('session_id', data.sessionId, { 
            expires: 1/48, // 30 minutes
            path: '/',
            sameSite: 'strict'
          });
        }
      } catch (error) {
        console.error('Failed to track page view:', error);
      }
    };

    trackPageView();
  }, [pathname]);

  return null;
} 