'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Mascota {
  id: string;
  nombre: string;
  especie: string;
  edad: number;
  estadoSalud: string;
  vacunas: string[];
  esterilizado: boolean;
}

// Datos simulados
const mockMascotas: Mascota[] = [
  {
    id: '1',
    nombre: 'Luna',
    especie: 'Perro',
    edad: 3,
    estadoSalud: 'Vacunado, sin enfermedades actuales',
    vacunas: ['Rabia', 'Moquillo', 'Parvovirus'],
    esterilizado: true,
  },
  {
    id: '2',
    nombre: 'Milo',
    especie: 'Gato',
    edad: 2,
    estadoSalud: 'Alergias leves, controladas',
    vacunas: ['Triple felina'],
    esterilizado: false,
  },
  {
    id: '3',
    nombre: 'Toby',
    especie: 'Perro',
    edad: 4,
    estadoSalud: 'En tratamiento por lesión en la pata',
    vacunas: ['Rabia'],
    esterilizado: true,
  },
];

export default function FichaMedicaPage() {
  const params = useParams();
  const mascotaId = params?.id?.toString() || '';
  const mascota = mockMascotas.find((m) => m.id === mascotaId);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Header />

      <main className="max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-4">🩺 Ficha Médica de la Mascota</h1>

        {mascota ? (
          <>
            <div className="bg-white rounded shadow p-6">
              <div className="mb-4">
                <strong>Nombre:</strong> {mascota.nombre}
              </div>
              <div className="mb-4">
                <strong>Especie:</strong> {mascota.especie}
              </div>
              <div className="mb-4">
                <strong>Edad:</strong> {mascota.edad} años
              </div>
              <div className="mb-4">
                <strong>Estado de salud:</strong> {mascota.estadoSalud}
              </div>
              <div className="mb-4">
                <strong>Vacunas:</strong> {mascota.vacunas.join(', ')}
              </div>
              <div className="mb-4">
                <strong>Esterilizado:</strong> {mascota.esterilizado ? 'Sí' : 'No'}
              </div>
            </div>
          </>
        ) : (
          <div className="text-red-600 bg-white p-6 rounded shadow">Mascota no encontrada.</div>
        )}

        <div className="mt-6">
          <Link href="/Modulo_6-Gestion_de_Mascotas" className="text-blue-600 hover:underline">
            ← Volver a Gestión de Mascotas
          </Link>
        </div>
      </main>
    </div>
  );
}
