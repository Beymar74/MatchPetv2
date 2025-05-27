// src/app/donaciones/apadrinar/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Para enlazar al proceso de apadrinamiento de cada mascota

// Interfaz para los datos de una mascota apadrinable
interface MascotaApadrinable {
  id: string; // ID único
  nombre: string;
  fotoUrl?: string; // URL de la foto (placeholder)
  descripcionApadrinamiento: string; // Razón por la que necesita apadrinamiento
  costoMensualSimulado?: string; // Costo mensual estimado (simulado)
  especie?: string; // Opcional: Perro, Gato, etc.
}

// Simulación de datos de mascotas apadrinables
const mockMascotasApadrinables: MascotaApadrinable[] = [
  {
    id: 'pad1',
    nombre: 'Max',
    fotoUrl: '/placeholders/pet_dog1.jpg', // Placeholder
    descripcionApadrinamiento: 'Max es un perro senior con problemas de movilidad que necesita terapias y medicación constante para mantenerse cómodo.',
    costoMensualSimulado: '~$45/mes',
    especie: 'Perro'
  },
  {
    id: 'pad2',
    nombre: 'Luna',
    fotoUrl: '/placeholders/pet_cat1.jpg', // Placeholder
    descripcionApadrinamiento: 'Luna llegó con una fractura que requirió cirugía. Necesita cuidados post-operatorios y rehabilitación prolongada.',
    costoMensualSimulado: '~$60/mes',
     especie: 'Gato'
  },
   {
    id: 'pad3',
    nombre: 'Rocky',
    fotoUrl: '/placeholders/pet_dog2.jpg', // Placeholder
    descripcionApadrinamiento: 'Rocky lleva más de dos años en el refugio. Un padrino le daría un extra de alegría, juguetes y golosinas mientras espera su hogar.',
    costoMensualSimulado: '~$25/mes',
     especie: 'Perro'
  },
   {
    id: 'pad4',
    nombre: 'Milo',
    fotoUrl: '/placeholders/pet_cat2.jpg', // Placeholder
    descripcionApadrinamiento: 'Milo es un gatito muy tímido que se beneficia de la socialización individual y un ambiente tranquilo proporcionado por su apadrinamiento.',
    costoMensualSimulado: '~$30/mes',
    especie: 'Gato'
  },
    {
    id: 'pad5',
    nombre: 'Bella',
    fotoUrl: '/placeholders/pet_dog3.jpg', // Placeholder
    descripcionApadrinamiento: 'Bella fue rescatada en malas condiciones. Su apadrinamiento ayuda a cubrir su dieta especial y chequeos veterinarios frecuentes.',
    costoMensualSimulado: '~$50/mes',
     especie: 'Perro'
  },
];


const MascotasApadrinablesPage = () => {
  const [mascotas, setMascotas] = useState<MascotaApadrinable[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Cargar la lista de mascotas apadrinables
  useEffect(() => {
    const fetchMascotas = async () => {
      setLoading(true);
      setError('');
      try {
        // Aquí iría la llamada API real para obtener la lista de mascotas apadrinables
        // const response = await fetch('/api/mascotas-apadrinables');
        // if (!response.ok) {
        //    throw new Error('Error al cargar la lista de mascotas apadrinables.');
        // }
        // const data: MascotaApadrinable[] = await response.json();
        // setMascotas(data);

        // Simular la carga con mock data
        await new Promise(resolve => setTimeout(resolve, 500)); // Simular retraso de red
        setMascotas(mockMascotasApadrinables);

      } catch (err: any) {
        setError(err.message || 'Error al cargar la lista de mascotas apadrinables.');
      } finally {
        setLoading(false);
      }
    };
    fetchMascotas();
  }, []); // El array vacío asegura que esto solo se ejecute una vez al montar


    // Aquí iría la lógica para filtrar o buscar mascotas si se implementan esas funcionalidades


  if (loading) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>Cargando mascotas apadrinables...</div>;
  }

  if (error) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px', color: 'red' }}>{error}</div>;
  }


  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>Mascotas que Necesitan Padrinos</h1>

      <div style={{ marginBottom: '40px', fontSize: '1rem', lineHeight: '1.6', color: '#555', textAlign: 'center' }}>
        <p>Conviértete en padrino o madrina de una de nuestras mascotas. Tu apoyo mensual cubre sus necesidades específicas y les da un extra de amor y cuidado mientras esperan su hogar para siempre.</p>
      </div>

       {/* Aquí podrías añadir opciones de filtro o búsqueda */}
       {/* <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
            <h3>Filtros (Simulados)</h3>
             <p>Aquí irían opciones para filtrar por especie, necesidad, etc.</p>
       </div> */}


      <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
        {mascotas.length > 0 ? (
          mascotas.map((mascota) => (
            <div key={mascota.id} style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                 height: '100%', // Asegura que todas las tarjetas tengan la misma altura
                 justifyContent: 'space-between' // Para alinear el contenido verticalmente
            }}>
                {/* Foto de la mascota */}
                <img
                   src={mascota.fotoUrl || '/placeholders/pet-placeholder.jpg'} // Usar un placeholder genérico
                   alt={`Foto de ${mascota.nombre}`}
                   style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px', marginBottom: '15px' }}
               />
                <h2 style={{ margin: '0 0 10px 0', fontSize: '1.4rem', color: '#333' }}>{mascota.nombre}</h2>
                {mascota.especie && <p style={{ margin: '0 0 10px 0', fontSize: '1rem', color: '#555', fontStyle: 'italic' }}>{mascota.especie}</p>}

                 {/* Descripción de Apadrinamiento */}
                 <div style={{ marginBottom: '15px', flexGrow: 1 }}> {/* flexGrow para ocupar espacio disponible */}
                    <p style={{ margin: '0', lineHeight: '1.5', color: '#666' }}>
                       {mascota.descripcionApadrinamiento.length > 120 ? mascota.descripcionApadrinamiento.substring(0, 120) + '...' : mascota.descripcionApadrinamiento}
                    </p>
                     {/* Aquí podrías añadir un "Leer más" que vaya a una página de detalle de apadrinamiento */}
                 </div>


                {/* Costo Mensual Estimado */}
                 {mascota.costoMensualSimulado && (
                    <div style={{ marginBottom: '15px', textAlign: 'center', padding: '10px', backgroundColor: '#e9ecef', borderRadius: '5px' }}>
                        <p style={{ margin: '0', fontSize: '1.1rem', fontWeight: 'bold', color: '#28a745' }}>
                            Costo Estimado: {mascota.costoMensualSimulado}
                        </p>
                        <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', color: '#777' }}>(Aprox. para cubrir sus necesidades)</p>
                    </div>
                 )}


                {/* Botón/Enlace para Apadrinar */}
                <Link href={`/donaciones/apadrinar/${mascota.id}`} passHref style={{ textDecoration: 'none', width: '100%' }}>
                     <button
                         style={{
                             backgroundColor: '#fd7e14', // Color naranja para apadrinar
                             color: '#fff',
                             padding: '10px 15px',
                             border: 'none',
                             borderRadius: '5px',
                             cursor: 'pointer',
                             fontSize: '1rem',
                             fontWeight: 'bold',
                             width: '100%', // Botón ancho completo
                             transition: 'background-color 0.2s ease-in-out',
                         }}
                          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e06a00')}
                         onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#fd7e14')}
                     >
                         Apadrinar a {mascota.nombre} (Simulado)
                     </button>
                 </Link>
                 {/* Comentario para el proceso de apadrinamiento real */}
                 <p style={{ fontSize: '0.8rem', color: '#777', marginTop: '10px', textAlign: 'center' }}>(Este botón iniciaría el proceso de apadrinamiento para esta mascota específica.)</p>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>No hay mascotas disponibles para apadrinar en este momento.</p>
        )}
      </div>

       {/* Comentario para la paginación */}
       {/* <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <p>Aquí iría la paginación si hay muchas mascotas.</p>
       </div> */}


    </div>
  );
};

export default MascotasApadrinablesPage;