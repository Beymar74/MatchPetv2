// src/app/layout.tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header'; // Import Header
import Footer from '@/components/layout/Footer'; // Import Footer

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MatchPet - Encuentra tu compañero ideal', // Updated Title
  description: 'Adopta una mascota y cambia una vida. Conecta con refugios y adoptantes.', // Updated Description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      {/* Removed whitespace between <html> and <body> */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}> {/* Added flex classes for sticky footer */}
        <Header /> {/* Add Header */}
        <main className="flex-grow"> {/* Added flex-grow to push footer down */}
            {children}
        </main>
        <Footer /> {/* Add Footer */}
      </body>
    </html>
  );
}
