import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Users, Gift } from 'lucide-react'; // Example icons
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-16 bg-white text-gray-800">
      <div className="container mx-auto flex flex-col space-y-8 md:flex-row md:space-x-12 md:space-y-0 items-center">
        
        {/* Left Column: Text and Buttons */}
        <div className="md:w-1/2 lg:w-3/5 text-center md:text-left">
          <span className="inline-block bg-pink-100 text-pink-600 text-sm font-semibold px-4 py-1 rounded-full mb-4">
            ¡Bienvenido a MatchPet!
            </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            ¿Listo para cambiar una vida... o dos? <br /> ¡Únete hoy!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Donde cada historia comienza con un encuentro especial. ✨
            Explora, conecta y encuentra el compañero perfecto: ya sea
            adoptando una mascota o ayudando a que más corazones se unan.
          </p>
          <div className="flex flex-col items-center mx-auto space-y-4 md:flex-row md:justify-start md:space-x-4 md:space-y-0">
            {/* Botón para registrarse */}
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
              Únete ahora
            </Button>
            {/* Botón para Iniciar Sesión con un efecto de hover mejorado */}
            <Button 
              variant="outline" 
              size="lg" 
              className="border-gray-400 text-gray-700 hover:bg-gray-300 hover:border-gray-500 font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:text-gray-900"
            >
              Iniciar Sesion
            </Button>
          </div>
        </div>

        {/* Right Column: Icon Grid */}
        <div className="md:w-1/2 lg:w-2/5 grid grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-gray-200 rounded-3xl aspect-square flex items-center justify-center p-4">
            <Heart className="w-6 h-6 text-gray-400" strokeWidth={1} />
          </div>
          <div className="bg-gray-200 rounded-full aspect-square flex items-center justify-center p-4">
            <Users className="w-6 h-6 text-gray-400" strokeWidth={1} />
          </div>
          <div className="bg-gray-200 rounded-3xl aspect-square flex items-center justify-center p-4">
            <Gift className="w-6 h-6 text-gray-400" strokeWidth={1} />
          </div>
          <div className="bg-gray-200 rounded-3xl aspect-square flex items-center justify-center">
            <Heart className="w-6 h-6 text-gray-400" strokeWidth={1} />
          </div>
        </div>

      </div>
    </section>
  );
}
