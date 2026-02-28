import type { Metadata } from 'next';
import './globals.css';
import { TopNav } from '@/components/layout/TopNav';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'JusticeCourse Learning App',
  description: 'DataCamp-style interactive history learning platform.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50">
        <TopNav />
        <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
