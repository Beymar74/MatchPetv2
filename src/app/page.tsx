"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-background">
      {/* Hero Section (Primera Pantalla Principal) */}
      <section className="hero-section relative overflow-hidden py-24 md:py-32 lg:py-48 flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-500 text-white text-center">
        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-center">
          <div className="text-container mr-8">
            <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4">
              ¡Bienvenido a MatchPet!
            </h1>
            <h2 className="hero-subtitle text-2xl sm:text-3xl mb-6">
              ¿Listo para cambiar una vida... o dos? ¡Únete hoy!
            </h2>
            <p className="hero-description text-lg sm:text-xl mb-8 text-gray-300">
              Donde cada historia comienza con un encuentro especial.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="cta-button bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-full">
                Más Información
              </Button>
              <Button className="cta-button bg-red-400 hover:bg-red-500 text-white font-bold py-3 px-8 rounded-full">
                Iniciar Sesión
              </Button>
            </div>
          </div>

          <div className="image-container rounded-lg shadow-md">
            <Image
              src="https://picsum.photos/id/237/400/300"
              width={400}
              height={300}
              alt="Mascota"
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* Sobre Nosotros (Segunda Subpantalla) */}
      <section className="about-us-section py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Sobre Nosotros
          </h2>
          <p className="text-gray-700 text-lg mb-4">
            En MatchPet, creemos que cada mascota merece un hogar lleno de amor
            y que cada persona merece encontrar a su compañero perfecto.
          </p>
          <p className="text-gray-700 text-lg mb-4">
            Nacimos con la misión de conectar corazones: unir a mascotas
            rescatadas con adoptantes responsables de forma fácil, segura y
            llena de esperanza.
          </p>
          <p className="text-gray-700 text-lg">
            Trabajamos junto a refugios y asociaciones, usando tecnología que
            mejora las coincidencias y agiliza el proceso de adopción.
          </p>
        </div>
      </section>

      {/* Proceso de Adopción (Tercera Subpantalla) */}
      <section className="adoption-process-section py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Conoce el Proceso de Adopción que Manejamos
          </h2>
          <p className="text-gray-700 text-lg text-center mb-8">
            En MatchPet, buscamos que cada adopción sea especial, responsable y
            segura. Por eso, seguimos un proceso sencillo pero muy cuidado:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="process-step text-center p-6 rounded-lg shadow-md bg-white">
              <h3 className="text-xl font-semibold mb-2">Explora y elige</h3>
              <p className="text-gray-600">
                Encuentra a tu compañero ideal entre las mascotas disponibles.
              </p>
            </div>

            <div className="process-step text-center p-6 rounded-lg shadow-md bg-white">
              <h3 className="text-xl font-semibold mb-2">
                Envía tu solicitud
              </h3>
              <p className="text-gray-600">
                Una vez que encuentres a tu match, completa una breve solicitud
                de adopción.
              </p>
            </div>

            <div className="process-step text-center p-6 rounded-lg shadow-md bg-white">
              <h3 className="text-xl font-semibold mb-2">
                Evaluación y contacto
              </h3>
              <p className="text-gray-600">
                El refugio revisará tu solicitud y se pondrá en contacto para
                coordinar una entrevista.
              </p>
            </div>

            <div className="process-step text-center p-6 rounded-lg shadow-md bg-white">
              <h3 className="text-xl font-semibold mb-2">
                Adopción y nuevos comienzos
              </h3>
              <p className="text-gray-600">
                Si todo sale bien, ¡la adopción se concreta y llevas a casa a tu
                nuevo miembro de la familia!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestras Mascotas Adoptables (Cuarta Subpantalla) */}
      <section className="pets-section py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Nuestras Mascotas Adoptables
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="pet-card bg-white p-6 rounded-lg shadow-md">
              <Image
                src="https://picsum.photos/id/238/400/300"
                width={400}
                height={300}
                alt="Pelusa"
                className="w-full h-52 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Pelusa</h3>
              <p className="text-gray-600 mb-4">Juguetón, Joven</p>
              <Button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-full">
                Adoptar
              </Button>
            </div>

            <div className="pet-card bg-white p-6 rounded-lg shadow-md">
              <Image
                src="https://picsum.photos/id/181/400/300"
                width={400}
                height={300}
                alt="Kuro"
                className="w-full h-52 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Kuro</h3>
              <p className="text-gray-600 mb-4">Tranquilo, Macho</p>
              <Button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-full">
                Adoptar
              </Button>
            </div>
            {/* Agregar más tarjetas de mascotas */}
          </div>
        </div>
      </section>

      {/* Comunidad (Quinta Subpantalla) */}
      <section className="community-section py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Conoce a Nuestra Comunidad
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="community-member bg-white p-6 rounded-lg shadow-md">
              <Image
                src="https://picsum.photos/id/1005/400/300"
                width={400}
                height={300}
                alt="Dr. Jenny Wilson"
                className="w-full h-52 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Dr. Jenny Wilson</h3>
              <p className="text-gray-600">+20 años de experiencia</p>
            </div>
            <div className="community-member bg-white p-6 rounded-lg shadow-md">
              <Image
                src="https://picsum.photos/id/1074/400/300"
                width={400}
                height={300}
                alt="Dr. Jane Cooper"
                className="w-full h-52 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Dr. Jane Cooper</h3>
              <p className="text-gray-600">+20 años de experiencia</p>
            </div>
            {/* Agregar más miembros de la comunidad */}
          </div>
        </div>
      </section>

      {/* Cifras que Llenan el Corazón (Sexta Subpantalla) */}
      <section className="stats-section py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Cifras que llenan el corazón
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

      {/* Explora y Únete a la Familia (Séptima Subpantalla) */}
      <section className="explore-section py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-8">
            Explora, conecta y sé parte de esta gran familia que transforma
            corazones
          </h2>
          <Button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-full">
            Comenzar
          </Button>
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
