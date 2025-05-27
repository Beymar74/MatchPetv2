// src/app/editar-cuenta/page.tsx
'use client';

import React, { useState } from 'react';

const EditarCuentaPage = () => {
  // Estado para los campos editables
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [usuario, setUsuario] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // En un caso real, aquí cargarías los datos del usuario autenticado al cargar la página
  // useEffect(() => {
  //   // Cargar datos del usuario
  // }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí iría la lógica para actualizar la información del usuario
    console.log('Datos de cuenta actualizados:', { nombreCompleto, usuario });

    // Validar campos (ejemplo básico)
    if (!nombreCompleto || !usuario) {
      setError('Por favor, completa todos los campos.');
      setMessage('');
      return;
    }

    // Simulación de actualización exitosa (reemplazar con lógica real)
    setMessage('Tu cuenta ha sido actualizada exitosamente.');
    setError('');
    // Aquí probablemente querrías recargar los datos del usuario o redirigir
  };

  return (
    <div style={{ fontFamily: 'sans-serif', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', backgroundColor: '#f0f0f0' }}>
      <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '20px', color: '#333' }}>Editar Cuenta</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label htmlFor="nombreCompleto" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', textAlign: 'left' }}>Nombre Completo:</label>
            <input
              type="text"
              id="nombreCompleto"
              value={nombreCompleto}
              onChange={(e) => setNombreCompleto(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
            />
          </div>
          <div>
            <label htmlFor="usuario" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', textAlign: 'left' }}>Usuario:</label>
            <input
              type="text"
              id="usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
            />
          </div>
          {/* Aquí podrías mostrar el correo electrónico, pero no editable */}
          {/*
          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', textAlign: 'left' }}>Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              value={email} // Aquí iría el email real del usuario
              disabled // Deshabilitar edición directa
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem', backgroundColor: '#f9f9f9' }}
            />
          </div>
          */}
          {message && <p style={{ color: 'green', marginTop: '15px' }}>{message}</p>}
          {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}
          <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold', transition: 'background-color 0.2s ease-in-out' }}>
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditarCuentaPage;
