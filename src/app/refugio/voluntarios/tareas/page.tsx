// src/app/refugio/voluntarios/tareas/page.tsx
'use client';

import React, { useState, useEffect } from 'react';

// Interfaz para una tarea de voluntariado
interface TareaVoluntariado {
  id: string;
  titulo: string;
  descripcion: string;
  fechaLimite: string; // Formato 'YYYY-MM-DD'
  voluntariosAsignadosIds: string[]; // IDs de los voluntarios asignados
  estado: 'Pendiente' | 'En progreso' | 'Completada' | 'Cancelada'; // Ejemplo de estados
  // Otros campos como fecha de creación, prioridad, etc.
}

// Interfaz para un voluntario simplificado (para el selector)
interface VoluntarioSimplificado {
    id: string;
    nombre: string;
}

// Simulación de datos de tareas
const mockTareas: TareaVoluntariado[] = [
  {
    id: 'tarea1',
    titulo: 'Pasear perros del sector A',
    descripcion: 'Pasear a los perros en los caniles 1-5. Asegurarse de darles agua fresca.',
    fechaLimite: '2023-11-20',
    voluntariosAsignadosIds: ['vol1', 'vol4'],
    estado: 'En progreso',
  },
  {
    id: 'tarea2',
    titulo: 'Limpieza general de gateras',
    descripcion: 'Limpiar todas las gateras y cambiar la arena.',
    fechaLimite: '2023-11-18',
    voluntariosAsignadosIds: ['vol2'],
    estado: 'Pendiente',
  },
   {
    id: 'tarea3',
    titulo: 'Preparar kit de adopción',
    descripcion: 'Preparar kits con información y muestras de alimento para las adopciones del sábado.',
    fechaLimite: '2023-11-19',
    voluntariosAsignadosIds: ['vol2', 'vol3'],
    estado: 'Pendiente',
  },
   {
    id: 'tarea4',
    titulo: 'Revisar inventario de alimentos',
    descripcion: 'Verificar las existencias de alimento seco y húmedo.',
    fechaLimite: '2023-11-17',
    voluntariosAsignadosIds: [], // Tarea sin asignar
    estado: 'Pendiente',
  },
    {
    id: 'tarea5',
    titulo: 'Actualizar redes sociales',
    descripcion: 'Publicar fotos y historias de los animales disponibles para adopción.',
    fechaLimite: '2023-11-16',
    voluntariosAsignadosIds: ['vol2'],
    estado: 'Completada', // Tarea completada simulada
  },
];

// Simulación de datos de voluntarios (simplificado para asignación)
const mockVoluntariosSimplificado: VoluntarioSimplificado[] = [
    { id: 'vol1', nombre: 'Juan Pérez' },
    { id: 'vol2', nombre: 'María García' },
    { id: 'vol3', nombre: 'Carlos Rodríguez' },
    { id: 'vol4', nombre: 'Laura Fernández' },
];


const GestionTareasVoluntariosPage = () => {
  const [tareas, setTareas] = useState<TareaVoluntariado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false); // Controla la visibilidad del formulario
  const [editingTask, setEditingTask] = useState<TareaVoluntariado | null>(null); // Tarea que se está editando (null si es nueva)
  const [formData, setFormData] = useState({ // Estado para el formulario
    titulo: '',
    descripcion: '',
    fechaLimite: '',
    voluntariosAsignadosIds: [] as string[],
    estado: 'Pendiente' as TareaVoluntariado['estado'],
  });
   const [message, setMessage] = useState(''); // Mensajes de éxito o error

  // Cargar las tareas
  useEffect(() => {
    const fetchTareas = async () => {
      setLoading(true);
      setError('');
      try {
        // const response = await fetch('/api/refugio/voluntarios/tareas'); // Ejemplo de API
        // if (!response.ok) {
        //    throw new Error('Error al cargar las tareas.');
        // }
        // const data: TareaVoluntariado[] = await response.json();
        // setTareas(data);

        // Simular la carga con mock data
        setTareas(mockTareas);

      } catch (err: any) {
        setError(err.message || 'Error al cargar las tareas.');
      } finally {
        setLoading(false);
      }
    };
    fetchTareas();
  }, []); // El efecto se ejecuta una vez al montar el componente


  // Manejar la apertura del formulario para crear o editar
   const handleCreateTaskClick = () => {
       setEditingTask(null); // No estamos editando
       setFormData({ // Limpiar formulario
           titulo: '',
           descripcion: '',
           fechaLimite: '',
           voluntariosAsignadosIds: [],
           estado: 'Pendiente',
       });
       setShowForm(true);
       setMessage('');
   };

   const handleEditTaskClick = (tarea: TareaVoluntariado) => {
       setEditingTask(tarea); // Establecer la tarea que se está editando
       setFormData({ // Cargar datos de la tarea en el formulario
           titulo: tarea.titulo,
           descripcion: tarea.descripcion,
           fechaLimite: tarea.fechaLimite,
           voluntariosAsignadosIds: tarea.voluntariosAsignadosIds,
           estado: tarea.estado,
       });
       setShowForm(true);
       setMessage('');
   };

   const handleCloseForm = () => {
       setShowForm(false);
       setEditingTask(null);
       setMessage('');
   };

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
         // Si es un select múltiple para voluntarios
         if (name === 'voluntariosAsignadosIds') {
             const options = (e.target as HTMLSelectElement).options;
             const values: string[] = [];
             for (let i = 0, l = options.length; i < l; i++) {
                 if (options[i].selected) {
                 values.push(options[i].value);
                 }
             }
             setFormData({ ...formData, [name]: values });
         } else {
            setFormData({ ...formData, [name]: value });
         }
        setMessage('');
   };


  // Manejar el envío del formulario (Crear o Editar)
  const handleSaveTask = async () => {
     // Validación básica
      if (!formData.titulo.trim() || !formData.fechaLimite.trim() || !formData.estado.trim()) {
          setMessage('Por favor, completa el título, fecha límite y estado.');
          return;
      }


    console.log('Simulando guardar tarea:', formData);
    setMessage('');
    setLoading(true); // Usamos loading para el guardado también

    try {
        let updatedTareas;

        if (editingTask) {
            // Lógica para editar tarea (simulación)
            const updatedTask = { ...editingTask, ...formData };
            updatedTareas = tareas.map(t => t.id === editingTask.id ? updatedTask : t);
            console.log('Simulando edición:', updatedTask);
            // Aquí iría la llamada API para actualizar la tarea existente
            // const response = await fetch(`/api/refugio/voluntarios/tareas/${editingTask.id}`, { ...PUT ... });
        } else {
            // Lógica para crear nueva tarea (simulación)
            const newTask = {
                id: `tarea${Date.now()}`, // Generar ID simulado
                ...formData
            };
            updatedTareas = [...tareas, newTask];
            console.log('Simulando creación:', newTask);
             // Aquí iría la llamada API para crear una nueva tarea
            // const response = await fetch('/api/refugio/voluntarios/tareas', { ...POST ... });
        }

        // Simular un pequeño retraso para la operación de guardado
        await new Promise(resolve => setTimeout(resolve, 500));

        setTareas(updatedTareas);
        setMessage(`Tarea ${editingTask ? 'actualizada' : 'creada'} exitosamente.`);
        handleCloseForm(); // Cerrar formulario al guardar

    } catch (err: any) {
       setError(`Error al guardar tarea: ${err.message || 'Desconocido'}`);
        setMessage(''); // Limpiar mensaje de éxito si hay error
    } finally {
       setLoading(false);
    }
  };

  // Manejar la eliminación de una tarea (simulación)
   const handleDeleteTask = async (tareaId: string) => {
       if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
           console.log('Simulando eliminación de tarea:', tareaId);
            setMessage('');
            setLoading(true);

           try {
               // Aquí iría la llamada API para eliminar la tarea
               // const response = await fetch(`/api/refugio/voluntarios/tareas/${tareaId}`, { method: 'DELETE' });
               // if (!response.ok) {
               //     throw new Error('Error al eliminar la tarea.');
               // }

               // Simular eliminación del estado local
               const filteredTareas = tareas.filter(t => t.id !== tareaId);

                // Simular un pequeño retraso
                await new Promise(resolve => setTimeout(resolve, 300));


               setTareas(filteredTareas);
               setMessage('Tarea eliminada exitosamente.');

           } catch (err: any) {
                setError(`Error al eliminar tarea: ${err.message || 'Desconocido'}`);
                 setMessage('');
           } finally {
               setLoading(false);
           }
       }
   };


   // Función para obtener nombres de voluntarios asignados (para mostrar en la tabla)
   const getAssignedVolunteerNames = (volunteerIds: string[]) => {
        if (!volunteerIds || volunteerIds.length === 0) {
            return 'Sin asignar';
        }
        // En un caso real, buscarías los nombres en una lista de voluntarios
        const assigned = mockVoluntariosSimplificado
            .filter(vol => volunteerIds.includes(vol.id))
            .map(vol => vol.nombre);
        return assigned.join(', ');
   };


  if (loading && !tareas.length) { // Mostrar "Cargando" solo la primera vez
    return <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>Cargando tareas...</div>;
  }

  if (error) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px', color: 'red' }}>{error}</div>;
  }


  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>Gestión de Tareas de Voluntarios</h1>

       {message && (
            <p style={{ color: message.includes('Error') ? 'red' : 'green', marginBottom: '15px', textAlign: 'center' }}>
                {message}
            </p>
       )}

      {/* Botón para crear nueva tarea */}
      <div style={{ marginBottom: '20px', textAlign: 'right' }}>
        <button
          onClick={handleCreateTaskClick}
           disabled={loading} // Deshabilitar si está cargando/guardando
          style={{
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease',
          }}
        >
          Crear Nueva Tarea
        </button>
      </div>

      {/* Formulario (Modal o inline) */}
       {showForm && (
           <div style={{
               backgroundColor: '#fff',
               padding: '20px',
               borderRadius: '8px',
               marginBottom: '30px',
               border: '1px solid #eee',
               position: 'relative', // Para el botón de cerrar
           }}>
               <h2 style={{ marginTop: '0', marginBottom: '20px', color: '#555', textAlign: 'center' }}>
                   {editingTask ? 'Editar Tarea' : 'Crear Nueva Tarea'}
               </h2>

                {/* Botón de cerrar */}
                 <button
                     onClick={handleCloseForm}
                     style={{
                         position: 'absolute',
                         top: '10px',
                         right: '10px',
                         backgroundColor: 'transparent',
                         border: 'none',
                         fontSize: '1.5rem',
                         cursor: 'pointer',
                         color: '#777',
                     }}
                 >&times;</button> {/* Símbolo de multiplicar como "X" */}


               <div style={{ marginBottom: '15px' }}>
                   <label htmlFor="titulo" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Título:</label>
                   <input
                       type="text"
                       id="titulo"
                       name="titulo"
                       value={formData.titulo}
                       onChange={handleInputChange}
                       style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
                       required
                   />
               </div>

                <div style={{ marginBottom: '15px' }}>
                   <label htmlFor="descripcion" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Descripción:</label>
                   <textarea
                       id="descripcion"
                       name="descripcion"
                       value={formData.descripcion}
                       onChange={handleInputChange}
                       rows={3}
                       style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
                       placeholder="Describe la tarea a realizar..."
                   ></textarea>
               </div>

               <div style={{ marginBottom: '15px', display: 'flex', gap: '20px' }}>
                   <div style={{ flex: 1 }}>
                       <label htmlFor="fechaLimite" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Fecha Límite:</label>
                       <input
                           type="date"
                           id="fechaLimite"
                           name="fechaLimite"
                           value={formData.fechaLimite}
                           onChange={handleInputChange}
                           style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
                           required
                       />
                   </div>
                   <div style={{ flex: 1 }}>
                       <label htmlFor="estado" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Estado:</label>
                       <select
                           id="estado"
                           name="estado"
                           value={formData.estado}
                           onChange={handleInputChange}
                           style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
                           required
                       >
                           <option value="Pendiente">Pendiente</option>
                           <option value="En progreso">En progreso</option>
                           <option value="Completada">Completada</option>
                            <option value="Cancelada">Cancelada</option>
                       </select>
                   </div>
               </div>

               {/* Asignar Voluntarios (Selector Múltiple Simulado) */}
               <div style={{ marginBottom: '20px' }}>
                   <label htmlFor="voluntariosAsignadosIds" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Asignar Voluntarios:</label>
                    {/* Usamos un select con multiple para simular */}
                   <select
                       id="voluntariosAsignadosIds"
                       name="voluntariosAsignadosIds"
                       multiple // Permite selección múltiple
                       value={formData.voluntariosAsignadosIds}
                       onChange={handleInputChange}
                       style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem', minHeight: '100px' }}
                   >
                       {mockVoluntariosSimplificado.map(voluntario => (
                           <option key={voluntario.id} value={voluntario.id}>
                               {voluntario.nombre}
                           </option>
                       ))}
                   </select>
                    <p style={{ fontSize: '0.9rem', color: '#777', marginTop: '5px' }}>Mantén presionada la tecla Ctrl (o Cmd en Mac) para seleccionar varios voluntarios.</p>
               </div>


               <div style={{ textAlign: 'center' }}>
                    <button
                        onClick={handleSaveTask}
                        disabled={loading}
                         style={{
                           backgroundColor: loading ? '#ccc' : '#28a745', // Verde o gris si cargando
                           color: '#fff',
                           padding: '12px 30px',
                           border: 'none',
                           borderRadius: '4px',
                           cursor: loading ? 'not-allowed' : 'pointer',
                           fontSize: '1.2rem',
                           fontWeight: 'bold',
                           transition: 'background-color 0.3s ease',
                         }}
                    >
                        {loading ? 'Guardando...' : (editingTask ? 'Guardar Cambios' : 'Crear Tarea')}
                    </button>
               </div>

           </div>
       )}


      {/* Tabla de Tareas */}
       {!showForm && ( // Ocultar la tabla si el formulario está visible (si es inline)
          <div style={{ overflowX: 'auto' }}> {/* Para hacer la tabla responsive */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
              <thead>
                <tr style={{ backgroundColor: '#007bff', color: '#fff', textAlign: 'left' }}>
                  <th style={{ padding: '12px 15px' }}>Título</th>
                  <th style={{ padding: '12px 15px' }}>Fecha Límite</th>
                  <th style={{ padding: '12px 15px' }}>Voluntarios Asignados</th>
                  <th style={{ padding: '12px 15px' }}>Estado</th>
                   <th style={{ padding: '12px 15px', width: '120px' }}>Acciones</th> {/* Ancho fijo para acciones */}
                </tr>
              </thead>
              <tbody>
                {tareas.length === 0 ? (
                   <tr>
                      <td colSpan={5} style={{ textAlign: 'center', padding: '20px', color: '#777' }}>No se encontraron tareas.</td>
                   </tr>
                ) : (
                   tareas.map((tarea) => (
                      <tr key={tarea.id} style={{ borderBottom: '1px solid #eee' }}>
                         <td style={{ padding: '12px 15px', fontWeight: 'bold' }}>{tarea.titulo}</td>
                         <td style={{ padding: '12px 15px' }}>{tarea.fechaLimite}</td>
                         <td style={{ padding: '12px 15px' }}>
                            {getAssignedVolunteerNames(tarea.voluntariosAsignadosIds)}
                         </td>
                         <td style={{ padding: '12px 15px', color: tarea.estado === 'Completada' ? 'green' : tarea.estado === 'Cancelada' ? 'red' : tarea.estado === 'En progreso' ? 'orange' : '#333' }}>
                            {tarea.estado}
                         </td>
                         <td style={{ padding: '12px 15px' }}>
                            <button
                                onClick={() => handleEditTaskClick(tarea)}
                                 disabled={loading}
                                style={{
                                    backgroundColor: loading ? '#ccc' : '#ffc107', // Amarillo
                                    color: '#333',
                                    padding: '5px 10px',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    marginRight: '5px',
                                     fontSize: '0.9rem',
                                }}
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDeleteTask(tarea.id)}
                                 disabled={loading}
                                style={{
                                   backgroundColor: loading ? '#ccc' : '#dc3545', // Rojo
                                   color: '#fff',
                                   padding: '5px 10px',
                                   border: 'none',
                                   borderRadius: '4px',
                                   cursor: loading ? 'not-allowed' : 'pointer',
                                    fontSize: '0.9rem',
                                }}
                            >
                                Eliminar
                            </button>
                         </td>
                      </tr>
                   ))
                )}
              </tbody>
            </table>
          </div>
       )}


       {/* Aquí iría la paginación si tienes muchas tareas */}


    </div>
  );
};

export default GestionTareasVoluntariosPage;
