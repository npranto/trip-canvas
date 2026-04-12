import type { Metadata } from 'next';
import { Geist_Mono, Inter } from 'next/font/google';
import { AppShell } from '@/components/layout/AppShell';

import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const defaultTitle = 'TripCanvas';
const title = process.env.PROJECT_NAME?.trim() || defaultTitle;

export const metadata: Metadata = {
  title,
  description:
    'AI-native travel planning: turn natural-language trip requests into structured, editable plans with itineraries, recommendations, and clear confidence states.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
