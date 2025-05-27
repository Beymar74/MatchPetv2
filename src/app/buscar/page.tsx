// src/app/buscar/page.tsx
'use client';

import React, { useState, useEffect } from 'react';

// Interfaz para la estructura de una mascota para el listado
interface MascotaListing {
  id: string;
  nombre: string;
  especie: string;
  raza?: string; // Opcional para el listado
  edad?: number; // Opcional para el listado
  fotoUrl: string; // URL simulada de la foto
  ubicacion: string; // Ciudad o ubicación simulada del refugio
  // Otros campos que quieras mostrar en el listado
}

// Simulación de datos de mascotas disponibles
const mockMascotas: MascotaListing[] = [
  {
    id: 'pet1',
    nombre: 'Buddy',
    especie: 'Perro',
    raza: 'Labrador',
    edad: 2,
    fotoUrl: '/images/mock-dog1.jpg', // Ruta simulada de la imagen
    ubicacion: 'Ciudad A',
  },
  {
    id: 'pet2',
    nombre: 'Lucy',
    especie: 'Gato',
    raza: 'Siamés',
    edad: 1,
    fotoUrl: '/images/mock-cat1.jpg', // Ruta simulada de la imagen
    ubicacion: 'Ciudad B',
  },
  {
    id: 'pet3',
    nombre: 'Rocky',
    especie: 'Perro',
    raza: 'Pastor Alemán',
    edad: 4,
    fotoUrl: '/images/mock-dog2.jpg', // Ruta simulada de la imagen
    ubicacion: 'Ciudad A',
  },
  {
    id: 'pet4',
    nombre: 'Michi',
    especie: 'Gato',
    raza: 'Persa',
    edad: 3,
    fotoUrl: '/images/mock-cat2.jpg', // Ruta simulada de la imagen
    ubicacion: 'Ciudad C',
  },
];

const BuscarMascotasPage = () => {
  const [allMascotas, setAllMascotas] = useState<MascotaListing[]>([]);
  const [filteredMascotas, setFilteredMascotas] = useState<MascotaListing[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEspecie, setFilterEspecie] = useState('');
  const [loading, setLoading] = useState(true); // Empezamos cargando (simulado)
  const [error, setError] = useState('');

  // En un caso real, aquí cargarías los datos de las mascotas desde tu backend
  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setAllMascotas(mockMascotas);
      setFilteredMascotas(mockMascotas); // Inicialmente, mostrar todas las mascotas
      setLoading(false);
    }, 1000); // Simular un retraso de 1 segundo
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  // Efecto para filtrar las mascotas cuando cambian los términos de búsqueda o filtro
  useEffect(() => {
    let results = allMascotas;

    // Filtrar por término de búsqueda (nombre)
    if (searchTerm) {
      results = results.filter(mascota =>
        mascota.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por especie
    if (filterEspecie) {
      results = results.filter(mascota =>
        mascota.especie.toLowerCase() === filterEspecie.toLowerCase()
      );
    }

    setFilteredMascotas(results);
  }, [searchTerm, filterEspecie, allMascotas]); // Dependencias del efecto

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEspecieChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterEspecie(e.target.value);
  };

  // Obtener una lista única de especies para el filtro
  const especiesDisponibles = Array.from(new Set(allMascotas.map(mascota => mascota.especie)));


  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>Mascotas Disponibles para Adopción</h1>

      {/* Barra de Búsqueda y Filtros */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem', flexGrow: 1 }}
        />
        <select
          value={filterEspecie}
          onChange={handleEspecieChange}
          style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
        >
          <option value="">Todas las especies</option>
          {especiesDisponibles.map(especie => (
            <option key={especie} value={especie}>{especie}</option>
          ))}
           {/* Opciones de especies se llenarían dinámicamente o estarían predefinidas */}
           {/* <option value="Perro">Perro</option>
           <option value="Gato">Gato</option> */}
        </select>
         {/* Otros filtros (ej. ubicación, edad) se agregarían aquí */}
      </div>

      {loading && <p style={{ textAlign: 'center' }}>Cargando mascotas...</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {!loading && filteredMascotas.length === 0 && <p style={{ textAlign: 'center' }}>No se encontraron mascotas que coincidan con tu búsqueda.</p>}

      {/* Listado de Mascotas (Grid de Tarjetas) */}
      {!loading && filteredMascotas.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          {filteredMascotas.map(mascota => (
            <div key={mascota.id} style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', cursor: 'pointer' /* Considera agregar un Link aquí */ }}>
              {/* Simulación de imagen - En un caso real, usarías el componente Image de Next.js para optimización */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mascota.fotoUrl}
                alt={`Foto de ${mascota.nombre}`}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <div style={{ padding: '15px' }}>
                <h3 style={{ marginTop: '0', marginBottom: '5px', color: '#333' }}>{mascota.nombre}</h3>
                <p style={{ margin: '0', color: '#555' }}>{mascota.especie} {mascota.raza ? `(${mascota.raza})` : ''}</p>
                 {mascota.edad !== undefined && <p style={{ margin: '0', color: '#555' }}>Edad: {mascota.edad} años</p>}
                <p style={{ margin: '0', color: '#555' }}>Ubicación: {mascota.ubicacion}</p>
                 {/* Enlace para ver detalles - En un caso real, usarías <Link> de Next.js */}
                 <a href={`/mascotas/${mascota.id}`} style={{ display: 'block', marginTop: '10px', textAlign: 'center', backgroundColor: '#007bff', color: '#fff', padding: '8px', borderRadius: '4px', textDecoration: 'none' }}>
                   Ver Detalles
                 </a>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default BuscarMascotasPage;