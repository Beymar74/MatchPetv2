'use client'

import React from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'

function page() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Header />

      <main className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Gestión de Mascotas</h1>
        <p className="mb-6 text-lg">Selecciona una funcionalidad:</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/Modulo6_Mascotas/ficha-medica">
            <div className="bg-white p-4 rounded shadow hover:shadow-md transition cursor-pointer">
              🩺 Ficha Médica
            </div>
          </Link>

          <Link href="/Modulo6_Mascotas/historial">
            <div className="bg-white p-4 rounded shadow hover:shadow-md transition cursor-pointer">
              🕘 Historial de Cambios
            </div>
          </Link>

          <Link href="/Modulo6_Mascotas/filtros">
            <div className="bg-white p-4 rounded shadow hover:shadow-md transition cursor-pointer">
              🔍 Filtros Avanzados
            </div>
          </Link>

          <Link href="/Modulo6_Mascotas/multimedia">
            <div className="bg-white p-4 rounded shadow hover:shadow-md transition cursor-pointer">
              📸 Gestión de Multimedia
            </div>
          </Link>

          <Link href="/Modulo6_Mascotas/borrador">
            <div className="bg-white p-4 rounded shadow hover:shadow-md transition cursor-pointer">
              📝 Marcar como Borrador
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default page
