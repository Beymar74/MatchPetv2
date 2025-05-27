// src/app/refugio/voluntarios/[id]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link'; // Si quieres enlazar a tareas o registro de horas


// Interfaz para el detalle del perfil de un voluntario
interface PerfilVoluntario {
  id: string;
  nombreCompleto: string;
  email: string;
  telefono?: string;
  disponibilidad: string; // Texto descriptivo
  areasInteres: string[]; // Lista de strings
  experienciaPrevia: string; // Texto descriptivo
  fechaInicio: string; // Formato 'YYYY-MM-DD'
  estado: 'Activo' | 'Inactivo' | 'En pausa' | 'Pendiente';
  notasInternas?: string; // Notas internas del refugio
  // Otros campos como dirección, historial de cambios de estado, etc.
}

// Simulación de datos de perfiles de voluntarios
const mockPerfilesVoluntarios: PerfilVoluntario[] = [
  {
    id: 'vol1',
    nombreCompleto: 'Juan Pérez',
    email: 'juan.perez@example.com',
    telefono: '555-1234',
    disponibilidad: 'Lunes y Miércoles por la tarde (14:00-18:00), Sábados por la mañana (9:00-13:00).',
    areasInteres: ['Cuidado Animal Directo', 'Eventos y Recaudación'],
    experienciaPrevia: 'He cuidado mascotas toda mi vida. Participé en eventos de recaudación para otra ONG.',
    fechaInicio: '2023-01-10',
    estado: 'Activo',
    notasInternas: 'Muy proactivo con los perros. Buen trato con el público en eventos.'
  },
  {
    id: 'vol2',
    nombreCompleto: 'María García',
    email: 'maria.garcia@example.com',
    telefono: '555-5678',
    disponibilidad: 'Martes y Jueves por la mañana (10:00-14:00).',
    areasInteres: ['Administración y Oficina', 'Difusión y Redes Sociales'],
    experienciaPrevia: 'Trabajé como asistente administrativa por 5 años. Manejo de redes sociales personales.',
    fechaInicio: '2023-03-20',
    estado: 'Activo',
    notasInternas: 'Organizada y detallista. Podría ayudar con la publicación de posts.'
  },
   {
    id: 'vol3',
    nombreCompleto: 'Carlos Rodríguez',
    email: 'carlos.r@example.com',
     telefono: '555-9012',
    disponibilidad: 'Disponible para emergencias de transporte, especialmente fines de semana.',
    areasInteres: ['Transporte'],
    experienciaPrevia: 'Tengo vehículo propio (camioneta). He transportado animales para rescates anteriormente.',
    fechaInicio: '2023-06-01',
    estado: 'En pausa', // Ejemplo de estado En pausa
    notasInternas: 'Muy útil para traslados de animales grandes o jaulas. Contactar con antelación.'
  },
];


const PerfilVoluntarioPage = () => {
  const params = useParams();
  const voluntarioId = params.id as string; // Obtener el ID de la URL

  const [perfilVoluntario, setPerfilVoluntario] = useState<PerfilVoluntario | null>(null);
  const [notasInternas, setNotasInternas] = useState('');
  const [estadoVoluntario, setEstadoVoluntario] = useState<PerfilVoluntario['estado']>('Activo'); // Estado para el selector de estado
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); // Estado para guardar notas/estado
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');


  // Cargar los datos del perfil del voluntario específico
  useEffect(() => {
    if (!voluntarioId) return;

    const fetchPerfilVoluntario = async () => {
      setLoading(true);
      setError('');
      try {
        // const response = await fetch(`/api/refugio/voluntarios/${voluntarioId}`); // Ejemplo de API
        // if (!response.ok) {
        //    if (response.status === 404) {
        //       throw new Error('Voluntario no encontrado o no tienes permisos.');
        //    }
        //    throw new Error('Error al cargar el perfil del voluntario.');
        // }
        // const data: PerfilVoluntario = await response.json();
        // setPerfilVoluntario(data);
        // setNotasInternas(data.notasInternas || ''); // Cargar notas existentes
        // setEstadoVoluntario(data.estado); // Cargar estado existente

        // Simular la carga con mock data
        const foundVoluntario = mockPerfilesVoluntarios.find(v => v.id === voluntarioId);
        if (foundVoluntario) {
          setPerfilVoluntario(foundVoluntario);
          setNotasInternas(foundVoluntario.notasInternas || '');
          setEstadoVoluntario(foundVoluntario.estado);
        } else {
          setError('Voluntario no encontrado o no tienes permisos.');
        }

      } catch (err: any) {
        setError(err.message || 'Error al cargar el perfil del voluntario.');
      } finally {
        setLoading(false);
      }
    };
    fetchPerfilVoluntario();
  }, [voluntarioId]); // Dependencia: el efecto se ejecuta cuando cambia el voluntarioId


   // Manejar cambio en el selector de estado
   const handleEstadoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
       setEstadoVoluntario(e.target.value as PerfilVoluntario['estado']);
        setMessage(''); // Limpiar mensajes al interactuar
   };

   // Manejar cambio en el área de texto de notas
   const handleNotasChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
       setNotasInternas(e.target.value);
       setMessage(''); // Limpiar mensajes al interactuar
   };


   // Guardar notas internas y/o estado (simulación)
    const handleSave = async () => {
        if (!perfilVoluntario) return;

        // Verificar si hay cambios para guardar
        const notesChanged = notasInternas !== (perfilVoluntario.notasInternas || '');
        const statusChanged = estadoVoluntario !== perfilVoluntario.estado;

        if (!notesChanged && !statusChanged) {
            setMessage('No hay cambios para guardar.');
            return;
        }

        setSaving(true);
        setMessage('');
        setError('');

        console.log(`Simulando guardar cambios para voluntario ${perfilVoluntario.id}:`, {
             notasInternas: notesChanged ? notasInternas.trim() : undefined, // Solo enviar si cambiaron
             estado: statusChanged ? estadoVoluntario : undefined // Solo enviar si cambió
        });


        try {
            // Aquí iría la llamada API para actualizar el perfil del voluntario
            // const response = await fetch(`/api/refugio/voluntarios/${perfilVoluntario.id}`, {
            //   method: 'PUT', // O PATCH
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({
            //      notasInternas: notesChanged ? notasInternas.trim() : undefined,
            //      estado: statusChanged ? estadoVoluntario : undefined
            //   }),
            // });

            // if (!response.ok) {
            //    throw new Error('Error al guardar los cambios.');
            // }

            // const updatedPerfil = await response.json(); // Opcional: obtener el perfil actualizado del backend
             // setPerfilVoluntario(updatedPerfil); // Actualizar estado con datos del backend
             // setNotasInternas(updatedPerfil.notasInternas || ''); // Asegurarse de que las notas se actualicen por si el backend las limpia
             // setEstadoVoluntario(updatedPerfil.estado); // Asegurarse de que el estado se actualice

            // Simulación de actualización local del estado
            setPerfilVoluntario(prevPerfil => {
                if (!prevPerfil) return null;
                return {
                    ...prevPerfil,
                    notasInternas: notasInternas.trim(),
                    estado: estadoVoluntario
                };
            });

            setMessage('Cambios guardados exitosamente.');

        } catch (err: any) {
            setError(`Error al guardar cambios: ${err.message}`);
            setMessage(''); // Limpiar mensaje de éxito si hay error
        } finally {
            setSaving(false);
        }
    };


  if (loading) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>Cargando perfil del voluntario...</div>;
  }

  if (error) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px', color: 'red' }}>{error}</div>;
  }

  if (!perfilVoluntario) {
     return <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>No se pudo cargar el perfil del voluntario.</div>;
  }


  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>Perfil de Voluntario: {perfilVoluntario.nombreCompleto}</h1>

       {message && (
            <p style={{ color: message.includes('Error') ? 'red' : 'green', marginBottom: '15px', textAlign: 'center' }}>
                {message}
            </p>
       )}

      {/* Información de Contacto */}
      <div style={{ marginBottom: '30px', backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '8px' }}>
        <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Información de Contacto</h2>
        <p style={{ marginBottom: '10px' }}><strong>Nombre Completo:</strong> {perfilVoluntario.nombreCompleto}</p>
        <p style={{ marginBottom: '10px' }}><strong>Email:</strong> {perfilVoluntario.email}</p>
        {perfilVoluntario.telefono && <p style={{ marginBottom: '10px' }}><strong>Teléfono:</strong> {perfilVoluntario.telefono}</p>}
        {/* Añadir dirección u otra info de contacto si aplica */}
      </div>

      {/* Disponibilidad y Áreas de Interés */}
       <div style={{ marginBottom: '30px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #eee' }}>
           <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Disponibilidad y Áreas de Interés</h2>
            <p style={{ marginBottom: '10px' }}><strong>Disponibilidad:</strong> {perfilVoluntario.disponibilidad || 'No especificada'}</p>
           <p style={{ marginBottom: '10px' }}><strong>Áreas de Interés:</strong> {perfilVoluntario.areasInteres.join(', ') || 'No especificadas'}</p>
       </div>

        {/* Experiencia Previa */}
        <div style={{ marginBottom: '30px', backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '8px' }}>
            <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Experiencia Previa</h2>
            <p style={{ marginBottom: '0' }}>{perfilVoluntario.experienciaPrevia || 'No especificada'}</p>
        </div>


      {/* Datos Administrativos */}
       <div style={{ marginBottom: '30px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #eee' }}>
           <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Datos Administrativos</h2>
            <p style={{ marginBottom: '15px' }}><strong>Fecha de Inicio:</strong> {perfilVoluntario.fechaInicio}</p>

             {/* Selector de Estado */}
             <div style={{ marginBottom: '10px' }}>
                 <label htmlFor="estadoVoluntario" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Estado:</label>
                 <select
                     id="estadoVoluntario"
                     name="estadoVoluntario"
                     value={estadoVoluntario}
                     onChange={handleEstadoChange}
                     style={{ width: 'calc(100% - 22px)', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
                 >
                     <option value="Activo">Activo</option>
                     <option value="Inactivo">Inactivo</option>
                     <option value="En pausa">En pausa</option>
                      {/* Podrías añadir otros estados como 'Pendiente' o 'Archivado' */}
                 </select>
             </div>
       </div>


      {/* Notas Internas del Refugio */}
       <div style={{ marginBottom: '30px', backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '8px' }}>
           <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Notas Internas (para el refugio)</h2>
           <textarea
               value={notasInternas}
               onChange={handleNotasChange}
               rows={6}
               style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem', marginBottom: '10px' }}
               placeholder="Añade notas internas sobre este voluntario (historial, desempeño, etc.)..."
           ></textarea>
            <button
                onClick={handleSave}
                disabled={saving} // Deshabilitar si está guardando
                style={{
                   backgroundColor: saving ? '#ccc' : '#007bff',
                   color: '#fff',
                   padding: '10px 20px',
                   border: 'none',
                   borderRadius: '4px',
                   cursor: saving ? 'not-allowed' : 'pointer',
                   fontSize: '1rem',
                   fontWeight: 'bold',
                }}
            >
               {saving ? 'Guardando...' : 'Guardar Cambios'}
           </button>
       </div>

        {/* Enlaces a otras secciones relevantes (Comentado) */}
         {/*
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
               <Link href={`/refugio/voluntarios/${voluntarioId}/tareas`} style={{ margin: '0 10px', color: '#007bff', textDecoration: 'none' }}>Ver Tareas Asignadas</Link>
                <Link href={`/refugio/voluntarios/${voluntarioId}/horas`} style={{ margin: '0 10px', color: '#007bff', textDecoration: 'none' }}>Ver Registro de Horas</Link>
          </div>
         */}


    </div>
  );
};

export default PerfilVoluntarioPage;