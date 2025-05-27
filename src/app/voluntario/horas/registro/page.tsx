// src/app/voluntario/horas/registro/page.tsx
'use client';

import React, { useState, useEffect } from 'react';

// Interfaz para un registro de horas
interface RegistroHoras {
  id: string;
  fecha: string; // Formato 'YYYY-MM-DD'
  tareaActividad: string; // Nombre de la tarea/actividad
  horas: number; // Cantidad de horas (puede ser decimal)
  notas?: string; // Notas adicionales
}

// Simulación de opciones de tareas/actividades disponibles para seleccionar
const mockTareasActividades = [
    { id: 'tarea_paseo', nombre: 'Pasear perros' },
    { id: 'tarea_limpieza', nombre: 'Limpieza general' },
    { id: 'tarea_eventos', nombre: 'Apoyo en eventos' },
    { id: 'tarea_admin', nombre: 'Tareas administrativas' },
    { id: 'tarea_transporte', nombre: 'Transporte de animales' },
    { id: 'act_general', nombre: 'Actividad General (Especificar en notas)' },
];


// Simulación de historial de registros de horas para un voluntario (asumimos un voluntario logueado con ID 'voluntario123')
const mockHistorialHoras: RegistroHoras[] = [
  {
    id: 'reg1',
    fecha: '2023-11-15',
    tareaActividad: 'Pasear perros',
    horas: 3.5,
    notas: 'Sector A, perros grandes.',
  },
  {
    id: 'reg2',
    fecha: '2023-11-14',
    tareaActividad: 'Limpieza general',
    horas: 2,
    notas: 'Limpieza de caniles 1-10.',
  },
   {
    id: 'reg3',
    fecha: '2023-11-10',
    tareaActividad: 'Apoyo en eventos',
    horas: 5,
    notas: 'Evento de adopción en el parque.',
  },
];


const RegistroHorasVoluntarioPage = () => {
  // Asumimos que el ID del voluntario se obtiene del contexto de autenticación
  const voluntarioId = 'voluntario123'; // Simulación de ID de voluntario logueado


  const [historialHoras, setHistorialHoras] = useState<RegistroHoras[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); // Estado para guardar
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({ // Estado para el formulario de nuevo registro
    tareaActividadId: '', // Guardamos el ID de la tarea/actividad seleccionada
    fecha: '',
    horas: '', // Usamos string inicialmente para el input number
    notas: '',
  });


  // Cargar el historial de horas del voluntario al montar el componente
  useEffect(() => {
    const fetchHistorial = async () => {
      setLoading(true);
      setError('');
      try {
        // Aquí iría la llamada API para obtener el historial de horas del voluntario logueado
        // const response = await fetch(`/api/voluntario/${voluntarioId}/horas`); // Ejemplo de API
        // if (!response.ok) {
        //    throw new Error('Error al cargar el historial de horas.');
        // }
        // const data: RegistroHoras[] = await response.json();
        // setHistorialHoras(data);

        // Simular la carga con mock data
        // En un caso real, esta data sería filtrada por el voluntarioId
        setHistorialHoras(mockHistorialHoras);

      } catch (err: any) {
        setError(err.message || 'Error al cargar el historial de horas.');
      } finally {
        setLoading(false);
      }
    };
    fetchHistorial();
  }, [voluntarioId]); // Dependencia: recargar si cambia el ID del voluntario (ej. al cambiar de usuario)


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
     setMessage(''); // Limpiar mensajes al interactuar
  };

   const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       const { name, value } = e.target;
        // Permitir números decimales
       if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
           setFormData({ ...formData, [name]: value });
            setMessage('');
       }
   };


  // Manejar el envío del formulario de registro de horas
  const handleSubmitRegistro = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validación básica
     const horasNum = parseFloat(formData.horas);
     if (!formData.tareaActividadId || !formData.fecha || isNaN(horasNum) || horasNum <= 0) {
         setMessage('Por favor, selecciona una actividad, fecha e ingresa una cantidad de horas válida.');
         return;
     }

    setSaving(true);
    setMessage('');
    setError('');

     // Buscar el nombre de la tarea/actividad seleccionada
     const tareaSeleccionada = mockTareasActividades.find(t => t.id === formData.tareaActividadId);
     const nombreTarea = tareaSeleccionada ? tareaSeleccionada.nombre : 'Actividad Desconocida';


    console.log('Simulando registrar horas:', {
        voluntarioId: voluntarioId,
        fecha: formData.fecha,
        tareaActividadId: formData.tareaActividadId, // Podrías enviar solo el ID al backend
        tareaActividadNombre: nombreTarea, // O enviar el nombre para registro
        horas: horasNum,
        notas: formData.notas.trim(),
    });

    try {
        // Aquí iría la llamada API para guardar el nuevo registro de horas
        // const response = await fetch(`/api/voluntario/${voluntarioId}/horas`, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //      fecha: formData.fecha,
        //      tareaActividadId: formData.tareaActividadId,
        //      horas: horasNum,
        //      notas: formData.notas.trim(),
        //   }),
        // });

        // if (!response.ok) {
        //    throw new Error('Error al guardar el registro de horas.');
        // }

        // const newRegistro: RegistroHoras = await response.json(); // Backend podría devolver el nuevo registro con ID

        // Simulación de agregar el nuevo registro al historial local
         const newSimulatedRegistro: RegistroHoras = {
             id: `reg${Date.now()}`, // ID simulado
             fecha: formData.fecha,
             tareaActividad: nombreTarea, // Usamos el nombre para mostrar en la tabla
             horas: horasNum,
             notas: formData.notas.trim(),
         };
         // Añadir al principio para que se vea primero
        setHistorialHoras([newSimulatedRegistro, ...historialHoras]);


        setMessage('Registro de horas guardado exitosamente. ¡Gracias!');
        // Limpiar el formulario después de guardar
        setFormData({
            tareaActividadId: '',
            fecha: '',
            horas: '',
            notas: '',
        });

    } catch (err: any) {
        setError(`Error al guardar el registro: ${err.message || 'Desconocido'}`);
         setMessage(''); // Limpiar mensaje de éxito si hay error
    } finally {
        setSaving(false);
    }
  };


  if (loading && historialHoras.length === 0) { // Mostrar "Cargando" solo si no hay datos cargados
    return <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>Cargando historial de horas...</div>;
  }

  if (error) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px', color: 'red' }}>{error}</div>;
  }


  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>Registro de Horas de Voluntariado</h1>

       {message && (
            <p style={{ color: message.includes('Error') ? 'red' : 'green', marginBottom: '15px', textAlign: 'center' }}>
                {message}
            </p>
       )}

      {/* Formulario de Registro */}
      <div style={{ marginBottom: '40px', backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '8px' }}>
        <h2 style={{ marginTop: '0', marginBottom: '20px', color: '#555', textAlign: 'center' }}>Registrar Nuevas Horas</h2>
        <form onSubmit={handleSubmitRegistro}>

          {/* Selección de Tarea/Actividad */}
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="tareaActividadId" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Tarea/Actividad:</label>
            <select
              id="tareaActividadId"
              name="tareaActividadId"
              value={formData.tareaActividadId}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
              required
               disabled={saving}
            >
              <option value="">-- Selecciona una actividad --</option>
              {/* Aquí mapearías las tareas o actividades disponibles para este voluntario (desde backend) */}
              {mockTareasActividades.map(tarea => (
                 <option key={tarea.id} value={tarea.id}>{tarea.nombre}</option>
              ))}
            </select>
          </div>

          {/* Fecha y Horas */}
          <div style={{ marginBottom: '15px', display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1 }}>
              <label htmlFor="fecha" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Fecha:</label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                value={formData.fecha}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
                required
                 disabled={saving}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor="horas" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Horas Dedicadas:</label>
              <input
                type="number"
                id="horas"
                name="horas"
                value={formData.horas}
                 onChange={handleNumberInputChange} // Usar el handler específico para números
                step="0.5" // Permitir medios puntos (ej. 2.5 horas)
                min="0.5" // Mínimo 0.5 horas
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
                required
                 disabled={saving}
              />
            </div>
          </div>

          {/* Notas/Comentarios */}
           <div style={{ marginBottom: '20px' }}>
               <label htmlFor="notas" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Notas/Comentarios (Opcional):</label>
               <textarea
                   id="notas"
                   name="notas"
                   value={formData.notas}
                   onChange={handleInputChange}
                   rows={3}
                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
                    placeholder="Ej: Tareas específicas realizadas, perros paseados, desafíos encontrados..."
                     disabled={saving}
               ></textarea>
           </div>


          {/* Botón de Enviar */}
          <div style={{ textAlign: 'center' }}>
            <button
              type="submit"
              disabled={saving || loading} // Deshabilitar si está guardando o cargando
              style={{
                backgroundColor: (saving || loading) ? '#ccc' : '#28a745', // Verde o gris si guardando/cargando
                color: '#fff',
                padding: '12px 30px',
                border: 'none',
                borderRadius: '4px',
                cursor: (saving || loading) ? 'not-allowed' : 'pointer',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                transition: 'background-color 0.3s ease',
              }}
            >
              {saving ? 'Guardando...' : 'Guardar Registro'}
            </button>
          </div>

        </form>
      </div>


      {/* Historial de Registros */}
      <div style={{ marginTop: '40px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #eee' }}>
        <h2 style={{ marginBottom: '20px', color: '#555', textAlign: 'center' }}>Historial de Mis Registros</h2>

         {/* Aquí podrías añadir un resumen de horas totales */}
          {/* <p style={{ textAlign: 'center', marginBottom: '15px', fontWeight: 'bold' }}>
              Total de Horas Registradas: {historialHoras.reduce((sum, entry) => sum + entry.horas, 0).toFixed(1)} {/* Suma simple simulada *
          </p> */}


        <div style={{ overflowX: 'auto' }}> {/* Para hacer la tabla responsive */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ backgroundColor: '#007bff', color: '#fff', textAlign: 'left' }}>
                <th style={{ padding: '12px 15px' }}>Fecha</th>
                <th style={{ padding: '12px 15px' }}>Tarea/Actividad</th>
                <th style={{ padding: '12px 15px' }}>Horas</th>
                <th style={{ padding: '12px 15px' }}>Notas</th>
                 {/* Podrías añadir una columna para acciones como Editar/Eliminar */}
              </tr>
            </thead>
            <tbody>
              {historialHoras.length === 0 ? (
                 <tr>
                    <td colSpan={4} style={{ textAlign: 'center', padding: '20px', color: '#777' }}>Aún no has registrado horas.</td>
                 </tr>
              ) : (
                 historialHoras.map((registro) => (
                    <tr key={registro.id} style={{ borderBottom: '1px solid #eee' }}>
                       <td style={{ padding: '12px 15px' }}>{registro.fecha}</td>
                       <td style={{ padding: '12px 15px' }}>{registro.tareaActividad}</td>
                       <td style={{ padding: '12px 15px' }}>{registro.horas.toFixed(1)}</td> {/* Formatear horas */}
                       <td style={{ padding: '12px 15px', maxWidth: '300px', overflowWrap: 'break-word' }}>{registro.notas || '-'}</td> {/* Notas */}
                    </tr>
                 ))
              )}
            </tbody>
          </table>
        </div>

         {/* Aquí iría la paginación si el historial es muy largo */}


      </div>

    </div>
  );
};

export default RegistroHorasVoluntarioPage;