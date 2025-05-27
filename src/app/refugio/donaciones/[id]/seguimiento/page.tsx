// src/app/refugio/donaciones/[id]/seguimiento/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

// Interfaz para una donación registrada (extendida para detalles)
interface DonacionDetalle {
  id: string;
  fecha: string;
  monto: number;
  moneda: string;
  donadorNombre: string; // Nombre del donador ('Anónimo' si es el caso)
  donadorEmail?: string | null; // Email del donador (puede ser null)
  estado: 'Completada' | 'Pendiente' | 'Reembolsada' | 'Fallida';
  metodoPago?: string;
  transaccionId?: string; // ID de la transacción de la pasarela de pago
  notasInternas?: string; // Notas privadas del refugio sobre esta donación
  esAnonima: boolean; // Indica si la donación fue anónima
  // Otros detalles como proyecto asociado, dirección del donador (si se recolectó y permitió), etc.
}

// Simulación de datos de donaciones con detalles
const mockDonacionesDetalle: DonacionDetalle[] = [
  {
    id: 'dona1',
    fecha: '2023-11-15',
    monto: 25.00,
    moneda: 'USD',
    donadorNombre: 'Ana G.',
    donadorEmail: 'ana.g@example.com',
    estado: 'Completada',
    metodoPago: 'Tarjeta',
    transaccionId: 'txn_abc123',
    notasInternas: 'Seguimiento inicial enviado.',
    esAnonima: false,
  },
  {
    id: 'dona2',
    fecha: '2023-11-14',
    monto: 50.00,
    moneda: 'USD',
    donadorNombre: 'Pedro L.',
    donadorEmail: 'pedro.l@example.com',
    estado: 'Completada',
    metodoPago: 'PayPal',
    transaccionId: 'pp_xyz456',
    notasInternas: '',
    esAnonima: false,
  },
  {
    id: 'dona3',
    fecha: '2023-11-14',
    monto: 10.00,
    moneda: 'USD',
    donadorNombre: 'Anónimo',
    donadorEmail: null, // Email es null si es anónimo
    estado: 'Completada',
    metodoPago: 'Tarjeta',
    transaccionId: 'txn_def789',
    notasInternas: 'Donación anónima, agradecer en redes generales.',
    esAnonima: true,
  },
    {
    id: 'dona4',
    fecha: '2023-11-13',
    monto: 75.00,
    moneda: 'USD',
    donadorNombre: 'María R.',
    donadorEmail: 'maria.r@example.com',
    estado: 'Completada',
    metodoPago: 'Tarjeta',
    transaccionId: 'txn_ghi012',
    notasInternas: '',
    esAnonima: false,
  },
  // Añadir más mock data si es necesario
];


const DetalleDonacionPage = () => {
  const params = useParams();
  const donationId = params.id as string; // Obtener el ID de la URL

  const [donacion, setDonacion] = useState<DonacionDetalle | null>(null);
  const [notasInternas, setNotasInternas] = useState('');
  const [loading, setLoading] = useState(true);
  const [savingNotes, setSavingNotes] = useState(false); // Estado para guardar notas
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');


  // Cargar los datos de la donación
  useEffect(() => {
    if (!donationId) return;

    const fetchDonacionDetalle = async () => {
      setLoading(true);
      setError('');
      try {
        // const response = await fetch(`/api/refugio/donaciones/${donationId}`); // Ejemplo de API
        // if (!response.ok) {
        //    if (response.status === 404) {
        //       throw new Error('Donación no encontrada o no tienes permisos.');
        //    }
        //    throw new Error('Error al cargar los detalles de la donación.');
        // }
        // const data: DonacionDetalle = await response.json();
        // setDonacion(data);
        // setNotasInternas(data.notasInternas || ''); // Cargar notas existentes

        // Simular la carga con mock data
        const foundDonacion = mockDonacionesDetalle.find(d => d.id === donationId);
        if (foundDonacion) {
          setDonacion(foundDonacion);
          setNotasInternas(foundDonacion.notasInternas || ''); // Cargar notas existentes
        } else {
          setError('Donación no encontrada o no tienes permisos.');
        }

      } catch (err: any) {
        setError(err.message || 'Error al cargar los detalles de la donación.');
      } finally {
        setLoading(false);
      }
    };
    fetchDonacionDetalle();
  }, [donationId]); // Dependencia: el efecto se ejecuta cuando cambia el donationId


    // Guardar notas internas (simulación)
    const handleSaveNotes = async () => {
        if (!donacion || savingNotes) return;

        setSavingNotes(true);
        setMessage('');
        setError('');

        console.log(`Guardando notas internas para donación ${donacion.id}: ${notasInternas}`);

        try {
            // const response = await fetch(`/api/refugio/donaciones/${donacion.id}/notas`, { // Ejemplo de API PUT/PATCH
            //   method: 'PUT', // o 'PATCH'
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ notasInternas: notasInternas.trim() }),
            // });

            // if (!response.ok) {
            //    throw new Error('Error al guardar las notas internas.');
            // }

            // const result = await response.json(); // Opcional: si el backend devuelve el resultado actualizado

            // Simulación de actualización local
            if (donacion) { // Asegurarse de que donacion no es null después del await simulado
                 setDonacion({ ...donacion, notasInternas: notasInternas.trim() });
                 setMessage('Notas internas guardadas exitosamente.');
            }


        } catch (err: any) {
            setError(`Error al guardar notas: ${err.message}`);
            setMessage('');
        } finally {
            setSavingNotes(false);
        }
    };


  if (loading) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>Cargando detalles de la donación...</div>;
  }

  if (error) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px', color: 'red' }}>{error}</div>;
  }

  if (!donacion) {
     return <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>No se pudieron cargar los detalles de la donación.</div>;
  }


  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '700px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>Detalle de Donación #{donacion.id}</h1>

       {message && (
            <p style={{ color: message.includes('Error') ? 'red' : 'green', marginBottom: '15px', textAlign: 'center' }}>
                {message}
            </p>
       )}


      {/* Información de la Donación */}
      <div style={{ marginBottom: '30px', backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '8px' }}>
        <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Detalles de la Transacción</h2>
        <p><strong>Monto:</strong> {donacion.monto.toFixed(2)} {donacion.moneda}</p>
        <p><strong>Fecha:</strong> {donacion.fecha}</p>
        <p>
            <strong>Estado:</strong>
            <span style={{
                 color: donacion.estado === 'Completada' ? 'green' : donacion.estado === 'Fallida' ? 'red' : 'orange',
                 fontWeight: 'bold',
                 marginLeft: '5px'
            }}>
                {donacion.estado}
            </span>
         </p>
        {donacion.metodoPago && <p><strong>Método de Pago:</strong> {donacion.metodoPago}</p>}
        {donacion.transaccionId && <p><strong>ID Transacción:</strong> {donacion.transaccionId}</p>}
         {/* Aquí podrías añadir más detalles técnicos o financieros */}
      </div>

      {/* Información del Donador */}
       <div style={{ marginBottom: '30px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #eee' }}>
           <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Información del Donador</h2>
           {donacion.esAnonima ? (
              <p>Esta fue una donación <strong>Anónima</strong>.</p>
           ) : (
              <>
                <p><strong>Nombre:</strong> {donacion.donadorNombre}</p>
                 {donacion.donadorEmail && <p><strong>Email:</strong> {donacion.donadorEmail}</p>}
                 {/* Aquí podrías añadir dirección u otra info de contacto si está disponible */}
              </>
           )}
           {/* Podrías añadir un enlace al perfil del donador si tienen cuenta */}
       </div>

        {/* Notas Internas del Refugio */}
       <div style={{ marginBottom: '30px', backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '8px' }}>
           <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Notas Internas (Solo para el Refugio)</h2>
            <textarea
                value={notasInternas}
                onChange={(e) => setNotasInternas(e.target.value)}
                rows={5}
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem', marginBottom: '10px' }}
                placeholder="Añade notas internas sobre esta donación..."
            ></textarea>
             <button
                 onClick={handleSaveNotes}
                 disabled={savingNotes} // Deshabilitar si está guardando
                 style={{
                    backgroundColor: savingNotes ? '#ccc' : '#007bff',
                    color: '#fff',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: savingNotes ? 'not-allowed' : 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                 }}
             >
                {savingNotes ? 'Guardando...' : 'Guardar Notas'}
            </button>
            {/* Podrías añadir un historial de cambios en las notas si es importante */}
       </div>

       {/* Posibles Acciones Adicionales (Comentado) */}
        {/*
         <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <button style={{ ... }}>Ver Recibo</button> // Si tienes funcionalidad de recibos
              {donacion.estado === 'Completada' && <button style={{ ... }}>Emitir Certificado</button>} // Si emites certificados
              {donacion.estado === 'Pendiente' && <button style={{ ... }}>Marcar como Completada</button>} // Si gestionas estados manualmente
         </div>
        */}


    </div>
  );
};

export default DetalleDonacionPage;