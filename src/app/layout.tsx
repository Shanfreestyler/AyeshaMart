import '../styles/globals.css';
import localFont from 'next/font/local';
import ErrorBoundary from '@/components/ErrorBoundary';
import Script from 'next/script';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { Suspense } from 'react';

// Self-hosted Inter (variable) — avoids a build-time fetch to Google Fonts.
const inter = localFont({
  src: './fonts/inter-variable.woff2',
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'QurbaniHub',
  description: 'Premium Online Cattle Marketplace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body>
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
