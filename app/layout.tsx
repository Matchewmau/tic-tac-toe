import type { Metadata } from 'next';
import { Cinzel, Inter } from 'next/font/google';
import { Background } from '@/components/Background';
import './globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Zelda Tic-Tac-Toe',
  description: 'A forest-themed tic-tac-toe adventure.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-body">
        <Background />
        {children}
      </body>
    </html>
  );
}
