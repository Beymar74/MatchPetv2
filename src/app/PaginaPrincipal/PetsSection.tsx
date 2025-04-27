'use client';

import React, { useState } from 'react';
import { Image as ImageIcon, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const pets = [
  { name: 'Pelusa', tags: ['Jugueton', 'Joven'], selected: false, imagePlaceholder: true },
  { name: 'Kuro',   tags: ['Tranquilo', 'Macho'], selected: false,  imagePlaceholder: true },
  { name: 'Iker',   tags: ['Casa con Patio', 'Adulto'], selected: false, imagePlaceholder: true },
  { name: 'Susanita', tags: ['Energica', 'Hembra'],   selected: false, imagePlaceholder: true },
];

const featuredPet = {
  name: 'Destructor de Mundos',
  imagePlaceholder: true,
};

export default function PetsSection() {
  const [selectedPet, setSelectedPet] = useState<string | null>(null);

  const handleSelectPet = (petName: string) => {
    setSelectedPet(petName === selectedPet ? null : petName); // Deselect if already selected
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-12 md:px-8 md:py-16 bg-gradient-to-r from-[#30588C] via-[#6093BF] to-[#254559] text-white">
      <div className="container mx-auto flex flex-col gap-6 md:gap-8 lg:flex-row lg:gap-12">

        {/* Featured Pet (Left Column) */}
        <div className="lg:w-1/2 relative rounded-xl overflow-hidden bg-gray-200 aspect-[4/3] flex items-center justify-center">
         {featuredPet.imagePlaceholder && (
            <ImageIcon className="w-24 h-24 text-gray-400" strokeWidth={1} />
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent p-4 flex justify-between items-center">
            <h3 className="text-white text-xl md:text-2xl font-semibold">
              {featuredPet.name}
            </h3>
            <button className="bg-white/90 hover:bg-white rounded-full p-2 transition duration-300">
              <ArrowRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Pets List (Right Column) */}
        <div className="lg:w-1/2 ">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-white">
           Mascotas Adoptables
          </h2>
          <div className="flex flex-col gap-4">
            {pets.map((pet) => (
              <div
                key={pet.name}
                className={`flex items-center p-3 rounded-xl border transition duration-300 transform ${
                  selectedPet === pet.name
                    ? 'bg-gradient-to-r from-[#BF3952] to-[#30588C] border-[#30588C] shadow-xl hover:scale-103 text-white'
                    : 'bg-white border-gray-200 hover:bg-gray-50 hover:shadow-lg hover:border-[#30588C] hover:scale-103 text-gray-800'
                }`}
                onClick={() => handleSelectPet(pet.name)}
              >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-200 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  {pet.imagePlaceholder && (
                    <ImageIcon className="w-6 h-6 text-gray-400" strokeWidth={1} />
                  )}
                </div>
                <div className="flex-grow">
                  {/* Here we change the text color based on selection */}
                  <h4 className={`font-semibold text-base md:text-lg mb-1 ${selectedPet === pet.name ? 'text-white' : 'text-gray-800'}`}>
                    {pet.name}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {pet.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs font-medium bg-white border-gray-300 text-gray-600"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>                
                <button className="bg-[#30588C] hover:bg-[#254559] rounded-full p-2 transition duration-300 flex-shrink-0">
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
