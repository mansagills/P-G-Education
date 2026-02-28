import type { Metadata } from 'next';
import './globals.css';
import { AppNav } from '@/components/layout/AppNav';

export const metadata: Metadata = {
  title: 'JusticeCourse Studio',
  description: 'Interactive course builder foundation for history education.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppNav />
        <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
