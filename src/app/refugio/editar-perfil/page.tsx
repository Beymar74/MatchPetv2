// src/app/refugio/editar-perfil/page.tsx
'use client';

import React, { useState, useEffect } from 'react';

// Simulación de datos del perfil del refugio
const mockRefugioProfile = {
  nombre: 'Refugio Esperanza',
  telefono: '987-654-3210',
  email: 'contacto@refugioesperanza.org',
  direccion: {
    calle: 'Avenida Principal',
    numero: '456',
    ciudad: 'Ciudad Refugio',
    codigoPostal: '11111',
    pais: 'País Ejemplo',
  },
  sitioWeb: 'https://www.refugioesperanza.org',
  descripcion: 'Somos un refugio dedicado a rescatar y encontrar hogares para perros y gatos necesitados.',
  horarioAtencion: 'Lunes a Viernes: 9 AM - 5 PM, Sábados: 10 AM - 2 PM',
};

const EditarPerfilRefugioPage = () => {
  // Estado para los campos editables del perfil del refugio
  const [nombre, setNombre] = useState(mockRefugioProfile.nombre);
  const [telefono, setTelefono] = useState(mockRefugioProfile.telefono);
  const [email, setEmail] = useState(mockRefugioProfile.email);
  const [direccion, setDireccion] = useState(mockRefugioProfile.direccion);
  const [sitioWeb, setSitioWeb] = useState(mockRefugioProfile.sitioWeb);
  const [descripcion, setDescripcion] = useState(mockRefugioProfile.descripcion);
  const [horarioAtencion, setHorarioAtencion] = useState(mockRefugioProfile.horarioAtencion);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);


  // En un caso real, aquí cargarías los datos del perfil del refugio autenticado al cargar la página
  // useEffect(() => {
  //   const fetchRefugioProfile = async () => {
  //     setLoading(true);
  //     try {
  //       // const response = await fetch('/api/refugio/perfil'); // Ejemplo de API route
  //       // const data = await response.json();
  //       // setNombre(data.nombre);
  //       // setTelefono(data.telefono);
  //       // setEmail(data.email);
  //       // setDireccion(data.direccion);
  //       // setSitioWeb(data.sitioWeb);
  //       // setDescripcion(data.descripcion);
  //       // setHorarioAtencion(data.horarioAtencion);
  //     } catch (err) {
  //       setError('Error al cargar el perfil del refugio.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchRefugioProfile();
  // }, []);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Aquí iría la lógica para actualizar el perfil del refugio
    console.log('Datos del perfil del refugio actualizados:', {
      nombre,
      telefono,
      email,
      direccion,
      sitioWeb,
      descripcion,
      horarioAtencion,
    });

    // Validar campos (ejemplo básico)
    if (!nombre || !telefono || !email || !direccion.calle || !direccion.ciudad || !descripcion || !horarioAtencion) {
      setError('Por favor, completa los campos obligatorios.');
      setMessage('');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    // Simulación de actualización exitosa (reemplazar con lógica real)
    try {
        // const response = await fetch('/api/refugio/perfil', { // Ejemplo de API route para actualizar
        // method: 'PUT',
        // headers: {
        //     'Content-Type': 'application/json',
        // },
        // body: JSON.stringify({
        //     nombre,
        //     telefono,
        //     email,
        //     direccion,
        //     sitioWeb,
        //     descripcion,
        //     horarioAtencion,
        // }),
        // });

        // if (!response.ok) {
        //     throw new Error('Error al actualizar el perfil del refugio.');
        // }

        // const data = await response.json();
        setMessage('Perfil del refugio actualizado exitosamente.');
        // console.log('Respuesta del backend:', data);

    } catch (err: any) {
        setError(`Error al actualizar el perfil: ${err.message}`);
        setMessage('');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', backgroundColor: '#f0f0f0' }}>
      <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '700px' }}> {/* Aumenté el maxWidth */}
        <h1 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>Editar Perfil del Refugio</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Nombre del Refugio */}
          <div>
            <label htmlFor="nombre" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nombre del Refugio:</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
            />
          </div>

          {/* Teléfono de Contacto */}
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

          {/* Correo Electrónico de Contacto */}
          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Correo Electrónico de Contacto:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
            />
          </div>

           {/* Dirección */}
           <div>
            <h2 style={{ marginBottom: '10px', color: '#555', fontSize: '1.2rem' }}>Dirección:</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}> {/* Diseño de grid adaptable */}
              <div>
                <label htmlFor="calle" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Calle:</label>
                <input
                  type="text"
                  id="calle"
                  value={direccion.calle}
                  onChange={(e) => setDireccion({ ...direccion, calle: e.target.value })}
                  required
                  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
                />
              </div>
              <div>
                <label htmlFor="numero" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Número:</label>
                <input
                  type="text"
                  id="numero"
                  value={direccion.numero}
                  onChange={(e) => setDireccion({ ...direccion, numero: e.target.value })}
                  required
                  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
                />
              </div>
              <div>
                <label htmlFor="ciudad" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Ciudad:</label>
                <input
                  type="text"
                  id="ciudad"
                  value={direccion.ciudad}
                  onChange={(e) => setDireccion({ ...direccion, ciudad: e.target.value })}
                  required
                  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
                />
              </div>
              <div>
                <label htmlFor="codigoPostal" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Código Postal:</label>
                <input
                  type="text"
                  id="codigoPostal"
                  value={direccion.codigoPostal}
                  onChange={(e) => setDireccion({ ...direccion, codigoPostal: e.target.value })}
                  required
                  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
                />
              </div>
              <div>
                <label htmlFor="pais" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>País:</label>
                <input
                  type="text"
                  id="pais"
                  value={direccion.pais}
                  onChange={(e) => setDireccion({ ...direccion, pais: e.target.value })}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
                />
              </div>
            </div>
          </div>


          {/* Sitio Web */}
          <div>
            <label htmlFor="sitioWeb" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Sitio Web (Opcional):</label>
            <input
              type="url"
              id="sitioWeb"
              value={sitioWeb}
              onChange={(e) => setSitioWeb(e.target.value)}
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
            />
          </div>

          {/* Descripción */}
          <div>
            <label htmlFor="descripcion" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Descripción del Refugio:</label>
            <textarea
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
              rows={6}
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
            />
          </div>

          {/* Horario de Atención */}
          <div>
            <label htmlFor="horarioAtencion" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Horario de Atención:</label>
            <input
              type="text"
              id="horarioAtencion"
              value={horarioAtencion}
              onChange={(e) => setHorarioAtencion(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
            />
          </div>

          {/* Campo para subir logo (Opcional - Requiere lógica de subida de archivos) */}
          {/*
          <div>
            <label htmlFor="logo" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Logo del Refugio (Opcional):</label>
            <input
              type="file"
              id="logo"
              accept=".jpg,.jpeg,.png"
              // onChange={handleLogoChange} // Implementar función de manejo de archivo
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
            />
             // {logo && <p style={{ marginTop: '5px', fontSize: '0.9rem', color: '#555' }}>Archivo seleccionado: {logo.name}</p>}
          </div>
          */}


          {message && <p style={{ color: 'green', marginTop: '15px', textAlign: 'center' }}>{message}</p>}
          {error && <p style={{ color: 'red', marginTop: '15px', textAlign: 'center' }}>{error}</p>}

          <button
            type="submit"
             disabled={loading}
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
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditarPerfilRefugioPage;