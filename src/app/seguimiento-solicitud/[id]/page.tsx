// src/app/seguimiento-solicitud/[id]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link'; // Opcional: para volver a alguna página

// Define los posibles estados de una solicitud
type EstadoSolicitud = 'Pendiente' | 'En revisión' | 'Aprobada' | 'Rechazada' | 'Se requiere más información' | 'Completada';

// Interfaz para los datos de seguimiento de una solicitud
interface SeguimientoSolicitud {
  id: string; // ID de la solicitud
  mascotaNombre: string; // Nombre de la mascota solicitada
  fechaEnvio: string; // Fecha en formato 'YYYY-MM-DD'
  estadoActual: EstadoSolicitud;
  notasRefugio?: string; // Notas o comentarios del refugio (opcional)
  // Aquí podrías añadir un historial de estados si fuera necesario
  // historialEstados?: { estado: EstadoSolicitud; fecha: string; }[];
}

// Simulación de datos de solicitudes de adopción
const mockSolicitudes: SeguimientoSolicitud[] = [
  {
    id: 'sol123',
    mascotaNombre: 'Max',
    fechaEnvio: '2023-11-10',
    estadoActual: 'En revisión',
    notasRefugio: 'Estamos revisando tu información. Nos pondremos en contacto si necesitamos algo más.',
  },
  {
    id: 'sol456',
    mascotaNombre: 'Luna',
    fechaEnvio: '2023-11-08',
    estadoActual: 'Aprobada',
    notasRefugio: '¡Felicidades! Tu solicitud para Luna ha sido aprobada. Te hemos enviado un correo con los siguientes pasos.',
  },
   {
    id: 'sol789',
    mascotaNombre: 'Rocky',
    fechaEnvio: '2023-11-11',
    estadoActual: 'Pendiente',
    notasRefugio: 'Hemos recibido tu solicitud. Está en espera de ser asignada para revisión.',
  },
    {
    id: 'sol012',
    mascotaNombre: 'Mia',
    fechaEnvio: '2023-11-05',
    estadoActual: 'Rechazada',
    notasRefugio: 'Lamentamos informarte que tu solicitud para Mia no pudo ser aprobada en este momento. Hemos enviado un correo con más detalles.',
  },
    {
    id: 'sol345',
    mascotaNombre: 'Coco',
    fechaEnvio: '2023-11-12',
    estadoActual: 'Se requiere más información',
    notasRefugio: 'Necesitamos algunos datos adicionales para continuar con la evaluación de tu solicitud. Por favor, revisa tu correo electrónico.',
  },
  // Añadir más mock data para diferentes estados
];

// Función simulada para obtener los datos de la solicitud por ID
const fetchSolicitudById = async (id: string): Promise<SeguimientoSolicitud | null> => {
    // Simula una llamada asíncrona a una API
    await new Promise(resolve => setTimeout(resolve, 500)); // Simular latencia de red

    // Busca la solicitud en los datos simulados
    const solicitud = mockSolicitudes.find(s => s.id === id);
    return solicitud || null; // Devuelve la solicitud encontrada o null si no existe
};


const SeguimientoSolicitudPage = () => {
  const params = useParams();
  const solicitudId = params.id as string; // Obtener el ID de la solicitud de la URL

  const [solicitud, setSolicitud] = useState<SeguimientoSolicitud | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Cargar los datos de la solicitud al montar el componente
  useEffect(() => {
    if (!solicitudId) {
        setLoading(false);
        setError('ID de solicitud no proporcionado.');
        return;
    }

    const loadSolicitud = async () => {
        setLoading(true);
        setError('');
        try {
             // Llamada a la función simulada (o tu API real aquí)
            const data = await fetchSolicitudById(solicitudId);
            if (data) {
                setSolicitud(data);
            } else {
                setError(`No se encontró la solicitud con ID: ${solicitudId}`);
            }
        } catch (err: any) {
             setError(err.message || 'Error al cargar los datos de la solicitud.');
        } finally {
            setLoading(false);
        }
    };
    loadSolicitud();
  }, [solicitudId]); // Dependencia: vuelve a cargar si el ID de la solicitud cambia


  // Función para determinar el color del estado (simulación)
  const getStatusColor = (status: EstadoSolicitud): string => {
      switch (status) {
          case 'Aprobada': return 'green';
          case 'Rechazada': return 'red';
          case 'En revisión':
          case 'Se requiere más información': return 'orange';
          case 'Pendiente': return 'gray';
           case 'Completada': return 'blue'; // Si manejas un estado final después de la adopción
          default: return '#333'; // Color por defecto
      }
  };


  if (loading) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px', textAlign: 'center' }}>Cargando estado de la solicitud...</div>;
  }

  if (error) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px', color: 'red', textAlign: 'center' }}>{error}</div>;
  }

  if (!solicitud) {
       // Esto no debería ocurrir si error ya se manejó, pero es una precaución
       return <div style={{ fontFamily: 'sans-serif', padding: '20px', textAlign: 'center' }}>No se encontraron datos para esta solicitud.</div>;
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '600px', margin: '0 auto', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h1 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>Seguimiento de mi Solicitud de Adopción</h1>

       <div style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
            <p style={{ fontSize: '1.1rem', margin: '5px 0' }}><strong>ID de Solicitud:</strong> {solicitud.id}</p>
            <p style={{ fontSize: '1.1rem', margin: '5px 0' }}><strong>Mascota Solicitada:</strong> {solicitud.mascotaNombre}</p>
            <p style={{ fontSize: '1.1rem', margin: '5px 0' }}><strong>Fecha de Envío:</strong> {solicitud.fechaEnvio}</p>
       </div>


      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
           <h2 style={{ marginTop: '0', marginBottom: '10px', color: '#555', textAlign: 'center' }}>Estado Actual</h2>
           <p style={{
               fontSize: '1.5rem',
               fontWeight: 'bold',
               textAlign: 'center',
               color: getStatusColor(solicitud.estadoActual), // Color dinámico según el estado
               marginBottom: '15px',
           }}>
              {solicitud.estadoActual}
           </p>

            {solicitud.notasRefugio && (
                 <div>
                     <h3 style={{ marginTop: '0', marginBottom: '10px', color: '#777', fontSize: '1.1rem' }}>Notas del Refugio:</h3>
                      <p style={{ whiteSpace: 'pre-wrap', margin: '0', color: '#555' }}>{solicitud.notasRefugio}</p>
                 </div>
            )}

             {/* Aquí podrías añadir "Próximos Pasos" basados en el estado */}
            {/* {solicitud.estadoActual === 'Aprobada' && (
                <p style={{ marginTop: '15px', fontWeight: 'bold', color: 'green' }}>
                    Revisa tu correo para conocer los siguientes pasos y coordinar la entrega.
                </p>
            )} */}
             {/* {solicitud.estadoActual === 'Pendiente' && (
                <p style={{ marginTop: '15px', color: '#555' }}>
                    Tu solicitud está en fila para ser revisada por nuestro equipo. Gracias por tu paciencia.
                </p>
            )} */}
            {/* Y así sucesivamente para otros estados */}

      </div>

      {/* Aquí podrías añadir el historial de estados si lo implementas */}
      {/* <div style={{ marginBottom: '20px' }}>
          <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Historial de Estados</h2>
          {solicitud.historialEstados && solicitud.historialEstados.length > 0 ? (
              <ul>
                  {solicitud.historialEstados.map((item, index) => (
                      <li key={index}>{item.fecha}: {item.estado}</li>
                  ))}
              </ul>
          ) : (
              <p>No hay historial de estados disponible.</p>
          )}
      </div> */}

       {/* Opciones adicionales (cancelar, contactar, etc. - simulado) */}
       <div style={{ textAlign: 'center', marginTop: '30px' }}>
           {solicitud.estadoActual !== 'Rechazada' && solicitud.estadoActual !== 'Completada' && (
                <button
                    onClick={() => alert('Simulando cancelación de solicitud...') /* Implementar lógica real */}
                     style={{
                        backgroundColor: '#dc3545', // Color rojo para cancelar
                        color: '#fff',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                         marginRight: '10px'
                    }}
                >
                   Cancelar Solicitud
                </button>
           )}
           {/* Aquí podrías añadir un botón o enlace para contactar al refugio */}
       </div>

        {/* Opcional: Enlace de regreso a alguna página */}
        {/* <div style={{ marginTop: '20px', textAlign: 'center' }}>
             <Link href="/mis-solicitudes" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>
                 Volver a mis solicitudes
             </Link>
        </div> */}


    </div>
  );
};

export default SeguimientoSolicitudPage;