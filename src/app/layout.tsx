import '../styles/globals.css';
import localFont from 'next/font/local';

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
      <body>{children}</body>
    </html>
  );
}
