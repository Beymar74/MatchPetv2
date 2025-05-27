// src/app/refugio/donaciones/registro/page.tsx
'use client';

import React, { useState, useEffect } from 'react';

// Interfaz para la estructura de una donación
interface Donacion {
  id: string;
  fecha: string; // Formato YYYY-MM-DD
  monto: number;
  donadorNombre: string; // Nombre visible del donador (podría ser 'Anónimo')
  donadorEmail?: string; // Email (puede no estar disponible o mostrarse al refugio)
  estado: 'Completada' | 'Pendiente' | 'Reembolsada' | 'Fallida';
  // Podrías añadir método de pago, referencia de transacción, etc.
}

// Simulación de datos de donaciones para el refugio
const mockDonaciones: Donacion[] = [
  { id: 'dona1', fecha: '2023-11-15', monto: 25.00, donadorNombre: 'Juan Pérez', estado: 'Completada' },
  { id: 'dona2', fecha: '2023-11-14', monto: 50.00, donadorNombre: 'María G.', estado: 'Completada' },
  { id: 'dona3', fecha: '2023-11-14', monto: 10.00, donadorNombre: 'Anónimo', estado: 'Completada' },
  { id: 'dona4', fecha: '2023-11-13', monto: 100.00, donadorNombre: 'Carlos R.', estado: 'Completada' },
  { id: 'dona5', fecha: '2023-11-12', monto: 15.00, donadorNombre: 'Ana M.', estado: 'Completada' },
   { id: 'dona6', fecha: '2023-11-11', monto: 30.00, donadorNombre: 'Pedro L.', estado: 'Completada' },
    { id: 'dona7', fecha: '2023-11-10', monto: 20.00, donadorNombre: 'Sofía F.', estado: 'Completada' },
];


const RegistroDonacionesPage = () => {
  const [donaciones, setDonaciones] = useState<Donacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Cargar los datos de las donaciones al montar el componente
  useEffect(() => {
    const fetchDonaciones = async () => {
      setLoading(true);
      setError('');
      try {
        // Aquí iría la llamada real a tu API de backend para obtener las donaciones del refugio actual
        // Ejemplo:
        // const response = await fetch('/api/refugio/donaciones');
        // if (!response.ok) {
        //   throw new Error('Error al cargar el registro de donaciones.');
        // }
        // const data: Donacion[] = await response.json();
        // setDonaciones(data);

        // Simular la carga con mock data
        // En un caso real, filtrarías por el ID del refugio actual
        await new Promise(resolve => setTimeout(resolve, 500)); // Simular retardo de red
        setDonaciones(mockDonaciones.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())); // Ordenar por fecha descendente

      } catch (err: any) {
        setError(err.message || 'Error al cargar el registro de donaciones.');
      } finally {
        setLoading(false);
      }
    };

    fetchDonaciones();
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez al montar


  if (loading) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>Cargando registro de donaciones...</div>;
  }

  if (error) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px', color: 'red' }}>{error}</div>;
  }

  // Calcular total donado (simulado)
  const totalDonado = donaciones.reduce((sum, donacion) => sum + donacion.monto, 0);


  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>Registro de Donaciones Recibidas</h1>

       {/* Resumen o Estadísticas Básicas */}
        <div style={{ marginBottom: '20px', backgroundColor: '#e9ecef', padding: '15px', borderRadius: '4px', textAlign: 'center' }}>
             <p style={{ margin: '0', fontSize: '1.1rem', fontWeight: 'bold', color: '#555' }}>Total Donado (Simulado): ${totalDonado.toFixed(2)}</p>
             {/* Podrías añadir rango de fechas para el total, número de donaciones, etc. */}
        </div>


      {/* Aquí irían filtros, búsqueda o paginación */}
       {/*
        <div style={{ marginBottom: '20px' }}>
             // Campo de búsqueda por donador
             // Selector de rango de fechas
             // Selector de estado
        </div>
       */}


      {/* Tabla de Donaciones */}
      <div style={{ overflowX: 'auto' }}> {/* Permite scroll horizontal en pantallas pequeñas */}
         {donaciones.length === 0 ? (
            <p style={{ textAlign: 'center' }}>No se encontraron donaciones registradas para este refugio.</p>
         ) : (
           <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
             <thead>
               <tr style={{ backgroundColor: '#007bff', color: '#fff' }}>
                 <th style={tableHeaderStyle}>Fecha</th>
                 <th style={tableHeaderStyle}>Monto</th>
                 <th style={tableHeaderStyle}>Donador</th>
                 <th style={tableHeaderStyle}>Estado</th>
                 {/* Añadir más columnas si es necesario */}
               </tr>
             </thead>
             <tbody>
               {donaciones.map((donacion, index) => (
                 <tr key={donacion.id} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#e9ecef' }}>
                   <td style={tableCellStyle}>{donacion.fecha}</td>
                   <td style={tableCellStyle}>${donacion.monto.toFixed(2)}</td>
                   <td style={tableCellStyle}>{donacion.donadorNombre}</td>
                   <td style={tableCellStyle}>{donacion.estado}</td>
                   {/* Podrías hacer que la fila o el nombre del donador sean un enlace a una página de detalles si tienes una */}
                 </tr>
               ))}
             </tbody>
           </table>
         )}
      </div>

       {/* Aquí iría la paginación */}
        {/*
         <div style={{ marginTop: '20px', textAlign: 'center' }}>
             // Botones de paginación
         </div>
        */}

    </div>
  );
};

// Estilos básicos para la tabla
const tableHeaderStyle: React.CSSProperties = {
  padding: '12px 8px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd',
};

const tableCellStyle: React.CSSProperties = {
  padding: '10px 8px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd',
};

export default RegistroDonacionesPage;