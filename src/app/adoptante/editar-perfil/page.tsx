// src/app/adoptante/editar-perfil/page.tsx
'use client';

import React, { useState, useEffect } from 'react';

// Simulación de datos de perfil de adoptante
const mockAdoptanteProfile = {
  telefono: '123-456-7890',
  direccionCalle: 'Calle Falsa 123',
  direccionCiudad: 'Ciudad Ejemplo',
  direccionCodigoPostal: '00000',
  experienciaMascotas: 'He tenido perros y gatos en el pasado.',
  tipoVivienda: 'Casa',
};

const EditarPerfilAdoptantePage = () => {
  const [telefono, setTelefono] = useState('');
  const [direccionCalle, setDireccionCalle] = useState('');
  const [direccionCiudad, setDireccionCiudad] = useState('');
  const [direccionCodigoPostal, setDireccionCodigoPostal] = useState('');
  const [experienciaMascotas, setExperienciaMascotas] = useState('');
  const [tipoVivienda, setTipoVivienda] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true); // Para simular la carga inicial

  // Cargar datos del perfil al montar el componente
  useEffect(() => {
    // En un caso real, aquí obtendrías los datos del perfil del adoptante autenticado
    // Simulación de carga con un pequeño retraso
    const loadProfile = async () => {
      setLoading(true);
      // await new Promise(resolve => setTimeout(resolve, 500)); // Simular retardo de red
      setTelefono(mockAdoptanteProfile.telefono);
      setDireccionCalle(mockAdoptanteProfile.direccionCalle);
      setDireccionCiudad(mockAdoptanteProfile.direccionCiudad);
      setDireccionCodigoPostal(mockAdoptanteProfile.direccionCodigoPostal);
      setExperienciaMascotas(mockAdoptanteProfile.experienciaMascotas);
      setTipoVivienda(mockAdoptanteProfile.tipoVivienda);
      setLoading(false);
    };

    loadProfile();
  }, []); // El array vacío asegura que esto solo se ejecuta una vez al montar

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí iría la lógica para actualizar el perfil del adoptante
    console.log('Perfil de adoptante actualizado:', {
      telefono,
      direccionCalle,
      direccionCiudad,
      direccionCodigoPostal,
      experienciaMascotas,
      tipoVivienda,
    });

    // Validar campos (ejemplo básico)
    if (!telefono || !direccionCalle || !direccionCiudad || !direccionCodigoPostal || !experienciaMascotas || !tipoVivienda) {
        setError('Por favor, completa todos los campos.');
        setMessage('');
        return;
    }


    // Simulación de actualización exitosa (reemplazar con lógica real)
    setMessage('Tu perfil ha sido actualizado exitosamente.');
    setError('');
    // En un caso real, podrías redirigir al usuario o mostrar una confirmación más elaborada
  };

   if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '50px' }}>Cargando perfil...</p>;
  }


  return (
    <div style={{ fontFamily: 'sans-serif', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', backgroundColor: '#f0f0f0', padding: '20px' }}>
      <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '600px', textAlign: 'left' }}>
        <h1 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>Editar Perfil de Adoptante</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label htmlFor="telefono" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Teléfono de Contacto:</label>
            <input
              type="text"
              id="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
            />
          </div>
          <div>
            <h3 style={{ marginBottom: '10px', color: '#555' }}>Dirección:</h3>
            <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: '1fr 1fr' }}>
                <div>
                    <label htmlFor="direccionCalle" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Calle y Número:</label>
                    <input
                        type="text"
                        id="direccionCalle"
                        value={direccionCalle}
                        onChange={(e) => setDireccionCalle(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
                    />
                </div>
                 <div>
                    <label htmlFor="direccionCiudad" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Ciudad:</label>
                     <input
                        type="text"
                        id="direccionCiudad"
                        value={direccionCiudad}
                        onChange={(e) => setDireccionCiudad(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
                    />
                </div>
                <div style={{gridColumn: 'span 2'}}> {/* Ocupa ambas columnas */}
                    <label htmlFor="direccionCodigoPostal" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Código Postal:</label>
                    <input
                        type="text"
                        id="direccionCodigoPostal"
                        value={direccionCodigoPostal}
                        onChange={(e) => setDireccionCodigoPostal(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
                    />
                </div>
            </div>
          </div>
          <div>
            <label htmlFor="experienciaMascotas" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Experiencia con Mascotas:</label>
            <textarea
              id="experienciaMascotas"
              value={experienciaMascotas}
              onChange={(e) => setExperienciaMascotas(e.target.value)}
              required
              rows={4}
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem', resize: 'vertical' }}
            ></textarea>
          </div>
           <div>
            <label htmlFor="tipoVivienda" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Tipo de Vivienda:</label>
            <input
              type="text" // O podrías usar un select dropdown
              id="tipoVivienda"
              value={tipoVivienda}
              onChange={(e) => setTipoVivienda(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
            />
          </div>


          {message && <p style={{ color: 'green', marginTop: '15px', textAlign: 'center' }}>{message}</p>}
          {error && <p style={{ color: 'red', marginTop: '15px', textAlign: 'center' }}>{error}</p>}

          <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold', transition: 'background-color 0.2s ease-in-out', alignSelf: 'center', width: 'auto' }}>
            Guardar Cambios del Perfil
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditarPerfilAdoptantePage;