// src/app/mis-solicitudes/[id]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // Importa useParams para obtener el ID de la URL
import Link from 'next/link'; // Para enlazar a la mascota o refugio


// Interfaz para la estructura de una solicitud de adopción vista por el adoptante
interface SolicitudAdoptante {
  id: string;
  mascota: {
    id: string;
    nombre: string;
    fotoPrincipal: string; // URL de la foto principal simulada
  };
  refugio: {
    id: string;
    nombre: string;
    // Puedes añadir más detalles del refugio aquí si es necesario
  };
  fechaSolicitud: string; // Fecha de envío de la solicitud
  estado: 'Pendiente' | 'En revisión' | 'Aprobada' | 'Rechazada' | 'Cancelada'; // Posibles estados
  historialEstados: { estado: SolicitudAdoptante['estado']; fecha: string; }[]; // Simulación de historial
  notasRefugio?: string; // Notas opcionales del refugio
}

// Simulación de datos de solicitudes enviadas por un adoptante
const mockSolicitudesAdoptante: SolicitudAdoptante[] = [
  {
    id: 'req1', // Coincide con la solicitud de Buddy y Juan Pérez en mockSolicitudes (refugio)
    mascota: { id: 'pet1', nombre: 'Buddy', fotoPrincipal: 'https://via.placeholder.com/100/007bff/ffffff?text=Buddy' },
    refugio: { id: 'shelterA', nombre: 'Refugio Esperanza' },
    fechaSolicitud: '2023-10-25',
    estado: 'En revisión', // Simulamos que el estado ha cambiado
    historialEstados: [
       { estado: 'Pendiente', fecha: '2023-10-25' },
       { estado: 'En revisión', fecha: '2023-10-27' },
    ],
    notasRefugio: 'Hemos recibido tu solicitud y la estamos evaluando. Te contactaremos pronto.',
  },
  {
    id: 'req4', // Otra solicitud simulada
    mascota: { id: 'pet5', nombre: 'Mia', fotoPrincipal: 'https://via.placeholder.com/100/17a2b8/ffffff?text=Mia' },
    refugio: { id: 'shelterC', nombre: 'Patitas Felices' },
    fechaSolicitud: '2023-10-28',
    estado: 'Pendiente',
    historialEstados: [
       { estado: 'Pendiente', fecha: '2023-10-28' },
    ],
  },
   {
    id: 'req5', // Solicitud simulada aprobada
    mascota: { id: 'pet2', nombre: 'Lucy', fotoPrincipal: 'https://via.placeholder.com/100/ffc107/000000?text=Lucy' },
    refugio: { id: 'shelterB', nombre: 'Adopta Feliz' },
    fechaSolicitud: '2023-10-20',
    estado: 'Aprobada',
    historialEstados: [
       { estado: 'Pendiente', fecha: '2023-10-20' },
       { estado: 'En revisión', fecha: '2023-10-22' },
       { estado: 'Aprobada', fecha: '2023-10-25' },
    ],
     notasRefugio: '¡Felicidades! Tu solicitud ha sido aprobada. Por favor, contáctanos para coordinar la entrega.',
  },
];

const EstadoSolicitudPage = () => {
  const params = useParams();
  const requestId = params.id as string; // Obtener el ID de la URL

  const [solicitud, setSolicitud] = useState<SolicitudAdoptante | null>(null);
  const [loading, setLoading] = useState(true); // Iniciar en true para cargar datos
  const [error, setError] = useState('');
  const [isCancelling, setIsCancelling] = useState(false); // Estado para el botón de cancelar

  // En un caso real, aquí cargarías los datos de la solicitud específica enviada por el usuario autenticado
  useEffect(() => {
    if (!requestId) return;

    const fetchSolicitudDetails = async () => {
      setLoading(true);
      setError('');
      try {
        // const response = await fetch(`/api/adoptante/mis-solicitudes/${requestId}`); // Ejemplo de API route
        // if (!response.ok) {
        //    if (response.status === 404) {
        //       throw new Error('Solicitud no encontrada o no te pertenece.'); // Seguridad importante
        //    }
        //    throw new Error('Error al cargar los detalles de la solicitud.');
        // }
        // const data: SolicitudAdoptante = await response.json(); // Debería ser un objeto SolicitudAdoptante
        // setSolicitud(data);

        // Simular la carga con mock data (asegurarse de que el usuario "actual" sea el adoptante de la solicitud)
        const foundSolicitud = mockSolicitudesAdoptante.find(req => req.id === requestId);
        if (foundSolicitud) {
          setSolicitud(foundSolicitud);
        } else {
          setError('Solicitud no encontrada.'); // Si el ID no coincide con mock data
        }


      } catch (err: any) {
        setError(err.message || 'Error al cargar los detalles de la solicitud.');
      } finally {
        setLoading(false);
      }
    };
    fetchSolicitudDetails();
  }, [requestId]); // Dependencia: el efecto se ejecuta cuando cambia el requestId


  // Manejar la cancelación de la solicitud
  const handleCancelRequest = async () => {
    if (!solicitud || solicitud.estado === 'Cancelada' || solicitud.estado === 'Aprobada' || solicitud.estado === 'Rechazada') {
      // No permitir cancelar si ya está cancelada, aprobada o rechazada
      return;
    }

    if (confirm('¿Estás seguro de que quieres cancelar esta solicitud de adopción?')) {
      setIsCancelling(true);
      setError('');

      console.log(`Cancelando solicitud con ID: ${solicitud.id}`);

      // Aquí iría la lógica para llamar a tu API y cancelar la solicitud
      try {
        // const response = await fetch(`/api/adoptante/mis-solicitudes/${solicitud.id}/cancelar`, { // Ejemplo de API PUT/PATCH
        //   method: 'PUT', // o 'PATCH'
        //   headers: { 'Content-Type': 'application/json' },
        //   // Puedes enviar algún body si es necesario
        // });

        // if (!response.ok) {
        //   throw new Error('Error al cancelar la solicitud.');
        // }

        // const updatedSolicitud = await response.json(); // Solicitud actualizada desde el backend
         const updatedSolicitud = {
             ...solicitud,
             estado: 'Cancelada',
             historialEstados: [...solicitud.historialEstados, { estado: 'Cancelada', fecha: new Date().toISOString().split('T')[0] }] // Simulación
            } as SolicitudAdoptante;


         // Actualizar el estado local con la solicitud cancelada
         setSolicitud(updatedSolicitud);
         alert('Solicitud cancelada exitosamente.');

      } catch (err: any) {
        setError(`Error al cancelar la solicitud: ${err.message}`);
      } finally {
        setIsCancelling(false);
      }
    }
  };


  if (loading) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>Cargando detalles de la solicitud...</div>;
  }

  if (error) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px', color: 'red' }}>{error}</div>;
  }

  if (!solicitud) {
     return <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>No se pudo cargar la información de la solicitud.</div>;
  }


  // Si la solicitud se cargó correctamente, mostrar los detalles
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '700px', margin: '0 auto' }}> {/* Centrar contenido */}
      <h1 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>Estado de tu Solicitud</h1>

      {/* Información General de la Solicitud */}
      <div style={{ marginBottom: '30px', backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '8px' }}>
         <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Solicitud para {solicitud.mascota.nombre}</h2>
         <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '15px' }}>
            <img
              src={solicitud.mascota.fotoPrincipal}
              alt={`Foto de ${solicitud.mascota.nombre}`}
              style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
            />
            <div>
               <p style={{ margin: '0' }}><strong>Mascota:</strong> <Link href={`/mascotas/${solicitud.mascota.id}`} style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>{solicitud.mascota.nombre}</Link></p>
               <p style={{ margin: '5px 0 0 0' }}><strong>Refugio:</strong> <Link href={`/refugios/${solicitud.refugio.id}`} style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>{solicitud.refugio.nombre}</Link></p> {/* Enlace simulado al refugio */}
               <p style={{ margin: '5px 0 0 0' }}><strong>Fecha de Solicitud:</strong> {solicitud.fechaSolicitud}</p>
            </div>
         </div>

         <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#333' }}>
            Estado Actual: {' '}
            <span style={{ color:
               solicitud.estado === 'Aprobada' ? 'green' :
               solicitud.estado === 'Rechazada' ? 'red' :
               solicitud.estado === 'Cancelada' ? '#6c757d' :
               'orange'
            }}>
               {solicitud.estado}
            </span>
         </p>
      </div>

      {/* Historial de Estados (Línea de Tiempo simulada) */}
      <div style={{ marginBottom: '30px' }}>
         <h2 style={{ marginBottom: '15px', color: '#555' }}>Historial de la Solicitud</h2>
         <ul style={{ listStyle: 'none', padding: '0' }}>
            {solicitud.historialEstados.map((item, index) => (
               <li key={index} style={{ marginBottom: '10px', paddingLeft: '20px', borderLeft: '2px solid #007bff', position: 'relative' }}>
                 <span style={{ position: 'absolute', left: '-8px', top: '0', width: '14px', height: '14px', backgroundColor: '#007bff', borderRadius: '50%' }}></span>
                 <p style={{ margin: '0', fontSize: '0.9rem', color: '#555' }}>{item.fecha}: <span style={{ fontWeight: 'bold' }}>{item.estado}</span></p>
               </li>
            ))}
         </ul>
          {/* Aquí integrarías la lógica para mostrar el historial real */}
      </div>

       {/* Notas del Refugio (simuladas) */}
      {solicitud.notasRefugio && (
         <div style={{ marginBottom: '30px' }}>
            <h2 style={{ marginBottom: '15px', color: '#555' }}>Notas del Refugio</h2>
            <div style={{ backgroundColor: '#fff3cd', color: '#856404', padding: '15px', borderRadius: '8px', border: '1px solid #ffeeba' }}> {/* Estilo de alerta amarilla */}
               <p style={{ margin: '0' }}>{solicitud.notasRefugio}</p>
            </div>
            {/* Aquí integrarías la lógica para mostrar notas reales */}
         </div>
      )}

      {/* Botón Cancelar Solicitud */}
       {solicitud.estado !== 'Aprobada' && solicitud.estado !== 'Rechazada' && solicitud.estado !== 'Cancelada' && (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button
              onClick={handleCancelRequest}
              disabled={isCancelling}
              style={{
                backgroundColor: isCancelling ? '#ccc' : '#dc3545', // Color rojo para cancelar
                color: '#fff',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: isCancelling ? 'not-allowed' : 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold',
                transition: 'background-color 0.2s ease-in-out',
              }}
            >
              {isCancelling ? 'Cancelando...' : 'Cancelar Solicitud'}
            </button>
          </div>
       )}
        {solicitud.estado === 'Cancelada' && (
             <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <p style={{ fontSize: '1.1rem', color: '#6c757d', fontWeight: 'bold' }}>Esta solicitud ha sido cancelada.</p>
             </div>
        )}


    </div>
  );
};

export default EstadoSolicitudPage;