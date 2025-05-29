'use client'

import React, { useState } from 'react'
import Header from '@/components/layout/Header'
import Link from 'next/link'

export default function MarcarBorradorPage() {
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState('')
  const [mensaje, setMensaje] = useState('')

  const mascotasMock = [
    { id: '1', nombre: 'Max' },
    { id: '2', nombre: 'Luna' },
    { id: '3', nombre: 'Rocky' },
  ]

  const marcarComoBorrador = () => {
    if (mascotaSeleccionada) {
      // Aquí podrías llamar a una función para actualizar el estado en Firestore o backend
      setMensaje(`✅ Mascota "${mascotaSeleccionada}" marcada como borrador.`)
    } else {
      setMensaje('⚠️ Selecciona una mascota antes de continuar.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Header />

      <main className="max-w-xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-4">📝 Marcar Publicación como Borrador</h1>
        <p className="text-sm mb-6 text-gray-600">
          Usa esta opción para ocultar temporalmente una mascota que aún no deseas mostrar al público.
        </p>

        <div className="bg-white p-6 rounded shadow space-y-4">
          <div>
            <label className="block font-semibold mb-1">Selecciona una mascota</label>
            <select
              className="w-full border rounded p-2"
              value={mascotaSeleccionada}
              onChange={(e) => setMascotaSeleccionada(e.target.value)}
            >
              <option value="">-- Elegir --</option>
              {mascotasMock.map((m) => (
                <option key={m.id} value={m.nombre}>
                  {m.nombre}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={marcarComoBorrador}
            className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
          >
            Marcar como Borrador
          </button>

          {mensaje && (
            <div className="mt-4 text-sm font-medium text-blue-700 bg-blue-100 p-2 rounded">
              {mensaje}
            </div>
          )}
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
