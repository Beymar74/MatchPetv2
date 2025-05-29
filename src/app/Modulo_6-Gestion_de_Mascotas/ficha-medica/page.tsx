'use client'

import React from 'react'
import Header from '@/components/layout/Header'
import Link from 'next/link'

export default function FichaMedicaPage() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Header />

      <main className="max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-4">🩺 Ficha Médica de la Mascota</h1>
        <p className="mb-6 text-sm text-gray-600">
          Aquí se muestra la información médica básica registrada para cada mascota.
        </p>

        {/* Simulación de ficha médica */}
        <div className="bg-white rounded shadow p-6">
          <div className="mb-4">
            <strong>Nombre:</strong> Max
          </div>
          <div className="mb-4">
            <strong>Especie:</strong> Perro
          </div>
          <div className="mb-4">
            <strong>Edad:</strong> 3 años
          </div>
          <div className="mb-4">
            <strong>Estado de salud:</strong> Vacunado, sin enfermedades actuales
          </div>
          <div className="mb-4">
            <strong>Vacunas:</strong> Rabia, Moquillo, Parvovirus
          </div>
          <div className="mb-4">
            <strong>Esterilizado:</strong> Sí
          </div>
        </div>

        <div className="mt-6">
          <Link href="/Modulo_6-Gestion_de_Mascotas" className="text-blue-600 hover:underline">
            ← Volver a Gestión de Mascotas
          </Link>
        </div>
      </main>
    </div>
  )
}
