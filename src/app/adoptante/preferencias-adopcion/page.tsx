// src/app/adoptante/preferencias-adopcion/page.tsx
'use client';

import React, { useState, useEffect } from 'react';

// Simulación de datos de preferencias del adoptante
const mockAdoptantePreferences = {
  especie: ['Perro'],
  raza: 'Labrador',
  edad: 'Joven',
  tamaño: 'Mediano',
  genero: 'Hembra',
  compatibilidadCon: ['Niños'],
};

const PreferenciasAdopcionPage = () => {
  // Estado para los campos de preferencias
  const [preferencias, setPreferencias] = useState(mockAdoptantePreferences);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Opciones para los selectores y radio buttons
  const especiesOpciones = ['Perro', 'Gato', 'Otro'];
  const edadOpciones = ['Cachorro', 'Joven', 'Adulto', 'Senior'];
  const tamañoOpciones = ['Pequeño', 'Mediano', 'Grande'];
  const generoOpciones = ['Macho', 'Hembra'];
  const compatibilidadOpciones = ['Niños', 'Otros perros', 'Otros gatos'];

  // En un caso real, aquí cargarías las preferencias del adoptante autenticado
  // useEffect(() => {
  //   const fetchAdoptantePreferences = async () => {
  //     // setLoading(true);
  //     try {
  //       // const response = await fetch('/api/adoptante/preferencias'); // Ejemplo de API route
  //       // const data = await response.json();
  //       // setPreferencias(data);
  //     } catch (err) {
  //       setError('Error al cargar las preferencias.');
  //     } finally {
  //       // setLoading(false);
  //     }
  //   };
  //   fetchAdoptantePreferences();
  // }, []);


  const handleEspecieChange = (especie: string, isChecked: boolean) => {
    setPreferencias(prev => {
      if (isChecked) {
        return { ...prev, especie: [...prev.especie, especie] };
      } else {
        return { ...prev, especie: prev.especie.filter(item => item !== especie) };
      }
    });
  };

  const handleCompatibilidadChange = (compatibilidad: string, isChecked: boolean) => {
    setPreferencias(prev => {
      if (isChecked) {
        return { ...prev, compatibilidadCon: [...prev.compatibilidadCon, compatibilidad] };
      } else {
        return { ...prev, compatibilidadCon: prev.compatibilidadCon.filter(item => item !== compatibilidad) };
      }
    });
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar las preferencias del adoptante
    console.log('Preferencias de adopción guardadas:', preferencias);

    // Validar campos (ejemplo básico)
    if (preferencias.especie.length === 0 || !preferencias.edad || !preferencias.tamaño || !preferencias.genero) {
        setError('Por favor, selecciona al menos una especie, edad, tamaño y género.');
        setMessage('');
        return;
    }


    // Simulación de guardado exitoso (reemplazar con lógica real)
    setMessage('Tus preferencias de adopción han sido guardadas.');
    setError('');
  };

  return (
    <div style={{ fontFamily: 'sans-serif', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', backgroundColor: '#f0f0f0' }}>
      <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '600px' }}>
        <h1 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>Configurar Preferencias de Adopción</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Especie Checkboxes */}
          <div>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Especie:</label>
            <div style={{ display: 'flex', gap: '15px' }}>
              {especiesOpciones.map(especie => (
                <div key={especie}>
                  <input
                    type="checkbox"
                    id={`especie-${especie}`}
                    checked={preferencias.especie.includes(especie)}
                    onChange={(e) => handleEspecieChange(especie, e.target.checked)}
                  />
                  <label htmlFor={`especie-${especie}`} style={{ marginLeft: '5px' }}>{especie}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Raza Text Input */}
          <div>
            <label htmlFor="raza" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Raza (opcional):</label>
            <input
              type="text"
              id="raza"
              value={preferencias.raza}
              onChange={(e) => setPreferencias({ ...preferencias, raza: e.target.value })}
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
            />
          </div>

          {/* Edad Select */}
          <div>
            <label htmlFor="edad" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Edad:</label>
            <select
              id="edad"
              value={preferencias.edad}
              onChange={(e) => setPreferencias({ ...preferencias, edad: e.target.value })}
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
            >
              <option value="">Selecciona una edad</option>
              {edadOpciones.map(edad => (
                <option key={edad} value={edad}>{edad}</option>
              ))}
            </select>
          </div>

          {/* Tamaño Radio Buttons */}
          <div>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Tamaño:</label>
            <div style={{ display: 'flex', gap: '15px' }}>
              {tamañoOpciones.map(tamaño => (
                <div key={tamaño}>
                  <input
                    type="radio"
                    id={`tamaño-${tamaño}`}
                    name="tamaño"
                    value={tamaño}
                    checked={preferencias.tamaño === tamaño}
                    onChange={(e) => setPreferencias({ ...preferencias, tamaño: e.target.value })}
                    required
                  />
                  <label htmlFor={`tamaño-${tamaño}`} style={{ marginLeft: '5px' }}>{tamaño}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Género Radio Buttons */}
          <div>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Género:</label>
            <div style={{ display: 'flex', gap: '15px' }}>
              {generoOpciones.map(genero => (
                <div key={genero}>
                  <input
                    type="radio"
                    id={`genero-${genero}`}
                    name="genero"
                    value={genero}
                    checked={preferencias.genero === genero}
                    onChange={(e) => setPreferencias({ ...preferencias, genero: e.target.value })}
                    required
                  />
                  <label htmlFor={`genero-${genero}`} style={{ marginLeft: '5px' }}>{genero}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Compatibilidad Checkboxes */}
           <div>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Compatibilidad con:</label>
            <div style={{ display: 'flex', gap: '15px' }}>
              {compatibilidadOpciones.map(compatibilidad => (
                <div key={compatibilidad}>
                  <input
                    type="checkbox"
                    id={`compatibilidad-${compatibilidad}`}
                    checked={preferencias.compatibilidadCon.includes(compatibilidad)}
                    onChange={(e) => handleCompatibilidadChange(compatibilidad, e.target.checked)}
                  />
                  <label htmlFor={`compatibilidad-${compatibilidad}`} style={{ marginLeft: '5px' }}>{compatibilidad}</label>
                </div>
              ))}
            </div>
          </div>


          {message && <p style={{ color: 'green', marginTop: '15px', textAlign: 'center' }}>{message}</p>}
          {error && <p style={{ color: 'red', marginTop: '15px', textAlign: 'center' }}>{error}</p>}
          <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold', transition: 'background-color 0.2s ease-in-out' }}>
            Guardar Preferencias
          </button>
        </form>
      </div>
    </div>
  );
};

export default PreferenciasAdopcionPage;