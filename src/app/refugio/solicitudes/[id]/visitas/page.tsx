// src/app/refugio/solicitudes/[id]/visitas/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link'; // Para enlaces a la mascota o adoptante

// Interfaz para una visita previa
interface VisitaPrevia {
  fecha: string;
  notas: string;
  // Podrías añadir tipo de visita (refugio, domicilio), asistentes, etc.
}

// Interfaz para la estructura de datos de una solicitud con información de visitas
interface SolicitudConVisitas {
  id: string; // ID de la solicitud
  mascota: {
    id: string;
    nombre: string;
    // Enlace a detalles de la mascota
  };
  adoptante: {
    id: string;
    nombre: string;
    // Enlace al perfil del adoptante
  };
  visitas: VisitaPrevia[]; // Historial de visitas asociadas a esta solicitud
  // Otros campos de la solicitud que puedan ser relevantes aquí
}

// Simulación de datos de solicitudes con historial de visitas
const mockSolicitudesConVisitas: SolicitudConVisitas[] = [
  {
    id: 'req1', // Coincide con el ID de la solicitud
    mascota: { id: 'pet1', nombre: 'Buddy' },
    adoptante: { id: 'user1', nombre: 'Juan Pérez' },
    visitas: [
      { fecha: '2023-11-10', notas: 'Primera visita al refugio. Juan y su familia interactuaron con Buddy. Parecen una buena conexión.' },
      { fecha: '2023-11-15', notas: 'Segunda visita. Pasaron más tiempo jugando en el patio. Todo positivo hasta ahora.' },
    ],
  },
  {
    id: 'req2',
    mascota: { id: 'pet2', nombre: 'Lucy' },
    adoptante: { id: 'user2', nombre: 'María García' },
    visitas: [
      { fecha: '2023-10-23', notas: 'Visita al refugio. Lucy se mostró un poco tímida al principio pero se acercó a María al final.' },
    ],
  },
  {
      id: 'req3',
      mascota: { id: 'pet1', nombre: 'Buddy' },
      adoptante: { id: 'user3', nombre: 'Ana López' },
      visitas: [] // Solicitud sin visitas registradas
  }
  // Añadir más mock data si es necesario
];


const GestionVisitasPage = () => {
  const params = useParams();
  const requestId = params.id as string; // Obtener el ID de la URL (ID de la solicitud)

  const [solicitudVisitas, setSolicitudVisitas] = useState<SolicitudConVisitas | null>(null);
  const [nuevaFechaVisita, setNuevaFechaVisita] = useState('');
  const [nuevaNotaVisita, setNuevaNotaVisita] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); // Estado para guardar nueva visita
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');


  // Cargar los datos de la solicitud y sus visitas
  useEffect(() => {
    if (!requestId) return;

    const fetchSolicitudVisitas = async () => {
      setLoading(true);
      setError('');
      try {
        // const response = await fetch(`/api/refugio/solicitudes/${requestId}/visitas`); // Ejemplo de API
        // if (!response.ok) {
        //    if (response.status === 404) {
        //       throw new Error('Solicitud no encontrada o no tienes permisos.');
        //    }
        //    throw new Error('Error al cargar el historial de visitas.');
        // }
        // const data: SolicitudConVisitas = await response.json();
        // setSolicitudVisitas(data);

        // Simular la carga con mock data
        const foundSolicitud = mockSolicitudesConVisitas.find(s => s.id === requestId);
        if (foundSolicitud) {
          setSolicitudVisitas(foundSolicitud);
        } else {
          setError('Solicitud no encontrada o no tienes permisos para ver visitas.');
        }

      } catch (err: any) {
        setError(err.message || 'Error al cargar el historial de visitas.');
      } finally {
        setLoading(false);
      }
    };
    fetchSolicitudVisitas();
  }, [requestId]); // Dependencia: el efecto se ejecuta cuando cambia el requestId

    // Registrar una nueva visita (simulación)
    const handleRecordVisit = async () => {
        if (!solicitudVisitas || !nuevaFechaVisita || !nuevaNotaVisita.trim()) {
            // No agregar si falta información o la nota está vacía
            setMessage('Por favor, ingresa la fecha y las notas de la visita.');
            return;
        }

        setSaving(true);
        setMessage('');
        setError('');

        console.log(`Registrando nueva visita para solicitud ${solicitudVisitas.id}: Fecha ${nuevaFechaVisita}, Notas: ${nuevaNotaVisita}`);

        const nuevaVisita: VisitaPrevia = {
            fecha: nuevaFechaVisita,
            notas: nuevaNotaVisita.trim(),
        };

        try {
            // const response = await fetch(`/api/refugio/solicitudes/${solicitudVisitas.id}/visitas`, { // Ejemplo de API POST
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(nuevaVisita),
            // });

            // if (!response.ok) {
            //    throw new Error('Error al registrar la visita.');
            // }

            // const result = await response.json(); // Opcional: si el backend devuelve el resultado

             // Simulación de actualización local del historial de visitas
            const updatedSolicitud = {
                ...solicitudVisitas,
                visitas: [...solicitudVisitas.visitas, nuevaVisita].sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()) // Ordenar por fecha descendente
            };
            setSolicitudVisitas(updatedSolicitud);

            setNuevaFechaVisita(''); // Limpiar campos
            setNuevaNotaVisita('');
            setMessage('Visita registrada exitosamente.');

        } catch (err: any) {
            setError(`Error al registrar visita: ${err.message}`);
            setMessage('');
        } finally {
            setSaving(false);
        }
    };


  if (loading) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>Cargando gestión de visitas...</div>;
  }

  if (error) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px', color: 'red' }}>{error}</div>;
  }

  if (!solicitudVisitas) {
     return <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>No se pudo cargar la información de visitas para esta solicitud.</div>;
  }


  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>Gestión de Visitas Previas</h1>

       {message && <p style={{ color: 'green', marginBottom: '15px', textAlign: 'center' }}>{message}</p>}
       {error && <p style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>{error}</p>}

      {/* Información de la Solicitud */}
      <div style={{ marginBottom: '30px', backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '8px' }}>
        <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Solicitud Relacionada</h2>
         <p style={{ margin: '0', fontSize: '1.1rem', fontWeight: 'bold' }}>Mascota: <Link href={`/mascotas/${solicitudVisitas.mascota.id}`} style={{ color: '#007bff', textDecoration: 'none' }}>{solicitudVisitas.mascota.nombre}</Link></p>
         <p style={{ margin: '0', fontSize: '1.1rem', fontWeight: 'bold' }}>Adoptante: <Link href={`/usuarios/${solicitudVisitas.adoptante.id}`} style={{ color: '#007bff', textDecoration: 'none' }}>{solicitudVisitas.adoptante.nombre}</Link></p>
          <p style={{ margin: '10px 0 0 0', fontSize: '0.9rem', color: '#555' }}>ID Solicitud: {solicitudVisitas.id}</p>
          {/* Enlace a la página de evaluación de la solicitud */}
           <Link href={`/refugio/solicitudes/${solicitudVisitas.id}/evaluar`} style={{ fontSize: '0.9rem', color: '#007bff', textDecoration: 'none', display: 'inline-block', marginTop: '10px' }}>Volver a Evaluación de Solicitud</Link>
      </div>


      {/* Historial de Visitas Registradas */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ marginBottom: '15px', color: '#555' }}>Historial de Visitas</h2>
         {solicitudVisitas.visitas.length === 0 ? (
            <p>Aún no hay visitas registradas para esta solicitud.</p>
         ) : (
             <ul style={{ listStyle: 'none', padding: '0' }}>
                {solicitudVisitas.visitas
                   .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()) // Ordenar por fecha descendente
                   .map((visita, index) => (
                   <li key={index} style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #eee' }}>
                      <p style={{ margin: '0', fontWeight: 'bold' }}>Fecha: {visita.fecha}</p>
                      <p style={{ margin: '5px 0 0 0' }}>Notas: {visita.notas}</p>
                       {/* Podrías añadir opciones para editar o eliminar visita */}
                   </li>
                ))}
             </ul>
         )}
      </div>

      {/* Registrar Nueva Visita */}
       <div style={{ marginBottom: '30px', backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '8px' }}>
           <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Registrar Nueva Visita</h2>
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="visitDate" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Fecha de Visita:</label>
                <input
                   type="date"
                   id="visitDate"
                   value={nuevaFechaVisita}
                   onChange={(e) => setNuevaFechaVisita(e.target.value)}
                   style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
                />
            </div>
            <div style={{ marginBottom: '15px' }}>
                 <label htmlFor="visitNotes" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Notas de la Visita:</label>
                 <textarea
                    id="visitNotes"
                   value={nuevaNotaVisita}
                   onChange={(e) => setNuevaNotaVisita(e.target.value)}
                   rows={4}
                   style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
                   placeholder="Detalles de la visita..."
                 ></textarea>
            </div>

            <button
                onClick={handleRecordVisit}
                disabled={saving || !nuevaFechaVisita || !nuevaNotaVisita.trim()} // Deshabilitar si está guardando o campos vacíos
                style={{
                   backgroundColor: (saving || !nuevaFechaVisita || !nuevaNotaVisita.trim()) ? '#ccc' : '#007bff',
                   color: '#fff',
                   padding: '10px 20px',
                   border: 'none',
                   borderRadius: '4px',
                   cursor: (saving || !nuevaFechaVisita || !nuevaNotaVisita.trim()) ? 'not-allowed' : 'pointer',
                   fontSize: '1rem',
                   fontWeight: 'bold',
                }}
            >
               {saving ? 'Registrando...' : 'Registrar Visita'}
           </button>
           {/* Podrías añadir campos para tipo de visita, asistentes, etc. */}
       </div>

    </div>
  );
};

export default GestionVisitasPage;