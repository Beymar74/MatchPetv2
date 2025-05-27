// src/app/refugio/voluntarios/horas/seguimiento/page.tsx
'use client';

import React, { useState, useEffect } from 'react';

// Interfaz para un registro de horas
interface RegistroHoras {
  id: string;
  voluntarioId: string; // ID del voluntario
  voluntarioNombre: string; // Nombre del voluntario (para visualización)
  fecha: string; // Formato 'YYYY-MM-DD'
  tareaActividad: string;
  horas: number;
  notas: string;
  estado: 'Pendiente' | 'Aprobado' | 'Rechazado';
  // Otros campos como fecha de registro, aprobado por, etc.
}

// Simulación de datos de registros de horas
const mockRegistrosHoras: RegistroHoras[] = [
  {
    id: 'reg1',
    voluntarioId: 'vol1',
    voluntarioNombre: 'Juan Pérez',
    fecha: '2023-11-15',
    tareaActividad: 'Pasear perros del sector A',
    horas: 4.5,
    notas: 'Los perros se portaron muy bien hoy. Sector limpio al finalizar.',
    estado: 'Aprobado',
  },
  {
    id: 'reg2',
    voluntarioId: 'vol2',
    voluntarioNombre: 'María García',
    fecha: '2023-11-14',
    tareaActividad: 'Actualización de redes sociales',
    horas: 2.0,
    notas: 'Se publicaron 3 posts con fotos de gatos disponibles.',
    estado: 'Aprobado',
  },
  {
    id: 'reg3',
    voluntarioId: 'vol1',
    voluntarioNombre: 'Juan Pérez',
    fecha: '2023-11-16',
    tareaActividad: 'Limpieza general de gateras',
    horas: 3.0,
    notas: 'Se limpiaron 5 gateras. Se detectó un gato con estornudos en la gatera 3.',
    estado: 'Pendiente', // Registro pendiente de aprobación
  },
   {
    id: 'reg4',
    voluntarioId: 'vol3',
    voluntarioNombre: 'Carlos Rodríguez',
    fecha: '2023-11-12',
    tareaActividad: 'Transporte de animal al veterinario',
    horas: 1.5,
    notas: 'Transporte de Luna a la clínica veterinaria ABC para vacuna anual.',
    estado: 'Aprobado',
  },
    {
    id: 'reg5',
    voluntarioId: 'vol2',
    voluntarioNombre: 'María García',
    fecha: '2023-11-16',
    tareaActividad: 'Preparar kit de adopción',
    horas: 1.0,
    notas: 'Kits preparados para las 3 adopciones confirmadas del sábado.',
    estado: 'Pendiente',
  },
   {
    id: 'reg6',
    voluntarioId: 'vol4',
    voluntarioNombre: 'Laura Fernández',
    fecha: '2023-11-15',
    tareaActividad: 'Cuidado de gatos',
    horas: 2.0,
    notas: 'Juego y socialización con los gatitos en el área común.',
    estado: 'Aprobado',
  },
];


const SeguimientoHorasRefugioPage = () => {
  const [registros, setRegistros] = useState<RegistroHoras[]>([]);
  const [registrosFiltrados, setRegistrosFiltrados] = useState<RegistroHoras[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filtroVoluntario, setFiltroVoluntario] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');
   const [message, setMessage] = useState(''); // Mensajes de éxito o error

   // Para simular la lista de voluntarios para el filtro
   const [voluntariosDisponibles, setVoluntariosDisponibles] = useState<{ id: string, nombre: string }[]>([]);


  // Cargar los registros de horas y la lista de voluntarios para filtro
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        // **Integración real:**
        // Fetch de registros de horas del refugio:
        // const registrosResponse = await fetch('/api/refugio/horas');
        // if (!registrosResponse.ok) throw new Error('Error al cargar registros de horas.');
        // const registrosData: RegistroHoras[] = await registrosResponse.json();
        // setRegistros(registrosData);

        // Fetch de la lista de voluntarios del refugio (simplificado para filtro):
        // const voluntariosResponse = await fetch('/api/refugio/voluntarios/lista-simple');
        // if (!voluntariosResponse.ok) throw new Error('Error al cargar lista de voluntarios.');
        // const voluntariosData = await voluntariosResponse.json();
        // setVoluntariosDisponibles(voluntariosData);


        // **Simulación con mock data:**
        setRegistros(mockRegistrosHoras);

         // Extraer voluntarios únicos de la mock data para el filtro
        const uniqueVolunteers = Array.from(new Set(mockRegistrosHoras.map(reg => reg.voluntarioId)))
            .map(id => {
                 const reg = mockRegistrosHoras.find(r => r.voluntarioId === id);
                 return { id: id, nombre: reg ? reg.voluntarioNombre : `Voluntario ${id}` };
            });
        setVoluntariosDisponibles(uniqueVolunteers);


      } catch (err: any) {
        setError(err.message || 'Error al cargar los datos.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []); // Se ejecuta una vez al montar el componente


  // Aplicar filtros cada vez que cambian los registros o los filtros
  useEffect(() => {
    let filtered = registros;

    if (filtroVoluntario) {
      filtered = filtered.filter(registro => registro.voluntarioId === filtroVoluntario);
    }

    if (filtroFecha) {
      filtered = filtered.filter(registro => registro.fecha === filtroFecha);
    }

    // Aquí podrías añadir lógica de ordenación si es necesaria

    setRegistrosFiltrados(filtered);
  }, [registros, filtroVoluntario, filtroFecha]);


   // Manejar el cambio de estado de un registro de horas (simulación)
    const handleEstadoChange = async (registroId: string, nuevoEstado: RegistroHoras['estado']) => {
        setLoading(true); // O un estado de "actualizando" por fila
        setMessage('');
        setError('');

        console.log(`Simulando cambio de estado para registro ${registroId} a: ${nuevoEstado}`);

        try {
             // Aquí iría la llamada API para actualizar el estado del registro de horas
             // const response = await fetch(`/api/refugio/horas/${registroId}/estado`, {
             //    method: 'PUT', // O PATCH
             //    headers: { 'Content-Type': 'application/json' },
             //    body: JSON.stringify({ estado: nuevoEstado }),
             // });

             // if (!response.ok) {
             //    throw new Error('Error al actualizar el estado.');
             // }

             // Simulación de actualización local del estado
             setRegistros(prevRegistros =>
                prevRegistros.map(registro =>
                    registro.id === registroId ? { ...registro, estado: nuevoEstado } : registro
                )
             );

             // Simular un pequeño retraso para la operación de guardado
             await new Promise(resolve => setTimeout(resolve, 300));


             setMessage(`Estado del registro ${registroId} actualizado a "${nuevoEstado}".`);

        } catch (err: any) {
             setError(`Error al actualizar estado: ${err.message || 'Desconocido'}`);
             setMessage('');
        } finally {
             setLoading(false); // O el estado de "actualizando" por fila
        }
    };


    // Calcular total de horas filtradas (simulación)
    const totalHorasFiltradas = registrosFiltrados.reduce((sum, registro) => sum + registro.horas, 0).toFixed(1);


  if (loading) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>Cargando registros de horas...</div>;
  }

  if (error) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px', color: 'red' }}>{error}</div>;
  }


  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>Seguimiento de Horas de Voluntarios</h1>

        {message && (
            <p style={{ color: message.includes('Error') ? 'red' : 'green', marginBottom: '15px', textAlign: 'center' }}>
                {message}
            </p>
        )}


       {/* Área de Filtros y Resumen */}
       <div style={{ marginBottom: '20px', backgroundColor: '#e9ecef', padding: '15px', borderRadius: '8px' }}>
            <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Filtros y Resumen</h2>

            {/* Filtros Simulados */}
             <div style={{ display: 'flex', gap: '20px', marginBottom: '15px', flexWrap: 'wrap' }}>
                 <div>
                     <label htmlFor="filtroVoluntario" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Voluntario:</label>
                     <select
                         id="filtroVoluntario"
                         value={filtroVoluntario}
                         onChange={(e) => setFiltroVoluntario(e.target.value)}
                          style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                     >
                         <option value="">Todos</option>
                         {voluntariosDisponibles.map(vol => (
                             <option key={vol.id} value={vol.id}>{vol.nombre}</option>
                         ))}
                     </select>
                 </div>
                 <div>
                     <label htmlFor="filtroFecha" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Fecha:</label>
                      {/* Input type="date" para filtro por fecha específica */}
                     <input
                         type="date"
                         id="filtroFecha"
                         value={filtroFecha}
                         onChange={(e) => setFiltroFecha(e.target.value)}
                          style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                     />
                     {/* Podría ser un selector de rango de fechas más avanzado */}
                 </div>
             </div>

            {/* Resumen de Horas Filtradas */}
             <div style={{ textAlign: 'center', marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #ccc' }}>
                 <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '0', color: '#333' }}>
                     Total de Horas (filtradas): {totalHorasFiltradas}
                 </p>
             </div>

       </div>


      {/* Tabla de Registros de Horas */}
      <div style={{ overflowX: 'auto' }}> {/* Para hacer la tabla responsive */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#007bff', color: '#fff', textAlign: 'left' }}>
              <th style={{ padding: '12px 15px' }}>Voluntario</th>
              <th style={{ padding: '12px 15px' }}>Fecha</th>
              <th style={{ padding: '12px 15px' }}>Tarea/Actividad</th>
              <th style={{ padding: '12px 15px' }}>Horas</th>
              <th style={{ padding: '12px 15px' }}>Notas</th>
               <th style={{ padding: '12px 15px', width: '150px' }}>Estado</th> {/* Ancho fijo para estado/selector */}
            </tr>
          </thead>
          <tbody>
            {registrosFiltrados.length === 0 ? (
               <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '20px', color: '#777' }}>No se encontraron registros de horas con los filtros aplicados.</td>
               </tr>
            ) : (
               registrosFiltrados.map((registro) => (
                  <tr key={registro.id} style={{ borderBottom: '1px solid #eee' }}>
                     <td style={{ padding: '12px 15px' }}>{registro.voluntarioNombre}</td>
                     <td style={{ padding: '12px 15px' }}>{registro.fecha}</td>
                     <td style={{ padding: '12px 15px' }}>{registro.tareaActividad}</td>
                     <td style={{ padding: '12px 15px' }}>{registro.horas}</td>
                     <td style={{ padding: '12px 15px' }}>
                        {registro.notas.length > 50 ? `${registro.notas.substring(0, 50)}...` : registro.notas}
                         {/* Implementar un modal o expansión para ver notas completas si es necesario */}
                     </td>
                     <td style={{ padding: '12px 15px' }}>
                         {/* Selector para cambiar el estado */}
                         <select
                             value={registro.estado}
                             onChange={(e) => handleEstadoChange(registro.id, e.target.value as RegistroHoras['estado'])}
                             style={{
                                 padding: '5px',
                                 border: '1px solid #ccc',
                                 borderRadius: '4px',
                                  fontSize: '0.9rem',
                                 backgroundColor: registro.estado === 'Aprobado' ? '#d4edda' : registro.estado === 'Rechazado' ? '#f8d7da' : '#fff',
                                 color: registro.estado === 'Aprobado' ? '#155724' : registro.estado === 'Rechazado' ? '#721c24' : '#333',
                             }}
                             disabled={loading} // Deshabilitar si hay una operación en curso
                         >
                             <option value="Pendiente">Pendiente</option>
                             <option value="Aprobado">Aprobado</option>
                             <option value="Rechazado">Rechazado</option>
                         </select>
                     </td>
                  </tr>
               ))
            )}
          </tbody>
        </table>
      </div>

       {/* Aquí iría la paginación si tienes muchos registros */}


    </div>
  );
};

export default SeguimientoHorasRefugioPage;