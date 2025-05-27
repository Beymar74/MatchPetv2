// src/app/servicios/paseadores-cuidadores/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';


// Interfaz para los datos de un paseador/cuidador en la lista
interface PaseadorCuidador {
  id: string;
  nombre: string;
  fotoUrl?: string; // URL de la foto
  ubicacionServicio: string; // Ej: "Centro de la Ciudad", "Barrio A y B"
  serviciosOfrecidos: string[]; // Ej: ["Paseo de Perros", "Cuidado a Domicilio"]
  sobreMi: string; // Breve descripción
  calificacionPromedio: number; // Ej: 4.8
  numeroResenas: number; // Ej: 25
  precioBase: string; // Ej: "$15/hora", "Desde $20 por visita"
}

// Simulación de datos de paseadores/cuidadores
const mockPaseadoresCuidadores: PaseadorCuidador[] = [
  {
    id: 'pc1',
    nombre: 'Ana García',
    fotoUrl: '/placeholders/person1.jpg', // Placeholder
    ubicacionServicio: 'Centro y Norte de la Ciudad',
    serviciosOfrecidos: ['Paseo de Perros', 'Cuidado a Domicilio'],
    sobreMi: 'Amante de los animales con 5 años de experiencia. Ofrezco paseos energéticos y cuidado personalizado en tu hogar.',
    calificacionPromedio: 4.9,
    numeroResenas: 45,
    precioBase: '$18/hora (paseo)'
  },
  {
    id: 'pc2',
    nombre: 'Juan Pérez',
    fotoUrl: '/placeholders/person2.jpg', // Placeholder
    ubicacionServicio: 'Zona Sur',
    serviciosOfrecidos: ['Cuidado a Domicilio', 'Alojamiento'],
    sobreMi: 'Tengo un hogar seguro y espacioso para recibir a tu mascota. Mucho cariño y atención garantizados.',
    calificacionPromedio: 4.7,
    numeroResenas: 30,
    precioBase: 'Desde $30/noche (alojamiento)'
  },
  {
    id: 'pc3',
    nombre: 'María Rodríguez',
    fotoUrl: '/placeholders/person3.jpg', // Placeholder
    ubicacionServicio: 'Toda la Ciudad',
    serviciosOfrecidos: ['Paseo de Perros', 'Cuidado a Domicilio', 'Visitas Cortas'],
    sobreMi: 'Flexible y apasionada por los perros y gatos. Me adapto a las necesidades de tu mascota.',
    calificacionPromedio: 4.8,
    numeroResenas: 55,
    precioBase: 'Desde $15 por visita'
  },
  {
    id: 'pc4',
    nombre: 'Carlos Sánchez',
    fotoUrl: '/placeholders/person4.jpg', // Placeholder
    ubicacionServicio: 'Zona Este',
    serviciosOfrecidos: ['Paseo de Perros'],
    sobreMi: 'Entrenador canino certificado ofreciendo paseos educativos. Ideal para perros con mucha energía.',
    calificacionPromedio: 5.0,
    numeroResenas: 15,
    precioBase: '$25/hora (paseo educativo)'
  },
   {
    id: 'pc5',
    nombre: 'Laura Gómez',
    fotoUrl: '/placeholders/person5.jpg', // Placeholder
    ubicacionServicio: 'Zona Oeste',
    serviciosOfrecidos: ['Cuidado a Domicilio', 'Alojamiento para Gatos'],
    sobreMi: 'Especialista en el cuidado felino. Tu gato estará como en casa, con mucho juego y mimos.',
    calificacionPromedio: 4.9,
    numeroResenas: 20,
    precioBase: 'Desde $25/noche (gato)'
  },
];


const ListaPaseadoresCuidadoresPage = () => {
  const [lista, setLista] = useState<PaseadorCuidador[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Cargar la lista de paseadores/cuidadores
  useEffect(() => {
    const fetchLista = async () => {
      setLoading(true);
      setError('');
      try {
        // Aquí iría la llamada API real para obtener la lista
        // const response = await fetch('/api/servicios/paseadores-cuidadores');
        // if (!response.ok) {
        //    throw new Error('Error al cargar la lista de paseadores y cuidadores.');
        // }
        // const data: PaseadorCuidador[] = await response.json();
        // setLista(data);

        // Simular la carga con mock data y un pequeño retraso
        await new Promise(resolve => setTimeout(resolve, 500));
        setLista(mockPaseadoresCuidadores);

      } catch (err: any) {
        setError(err.message || 'Error al cargar la lista.');
      } finally {
        setLoading(false);
      }
    };
    fetchLista();
  }, []); // Se ejecuta solo una vez al montar el componente


  if (loading) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>Cargando paseadores y cuidadores...</div>;
  }

  if (error) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px', color: 'red' }}>{error}</div>;
  }


  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px', color: '#333', textAlign: 'center' }}>Paseadores y Cuidadores de Mascotas</h1>

       {/* Aquí irían los filtros y la barra de búsqueda */}
       {/*
       <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f8f8', borderRadius: '8px' }}>
           <h2 style={{ marginTop: '0', marginBottom: '10px' }}>Filtros y Búsqueda (Simulado)</h2>
           <p>Filtros por ubicación, tipo de servicio, calificación, etc.</p>
           <input type="text" placeholder="Buscar por nombre o ubicación..." style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
            // Implementar lógica de filtrado/búsqueda y actualización del estado 'lista'
       </div>
       */}


      {lista.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No se encontraron paseadores o cuidadores en este momento.</p>
      ) : (
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {lista.map(item => (
              <Link key={item.id} href={`/servicios/paseadores-cuidadores/${item.id}`} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                 <div style={{
                     backgroundColor: '#fff',
                     padding: '20px',
                     borderRadius: '8px',
                     boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                     cursor: 'pointer',
                     transition: 'transform 0.2s ease-in-out',
                      display: 'flex', // Usar flexbox para la distribución interna
                     gap: '15px',
                 }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                 >
                    {/* Foto del Paseador/Cuidador */}
                    <div style={{ flexShrink: 0 }}> {/* Evita que la imagen se encoja */}
                        <img
                           src={item.fotoUrl || '/placeholders/default-person.jpg'} // Placeholder si no hay foto
                           alt={`Foto de ${item.nombre}`}
                           style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #eee' }}
                       />
                        {/* Reemplazar con un componente de imagen optimizado */}
                    </div>

                    {/* Información del Paseador/Cuidador */}
                    <div style={{ flexGrow: 1 }}> {/* Permite que la info ocupe el espacio restante */}
                        <h2 style={{ marginTop: '0', marginBottom: '5px', color: '#007bff', fontSize: '1.3rem' }}>{item.nombre}</h2>
                         <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '5px' }}>
                             {item.ubicacionServicio}
                         </p>
                          <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '10px' }}>
                             {item.serviciosOfrecidos.join(', ')}
                         </p>
                        <p style={{ fontSize: '1rem', color: '#333', marginBottom: '10px' }}>
                            {item.sobreMi}
                        </p>
                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', color: '#777' }}>
                              <span style={{ fontWeight: 'bold', color: '#ffc107' }}>⭐ {item.calificacionPromedio.toFixed(1)} ({item.numeroResenas} reseñas)</span>
                              <span style={{ fontWeight: 'bold', color: '#28a745' }}>{item.precioBase}</span>
                         </div>
                    </div>
                 </div>
              </Link>
            ))}
          </div>
      )}


    </div>
  );
};

export default ListaPaseadoresCuidadoresPage;