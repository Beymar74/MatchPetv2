import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, FileText, MessageSquare, CheckCircle } from 'lucide-react';

export default function AdoptionProcess() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white py-16 md:py-24">
      <div className="container mx-auto px-8 md:px-16">

        {/* Top Section: Title, Intro, Side Text */}
        <div className="flex flex-col md:flex-row justify-between mb-12">
          {/* Left: Title and Intro */}
          <div className="md:w-2/3 mb-8 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Conoce el Proceso de Adopción que Manejamos
            </h2>
            <p className="text-lg text-gray-700">
              En MatchPet, buscamos que cada adopción sea especial, responsable y segura. Por eso, seguimos un proceso sencillo pero muy cuidado:
            </p>
          </div>
          {/* Right: Side Text and Button */}
          <div className="md:w-1/3 md:pl-8 text-left md:text-right">
            <p className="text-sm text-gray-600 mb-4">
              Adoptar es más que un acto de amor. Es un compromiso de vida. En MatchPet, estamos aquí para acompañarte en cada paso.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#BF3952] to-[#30588C] hover:from-[#BF3952] hover:to-[#254559] text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Más información
            </Button>
          </div>
        </div>

        {/* Grid layout for the 4 steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Step 1: Explora y elige */}
          <div className="bg-gradient-to-r from-[#6093BF] to-[#254559] p-6 rounded-lg shadow-md text-left transition transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#30588C] mb-4">
              <Search className="w-8 h-8 text-white" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white">Explora y elige</h3>
            <p className="text-sm text-white">
              Encuentra a tu compañero ideal entre las mascotas disponibles. Puedes filtrar por especie, edad, tamaño y compatibilidad.
            </p>
          </div>

          {/* Step 2: Envía tu solicitud */}
          <div className="bg-gradient-to-r from-[#BF3952] to-[#30588C] p-6 rounded-lg shadow-md text-left transition transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#BF3952] mb-4">
              <FileText className="w-8 h-8 text-white" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white">Envía tu solicitud</h3>
            <p className="text-sm text-white">
              Una vez que encuentres a tu match, completa una breve solicitud de adopción para conocerte mejor.
            </p>
          </div>

          {/* Step 3: Evaluación y contacto */}
          <div className="bg-gradient-to-r from-[#254559] to-[#6093BF] p-6 rounded-lg shadow-md text-left transition transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#011526] mb-4">
              <MessageSquare className="w-8 h-8 text-white" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white">Evaluación y contacto</h3>
            <p className="text-sm text-white">
              El refugio revisará tu solicitud y, si todo está en orden, se pondrá en contacto contigo para coordinar una entrevista o visita.
            </p>
          </div>

          {/* Step 4: Adopción y nuevos comienzos */}
          <div className="bg-gradient-to-r from-[#6093BF] to-[#BF3952] p-6 rounded-lg shadow-md text-left transition transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#30588C] mb-4">
              <CheckCircle className="w-8 h-8 text-white" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white">Adopción y nuevos comienzos</h3>
            <p className="text-sm text-white">
              ¡Si todo sale bien, la adopción se concreta! Llevarás a casa a un nuevo miembro de tu familia y comenzarás una nueva aventura.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
