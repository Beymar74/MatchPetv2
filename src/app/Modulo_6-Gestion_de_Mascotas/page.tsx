'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';

interface Mascota {
  id: string;
  nombre: string;
  especie: string;
  raza: string;
  edad: number;
  estado: string;
  descripcion: string;
  foto: string;
}

const mockMascotas: Mascota[] = [
  {
    id: '1',
    nombre: 'Luna',
    especie: 'Perro',
    raza: 'Labrador',
    edad: 3,
    estado: 'Disponible',
    descripcion: 'Luna es amigable y le encanta jugar.',
    foto: 'https://place-puppy.com/300x300',
  },
  {
    id: '2',
    nombre: 'Milo',
    especie: 'Gato',
    raza: 'Persa',
    edad: 2,
    estado: 'Adoptado',
    descripcion: 'Milo es tranquilo y cariñoso.',
    foto: 'https://placekitten.com/300/300',
  },
  {
    id: '3',
    nombre: 'Toby',
    especie: 'Perro',
    raza: 'Beagle',
    edad: 4,
    estado: 'En tratamiento',
    descripcion: 'Toby se está recuperando de una lesión.',
    foto: 'https://place-puppy.com/301x301',
  },
];

export default function GestionMascotas() {
  const [mascotas, setMascotas] = useState<Mascota[]>(mockMascotas);
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState<Mascota | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Header />

      <main className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Gestión de Mascotas</h1>
        <p className="mb-6 text-lg">Selecciona una funcionalidad:</p>

        {/* Menú de funcionalidades */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          <Link href="/Modulo_6-Gestion_de_Mascotas/registrar">
            <div className="bg-indigo-600 text-white p-4 rounded shadow hover:shadow-lg transition cursor-pointer font-semibold text-center">
              ➕ Registrar Nueva Mascota
            </div>
          </Link>

          <Link href="/Modulo_6-Gestion_de_Mascotas/ficha-medica">
            <div className="bg-white p-4 rounded shadow hover:shadow-md transition cursor-pointer">
              🩺 Ficha Médica
            </div>
          </Link>

          <Link href="/Modulo_6-Gestion_de_Mascotas/historial">
            <div className="bg-white p-4 rounded shadow hover:shadow-md transition cursor-pointer">
              🕘 Historial de Cambios
            </div>
          </Link>

          <Link href="/Modulo_6-Gestion_de_Mascotas/filtros">
            <div className="bg-white p-4 rounded shadow hover:shadow-md transition cursor-pointer">
              🔍 Filtros Avanzados
            </div>
          </Link>

          <Link href="/Modulo_6-Gestion_de_Mascotas/multimedia">
            <div className="bg-white p-4 rounded shadow hover:shadow-md transition cursor-pointer">
              📸 Gestión de Multimedia
            </div>
          </Link>

          <Link href="/Modulo_6-Gestion_de_Mascotas/borrador">
            <div className="bg-white p-4 rounded shadow hover:shadow-md transition cursor-pointer">
              📝 Marcar como Borrador
            </div>
          </Link>
        </div>

        {/* Título de sección de mascotas */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">🐾 Mascotas Registradas</h2>
        </div>

        {/* Tarjetas de mascotas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mascotas.map((mascota) => (
            <div
              key={mascota.id}
              onClick={() => setMascotaSeleccionada(mascota)}
              className="cursor-pointer bg-white rounded-lg shadow hover:shadow-lg transition p-4"
            >
              <img src={mascota.foto} alt={mascota.nombre} className="w-full h-48 object-cover rounded-md mb-4" />
              <h2 className="text-xl font-semibold">{mascota.nombre}</h2>
              <p className="text-sm text-gray-600">{mascota.especie} • {mascota.raza}</p>
              <p className="text-sm text-gray-600">Edad: {mascota.edad} años</p>
              <span className={`inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full 
                ${mascota.estado === 'Disponible' ? 'bg-green-200 text-green-800' : 
                  mascota.estado === 'Adoptado' ? 'bg-blue-200 text-blue-800' : 
                  'bg-yellow-200 text-yellow-800'}`}>
                {mascota.estado}
              </span>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {mascotaSeleccionada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-lg relative shadow-lg">
            <button
              onClick={() => setMascotaSeleccionada(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
            >
              ✕
            </button>
            <img src={mascotaSeleccionada.foto} alt={mascotaSeleccionada.nombre} className="w-full h-60 object-cover rounded mb-4" />
            <h2 className="text-2xl font-bold mb-2">{mascotaSeleccionada.nombre}</h2>
            <p className="text-sm text-gray-700 mb-2">{mascotaSeleccionada.descripcion}</p>
            <p><strong>Especie:</strong> {mascotaSeleccionada.especie}</p>
            <p><strong>Raza:</strong> {mascotaSeleccionada.raza}</p>
            <p><strong>Edad:</strong> {mascotaSeleccionada.edad} años</p>
            <p><strong>Estado:</strong> {mascotaSeleccionada.estado}</p>

            <div className="mt-4 flex flex-wrap justify-between gap-2">
              <Link href={`/Modulo_6-Gestion_de_Mascotas/editar/${mascotaSeleccionada.id}`}>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto">Editar</button>
              </Link>
              <Link href={`/Modulo_6-Gestion_de_Mascotas/ficha-medica/${mascotaSeleccionada.id}`}>
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full sm:w-auto">Ficha Médica</button>
              </Link>
              <Link href={`/Modulo_6-Gestion_de_Mascotas/eliminar/${mascotaSeleccionada.id}`}>
                <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full sm:w-auto">Eliminar</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
