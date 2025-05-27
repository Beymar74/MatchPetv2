// src/app/refugio/voluntarios/registro/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Interfaz para un voluntario registrado
interface VoluntarioRegistrado {
  id: string;
  nombre: string;
  email: string;
  telefono?: string;
  areasInteres: string[]; // Puede ser un array de strings
  estado: 'Activo' | 'Inactivo' | 'En Pausa';
  fechaInicio: string; // Formato de fecha
  // Otros campos como horas registradas (si se muestra un resumen)
}

// Simulación de datos de voluntarios registrados para un refugio
const mockVoluntarios: VoluntarioRegistrado[] = [
  {
    id: 'vol1',
    nombre: 'Juan Pérez',
    email: 'juan.p@example.com',
    telefono: '1122334455',
    areasInteres: ['Cuidado Animal Directo', 'Eventos y Recaudación'],
    estado: 'Activo',
    fechaInicio: '2023-08-01',
  },
  {
    id: 'vol2',
    nombre: 'María García',
    email: 'maria.g@example.com',
    areasInteres: ['Administración y Oficina'],
    estado: 'Activo',
    fechaInicio: '2023-09-15',
  },
  {
    id: 'vol3',
    nombre: 'Carlos Rodríguez',
    email: 'carlos.r@example.com',
    areasInteres: ['Difusión y Redes Sociales'],
    estado: 'En Pausa',
    fechaInicio: '2023-07-20',
  },
   {
    id: 'vol4',
    nombre: 'Ana López',
    email: 'ana.l@example.com',
    areasInteres: ['Cuidado Animal Directo'],
    estado: 'Activo',
    fechaInicio: '2023-10-10',
  },
  // Añadir más mock data si es necesario
];


const RegistroVoluntariosPage = () => {
  const [voluntarios, setVoluntarios] = useState<VoluntarioRegistrado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Cargar los datos de los voluntarios
  useEffect(() => {
    const fetchVoluntarios = async () => {
      setLoading(true);
      setError('');
      try {
        // const response = await fetch('/api/refugio/voluntarios'); // Ejemplo de API
        // if (!response.ok) {
        //    throw new Error('Error al cargar el registro de voluntarios.');
        // }
        // const data: VoluntarioRegistrado[] = await response.json();
        // setVoluntarios(data);

        // Simular la carga con mock data
        // En un caso real, el backend filtraría por el refugio actual
        setVoluntarios(mockVoluntarios); // Usamos toda la mock data por simplicidad

      } catch (err: any) {
        setError(err.message || 'Error al cargar el registro de voluntarios.');
      } finally {
        setLoading(false);
      }
    };
    fetchVoluntarios();
  }, []); // El efecto se ejecuta una vez al montar el componente

   // Calcular número de voluntarios activos (simulación)
   const voluntariosActivosCount = voluntarios.filter(v => v.estado === 'Activo').length;


  if (loading) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>Cargando registro de voluntarios...</div>;
  }

  if (error) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px', color: 'red' }}>{error}</div>;
  }


  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>Registro de Voluntarios</h1>

       {/* Resumen Básico */}
       <div style={{ marginBottom: '20px', backgroundColor: '#e9ecef', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
           <h2 style={{ marginTop: '0', marginBottom: '10px', color: '#555' }}>Resumen</h2>
           <p style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '0' }}>
              Voluntarios Activos: {voluntariosActivosCount}
           </p>
            {/* Aquí podrías añadir filtros por área, estado, etc. */}
       </div>


      {/* Tabla de Voluntarios */}
      <div style={{ overflowX: 'auto' }}> {/* Para hacer la tabla responsive */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#007bff', color: '#fff', textAlign: 'left' }}>
              <th style={{ padding: '12px 15px' }}>Nombre</th>
              <th style={{ padding: '12px 15px' }}>Email</th>
               <th style={{ padding: '12px 15px' }}>Áreas de Interés</th>
              <th style={{ padding: '12px 15px' }}>Estado</th>
               <th style={{ padding: '12px 15px' }}>Fecha Inicio</th>
               <th style={{ padding: '12px 15px' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {voluntarios.length === 0 ? (
               <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '20px', color: '#777' }}>No se encontraron voluntarios registrados.</td>
               </tr>
            ) : (
               voluntarios.map((voluntario) => (
                  <tr key={voluntario.id} style={{ borderBottom: '1px solid #eee' }}>
                     <td style={{ padding: '12px 15px' }}>{voluntario.nombre}</td>
                     <td style={{ padding: '12px 15px' }}>{voluntario.email}</td>
                     <td style={{ padding: '12px 15px' }}>{voluntario.areasInteres.join(', ')}</td> {/* Mostrar áreas separadas por coma */}
                     <td style={{ padding: '12px 15px', color: voluntario.estado === 'Activo' ? 'green' : voluntario.estado === 'En Pausa' ? 'orange' : 'red' }}>
                        {voluntario.estado}
                     </td>
                      <td style={{ padding: '12px 15px' }}>{voluntario.fechaInicio}</td>
                      <td style={{ padding: '12px 15px' }}>
                         <Link href={`/refugio/voluntarios/${voluntario.id}/perfil`} style={{ color: '#007bff', textDecoration: 'none' }}>
                            Ver Perfil
                         </Link>
                      </td>
                  </tr>
               ))
            )}
          </tbody>
        </table>
      </div>

       {/* Aquí iría la paginación si tienes muchos voluntarios */}


    </div>
  );
};

export default RegistroVoluntariosPage;