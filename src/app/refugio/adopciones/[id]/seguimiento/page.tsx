// src/app/refugio/adopciones/[id]/seguimiento/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// Interfaz para una actividad de seguimiento
interface ActividadSeguimiento {
  fecha: string; // Fecha de la actividad
  tipo?: string; // Ej: "Llamada", "Visita", "Mensaje" (Opcional)
  notas: string; // Notas de la actividad
}

// Interfaz para la estructura de datos de la adopción para seguimiento
interface AdopcionParaSeguimiento {
  id: string; // ID de la adopción
  mascota: {
    id: string;
    nombre: string;
    fotoPrincipal: string; // URL de la foto principal de la mascota
    // Puedes añadir más detalles de la mascota si es necesario
  };
  adoptante: {
    id: string;
    nombre: string;
    email: string;
    telefono?: string;
    // Puedes añadir más detalles de contacto o perfil del adoptante
  };
  fechaAdopcion: string; // Fecha en que se formalizó la adopción
  historialSeguimiento: ActividadSeguimiento[]; // Lista de actividades de seguimiento
  proximaActividad?: { fecha: string; descripcion: string }; // Próxima actividad programada (simulado)
}

// Simulación de datos de adopciones para seguimiento
const mockAdopcionesSeguimiento: AdopcionParaSeguimiento[] = [
  {
    id: 'adopt1', // Un ID de adopción único
    mascota: { id: 'pet2', nombre: 'Lucy', fotoPrincipal: 'https://via.placeholder.com/100/ffc107/000000?text=Lucy' },
    adoptante: { id: 'user2', nombre: 'María García', email: 'maria.garcia@example.com', telefono: '555-5678' },
    fechaAdopcion: '2023-10-25', // Fecha posterior a la aprobación de la solicitud
    historialSeguimiento: [
      { fecha: '2023-10-30', tipo: 'Llamada', notas: 'Primer contacto post-adopción. Lucy adaptándose bien, un poco tímida pero comiendo sin problemas.' },
      { fecha: '2023-11-10', tipo: 'Mensaje', notas: 'El adoptante envió fotos y comentó que Lucy ya explora más la casa y busca mimos.' },
    ],
    proximaActividad: { fecha: '2023-11-25', descripcion: 'Llamada de seguimiento o visita (a definir).' },
  },
   {
    id: 'adopt2',
    mascota: { id: 'pet1', nombre: 'Buddy', fotoPrincipal: 'https://via.placeholder.com/100/007bff/ffffff?text=Buddy' },
    adoptante: { id: 'user1', nombre: 'Juan Pérez', email: 'juan.perez@example.com', telefono: '555-1234' },
    fechaAdopcion: '2023-11-01',
    historialSeguimiento: [
      { fecha: '2023-11-05', tipo: 'Llamada', notas: 'Primer contacto. Buddy con mucha energía, disfrutando del jardín. Adaptación inicial positiva.' },
    ],
    proximaActividad: { fecha: '2023-12-01', descripcion: 'Visita de seguimiento.' },
  },
  // Añadir más mock data si es necesario
];


const SeguimientoPostAdopcionPage = () => {
  const params = useParams();
  const adoptionId = params.id as string; // Obtener el ID de la URL

  const [adopcion, setAdopcion] = useState<AdopcionParaSeguimiento | null>(null);
   const [nuevaActividad, setNuevaActividad] = useState(''); // Estado para la nueva nota de seguimiento
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); // Estado para guardar la nueva actividad
  const [error, setError] = useState('');
  const [message, setMessage] = useState(''); // Mensajes de éxito


  // Cargar los datos de la adopción y seguimiento
  useEffect(() => {
    if (!adoptionId) return;

    const fetchAdopcionSeguimiento = async () => {
      setLoading(true);
      setError('');
      try {
        // const response = await fetch(`/api/refugio/adopciones/${adoptionId}/seguimiento`); // Ejemplo de API route
        // if (!response.ok) {
        //    if (response.status === 404) {
        //       throw new Error('Adopción no encontrada o no tienes permisos.');
        //    }
        //    throw new Error('Error al cargar los detalles de seguimiento.');
        // }
        // const data: AdopcionParaSeguimiento = await response.json();
        // setAdopcion(data);

        // Simular la carga con mock data
        const foundAdopcion = mockAdopcionesSeguimiento.find(a => a.id === adoptionId);
        if (foundAdopcion) {
          setAdopcion(foundAdopcion);
        } else {
          setError('Adopción no encontrada o no tienes permisos para ver su seguimiento.');
        }

      } catch (err: any) {
        setError(err.message || 'Error al cargar los detalles de seguimiento.');
      } finally {
        setLoading(false);
      }
    };
    fetchAdopcionSeguimiento();
  }, [adoptionId]); // Dependencia: el efecto se ejecuta cuando cambia el adoptionId

   // Agregar nueva actividad de seguimiento (simulación)
   const handleAddActividad = async () => {
       if (!adopcion || !nuevaActividad.trim()) return; // No agregar si no hay adopción o la nota está vacía

        setSaving(true);
        setMessage('');
        setError('');

       console.log(`Agregando nueva actividad para adopción ${adopcion.id}: ${nuevaActividad}`);

       const newActivity: ActividadSeguimiento = {
           fecha: new Date().toISOString().split('T')[0], // Fecha actual
           notas: nuevaActividad.trim(),
           // tipo: ... // Aquí podrías seleccionar un tipo de actividad si lo implementas
       };

       try {
           // const response = await fetch(`/api/refugio/adopciones/${adopcion.id}/seguimiento/actividad`, { // Ejemplo de API POST
           //   method: 'POST',
           //   headers: { 'Content-Type': 'application/json' },
           //   body: JSON.stringify(newActivity),
           // });

           // if (!response.ok) {
           //    throw new Error('Error al agregar la actividad.');
           // }

           // const addedActivity = await response.json(); // Opcional: si el backend devuelve la actividad creada

            // Simulación de actualización local: añadir la nueva actividad al historial
            const updatedAdopcion = {
                ...adopcion,
                historialSeguimiento: [...adopcion.historialSeguimiento, newActivity] // Añadir al historial
            };

            setAdopcion(updatedAdopcion); // Actualizar el estado local
            setNuevaActividad(''); // Limpiar el campo de texto
            setMessage('Actividad de seguimiento agregada exitosamente.');

       } catch (err: any) {
           setError(`Error al agregar actividad: ${err.message}`);
           setMessage('');
       } finally {
           setSaving(false);
       }
   };


  if (loading) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>Cargando seguimiento post-adopción...</div>;
  }

  if (error) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px', color: 'red' }}>{error}</div>;
  }

  if (!adopcion) {
     return <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>No se pudo cargar la información de seguimiento.</div>;
  }


  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>Seguimiento Post-Adopción</h1>

       {message && <p style={{ color: 'green', marginBottom: '15px', textAlign: 'center' }}>{message}</p>}
       {error && <p style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>{error}</p>}

      {/* Información de la Adopción */}
      <div style={{ marginBottom: '30px', backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '8px' }}>
        <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Detalles de la Adopción</h2>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
           <img src={adopcion.mascota.fotoPrincipal} alt={`Foto de ${adopcion.mascota.nombre}`} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px', marginRight: '15px' }}/>
           <div>
              <p style={{ margin: '0', fontSize: '1.1rem', fontWeight: 'bold' }}>Mascota: <Link href={`/mascotas/${adopcion.mascota.id}`} style={{ color: '#007bff', textDecoration: 'none' }}>{adopcion.mascota.nombre}</Link></p>
              <p style={{ margin: '0', fontSize: '1rem', color: '#555' }}>Adoptante: <Link href={`/usuarios/${adopcion.adoptante.id}`} style={{ color: '#007bff', textDecoration: 'none' }}>{adopcion.adoptante.nombre}</Link></p> {/* Enlace simulado al perfil del adoptante */}
               {/* Información de Contacto del Adoptante */}
               <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: '#555' }}>Contacto: {adopcion.adoptante.email} {adopcion.adoptante.telefono && `| ${adopcion.adoptante.telefono}`}</p>
           </div>
        </div>
        <p style={{ marginTop: '15px' }}><strong>Fecha de Adopción:</strong> {adopcion.fechaAdopcion}</p>
      </div>

      {/* Historial de Seguimiento */}
       <div style={{ marginBottom: '30px' }}>
         <h2 style={{ marginBottom: '15px', color: '#555' }}>Historial de Seguimiento</h2>
          {adopcion.historialSeguimiento && adopcion.historialSeguimiento.length > 0 ? (
              <div style={{ borderLeft: '2px solid #007bff', paddingLeft: '15px' }}> {/* Simple línea de tiempo visual */}
                 {adopcion.historialSeguimiento
                    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()) // Ordenar por fecha
                    .map((actividad, index) => (
                    <div key={index} style={{ marginBottom: '15px', position: 'relative' }}>
                       <div style={{ position: 'absolute', left: '-22px', top: '3px', width: '12px', height: '12px', backgroundColor: '#007bff', borderRadius: '50%' }}></div>
                       <p style={{ margin: '0', fontWeight: 'bold' }}>{actividad.fecha} {actividad.tipo && `(${actividad.tipo})`}</p>
                       <p style={{ margin: '5px 0 0 0' }}>{actividad.notas}</p>
                    </div>
                 ))}
              </div>
          ) : (
              <p>Aún no hay actividades de seguimiento registradas.</p>
          )}
       </div>

      {/* Próxima Actividad (Opcional - simulado) */}
       {adopcion.proximaActividad && (
           <div style={{ marginBottom: '30px', backgroundColor: '#e9ecef', padding: '15px', borderRadius: '8px' }}>
              <h3 style={{ marginTop: '0', marginBottom: '10px', color: '#555' }}>Próxima Actividad Programada</h3>
              <p style={{ margin: '0' }}><strong>Fecha:</strong> {adopcion.proximaActividad.fecha}</p>
              <p style={{ margin: '5px 0 0 0' }}><strong>Descripción:</strong> {adopcion.proximaActividad.descripcion}</p>
           </div>
       )}


      {/* Agregar Nueva Actividad de Seguimiento */}
       <div style={{ marginBottom: '30px' }}>
           <h2 style={{ marginBottom: '15px', color: '#555' }}>Agregar Actividad de Seguimiento</h2>
           <textarea
               value={nuevaActividad}
               onChange={(e) => setNuevaActividad(e.target.value)}
               rows={4}
               style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem', marginBottom: '10px' }}
               placeholder="Describe la actividad de seguimiento (ej: Llamada, Visita, Nota)..."
           ></textarea>
            <button
                onClick={handleAddActividad}
                 disabled={saving || !nuevaActividad.trim()} // Deshabilitar si está guardando o el campo está vacío
                style={{
                   backgroundColor: (saving || !nuevaActividad.trim()) ? '#ccc' : '#007bff',
                   color: '#fff',
                   padding: '10px 20px',
                   border: 'none',
                   borderRadius: '4px',
                   cursor: (saving || !nuevaActividad.trim()) ? 'not-allowed' : 'pointer',
                   fontSize: '1.1rem',
                   fontWeight: 'bold',
                }}
            >
               {saving ? 'Agregando...' : 'Agregar Actividad'}
           </button>
           {/* Aquí podrías añadir campos para seleccionar el tipo de actividad (llamada, visita, etc.) */}
       </div>

        {/* Aquí podrías añadir un enlace para ver la solicitud de adopción original */}
         {/*
          <div style={{ marginTop: '30px' }}>
              <Link href={`/refugio/solicitudes/${adopcion.id_solicitud_original}/evaluar`} style={{ color: '#007bff', textDecoration: 'none' }}>Ver Solicitud Original de Adopción</Link>
          </div>
         */}


    </div>
  );
};

export default SeguimientoPostAdopcionPage;