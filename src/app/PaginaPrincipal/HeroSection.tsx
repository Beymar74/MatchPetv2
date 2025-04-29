import React from 'react';
import { Button } from '@/components/ui/button'; // Asegúrate que la ruta sea correcta
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  // Array de imágenes para la cuadrícula
  const images = [
    { src: "/14 superniedliche Fotos von Freundschaften zwischen Hund und Katze.jpg", alt: "Perro y gato amigos" },
    { src: "/20 Imágenes para recordar lo afortunado que eres al tener una mascota.jpg", alt: "Niño abrazando a un perro" },
    { src: "/598161c1-f7e7-4029-b045-eb4b0ff02d8d.jpg", alt: "Gatitos y cachorro juntos" },
    { src: "/3463855f-c8de-49c3-b291-3b8a9480b43b.jpg", alt: "Perro y niño en un coche" }
  ];

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
            <Button 
              asChild // Recomendado si usas Link dentro de Button con Shadcn UI
              size="lg" 
              className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              {/* Asumiendo que quieres que este botón lleve a una página de registro */}
              <Link href="/registro">Únete ahora</Link> 
            </Button>
            {/* Botón para Iniciar Sesión */}
            <Button
              asChild // Recomendado si usas Link dentro de Button con Shadcn UI
              variant="outline"
              size="lg"
              className="border-gray-400 text-gray-700 hover:bg-gray-300 hover:border-gray-500 font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:text-gray-900"
            >
              {/* Asumiendo que quieres que este botón lleve a una página de inicio de sesión */}
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
          </div>
        </div>

        {/* Right Column: Image Grid - Improved Styling */}
        <div className="md:w-1/2 lg:w-2/5 grid grid-cols-2 gap-4 sm:gap-6">
          {images.map((image, index) => (
            <Link
              href="#" // Puedes cambiar esto a una ruta específica si cada imagen debe enlazar a algún lugar
              key={index}
              className="group block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out aspect-square" 
            >
              <Image
                src={image.src}
                alt={image.alt} // Usando el alt text del array
                width={500}
                height={500}
                className='object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out' // Efecto zoom en hover
                priority={index < 2} // Opcional: Prioriza la carga de las primeras imágenes (LCP)
              />
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}