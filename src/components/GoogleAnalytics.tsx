'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!window.gtag) return;

    const url = pathname + searchParams.toString();
    window.gtag('config', 'G-XXXXXXXXXX', {
      page_path: url,
    });
  }, [pathname, searchParams]);

  return null;
}

// TypeScript declaration for window.gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'set',
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}
