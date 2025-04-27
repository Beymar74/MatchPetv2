"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section
        className="hero-section relative overflow-hidden py-24 md:py-32 lg:py-48 flex items-center justify-center"
        style={{
          background: "linear-gradient(145deg, #BF3952, #D94676)",
          color: "white",
        }}
      >
        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between">
          <div className="hero-text text-center md:text-left mb-8 md:mb-0">
            <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4">
              Encuentra tu huellita compatible
            </h1>
            <p className="hero-subtitle text-lg sm:text-xl md:text-2xl mb-6">
              Conecta con tu compañero ideal a través de nuestra plataforma de
              compatibilidad. Conecta con tu compañero ideal y descubre la
              felicidad de adoptar.
            </p>
            <Button className="cta-button bg-teal-500 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-full">
              Comienza Ahora
            </Button>
          </div>
          <div className="hero-image w-full md:w-1/2 lg:w-auto">
            <Image
              src="https://picsum.photos/id/237/500/400"
              width={500}
              height={400}
              alt="Perro Adoptable"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Adoption Process Section */}
      <section className="process-section py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Conoce el Proceso de Adopción que Manejamos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="process-item text-center bg-pink-100 p-8 rounded-lg shadow-md">
              <Image
                src="https://picsum.photos/id/1025/50/50"
                width={50}
                height={50}
                alt="Paso 1"
                className="mx-auto mb-4 rounded-full"
              />
              <h3 className="text-xl font-semibold mb-2">Deja tu solicitud</h3>
              <p className="text-gray-700">
                Realiza tu solicitud de adopción completando nuestro formulario
                online.
              </p>
            </div>
            <div className="process-item text-center bg-pink-100 p-8 rounded-lg shadow-md">
              <Image
                src="https://picsum.photos/id/1074/50/50"
                width={50}
                height={50}
                alt="Paso 2"
                className="mx-auto mb-4 rounded-full"
              />
              <h3 className="text-xl font-semibold mb-2">
                Revisión de solicitud
              </h3>
              <p className="text-gray-700">
                Revisamos tu solicitud para asegurar que todo esté correcto.
              </p>
            </div>
            <div className="process-item text-center bg-pink-100 p-8 rounded-lg shadow-md">
              <Image
                src="https://picsum.photos/id/1005/50/50"
                width={50}
                height={50}
                alt="Paso 3"
                className="mx-auto mb-4 rounded-full"
              />
              <h3 className="text-xl font-semibold mb-2">Adopción exitosa</h3>
              <p className="text-gray-700">
                Una vez aceptada, ¡podrás llevarte a tu nueva mascota!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Adoptable Pets Section */}
      <section className="pets-section py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Nuestras Mascotas Adoptables
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Pet Card 1 */}
            <div className="pet-card bg-white p-6 rounded-lg shadow-md">
              <Image
                src="https://picsum.photos/id/238/400/300"
                width={400}
                height={300}
                alt="Mascota 1"
                className="w-full h-52 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Fido</h3>
              <p className="text-gray-600 mb-4">Joven, Pequeño</p>
              <Button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-full">
                Adoptar
              </Button>
            </div>
            {/* Pet Card 2 */}
            <div className="pet-card bg-white p-6 rounded-lg shadow-md">
              <Image
                src="https://picsum.photos/id/181/400/300"
                width={400}
                height={300}
                alt="Mascota 2"
                className="w-full h-52 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Whiskers</h3>
              <p className="text-gray-600 mb-4">Adulto, Mediano</p>
              <Button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-full">
                Adoptar
              </Button>
            </div>
            {/* Pet Card 3 */}
            <div className="pet-card bg-white p-6 rounded-lg shadow-md">
              <Image
                src="https://picsum.photos/id/593/400/300"
                width={400}
                height={300}
                alt="Mascota 3"
                className="w-full h-52 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Buddy</h3>
              <p className="text-gray-600 mb-4">Adulto, Grande</p>
              <Button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-full">
                Adoptar
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Heart-Filling Stats Section */}
      <section className="stats-section py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Cifras que Llenan el Corazón
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="stat-card bg-pink-100 text-center p-8 rounded-lg shadow-md">
              <h3 className="text-4xl font-bold mb-4">100+</h3>
              <p className="text-gray-700">Adopciones realizadas</p>
            </div>
            <div className="stat-card bg-pink-100 text-center p-8 rounded-lg shadow-md">
              <h3 className="text-4xl font-bold mb-4">50+</h3>
              <p className="text-gray-700">Mascotas disponibles</p>
            </div>
            <div className="stat-card bg-pink-100 text-center p-8 rounded-lg shadow-md">
              <h3 className="text-4xl font-bold mb-4">10+</h3>
              <p className="text-gray-700">Refugios registrados</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer
        className="bg-blue-400 py-8 text-white text-center"
        style={{ backgroundColor: "#4A90E2" }}
      >
        <div className="container mx-auto px-4">
          <div className="footer-logo text-2xl font-bold mb-4">
            MatchPet
          </div>
          <div className="footer-links flex justify-center gap-6 mb-4">
            <a href="#contacto" className="hover:text-gray-200">
              Contacto
            </a>
            <a href="#terminos" className="hover:text-gray-200">
              Términos
            </a>
            <a href="#politica" className="hover:text-gray-200">
              Política
            </a>
          </div>
          <div className="footer-social flex justify-center gap-5">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200"
            >
              Facebook
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200"
            >
              Twitter
            </a>
          </div>
          <div className="footer-text mt-6 text-sm">
            &copy; {new Date().getFullYear()} MatchPet. Todos los derechos
            reservados.
          </div>
        </div>
      </footer>
    </main>
  );
}
