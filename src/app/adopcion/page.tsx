// src/app/adopcion/page.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

// Interfaz para una mascota disponible
interface MascotaAdopcion {
  id: string;
  nombre: string;
  especie: 'Perro' | 'Gato' | 'Otro'; // Ampliar si es necesario
  raza?: string; // Opcional
  edad: number; // En años, o un rango/texto
  genero: 'Macho' | 'Hembra' | 'Desconocido';
  ubicacion: string; // Ciudad o región del refugio
  imagenUrl?: string; // URL de la imagen (usaremos placeholder por ahora)
  // Otros campos relevantes como tamaño, temperamento, etc.
}

// Simulación de datos de mascotas disponibles
const mockMascotas: MascotaAdopcion[] = [
  {
    id: 'pet1',
    nombre: 'Max',
    especie: 'Perro',
    raza: 'Labrador Retriever',
    edad: 3,
    genero: 'Macho',
    ubicacion: 'Ciudad de México',
    imagenUrl: '/images/max.jpg', // Placeholder
  },
  {
    id: 'pet2',
    nombre: 'Luna',
    especie: 'Gato',
    raza: 'Siames',
    edad: 1,
    genero: 'Hembra',
    ubicacion: 'Guadalajara',
    imagenUrl: '/images/luna.jpg', // Placeholder
  },
   {
    id: 'pet3',
    nombre: 'Rocky',
    especie: 'Perro',
    raza: 'Pastor Alemán',
    edad: 5,
    genero: 'Macho',
    ubicacion: 'Monterrey',
    imagenUrl: '/images/rocky.jpg', // Placeholder
  },
   {
    id: 'pet4',
    nombre: 'Cleo',
    especie: 'Gato',
    raza: 'Persa',
    edad: 2,
    genero: 'Hembra',
    ubicacion: 'Ciudad de México',
    imagenUrl: '/images/cleo.jpg', // Placeholder
  },
    {
    id: 'pet5',
    nombre: 'Bolt',
    especie: 'Perro',
    raza: 'Bulldog Francés',
    edad: 1,
    genero: 'Macho',
    ubicacion: 'Guadalajara',
    imagenUrl: '/images/bolt.jpg', // Placeholder
  },
    {
    id: 'pet6',
    nombre: 'Nina',
    especie: 'Gato',
    raza: 'Europeo Común',
    edad: 4,
    genero: 'Hembra',
    ubicacion: 'Monterrey',
    imagenUrl: '/images/nina.jpg', // Placeholder
  },
     {
    id: 'pet7',
    nombre: 'Coco',
    especie: 'Perro',
    raza: 'Chihuahua',
    edad: 6,
    genero: 'Hembra',
    ubicacion: 'Ciudad de México',
    imagenUrl: '/images/coco.jpg', // Placeholder
  },
];


const ListaMascotasAdopcionPage = () => {
  const [mascotas, setMascotas] = useState<MascotaAdopcion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Estados para los filtros simulados
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroEspecie, setFiltroEspecie] = useState(''); // 'Perro', 'Gato', 'Otro', '' (todos)
  const [filtroGenero, setFiltroGenero] = useState(''); // 'Macho', 'Hembra', 'Desconocido', '' (todos)
  const [filtroEdadMin, setFiltroEdadMin] = useState(''); // Edad mínima
  const [filtroEdadMax, setFiltroEdadMax] = useState(''); // Edad máxima


  // Cargar las mascotas disponibles
  useEffect(() => {
    const fetchMascotas = async () => {
      setLoading(true);
      setError('');
      try {
        // const response = await fetch('/api/adopcion/mascotas'); // Ejemplo de API
        // if (!response.ok) {
        //    throw new Error('Error al cargar las mascotas disponibles.');
        // }
        // const data: MascotaAdopcion[] = await response.json();
        // setMascotas(data);

        // Simular la carga con mock data
        // En un caso real, la API podría soportar filtros iniciales
        setMascotas(mockMascotas);

      } catch (err: any) {
        setError(err.message || 'Error al cargar las mascotas disponibles.');
      } finally {
        setLoading(false);
      }
    };
    fetchMascotas();
  }, []); // El efecto se ejecuta una vez al montar el componente


   // Lógica de filtrado utilizando useMemo para optimizar
   const mascotasFiltradas = useMemo(() => {
        let filtered = mascotas;

        // Filtrar por nombre/palabra clave (insensible a mayúsculas/minúsculas)
        if (filtroNombre) {
            filtered = filtered.filter(mascota =>
                mascota.nombre.toLowerCase().includes(filtroNombre.toLowerCase()) ||
                (mascota.raza && mascota.raza.toLowerCase().includes(filtroNombre.toLowerCase())) ||
                 mascota.ubicacion.toLowerCase().includes(filtroNombre.toLowerCase())
                 // Puedes añadir más campos para buscar
            );
        }

        // Filtrar por especie
        if (filtroEspecie) {
            filtered = filtered.filter(mascota => mascota.especie === filtroEspecie);
        }

         // Filtrar por género
        if (filtroGenero) {
            filtered = filtered.filter(mascota => mascota.genero === filtroGenero);
        }

        // Filtrar por rango de edad
        const minEdad = parseInt(filtroEdadMin, 10);
        const maxEdad = parseInt(filtroEdadMax, 10);

        if (!isNaN(minEdad)) {
            filtered = filtered.filter(mascota => mascota.edad >= minEdad);
        }
         if (!isNaN(maxEdad)) {
            filtered = filtered.filter(mascota => mascota.edad <= maxEdad);
        }


        // Aquí podrías añadir lógica para ordenar los resultados


        return filtered;
   }, [mascotas, filtroNombre, filtroEspecie, filtroGenero, filtroEdadMin, filtroEdadMax]); // Dependencias del useMemo


  if (loading && !mascotas.length) { // Mostrar "Cargando" solo la primera vez
    return <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>Cargando mascotas disponibles...</div>;
  }

   if (error) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px', color: 'red' }}>{error}</div>;
  }


  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>Mascotas Disponibles para Adopción</h1>

      {/* Área de Filtros */}
       <div style={{ marginBottom: '30px', backgroundColor: '#e9ecef', padding: '20px', borderRadius: '8px' }}>
           <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555', fontSize: '1.2rem' }}>Buscar y Filtrar</h2>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px' }}>
                {/* Filtro por Nombre/Palabra Clave */}
                <div>
                    <label htmlFor="filtroNombre" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nombre o Palabra Clave:</label>
                    <input
                        type="text"
                        id="filtroNombre"
                        value={filtroNombre}
                        onChange={(e) => setFiltroNombre(e.target.value)}
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
                        placeholder="Ej: Max, Labrador, México"
                         disabled={loading}
                    />
                </div>

                 {/* Filtro por Especie */}
                <div>
                    <label htmlFor="filtroEspecie" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Especie:</label>
                    <select
                        id="filtroEspecie"
                        value={filtroEspecie}
                        onChange={(e) => setFiltroEspecie(e.target.value)}
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
                         disabled={loading}
                    >
                        <option value="">Todas</option>
                        <option value="Perro">Perro</option>
                        <option value="Gato">Gato</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>

                 {/* Filtro por Género */}
                 <div>
                    <label htmlFor="filtroGenero" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Género:</label>
                    <select
                        id="filtroGenero"
                        value={filtroGenero}
                        onChange={(e) => setFiltroGenero(e.target.value)}
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
                         disabled={loading}
                    >
                        <option value="">Todos</option>
                        <option value="Macho">Macho</option>
                        <option value="Hembra">Hembra</option>
                        <option value="Desconocido">Desconocido</option>
                    </select>
                 </div>

                 {/* Filtro por Edad (Rango simple) */}
                  <div style={{ display: 'flex', gap: '10px' }}>
                       <div style={{ flex: 1 }}>
                            <label htmlFor="filtroEdadMin" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Edad Mín:</label>
                            <input
                                type="number"
                                id="filtroEdadMin"
                                value={filtroEdadMin}
                                onChange={(e) => setFiltroEdadMin(e.target.value)}
                                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
                                placeholder="Ej: 1"
                                min="0"
                                 disabled={loading}
                            />
                       </div>
                       <div style={{ flex: 1 }}>
                            <label htmlFor="filtroEdadMax" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Edad Máx:</label>
                             <input
                                type="number"
                                id="filtroEdadMax"
                                value={filtroEdadMax}
                                onChange={(e) => setFiltroEdadMax(e.target.value)}
                                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
                                placeholder="Ej: 5"
                                min="0"
                                 disabled={loading}
                            />
                       </div>
                  </div>

               {/* Aquí podrías añadir filtros por Ubicación, Tamaño, etc. */}
           </div>
       </div>


      {/* Grid de Mascotas */}
        {mascotasFiltradas.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', fontSize: '1.2rem', color: '#777' }}>
                No se encontraron mascotas con los filtros seleccionados.
                 {mascotas.length > 0 && ( // Sugerir quitar filtros solo si hay mascotas sin filtrar
                     <p style={{ fontSize: '1rem', color: '#555', marginTop: '10px' }}>
                          Intenta ajustar o quitar los filtros.
                     </p>
                 )}
            </div>
        ) : (
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', // Columnas responsivas
                gap: '20px',
                marginTop: '20px',
            }}>
                {mascotasFiltradas.map((mascota) => (
                    <Link key={mascota.id} href={`/adopcion/${mascota.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{
                            backgroundColor: '#fff',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.2s ease-in-out',
                            cursor: 'pointer',
                            height: '100%', // Asegura que todas las tarjetas tengan la misma altura si el contenido es similar
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
                        onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                        >
                            {/* Área de Imagen Placeholder */}
                            <div style={{
                                width: '100%',
                                height: '200px', // Altura fija para la imagen
                                backgroundColor: '#ccc', // Color de fondo del placeholder
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: '1.2rem',
                                color: '#555',
                                fontWeight: 'bold',
                                backgroundImage: mascota.imagenUrl ? `url(${mascota.imagenUrl})` : 'none', // Usar URL si existe
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                            }}>
                                {!mascota.imagenUrl && 'Foto Placeholder'} {/* Mostrar texto si no hay URL */}
                            </div>

                            {/* Información de la Mascota */}
                            <div style={{ padding: '15px', flexGrow: 1 }}> {/* padding y permite crecer */}
                                <h3 style={{ marginTop: '0', marginBottom: '5px', color: '#007bff', fontSize: '1.4rem' }}>{mascota.nombre}</h3>
                                <p style={{ margin: '0', color: '#555' }}>
                                    {mascota.especie}{mascota.raza ? ` (${mascota.raza})` : ''}
                                </p>
                                <p style={{ margin: '5px 0', color: '#555' }}>
                                    {mascota.edad} años | {mascota.genero}
                                </p>
                                <p style={{ margin: '0', color: '#777', fontSize: '0.9rem' }}>
                                    Ubicación: {mascota.ubicacion}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        )}


       {/* Aquí iría la paginación si tienes muchas mascotas */}


    </div>
  );
};

export default ListaMascotasAdopcionPage;