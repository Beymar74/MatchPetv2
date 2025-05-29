'use client'

import React, { useState } from 'react'
import Header from '@/components/layout/Header'
import Link from 'next/link'

export default function FiltrosAvanzadosPage() {
  const [filtros, setFiltros] = useState({
    edad: '',
    especie: '',
    tamaño: '',
    estado: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value })
  }

  const aplicarFiltros = () => {
    console.log('Filtros aplicados:', filtros)
    // Aquí iría la lógica para consultar en Firebase o filtrar una lista
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Header />

      <main className="max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-4">🔍 Filtros Avanzados</h1>
        <p className="mb-6 text-sm text-gray-600">
          Usa los siguientes filtros para buscar mascotas según tus preferencias:
        </p>

        <form className="bg-white rounded shadow p-6 space-y-4" onSubmit={e => e.preventDefault()}>
          <div>
            <label className="block font-semibold mb-1">Edad</label>
            <select name="edad" className="w-full border rounded p-2" value={filtros.edad} onChange={handleChange}>
              <option value="">-- Seleccionar --</option>
              <option value="cachorro">Cachorro</option>
              <option value="adulto">Adulto</option>
              <option value="anciano">Anciano</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Especie</label>
            <select name="especie" className="w-full border rounded p-2" value={filtros.especie} onChange={handleChange}>
              <option value="">-- Seleccionar --</option>
              <option value="perro">Perro</option>
              <option value="gato">Gato</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Tamaño</label>
            <select name="tamaño" className="w-full border rounded p-2" value={filtros.tamaño} onChange={handleChange}>
              <option value="">-- Seleccionar --</option>
              <option value="pequeño">Pequeño</option>
              <option value="mediano">Mediano</option>
              <option value="grande">Grande</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Estado</label>
            <select name="estado" className="w-full border rounded p-2" value={filtros.estado} onChange={handleChange}>
              <option value="">-- Seleccionar --</option>
              <option value="Disponible">Disponible</option>
              <option value="Adoptado">Adoptado</option>
              <option value="En Proceso">En Proceso</option>
              <option value="Necesidades Especiales">Necesidades Especiales</option>
            </select>
          </div>

          <button
            type="button"
            onClick={aplicarFiltros}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Aplicar Filtros
          </button>
        </form>

        <div className="mt-6">
          <Link href="/Modulo_6-Gestion_de_Mascotas" className="text-blue-600 hover:underline">
            ← Volver a Gestión de Mascotas
          </Link>
        </div>
      </main>
    </div>
  )
}
