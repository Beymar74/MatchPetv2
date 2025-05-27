// src/app/refugio/gestion-solicitudes/page.tsx
'use client';

import React, { useState, useEffect } from 'react';

// Interfaz para la estructura de una solicitud de adopción
interface SolicitudAdopcion {
  id: string;
  mascota: {
    id: string;
    nombre: string;
    // fotoUrl?: string; // Agregar si manejas fotos
  };
  adoptante: {
    id: string;
    nombre: string;
    telefono?: string; // Información de contacto opcional
    email?: string;
  };
  fechaSolicitud: string; // Usar formato ISO string o Date
  estado: 'Pendiente' | 'En revisión' | 'Aprobada' | 'Rechazada';
  motivacion?: string; // Texto del adoptante
  // documentosAdjuntos?: string[]; // URLs o IDs de documentos adjuntos
  // historialEstados?: { estado: string; fecha: string; notas?: string }[]; // Historial de cambios de estado
}

// Simulación de datos de solicitudes de adopción
const mockSolicitudes: SolicitudAdopcion[] = [
  {
    id: 'req1',
    mascota: { id: 'pet1', nombre: 'Buddy' },
    adoptante: { id: 'user1', nombre: 'Juan Pérez', telefono: '555-1234', email: 'juan.perez@example.com' },
    fechaSolicitud: '2023-10-25',
    estado: 'Pendiente',
    motivacion: 'Siempre he querido tener un perro para hacer ejercicio al aire libre.',
  },
  {
    id: 'req2',
    mascota: { id: 'pet2', nombre: 'Lucy' },
    adoptante: { id: 'user2', nombre: 'María García', email: 'maria.g@example.com' },
    fechaSolicitud: '2023-10-20',
    estado: 'En revisión',
    motivacion: 'Soy una persona tranquila y creo que Lucy encajaría perfecto en mi hogar.',
  },
  {
    id: 'req3',
    mascota: { id: 'pet3', nombre: 'Rocky' },
    adoptante: { id: 'user3', nombre: 'Carlos Rodríguez' },
    fechaSolicitud: '2023-10-10',
    estado: 'Aprobada',
    motivacion: 'Tenemos un jardín grande y buscamos un compañero activo.',
  },
  {
    id: 'req4',
    mascota: { id: 'pet1', nombre: 'Buddy' },
    adoptante: { id: 'user4', nombre: 'Ana López' },
    fechaSolicitud: '2023-10-22',
    estado: 'Rechazada',
    motivacion: 'Vivo en un apartamento pequeño y no tengo experiencia con perros grandes.',
  },
];

const GestionSolicitudesPage = () => {
  const [solicitudes, setSolicitudes] = useState<SolicitudAdopcion[]>(mockSolicitudes);
  const [selectedSolicitud, setSelectedSolicitud] = useState<SolicitudAdopcion | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [nuevoEstado, setNuevoEstado] = useState<SolicitudAdopcion['estado'] | ''>('');

  // En un caso real, aquí cargarías las solicitudes recibidas por el refugio autenticado
  // useEffect(() => {
  //   const fetchSolicitudes = async () => {
  //     setLoading(true);
  //     try {
  //       // const response = await fetch('/api/refugio/solicitudes-recibidas'); // Ejemplo de API route
  //       // const data = await response.json();
  //       // setSolicitudes(data);
  //     } catch (err) {
  //       setError('Error al cargar las solicitudes.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchSolicitudes();
  // }, []);

  // Manejar clic en "Ver Detalles"
  const handleViewDetails = (solicitud: SolicitudAdopcion) => {
    setSelectedSolicitud(solicitud);
    setNuevoEstado(solicitud.estado); // Inicializar el selector de estado con el estado actual
    setError('');
    setMessage('');
  };

  // Manejar cambio en el selector de estado
  const handleEstadoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNuevoEstado(e.target.value as SolicitudAdopcion['estado']);
  };

  // Guardar el nuevo estado de la solicitud
  const handleUpdateEstado = async () => {
    if (!selectedSolicitud || !nuevoEstado || nuevoEstado === selectedSolicitud.estado) {
        // No hay solicitud seleccionada o el estado no ha cambiado
        return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    // Aquí iría la lógica para llamar a tu API y actualizar el estado de la solicitud
    console.log(`Actualizando estado de solicitud ${selectedSolicitud.id} a: ${nuevoEstado}`);

    try {
       // const response = await fetch(`/api/solicitudes/${selectedSolicitud.id}/estado`, { // Ejemplo de API PUT
       //   method: 'PUT',
       //   headers: { 'Content-Type': 'application/json' },
       //   body: JSON.stringify({ estado: nuevoEstado }),
       // });

       // if (!response.ok) {
       //   throw new Error('Error al actualizar el estado de la solicitud.');
       // }

       // const updatedSolicitud = await response.json(); // Solicitud actualizada desde el backend
        const updatedSolicitud = { ...selectedSolicitud, estado: nuevoEstado }; // Simulación


       setMessage('Estado de la solicitud actualizado exitosamente.');
       // console.log('Respuesta del backend:', updatedSolicitud);

       // Actualizar la lista de solicitudes con el estado modificado
       setSolicitudes(solicitudes.map(solicitud =>
         solicitud.id === updatedSolicitud.id ? updatedSolicitud : solicitud
       ));

       // Actualizar la solicitud seleccionada si es la que estamos viendo
       setSelectedSolicitud(updatedSolicitud);

    } catch (err: any) {
       setError(`Error al actualizar estado: ${err.message}`);
       setMessage('');
    } finally {
       setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1 style={{ marginBottom: '20px', color: '#333' }}>Gestión de Solicitudes de Adopción Recibidas</h1>

      {message && <p style={{ color: 'green', marginBottom: '15px', textAlign: 'center' }}>{message}</p>}
      {error && <p style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>{error}</p>}
      {loading && <p>Cargando solicitudes...</p>}

      {/* Lista de Solicitudes */}
      {!loading && !selectedSolicitud && (
        <>
          {solicitudes.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                  <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Mascota</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Adoptante</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Fecha de Solicitud</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Estado</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {solicitudes.map(solicitud => (
                  <tr key={solicitud.id}>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{solicitud.mascota.nombre}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{solicitud.adoptante.nombre}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{solicitud.fechaSolicitud}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{solicitud.estado}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                      <button
                        onClick={() => handleViewDetails(solicitud)}
                        style={{ backgroundColor: '#007bff', color: '#fff', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        Ver Detalles
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No has recibido solicitudes de adopción.</p>
          )}
        </>
      )}

      {/* Vista de Detalles de la Solicitud */}
      {selectedSolicitud && (
        <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', marginTop: '20px' }}>
          <h2 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>Detalles de la Solicitud</h2>
          <div style={{ marginBottom: '20px' }}>
            <p><strong>Mascota:</strong> {selectedSolicitud.mascota.nombre}</p>
            <p><strong>Adoptante:</strong> {selectedSolicitud.adoptante.nombre}</p>
            {selectedSolicitud.adoptante.telefono && <p><strong>Teléfono:</strong> {selectedSolicitud.adoptante.telefono}</p>}
            {selectedSolicitud.adoptante.email && <p><strong>Correo Electrónico:</strong> {selectedSolicitud.adoptante.email}</p>}
            <p><strong>Fecha de Solicitud:</strong> {selectedSolicitud.fechaSolicitud}</p>
            <p><strong>Estado Actual:</strong> {selectedSolicitud.estado}</p>
          </div>

          {selectedSolicitud.motivacion && (
             <div style={{ marginBottom: '20px' }}>
               <p><strong>Motivación del Adoptante:</strong></p>
               <p style={{ fontStyle: 'italic' }}>{selectedSolicitud.motivacion}</p>
             </div>
          )}

          {/* Sección para documentos adjuntos (Comentado - Requiere lógica de visualización) */}
          {/*
           <div style={{ marginBottom: '20px' }}>
              <p><strong>Documentos Adjuntos:</strong></p>
              {selectedSolicitud.documentosAdjuntos && selectedSolicitud.documentosAdjuntos.length > 0 ? (
                 <ul>
                   {selectedSolicitud.documentosAdjuntos.map((doc, index) => (
                      <li key={index}><a href={`/api/documentos/${doc}`} target="_blank" rel="noopener noreferrer">Documento {index + 1}</a></li>
                   ))}
                 </ul>
              ) : (
                 <p>No se adjuntaron documentos.</p>
              )}
           </div>
           */}

           {/* Sección para historial de estados (Comentado) */}
            {/*
            <div style={{ marginBottom: '20px' }}>
                <p><strong>Historial de Estados:</strong></p>
                // Mostrar lista del historial de estados aquí
            </div>
            */}

          {/* Opción para cambiar el estado */}
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="estadoSelect" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Cambiar Estado:</label>
            <select
              id="estadoSelect"
              value={nuevoEstado}
              onChange={handleEstadoChange}
              disabled={loading}
              style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem', marginRight: '10px' }}
            >
               <option value="Pendiente">Pendiente</option>
               <option value="En revisión">En revisión</option>
               <option value="Aprobada">Aprobada</option>
               <option value="Rechazada">Rechazada</option>
            </select>
             <button
               onClick={handleUpdateEstado}
               disabled={loading || nuevoEstado === selectedSolicitud.estado}
               style={{
                 backgroundColor: (loading || nuevoEstado === selectedSolicitud.estado) ? '#ccc' : '#007bff',
                 color: '#fff',
                 padding: '8px 15px',
                 border: 'none',
                 borderRadius: '4px',
                 cursor: (loading || nuevoEstado === selectedSolicitud.estado) ? 'not-allowed' : 'pointer',
                 fontSize: '1rem',
                 fontWeight: 'bold',
               }}
             >
               {loading ? 'Guardando...' : 'Guardar Estado'}
             </button>
          </div>

          <button
            onClick={() => setSelectedSolicitud(null)} // Botón para regresar a la lista
            style={{ backgroundColor: '#6c757d', color: '#fff', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer', display: 'block', margin: '20px auto 0 auto' }}
          >
            Volver al Listado
          </button>
        </div>
      )}

    </div>
  );
};

export default GestionSolicitudesPage;