// src/app/adoptante/verificacion-documentos/page.tsx
'use client';

import React, { useState } from 'react';

const VerificacionDocumentosPage = () => {
  // Estado para los archivos seleccionados
  const [identificacionOficial, setIdentificacionOficial] = useState<File | null>(null);
  const [comprobanteDomicilio, setComprobanteDomicilio] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, documentType: 'identificacionOficial' | 'comprobanteDomicilio') => {
    const file = e.target.files ? e.target.files[0] : null;
    if (documentType === 'identificacionOficial') {
      setIdentificacionOficial(file);
    } else if (documentType === 'comprobanteDomicilio') {
      setComprobanteDomicilio(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validar que se han seleccionado archivos
    if (!identificacionOficial || !comprobanteDomicilio) {
      setError('Por favor, selecciona ambos documentos.');
      setMessage('');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    // Aquí iría la lógica para subir los archivos a tu backend o servicio de almacenamiento
    console.log('Subiendo archivos:', {
      identificacionOficial: identificacionOficial.name,
      comprobanteDomicilio: comprobanteDomicilio.name,
    });

    // Simulación de subida (reemplazar con lógica real)
    try {
      // const formData = new FormData();
      // formData.append('identificacionOficial', identificacionOficial);
      // formData.append('comprobanteDomicilio', comprobanteDomicilio);

      // const response = await fetch('/api/upload-documentos', { // Ejemplo de API route para subida
      //   method: 'POST',
      //   body: formData,
      // });

      // if (!response.ok) {
      //   throw new Error('Error al subir los documentos.');
      // }

      // const data = await response.json();
      setMessage('Documentos subidos exitosamente.');
      // console.log('Respuesta del backend:', data);

      // Opcional: Limpiar los archivos seleccionados después de la subida exitosa
      setIdentificacionOficial(null);
      setComprobanteDomicilio(null);

    } catch (err: any) {
      setError(`Error al subir documentos: ${err.message}`);
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', backgroundColor: '#f0f0f0' }}>
      <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '500px' }}>
        <h1 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>Verificación de Identidad y Documentos</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Carga de Identificación Oficial */}
          <div>
            <label htmlFor="identificacionOficial" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Identificación Oficial:</label>
            <input
              type="file"
              id="identificacionOficial"
              accept=".jpg,.jpeg,.png,.pdf" // Tipos de archivo aceptados
              onChange={(e) => handleFileChange(e, 'identificacionOficial')}
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
            />
             {identificacionOficial && <p style={{ marginTop: '5px', fontSize: '0.9rem', color: '#555' }}>Archivo seleccionado: {identificacionOficial.name}</p>}
          </div>

          {/* Carga de Comprobante de Domicilio */}
          <div>
            <label htmlFor="comprobanteDomicilio" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Comprobante de Domicilio:</label>
            <input
              type="file"
              id="comprobanteDomicilio"
              accept=".jpg,.jpeg,.png,.pdf" // Tipos de archivo aceptados
              onChange={(e) => handleFileChange(e, 'comprobanteDomicilio')}
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
            />
             {comprobanteDomicilio && <p style={{ marginTop: '5px', fontSize: '0.9rem', color: '#555' }}>Archivo seleccionado: {comprobanteDomicilio.name}</p>}
          </div>

          {message && <p style={{ color: 'green', marginTop: '15px', textAlign: 'center' }}>{message}</p>}
          {error && <p style={{ color: 'red', marginTop: '15px', textAlign: 'center' }}>{error}</p>}

          <button
            type="submit"
            disabled={loading} // Deshabilitar el botón durante la carga
            style={{
              backgroundColor: loading ? '#ccc' : '#007bff',
              color: '#fff',
              padding: '10px 15px',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold',
              transition: 'background-color 0.2s ease-in-out'
            }}
          >
            {loading ? 'Subiendo...' : 'Subir Documentos'}
          </button>
        </form>
         {/* Sección para mostrar el estado de los documentos (opcional) */}
         {/*
         <div style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
           <h2 style={{ marginBottom: '15px', color: '#555', fontSize: '1.2rem', textAlign: 'center' }}>Estado de Documentos Cargados:</h2>
           <p>Identificación Oficial: <span style={{ fontWeight: 'bold', color: 'orange' }}>Pendiente de revisión</span></p>
           <p>Comprobante de Domicilio: <span style={{ fontWeight: 'bold', color: 'green' }}>Aprobado</span></p>
         </div>
         */}
      </div>
    </div>
  );
};

export default VerificacionDocumentosPage;
