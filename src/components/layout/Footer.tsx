import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter } from 'lucide-react'; // Example social icons

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-300 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          {/* Logo and Copyright */}
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center justify-center md:justify-start mb-2">
              <Image src="/Logo.png" alt="MatchPet Logo" width={150} height={150} /> {/* Slightly larger logo */}
              {/* <span className="ml-2 text-lg font-semibold text-white">MatchPet</span> */}
            </Link>
            <p className="text-sm">&copy; {currentYear} MatchPet. Todos los derechos reservados.</p>
          </div>

          {/* Quick Links (Optional) */}
          <div className="mb-6 md:mb-0">
            <h4 className="font-semibold text-white mb-2">Enlaces Rápidos</h4>
            <ul className="space-y-1 text-sm">
              <li><Link href="/" className="hover:text-white transition">Principal</Link></li>
              <li><Link href="/#about" className="hover:text-white transition">Sobre Nosotros</Link></li>
              <li><Link href="/#pets" className="hover:text-white transition">Mascotas</Link></li>
              <li><Link href="/#contact" className="hover:text-white transition">Contáctanos</Link></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h4 className="font-semibold text-white mb-2">Síguenos</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link href="#" className="hover:text-white transition transform hover:scale-110">
                <Facebook size={24} />
              </Link>
              <Link href="#" className="hover:text-white transition transform hover:scale-110">
                <Instagram size={24} />
              </Link>
              <Link href="#" className="hover:text-white transition transform hover:scale-110">
                <Twitter size={24} />
              </Link>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <Link href="/join" className="bg-purple-600 text-white py-2 px-6 rounded-full hover:bg-purple-700 transition duration-300">
            Únete a nuestra comunidad
          </Link>
        </div>
      </div>
    </footer>
  );
}
