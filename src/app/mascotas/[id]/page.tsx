// src/app/mascotas/[id]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

// Interfaz para la estructura de una mascota (versión detallada para esta página)
interface MascotaDetalle {
  id: string;
  nombre: string;
  especie: string;
  raza: string;
  edad: number;
  genero: string;
  tamano: string;
  colores: string;
  ubicacion: string; // Ciudad/País del refugio simulado
  fotos: string[]; // URLs de las fotos
  descripcionCompleta: string;
  estadoSalud?: string; // Opcional
  compatibilidad?: string; // Opcional
  refugio: {
    id: string;
    nombre: string;
    // Podrías añadir más detalles del refugio si es necesario
  };
}

// Simulación de datos detallados de mascotas
const mockMascotasDetalle: MascotaDetalle[] = [
  {
    id: 'pet1',
    nombre: 'Buddy',
    especie: 'Perro',
    raza: 'Labrador',
    edad: 2,
    genero: 'Macho',
    tamano: 'Grande',
    colores: 'Dorado',
    ubicacion: 'Ciudad Ejemplo, País',
    fotos: [
      'https://via.placeholder.com/400x300/007bff/ffffff?text=Buddy+Foto+1',
      'https://via.placeholder.com/400x300/007bff/ffffff?text=Buddy+Foto+2',
    ],
    descripcionCompleta: 'Buddy es un perro muy enérgico y cariñoso. Le encanta jugar a buscar la pelota y dar largos paseos. Es bueno con niños mayores y otros perros.',
    estadoSalud: 'Vacunas al día, desparasitado.',
    compatibilidad: 'Bueno con niños (mayores de 8), bueno con otros perros. No probado con gatos.',
    refugio: { id: 'shelter1', nombre: 'Refugio Esperanza' },
  },
  {
    id: 'pet2',
    nombre: 'Lucy',
    especie: 'Gato',
    raza: 'Siamés',
    edad: 1,
    genero: 'Hembra',
    tamano: 'Mediano',
    colores: 'Crema y marrón',
    ubicacion: 'Pueblo Tranquilo, País',
    fotos: [
      'https://via.placeholder.com/400x300/ffc107/000000?text=Lucy+Foto+1',
    ],
    descripcionCompleta: 'Lucy es una gata muy tranquila y algo independiente. Disfruta de la compañía pero también de sus momentos a solas. Perfecta para un hogar tranquilo.',
    estadoSalud: 'Vacunas al día, esterilizada.',
    compatibilidad: 'Prefiere ser la única mascota.',
    refugio: { id: 'shelter2', nombre: 'Refugio Amor Felino' },
  },
  // Agregar más mock data si es necesario
];

const MascotaDetallesPage = () => {
  const params = useParams();
  const petId = params.id as string; // Obtiene el ID de la URL
  const [mascota, setMascota] = useState<MascotaDetalle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!petId) {
      setError('ID de mascota no proporcionado.');
      setLoading(false);
      return;
    }

    const fetchMascotaDetalle = async () => {
      setLoading(true);
      setError('');
      try {
        // En un caso real, harías una llamada a tu API para obtener los detalles de la mascota por ID
        // const response = await fetch(`/api/mascotas/${petId}`); // Ejemplo de API route
        // if (!response.ok) {
        //   throw new Error('Mascota no encontrada.');
        // }
        // const data = await response.json(); // Debería ser un objeto MascotaDetalle
        // setMascota(data);

        // Simulación: Buscar en mock data
        const foundMascota = mockMascotasDetalle.find(m => m.id === petId);
        if (foundMascota) {
          setMascota(foundMascota);
        } else {
          setError('Mascota no encontrada.');
        }

      } catch (err: any) {
        setError(`Error al cargar los detalles de la mascota: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMascotaDetalle();
  }, [petId]); // Dependencia en petId para recargar si cambia la URL

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Cargando detalles de la mascota...</div>;
  }

  if (error) {
    return <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>{error}</div>;
  }

  if (!mascota) {
     return <div style={{ padding: '20px', textAlign: 'center' }}>Mascota no encontrada.</div>;
  }


  // Si la mascota se cargó correctamente
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '900px', margin: '0 auto' }}> {/* Centrar contenido y limitar ancho */}
      <h1 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>{mascota.nombre}</h1>

      {/* Galería de Fotos (Simulada) */}
      <div style={{ marginBottom: '20px', display: 'flex', overflowX: 'auto', gap: '10px' }}>
        {mascota.fotos.map((foto, index) => (
          <img
            key={index}
            src={foto}
            alt={`Foto ${index + 1} de ${mascota.nombre}`}
            style={{ width: 'auto', height: '300px', objectFit: 'cover', borderRadius: '8px' }} // Altura fija, ancho automático
          />
        ))}
         {mascota.fotos.length === 0 && <p>No hay fotos disponibles.</p>}
      </div>

      {/* Información Básica */}
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)', marginBottom: '20px' }}>
        <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Información General</h2>
        <p><strong>Especie:</strong> {mascota.especie}</p>
        <p><strong>Raza:</strong> {mascota.raza}</p>
        <p><strong>Edad:</strong> {mascota.edad} años</p>
        <p><strong>Género:</strong> {mascota.genero}</p>
        <p><strong>Tamaño:</strong> {mascota.tamano}</p>
        <p><strong>Colores:</strong> {mascota.colores}</p>
        <p><strong>Ubicación:</strong> {mascota.ubicacion}</p>
         {mascota.estadoSalud && <p><strong>Estado de Salud:</strong> {mascota.estadoSalud}</p>}
         {mascota.compatibilidad && <p><strong>Compatibilidad:</strong> {mascota.compatibilidad}</p>}
      </div>

      {/* Descripción Detallada */}
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)', marginBottom: '20px' }}>
        <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Sobre {mascota.nombre}</h2>
        <p>{mascota.descripcionCompleta}</p>
      </div>

      {/* Información del Refugio (Simulada) */}
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)', marginBottom: '30px' }}>
        <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Rescatado por</h2>
        <p><strong>Refugio:</strong> {mascota.refugio.nombre}</p>
        {/* Enlace al perfil del refugio si existe */}
         {/* <Link href={`/refugio/${mascota.refugio.id}`}>Ver perfil del Refugio</Link> */}
      </div>


      {/* Botón Solicitar Adopción */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={() => console.log(`Clic en Solicitar Adopción para Mascota ID: ${mascota.id}`)}
          style={{ backgroundColor: '#28a745', color: '#fff', padding: '15px 30px', fontSize: '1.2rem', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Solicitar Adopción para {mascota.nombre}
        </button>
        {/* Aquí se integraría la lógica real para redirigir al formulario de solicitud */}
      </div>

    </div>
  );
};

export default MascotaDetallesPage;