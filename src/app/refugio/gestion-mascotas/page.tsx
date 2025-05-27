// src/app/refugio/gestion-mascotas/page.tsx
'use client';

import React, { useState, useEffect } from 'react';

// Definir la interfaz para una mascota
interface Mascota {
  id: string;
  nombre: string;
  especie: string;
  raza: string;
  edad: number; // O podrías usar string como en el mock
  estado: 'Disponible' | 'Adoptado' | 'En Proceso' | 'Necesidades Especiales'; // Ejemplo de estados
  descripcion: string;
  // Otros campos como fotos, salud, compatibilidad, etc.
}

// Simulación de datos de mascotas
const mockMascotas: Mascota[] = [
  {
    id: 'pet1',
    nombre: 'Max',
    especie: 'Perro',
    raza: 'Labrador',
    edad: 3,
    estado: 'Disponible',
    descripcion: 'Max es un perro muy juguetón y amigable.',
  },
  {
    id: 'pet2',
    nombre: 'Luna',
    especie: 'Gato',
    raza: 'Siamés',
    edad: 1,
    estado: 'En Proceso',
    descripcion: 'Luna es una gata curiosa y cariñosa.',
  },
  {
    id: 'pet3',
    nombre: 'Rocky',
    especie: 'Perro',
    raza: 'Bulldog',
    edad: 5,
    estado: 'Adoptado',
    descripcion: 'Rocky encontró un hogar maravilloso.',
  },
];

const GestionMascotasPage = () => {
  const [mascotas, setMascotas] = useState<Mascota[]>(mockMascotas);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [currentMascota, setCurrentMascota] = useState<Mascota | null>(null); // Para editar
  const [formData, setFormData] = useState<Omit<Mascota, 'id'>>({ // Datos del formulario (excluyendo id)
    nombre: '',
    especie: '',
    raza: '',
    edad: 0,
    estado: 'Disponible',
    descripcion: '',
  });

  // En un caso real, aquí cargarías las mascotas del refugio autenticado
  // useEffect(() => {
  //   const fetchMascotas = async () => {
  //     setLoading(true);
  //     try {
  //       // const response = await fetch('/api/refugio/mascotas'); // Ejemplo de API route
  //       // const data = await response.json();
  //       // setMascotas(data);
  //     } catch (err) {
  //       setError('Error al cargar las mascotas.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchMascotas();
  // }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'edad' && e.target.type === 'number' ? parseInt(value, 10) : value,
    }));
  };

  const handleAddMascotaClick = () => {
    setCurrentMascota(null); // Limpiar para agregar nuevo
    setFormData({ // Resetear formulario
      nombre: '',
      especie: '',
      raza: '',
      edad: 0,
      estado: 'Disponible',
      descripcion: '',
    });
    setShowForm(true);
  };

  const handleEditMascotaClick = (mascota: Mascota) => {
    setCurrentMascota(mascota); // Establecer mascota actual para editar
    setFormData({ // Llenar formulario con datos de la mascota
      nombre: mascota.nombre,
      especie: mascota.especie,
      raza: mascota.raza,
      edad: mascota.edad,
      estado: mascota.estado,
      descripcion: mascota.descripcion,
    });
    setShowForm(true);
  };

  const handleDeleteMascota = (mascotaId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta mascota?')) {
      console.log(`Eliminar mascota con ID: ${mascotaId}`);
      // Aquí iría la lógica para llamar a tu backend para eliminar la mascota
      // Después de la eliminación exitosa, actualizar la lista
      setMascotas(mascotas.filter(mascota => mascota.id !== mascotaId));
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Aquí iría la lógica para llamar a tu backend para crear o actualizar la mascota
    console.log('Datos del formulario:', formData);

    if (currentMascota) {
      // Lógica de Actualización
      console.log('Actualizando mascota:', currentMascota.id, formData);
      // Simulación: actualizar la lista localmente
      setMascotas(mascotas.map(mascota =>
        mascota.id === currentMascota.id ? { ...mascota, ...formData, id: mascota.id } as Mascota : mascota
      ));
    } else {
      // Lógica de Creación
      console.log('Creando nueva mascota:', formData);
      // Simulación: agregar a la lista localmente con un ID temporal
      const newMascota = { ...formData, id: `new-pet-${Date.now()}` } as Mascota;
      setMascotas([...mascotas, newMascota]);
    }

    // Ocultar formulario y resetear
    setShowForm(false);
    setCurrentMascota(null);
    setFormData({
      nombre: '',
      especie: '',
      raza: '',
      edad: 0,
      estado: 'Disponible',
      descripcion: '',
    });
  };

  if (loading) {
    return <p>Cargando mascotas...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1 style={{ marginBottom: '20px', color: '#333' }}>Gestión de Mascotas</h1>

      {/* Lista/Tabla de Mascotas */}
      {!showForm && (
        <div>
          <button
            onClick={handleAddMascotaClick}
            style={{
              backgroundColor: '#28a745',
              color: '#fff',
              padding: '10px 15px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold',
              marginBottom: '20px'
            }}
          >
            Agregar Nueva Mascota
          </button>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Nombre</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Especie</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Estado</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {mascotas.map(mascota => (
                <tr key={mascota.id}>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{mascota.nombre}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{mascota.especie}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{mascota.estado}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                    <button
                      onClick={() => handleEditMascotaClick(mascota)}
                      style={{ marginRight: '5px', backgroundColor: '#ffc107', color: '#333', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteMascota(mascota.id)}
                      style={{ backgroundColor: '#dc3545', color: '#fff', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Formulario de Creación/Edición */}
      {showForm && (
        <div style={{ marginTop: '30px', backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>{currentMascota ? 'Editar Mascota' : 'Agregar Nueva Mascota'}</h2>
          <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {/* Nombre */}
            <div>
              <label htmlFor="nombre" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
              />
            </div>

            {/* Especie */}
            <div>
              <label htmlFor="especie" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Especie:</label>
              <input
                type="text"
                id="especie"
                name="especie"
                value={formData.especie}
                onChange={handleInputChange}
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
              />
            </div>

            {/* Raza */}
             <div>
              <label htmlFor="raza" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Raza:</label>
              <input
                type="text"
                id="raza"
                name="raza"
                value={formData.raza}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
              />
            </div>

            {/* Edad */}
             <div>
              <label htmlFor="edad" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Edad:</label>
              <input
                type="number"
                id="edad"
                name="edad"
                value={formData.edad}
                onChange={handleInputChange}
                 required
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
              />
            </div>

            {/* Estado */}
            <div>
              <label htmlFor="estado" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Estado:</label>
              <select
                id="estado"
                name="estado"
                value={formData.estado}
                onChange={handleInputChange}
                 required
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
              >
                <option value="Disponible">Disponible</option>
                <option value="Adoptado">Adoptado</option>
                <option value="En Proceso">En Proceso</option>
                 <option value="Necesidades Especiales">Necesidades Especiales</option>
              </select>
            </div>

            {/* Descripción */}
            <div>
              <label htmlFor="descripcion" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Descripción:</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                rows={6}
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
              />
            </div>

             {/* Carga de Fotos (Comentado - Requiere lógica de subida) */}
            {/*
            <div>
              <label htmlFor="fotos" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Fotos:</label>
              <input
                type="file"
                id="fotos"
                name="fotos"
                accept=".jpg,.jpeg,.png"
                multiple // Para permitir múltiples archivos
                // onChange={handlePhotoUpload} // Necesitarías una función para manejar la subida de fotos
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
              />
            </div>
            */}

            {/* Otros campos (Comentado - Puedes agregarlos aquí) */}
            {/*
             <div>
              <label htmlFor="tamano" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Tamaño:</label>
               <input type="text" id="tamano" name="tamano" value={formData.tamano} onChange={handleInputChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }} />
            </div>
             <div>
              <label htmlFor="genero" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Género:</label>
               <input type="text" id="genero" name="genero" value={formData.genero} onChange={handleInputChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }} />
            </div>
            */}


            {error && <p style={{ color: 'red', marginTop: '15px', textAlign: 'center' }}>{error}</p>}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                style={{ backgroundColor: '#6c757d', color: '#fff', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}
              >
                {currentMascota ? 'Guardar Cambios' : 'Agregar Mascota'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default GestionMascotasPage;