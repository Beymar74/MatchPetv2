// src/app/PaginaPrincipal/ExploreSection.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Users, Gift } from 'lucide-react'; // Example icons
import Link from 'next/link';

export default function ExploreSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        {/* Section Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Explore y Únete a la Familia
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
          Descubre más sobre cómo puedes ayudar y formar parte de nuestra comunidad.          
        </p>

        {/* Grid of Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
          {/* Option 1: Adoptar */}
          <div className="explore-card bg-white p-8 rounded-lg shadow-md border border-gray-200 flex flex-col items-center transition transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 mb-5">
              <Heart className="w-8 h-8 text-pink-600" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Adopta un Amigo</h3>
            <p className="text-gray-600 mb-5 text-sm">Encuentra a tu compañero perfecto y dale un hogar lleno de amor.</p>
            <Link href="/#pets" passHref className="w-full">
              <Button className="bg-pink-500 hover:bg-pink-600 text-white w-full">Ver Mascotas</Button>
            </Link>
          </div>

          {/* Option 2: Voluntariado */}
          <div className="explore-card bg-white p-8 rounded-lg shadow-md border border-gray-200 flex flex-col items-center transition transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-5">
              <Users className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Sé Voluntario</h3>
            <p className="text-gray-600 mb-5 text-sm">Únete a nuestro equipo y ayuda a cuidar a nuestras mascotas y organizar eventos.</p>
            <Link href="/#contact" passHref className="w-full">
              <Button variant="outline" className="w-full border-blue-500 text-blue-600 hover:bg-blue-50">Más Información</Button>
            </Link>
          </div>

          {/* Option 3: Donar */}
          <div className="explore-card bg-white p-8 rounded-lg shadow-md border border-gray-200 flex flex-col items-center transition transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-5">
              <Gift className="w-8 h-8 text-green-600" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Haz una Donación</h3>
            <p className="text-gray-600 mb-5 text-sm">Tu apoyo financiero nos ayuda a proporcionar alimento, refugio y atención médica.</p>
            <Link href="/#donate" passHref className="w-full">
              <Button variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50">Donar Ahora</Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
