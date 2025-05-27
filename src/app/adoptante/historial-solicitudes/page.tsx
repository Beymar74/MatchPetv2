// src/app/adoptante/historial-solicitudes/page.tsx
'use client';

import React, { useState, useEffect } from 'react';

// Simulación de datos del historial de solicitudes de adopción
const mockSolicitudes = [
  {
    id: 'sol1',
    mascota: 'Buddy',
    refugio: 'Refugio Esperanza',
    fechaSolicitud: '2023-10-20',
    estado: 'Pendiente',
  },
  {
    id: 'sol2',
    mascota: 'Luna',
    refugio: 'Hogar Canino Feliz',
    fechaSolicitud: '2023-09-10',
    estado: 'Aprobada',
  },
  {
    id: 'sol3',
    mascota: 'Max',
    refugio: 'Patitas Felices',
    fechaSolicitud: '2023-08-01',
    estado: 'Rechazada',
  },
];

const HistorialSolicitudesPage = () => {
  const [solicitudes, setSolicitudes] = useState(mockSolicitudes);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // En un caso real, aquí cargarías el historial de solicitudes del adoptante autenticado
  // useEffect(() => {
  //   const fetchHistorialSolicitudes = async () => {
  //     setLoading(true);
  //     try {
  //       // const response = await fetch('/api/adoptante/historial-solicitudes'); // Ejemplo de API route
  //       // const data = await response.json();
  //       // setSolicitudes(data);
  //     } catch (err) {
  //       setError('Error al cargar el historial de solicitudes.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchHistorialSolicitudes();
  // }, []);

  if (loading) {
    return <p>Cargando historial de solicitudes...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1 style={{ marginBottom: '20px', color: '#333' }}>Historial de Solicitudes de Adopción</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Mascota</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Refugio</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Fecha de Solicitud</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Estado</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.map(solicitud => (
            <tr key={solicitud.id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{solicitud.mascota}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{solicitud.refugio}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{solicitud.fechaSolicitud}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{solicitud.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {solicitudes.length === 0 && !loading && !error && (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>No has enviado ninguna solicitud de adopción.</p>
      )}
    </div>
  );
};

export default HistorialSolicitudesPage;