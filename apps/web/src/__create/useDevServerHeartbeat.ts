'use client';

import { useEffect } from 'react';

export function useDevServerHeartbeat() {
  useEffect(() => {
    // Only run this in development and on the client
    if (process.env.NODE_ENV !== 'development' || typeof window === 'undefined') {
      return;
    }

    const THROTTLE_MS = 60_000 * 3;
    let lastPulse = 0;

    const pulse = () => {
      const now = Date.now();
      if (now - lastPulse < THROTTLE_MS) {
        return;
      }
      lastPulse = now;

      // HACK: at time of writing, we run the dev server on a proxy url that
      // when requested, ensures that the dev server's life is extended.
      fetch('/', {
        method: 'GET',
      }).catch(() => {
        // no-op
      });
    };

    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    events.forEach((name) => window.addEventListener(name, pulse, { passive: true }));

    return () => {
      events.forEach((name) => window.removeEventListener(name, pulse));
    };
  }, []);
}
