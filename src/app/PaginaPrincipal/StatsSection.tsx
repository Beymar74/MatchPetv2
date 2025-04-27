import React from 'react';
import { Heart, Home, Users, Target } from 'lucide-react'; // Example icons
import 'react-circular-progressbar/dist/styles.css'; // Ensure this is imported if needed

// Dummy stats data - replace with actual data
const stats = [
  {
    value: '1,200+',
    label: 'Mascotas Adoptadas',
    icon: Heart,
    description: "Cada mascota adoptada significa una vida transformada.",
    percentage: 80, // Percentage of progress
    progressColor: '#BF3952' // Dingy Dungeon
  },
  {
    value: '50+',
    label: 'Refugios Asociados',
    icon: Home,
    description: "Más de 50 refugios que nos ayudan a encontrar hogares para las mascotas.",
    percentage: 65,
    progressColor: '#30588C' // B'dazzled Blue
  },
  {
    value: '5,000+',
    label: 'Miembros de la Comunidad',
    icon: Users,
    description: "Una comunidad comprometida que crece cada día.",
    percentage: 90,
    progressColor: '#6093BF' // Silver Lake Blue
  },
  {
    value: '1,000+',
    label: 'Historias de Éxito',
    icon: Target,
    description: "Miles de historias felices gracias a nuestros esfuerzos conjuntos.",
    percentage: 75,
    progressColor: '#254559' // Japanese Indigo
  },
];

export default function StatsSection() {  
  return (
    <section className="min-h-screen py-16 md:py-24 bg-gradient-to-r from-[#30588C] via-[#6093BF] to-[#254559] text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Cifras que llenan el corazón
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-item bg-white rounded-2xl overflow-hidden shadow-md border border-[#30588C] group transition duration-300 hover:shadow-xl p-6 transform group-hover:scale-105"
            >
              <div className="flex justify-center mb-3">
                <stat.icon className="w-16 h-16 text-gray-800 transition-transform transform group-hover:scale-110" strokeWidth={1.5} />
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2 text-gray-900">{stat.value}</div>
              <div className="text-base md:text-lg font-medium text-gray-700 mb-2">{stat.label}</div>
              <p className="text-sm text-gray-600 mb-4">{stat.description}</p>

              {/* Barra de progreso con porcentaje */}
              <div className="w-full bg-gray-300 rounded-full h-2.5 mb-4">
                <div
                  className="h-2.5 rounded-full transition-all duration-1000"
                  style={{
                    width: `${stat.percentage}%`,
                    backgroundColor: stat.progressColor,
                  }}
                >
                  <span className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 text-white text-xs font-semibold">
                    {stat.percentage}%
                  </span>
                </div>
              </div>

              <div className="mt-2">
                <button className="bg-gradient-to-r from-[#BF3952] to-[#30588C] text-white border border-gray-300 hover:bg-gray-600 rounded-full py-2 px-6 transition duration-300 transform hover:scale-105">
                  Más información
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
