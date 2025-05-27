// src/app/refugio/solicitudes/[id]/evaluar/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// Interfaz para la estructura de datos de la solicitud para evaluación
interface SolicitudParaEvaluacion {
  id: string;
  mascota: {
    id: string;
    nombre: string;
    especie: string;
    raza?: string;
    // Puedes añadir más detalles de la mascota aquí si es necesario
  };
  adoptante: {
    id: string;
    nombre: string;
    email: string;
    telefono?: string;
    direccion?: string; // Información adicional para evaluación
    respuestasFormulario?: { pregunta: string; respuesta: string }[]; // Respuestas a preguntas de formulario (simulado)
    // Otros datos del adoptante relevantes para la evaluación (ej. experiencia previa)
  };
  fechaSolicitud: string;
  estado: 'Pendiente' | 'En revisión' | 'Aprobada' | 'Rechazada'; // Estado actual
  historialEstado: { estado: string; fecha: string; notas?: string }[]; // Historial de cambios de estado
  documentosAdjuntos?: { nombre: string; url: string }[]; // Documentos adjuntos (simulado)
  notasRefugio?: string; // Notas internas del refugio sobre la solicitud
  // Otros campos relevantes para la evaluación (ej. resultados test compatibilidad)
}

// Simulación de datos de solicitudes para evaluación
const mockSolicitudesEvaluacion: SolicitudParaEvaluacion[] = [
  {
    id: 'req1',
    mascota: { id: 'pet1', nombre: 'Buddy', especie: 'Perro', raza: 'Labrador' },
    adoptante: {
      id: 'user1',
      nombre: 'Juan Pérez',
      email: 'juan.perez@example.com',
      telefono: '555-1234',
      direccion: 'Calle Falsa 123, Ciudad, País',
      respuestasFormulario: [
        { pregunta: '¿Tienes experiencia previa con mascotas?', respuesta: 'Sí, he tenido perros toda mi vida.' },
        { pregunta: 'Describe tu entorno de hogar (tamaño, jardín, otros animales).', respuesta: 'Vivo en una casa con jardín grande y cercado. No tengo otras mascotas.' },
        { pregunta: '¿Cuántas horas al día pasará la mascota sola?', respuesta: 'Generalmente, 4-5 horas mientras trabajo.' },
      ],
    },
    fechaSolicitud: '2023-10-25',
    estado: 'En revisión',
    historialEstado: [
      { estado: 'Pendiente', fecha: '2023-10-25', notas: 'Solicitud recibida.' },
      { estado: 'En revisión', fecha: '2023-10-26', notas: 'Revisión inicial por el equipo.' },
    ],
    documentosAdjuntos: [
       { nombre: 'Comprobante de domicilio.pdf', url: '#' },
       { nombre: 'Carta de recomendacion.jpg', url: '#' },
    ],
    notasRefugio: 'Adoptante parece adecuado, casa con jardín. Necesario verificar referencias y planificar visita.',
  },
   {
    id: 'req2',
    mascota: { id: 'pet2', nombre: 'Lucy', especie: 'Gato', raza: 'Siamés' },
    adoptante: {
      id: 'user2',
      nombre: 'María García',
      email: 'maria.garcia@example.com',
      direccion: 'Apartamento 4B, Edificio Central, Ciudad, País',
       respuestasFormulario: [
        { pregunta: '¿Tienes experiencia previa con mascotas?', respuesta: 'Sí, siempre he tenido gatos de interior.' },
        { pregunta: 'Describe tu entorno de hogar (tamaño, jardín, otros animales).', respuesta: 'Un apartamento tranquilo en un edificio seguro. No tengo jardín ni otras mascotas.' },
        { pregunta: '¿Cuántas horas al día pasará la mascota sola?', respuesta: 'Trabajo desde casa, por lo que estará acompañada la mayor parte del tiempo.' },
      ],
    },
    fechaSolicitud: '2023-10-20',
    estado: 'Aprobada',
    historialEstado: [
      { estado: 'Pendiente', fecha: '2023-10-20' },
      { estado: 'En revisión', fecha: '2023-10-21' },
      { estado: 'Aprobada', fecha: '2023-10-24', notas: 'Perfil del adoptante ideal para Lucy. Contactada para trámites finales.' },
    ],
    documentosAdjuntos: [],
    notasRefugio: 'Excelente candidata. Entorno tranquilo y tiempo disponible.',
  },
   // Añadir más mock data si es necesario
];


const EvaluarSolicitudPage = () => {
  const params = useParams();
  const requestId = params.id as string; // Obtener el ID de la URL

  const [solicitud, setSolicitud] = useState<SolicitudParaEvaluacion | null>(null);
   const [notasRefugio, setNotasRefugio] = useState(''); // Estado para las notas del refugio
   const [newStatus, setNewStatus] = useState<SolicitudParaEvaluacion['estado'] | ''>(''); // Estado para el nuevo estado a cambiar
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); // Estado para guardar notas o estado
  const [error, setError] = useState('');
  const [message, setMessage] = useState(''); // Mensajes de éxito


  // Cargar los datos de la solicitud para evaluación
  useEffect(() => {
    if (!requestId) return;

    const fetchSolicitudEvaluacion = async () => {
      setLoading(true);
      setError('');
      try {
        // const response = await fetch(`/api/refugio/solicitudes/${requestId}/evaluar`); // Ejemplo de API route
        // if (!response.ok) {
        //    if (response.status === 404) {
        //       throw new Error('Solicitud no encontrada o no tienes permisos.');
        //    }
        //    throw new Error('Error al cargar los detalles de evaluación.');
        // }
        // const data: SolicitudParaEvaluacion = await response.json();
        // setSolicitud(data);
        // setNotasRefugio(data.notasRefugio || ''); // Cargar notas existentes
        // setNewStatus(data.estado); // Inicializar el selector de estado

        // Simular la carga con mock data
        const foundSolicitud = mockSolicitudesEvaluacion.find(s => s.id === requestId);
        if (foundSolicitud) {
          setSolicitud(foundSolicitud);
          setNotasRefugio(foundSolicitud.notasRefugio || '');
           setNewStatus(foundSolicitud.estado);
        } else {
          setError('Solicitud no encontrada o no tienes permisos para evaluarla.');
        }

      } catch (err: any) {
        setError(err.message || 'Error al cargar los detalles de evaluación.');
      } finally {
        setLoading(false);
      }
    };
    fetchSolicitudEvaluacion();
  }, [requestId]); // Dependencia: el efecto se ejecuta cuando cambia el requestId

   // Guardar las notas del refugio (simulación)
   const handleSaveNotes = async () => {
       if (!solicitud || notasRefugio === solicitud.notasRefugio) return; // No guardar si no hay cambios o solicitud

        setSaving(true);
        setMessage('');
        setError('');

       console.log(`Guardando notas para solicitud ${solicitud.id}: ${notasRefugio}`);

       try {
           // const response = await fetch(`/api/refugio/solicitudes/${solicitud.id}/notas`, { // Ejemplo de API PUT/POST
           //   method: 'PUT',
           //   headers: { 'Content-Type': 'application/json' },
           //   body: JSON.stringify({ notas: notasRefugio }),
           // });

           // if (!response.ok) {
           //    throw new Error('Error al guardar las notas.');
           // }

           // const updatedSolicitud = await response.json(); // Opcional: si el backend devuelve la solicitud actualizada

            const updatedSolicitud = { ...solicitud, notasRefugio: notasRefugio }; // Simulación de actualización local
            setSolicitud(updatedSolicitud); // Actualizar el estado local

           setMessage('Notas guardadas exitosamente.');

       } catch (err: any) {
           setError(`Error al guardar notas: ${err.message}`);
           setMessage('');
       } finally {
           setSaving(false);
       }
   };

    // Cambiar el estado de la solicitud (simulación)
   const handleChangeStatus = async () => {
        if (!solicitud || !newStatus || newStatus === solicitud.estado) {
           // No hacer nada si no hay solicitud seleccionada, no se ha seleccionado un nuevo estado
           // o el nuevo estado es el mismo que el actual
           return;
       }

       setSaving(true); // Usar el mismo estado de guardado
       setMessage('');
       setError('');

       console.log(`Cambiando estado de solicitud ${solicitud.id} a ${newStatus}`);

       try {
            // const response = await fetch(`/api/refugio/solicitudes/${solicitud.id}/estado`, { // Ejemplo de API PUT
            //    method: 'PUT',
            //    headers: { 'Content-Type': 'application/json' },
            //    body: JSON.stringify({ estado: newStatus }),
            // });

            // if (!response.ok) {
            //    throw new Error('Error al actualizar el estado.');
            // }

            // const updatedSolicitud = await response.json(); // Debería devolver la solicitud actualizada con historial
             const updatedSolicitud = {
                 ...solicitud,
                 estado: newStatus,
                 // Simular añadir al historial (en real esto viene del backend)
                 historialEstado: [...solicitud.historialEstado, { estado: newStatus, fecha: new Date().toISOString().split('T')[0], notas: `Estado cambiado a ${newStatus}` }]
             };


            setSolicitud(updatedSolicitud); // Actualizar el estado local
             setNewStatus(updatedSolicitud.estado); // Asegurarse de que el selector refleje el estado actual

            setMessage('Estado de la solicitud actualizado exitosamente.');

       } catch (err: any) {
           setError(`Error al actualizar estado: ${err.message}`);
           setMessage('');
       } finally {
           setSaving(false);
       }
   };


  if (loading) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>Cargando detalles de la solicitud para evaluación...</div>;
  }

  if (error) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px', color: 'red' }}>{error}</div>;
  }

  if (!solicitud) {
     return <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>No se pudo cargar la información de la solicitud.</div>;
  }


  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>Evaluación de Solicitud de Adopción</h1>

       {message && <p style={{ color: 'green', marginBottom: '15px', textAlign: 'center' }}>{message}</p>}
       {error && <p style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>{error}</p>}

      {/* Resumen de la Solicitud */}
      <div style={{ marginBottom: '30px', backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '8px' }}>
        <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Resumen de Solicitud</h2>
        <p><strong>Fecha de Solicitud:</strong> {solicitud.fechaSolicitud}</p>
        <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: solicitud.estado === 'Aprobada' ? 'green' : solicitud.estado === 'Rechazada' ? 'red' : 'orange' }}>
           Estado Actual: {solicitud.estado}
        </p>
         <p><strong>Mascota:</strong> <Link href={`/mascotas/${solicitud.mascota.id}`} style={{ color: '#007bff', textDecoration: 'none' }}>{solicitud.mascota.nombre} ({solicitud.mascota.especie})</Link></p>
         <p><strong>Adoptante:</strong> <Link href={`/usuarios/${solicitud.adoptante.id}`} style={{ color: '#007bff', textDecoration: 'none' }}>{solicitud.adoptante.nombre}</Link></p> {/* Asumiendo una página de perfil de usuario/adoptante */}
      </div>

      {/* Información del Adoptante para Evaluación */}
       <div style={{ marginBottom: '30px' }}>
          <h2 style={{ marginBottom: '15px', color: '#555' }}>Información del Adoptante</h2>
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #eee' }}>
             <p><strong>Nombre:</strong> {solicitud.adoptante.nombre}</p>
             <p><strong>Email:</strong> {solicitud.adoptante.email}</p>
             {solicitud.adoptante.telefono && <p><strong>Teléfono:</strong> {solicitud.adoptante.telefono}</p>}
             {solicitud.adoptante.direccion && <p><strong>Dirección:</strong> {solicitud.adoptante.direccion}</p>}

             {solicitud.adoptante.respuestasFormulario && solicitud.adoptante.respuestasFormulario.length > 0 && (
                <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                   <h3 style={{ marginTop: '0', marginBottom: '10px', color: '#555' }}>Respuestas al Formulario</h3>
                   {solicitud.adoptante.respuestasFormulario.map((item, index) => (
                      <div key={index} style={{ marginBottom: '15px' }}>
                         <p style={{ margin: '0', fontWeight: 'bold' }}>{item.pregunta}</p>
                         <p style={{ margin: '5px 0 0 0' }}>{item.respuesta}</p>
                      </div>
                   ))}
                </div>
             )}
             {/* Aquí iría la sección de entorno del hogar si la tienes */}
          </div>
       </div>

      {/* Información de la Mascota Solicitada */}
       <div style={{ marginBottom: '30px' }}>
           <h2 style={{ marginBottom: '15px', color: '#555' }}>Mascota Solicitada</h2>
           {/* Podrías mostrar más detalles de la mascota aquí si es necesario para la evaluación */}
           <p><strong>Nombre:</strong> {solicitud.mascota.nombre}</p>
           <p><strong>Especie:</strong> {solicitud.mascota.especie}</p>
           {solicitud.mascota.raza && <p><strong>Raza:</strong> {solicitud.mascota.raza}</p>}
           {/* Enlace a la página de detalles de la mascota si no la tienes aquí */}
           <Link href={`/mascotas/${solicitud.mascota.id}`} style={{ color: '#007bff', textDecoration: 'none', display: 'inline-block', marginTop: '10px' }}>Ver Detalles Completos de la Mascota</Link>
       </div>


      {/* Documentos Adjuntos (simulado) */}
      {solicitud.documentosAdjuntos && solicitud.documentosAdjuntos.length > 0 && (
         <div style={{ marginBottom: '30px' }}>
           <h2 style={{ marginBottom: '15px', color: '#555' }}>Documentos Adjuntos</h2>
           <ul>
              {solicitud.documentosAdjuntos.map((doc, index) => (
                 <li key={index} style={{ marginBottom: '5px' }}>
                    <a href={doc.url} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'none' }}>{doc.nombre}</a>
                 </li>
              ))}
           </ul>
           {/* Implementar lógica para visualización segura o descarga */}
         </div>
      )}

      {/* Historial de Estado Completo */}
       <div style={{ marginBottom: '30px' }}>
         <h2 style={{ marginBottom: '15px', color: '#555' }}>Historial Completo de Estado</h2>
         <div style={{ borderLeft: '2px solid #007bff', paddingLeft: '15px' }}>
            {solicitud.historialEstado
               .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()) // Ordenar por fecha
               .map((evento, index) => (
               <div key={index} style={{ marginBottom: '15px', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-22px', top: '3px', width: '12px', height: '12px', backgroundColor: '#007bff', borderRadius: '50%' }}></div>
                  <p style={{ margin: '0', fontWeight: 'bold' }}>{evento.estado}</p>
                  <p style={{ margin: '0', fontSize: '0.9rem', color: '#777' }}>{evento.fecha}</p>
                  {evento.notas && <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: '#555' }}>Notas: {evento.notas}</p>}
               </div>
            ))}
         </div>
       </div>


      {/* Notas de Evaluación del Refugio */}
       <div style={{ marginBottom: '30px' }}>
           <h2 style={{ marginBottom: '15px', color: '#555' }}>Notas de Evaluación (Refugio)</h2>
           <textarea
               value={notasRefugio}
               onChange={(e) => setNotasRefugio(e.target.value)}
               rows={5}
               style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
               placeholder="Agrega tus notas de evaluación aquí..."
           ></textarea>
            <button
                onClick={handleSaveNotes}
                 disabled={saving || notasRefugio === (solicitud.notasRefugio || '')} // Deshabilitar si está guardando o sin cambios
                style={{
                   backgroundColor: (saving || notasRefugio === (solicitud.notasRefugio || '')) ? '#ccc' : '#007bff',
                   color: '#fff',
                   padding: '8px 15px',
                   border: 'none',
                   borderRadius: '4px',
                   cursor: (saving || notasRefugio === (solicitud.notasRefugio || '')) ? 'not-allowed' : 'pointer',
                   fontSize: '1rem',
                   fontWeight: 'bold',
                   marginTop: '10px'
                }}
            >
               {saving ? 'Guardando Notas...' : 'Guardar Notas'}
           </button>
       </div>


      {/* Acciones de Evaluación (Cambio de Estado) */}
       <div style={{ marginBottom: '30px', backgroundColor: '#e9ecef', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
          <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Cambiar Estado de Solicitud</h2>
           <select
             value={newStatus}
             onChange={(e) => setNewStatus(e.target.value as SolicitudParaEvaluacion['estado'])}
              style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', marginRight: '10px', fontSize: '1rem' }}
              disabled={saving} // Deshabilitar si está guardando notas o estado
           >
              <option value="Pendiente">Pendiente</option>
              <option value="En revisión">En revisión</option>
              <option value="Aprobada">Aprobada</option>
              <option value="Rechazada">Rechazada</option>
              {/* Considera añadir otros estados como 'Cancelada', 'Finalizada' si aplica */}
           </select>
            <button
                onClick={handleChangeStatus}
                disabled={saving || !newStatus || newStatus === solicitud.estado} // Deshabilitar si está guardando, sin nuevo estado, o sin cambios
                style={{
                   backgroundColor: (saving || !newStatus || newStatus === solicitud.estado) ? '#ccc' : '#28a745', // Verde para aprobar/cambiar estado
                   color: '#fff',
                   padding: '10px 20px',
                   border: 'none',
                   borderRadius: '4px',
                   cursor: (saving || !newStatus || newStatus === solicitud.estado) ? 'not-allowed' : 'pointer',
                   fontSize: '1.1rem',
                   fontWeight: 'bold',
                }}
            >
               {saving ? 'Actualizando...' : 'Actualizar Estado'}
           </button>
           {/* Podrías añadir botones separados para Aprobar/Rechazar para mayor prominencia */}
           {/*
           <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
               <button style={{ ... }}>Aprobar Solicitud</button> // Verde
               <button style={{ ... }}>Rechazar Solicitud</button> // Rojo
           </div>
           */}
       </div>

        {/* Sección para test de compatibilidad, visitas, comunicación (Comentado) */}
         {/*
          <div style={{ marginBottom: '30px' }}>
              <h2 style={{ marginBottom: '15px', color: '#555' }}>Herramientas Adicionales</h2>
              // Botón para iniciar Test de Compatibilidad
              // Botón para programar Visita Previa
              // Botón para enviar Mensaje al Adoptante
          </div>
         */}


    </div>
  );
};

export default EvaluarSolicitudPage;
