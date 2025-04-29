import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Header() {
  const navItems = [
    { name: 'Principal', href: '/' },
    { name: 'Sobre nosotros', href: '/#about' },
    { name: 'Proceso de Adopción', href: '/#process' },
    { name: 'Mascotas', href: '/#pets' },
    { name: 'Refugios', href: '/#shelters' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/logo1.png" alt="MatchPet Logo" width={50} height={50} />
        </Link>

        {/* Navigation Links (Hidden on small screens, shown on medium+) */}
        <ul className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href} className="text-gray-600 hover:text-pink-500 transition duration-200">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login" passHref>
            <Button variant="outline" className="border-gray-400 text-gray-700 hover:bg-gray-100">
              Iniciar sesión
            </Button>
          </Link>
          <Link href="/register" passHref>
            <Button className="bg-pink-500 text-white hover:bg-pink-600">
              Registrarse
            </Button>
          </Link>
        </div>

        <div className="md:hidden">
          <Button variant="ghost" size="icon">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </Button>
        </div>
      </nav>
    </header>
  );
}
