'use client'

import React, { useState } from 'react'
import Header from '@/components/layout/Header'
import Link from 'next/link'

export default function GestionMultimediaPage() {
  const [archivos, setArchivos] = useState<File[]>([])
  const [vistaPrevia, setVistaPrevia] = useState<string[]>([])

  const handleArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const fileList = Array.from(files)
      setArchivos(fileList)

      const previews = fileList.map((file) => URL.createObjectURL(file))
      setVistaPrevia(previews)
    }
  }

  const subirArchivos = () => {
    console.log('Archivos a subir:', archivos)
    alert('Archivos simulados como subidos ✅')
    // Aquí iría la lógica para subir a Firebase o Cloudinary
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Header />

      <main className="max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-4">📸 Gestión de Multimedia</h1>
        <p className="mb-6 text-sm text-gray-600">
          Aquí puedes cargar fotos o documentos relevantes sobre la mascota.
        </p>

        <div className="bg-white p-6 rounded shadow space-y-4">
          <input
            type="file"
            accept="image/*,.pdf"
            multiple
            onChange={handleArchivo}
            className="w-full border p-2 rounded"
          />

          <button
            onClick={subirArchivos}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Subir archivos
          </button>

          {vistaPrevia.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              {vistaPrevia.map((src, i) => (
                <div key={i} className="border rounded p-2 bg-gray-50">
                  {src.endsWith('.pdf') ? (
                    <p className="text-sm">📄 Documento PDF</p>
                  ) : (
                    <img src={src} alt={`Preview ${i}`} className="w-full h-40 object-cover rounded" />
                  )}
                </div>
              ))}
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
