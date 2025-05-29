'use client'

import React from 'react'
import Header from '@/components/layout/Header'
import Link from 'next/link'

export default function HistorialCambiosPage() {
  const historialMock = [
    {
      fecha: '2025-05-28',
      cambio: 'Actualización de ficha médica',
      responsable: 'admin_refugio01',
    },
    {
      fecha: '2025-05-25',
      cambio: 'Mascota marcada como adoptada',
      responsable: 'coordinador_adopciones',
    },
    {
      fecha: '2025-05-22',
      cambio: 'Nueva mascota registrada',
      responsable: 'voluntario_ingreso',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Header />

      <main className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-4">🕘 Historial de Cambios</h1>
        <p className="mb-6 text-sm text-gray-600">
          A continuación se detallan los cambios realizados sobre las fichas de mascotas:
        </p>

        <div className="bg-white shadow rounded overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Fecha</th>
                <th className="px-4 py-2">Cambio</th>
                <th className="px-4 py-2">Responsable</th>
              </tr>
            </thead>
            <tbody>
              {historialMock.map((registro, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{registro.fecha}</td>
                  <td className="px-4 py-2">{registro.cambio}</td>
                  <td className="px-4 py-2">{registro.responsable}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
