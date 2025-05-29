'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { useRouter } from 'next/navigation';

export default function RegistrarMascotaPage() {
  const router = useRouter();

  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    especie: '',
    raza: '',
    edad: '',
    estado: '',
    descripcion: '',
    foto: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación simple
    if (!formData.nombre || !formData.especie || !formData.edad || !formData.estado) {
      alert('Por favor, completa los campos obligatorios.');
      return;
    }

    // Simular envío a una "base de datos"
    console.log('Mascota registrada (simulada):', formData);

    alert('✅ Mascota registrada correctamente (simulado)');
    router.push('/Modulo_6-Gestion_de_Mascotas'); // Redirigir a la pantalla principal
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Header />

      <main className="max-w-3xl mx-auto py-10 px-6">
        <h1 className="text-2xl font-bold mb-6">➕ Registrar Nueva Mascota</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          <div>
            <label className="block font-medium text-sm">Nombre *</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-sm">Especie *</label>
            <input
              type="text"
              name="especie"
              value={formData.especie}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              placeholder="Perro, Gato, etc."
              required
            />
          </div>

          <div>
            <label className="block font-medium text-sm">Raza</label>
            <input
              type="text"
              name="raza"
              value={formData.raza}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block font-medium text-sm">Edad (años) *</label>
            <input
              type="number"
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              required
              min={0}
            />
          </div>

          <div>
            <label className="block font-medium text-sm">Estado *</label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              required
            >
              <option value="">Selecciona un estado</option>
              <option value="Disponible">Disponible</option>
              <option value="Adoptado">Adoptado</option>
              <option value="En tratamiento">En tratamiento</option>
              <option value="Necesidades Especiales">Necesidades Especiales</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-sm">Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              rows={3}
            ></textarea>
          </div>

          <div>
            <label className="block font-medium text-sm">Foto (URL)</label>
            <input
              type="text"
              name="foto"
              value={formData.foto}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              placeholder="https://..."
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700"
            >
              Registrar
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
