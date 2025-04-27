'use client';

import React from 'react';
import { ArrowRight, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Miembros de la comunidad
const communityMembers = [
  { name: 'Dr. Jenny Wilson', experience: '20+ Years Experience', image: '/path/to/image.jpg' },
  { name: 'Dr. Jane Cooper', experience: '20+ Years Experience', image: '/path/to/image.jpg' },
  { name: 'Dr. Jacob Jones', experience: '20+ Years Experience', image: '/path/to/image.jpg' },
  { name: 'Dr. Guy Hawkins', experience: '20+ Years Experience', image: '/path/to/image.jpg' },
];

const filters = ['Adoptantes', 'Gatos', 'Perros', 'Refugios'];

export default function CommunitySection() {
  const [activeFilter, setActiveFilter] = React.useState('Adoptantes');

  return (
    <section className="min-h-screen flex flex-col justify-center px-8 md:px-16 py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto flex flex-col space-y-12">

        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Conoce a Nuestra Comunidad
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Aquí podrás conocer a quienes forman parte de esta hermosa comunidad: adoptantes, mascotas esperando un hogar y refugios que cambian vidas.
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center flex-wrap gap-4">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? 'default' : 'outline'}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition duration-200 ${
                activeFilter === filter
                  ? 'bg-[#BF3952] text-white border-[#BF3952] hover:bg-[#BF3952]'
                  : 'bg-white text-[#30588C] border-[#30588C] hover:bg-[#30588C] hover:text-white'
              }`}
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Community Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {communityMembers.map((member, index) => (
            <div
              key={index}
              className="bg-[#6093BF] rounded-2xl overflow-hidden shadow-md border border-[#30588C] group transition duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="bg-[#254559] aspect-[4/3] flex items-center justify-center">
                {/* Placeholder removido, ahora con imagen */}
                <img src={member.image} alt={member.name} className="w-16 h-16 rounded-full object-cover" />
              </div>
              <div className="p-4 bg-gray-50 border-t border-[#30588C] flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm mb-1">
                    {member.name}
                  </h4>
                  <div className="flex items-center text-xs text-gray-500">
                    <Briefcase className="w-3 h-3 mr-1" />
                    {member.experience}
                  </div>
                </div>
                <button className="bg-[#30588C] hover:bg-[#254559] rounded-full p-2 transition duration-300 flex-shrink-0">
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
