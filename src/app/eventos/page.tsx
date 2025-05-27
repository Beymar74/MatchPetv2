// src/app/eventos/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Para el enlace a detalles del evento

// Interfaz para los datos de un evento
interface Evento {
  id: string; // ID único
  nombre: string;
  fechaHora: string; // Usamos string para simulación (ej: "Sábado, 18 de Noviembre, 10:00 AM")
  ubicacion: string; // Usamos string para simulación (ej: "Parque Central")
  organizador: string; // Simulado
  descripcionBreve: string;
  imagenUrl?: string; // URL de la imagen/póster (placeholder)
}

// Simulación de datos de eventos
const mockEventos: Evento[] = [
  {
    id: 'event1',
    nombre: 'Jornada de Adopción Canina',
    fechaHora: 'Sábado, 25 de Noviembre, 10:00 AM - 2:00 PM',
    ubicacion: 'Parque de los Pinos, Área de Eventos',
    organizador: 'Refugio Esperanza Canina',
    descripcionBreve: 'Ven a conocer perritos adorables que buscan un hogar para siempre.',
    imagenUrl: '/placeholders/event_dog_adoption.jpg', // Placeholder
  },
  {
    id: 'event2',
    nombre: 'Taller de Cuidado Básico para Gatos',
    fechaHora: 'Domingo, 26 de Noviembre, 3:00 PM - 5:00 PM',
    ubicacion: 'Centro Comunitario La Casita',
    organizador: 'Asociación Felina Local',
    descripcionBreve: 'Aprende sobre alimentación, higiene y salud preventiva para tu gato.',
    imagenUrl: '/placeholders/event_cat_care.jpg', // Placeholder
  },
   {
    id: 'event3',
    nombre: 'Caminata Solidaria "Pasos de Esperanza"',
    fechaHora: 'Sábado, 02 de Diciembre, 9:00 AM',
    ubicacion: 'Bosque Urbano (Punto de encuentro en la entrada principal)',
    organizador: 'Protectora Animal Unidos',
    descripcionBreve: 'Participa en nuestra caminata anual para recaudar fondos para animales rescatados.',
    imagenUrl: '/placeholders/event_walk.jpg', // Placeholder
  },
    {
    id: 'event4',
    nombre: 'Feria de Productos Artesanales Pet-Friendly',
    fechaHora: 'Domingo, 03 de Diciembre, 11:00 AM - 4:00 PM',
    ubicacion: 'Plaza del Arte, Puestos Exteriores',
    organizador: 'Comunidad Amiga de las Mascotas',
    descripcionBreve: 'Encuentra productos únicos para tus mascotas y apoya a artesanos locales.',
    imagenUrl: '/placeholders/event_market.jpg', // Placeholder
  },
];


const EventosPage = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Cargar la lista de eventos
  useEffect(() => {
    const fetchEventos = async () => {
      setLoading(true);
      setError('');
      try {
        // Aquí iría la llamada API real para obtener la lista de eventos
        // const response = await fetch('/api/eventos');
        // if (!response.ok) {
        //    throw new Error('Error al cargar la lista de eventos.');
        // }
        // const data: Evento[] = await response.json();
        // setEventos(data);

        // Simular la carga con mock data
        await new Promise(resolve => setTimeout(resolve, 500)); // Simular retraso de red
        setEventos(mockEventos);

      } catch (err: any) {
        setError(err.message || 'Error al cargar la lista.');
      } finally {
        setLoading(false);
      }
    };
    fetchEventos();
  }, []); // El array vacío asegura que esto solo se ejecute una vez al montar


    // Aquí iría la lógica para filtrar o buscar eventos si se implementan esas funcionalidades


  if (loading) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>Cargando eventos...</div>;
  }

  if (error) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px', color: 'red' }}>{error}</div>;
  }


  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>Próximos Eventos</h1>

      <div style={{ marginBottom: '40px', fontSize: '1.1rem', lineHeight: '1.6', color: '#555', textAlign: 'center' }}>
        <p>Participa en eventos que apoyan el bienestar animal, jornadas de adopción, talleres y más. ¡Tu asistencia hace la diferencia!</p>
      </div>


       {/* Aquí podrías añadir un campo de búsqueda o filtros */}
       {/* <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
            <h3>Filtros (Simulados)</h3>
             <p>Aquí irían opciones para filtrar por fecha, tipo de evento, ubicación, etc.</p>
       </div> */}


      <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {eventos.length > 0 ? (
          eventos.map((evento) => (
            // Enlace a la página de detalles de este evento específico
            <Link key={evento.id} href={`/eventos/${evento.id}`} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{
                    backgroundColor: '#fff',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease-in-out',
                     height: '100%', // Asegura altura consistente
                     justifyContent: 'space-between' // Para alinear contenido
                }}
                 onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
                 onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                    {/* Imagen del evento */}
                    <img
                       src={evento.imagenUrl || '/placeholders/event-placeholder.jpg'} // Usar un placeholder genérico
                       alt={`Imagen del evento ${evento.nombre}`}
                       style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px', marginBottom: '15px' }}
                   />

                    <div>
                        <h2 style={{ margin: '0 0 5px 0', fontSize: '1.5rem', color: '#333' }}>{evento.nombre}</h2>
                        <p style={{ margin: '0 0 5px 0', fontSize: '1rem', color: '#555', fontWeight: 'bold' }}>{evento.fechaHora}</p>
                         <p style={{ margin: '0 0 10px 0', fontSize: '1rem', color: '#555' }}>Ubicación: {evento.ubicacion}</p>
                         <p style={{ margin: '0 0 15px 0', fontSize: '0.9rem', color: '#777' }}>Organizador: {evento.organizador}</p>


                        {/* Descripción Breve */}
                        <div style={{ marginBottom: '15px' }}>
                             <p style={{ margin: '0', fontSize: '1rem', color: '#666' }}>
                                {evento.descripcionBreve.length > 150 ? evento.descripcionBreve.substring(0, 150) + '...' : evento.descripcionBreve} {/* Cortar descripción si es muy larga */}
                            </p>
                        </div>
                    </div>


                    {/* Botón */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 'auto' }}> {/* marginTop: auto para empujar al final */}
                         <button
                             style={{
                                 backgroundColor: '#007bff', // Color azul
                                 color: '#fff',
                                 padding: '10px 20px',
                                 border: 'none',
                                 borderRadius: '5px',
                                 cursor: 'pointer',
                                 fontSize: '1rem',
                                 fontWeight: 'bold',
                                  transition: 'background-color 0.2s ease-in-out',
                                  width: '100%', // Botón ancho completo
                             }}
                              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
                             onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
                         >
                             Ver Detalles
                         </button>
                    </div>
                </div>
            </Link>
          ))
        ) : (
          <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>No hay eventos próximos en este momento.</p>
        )}
      </div>


       {/* Comentario para la paginación */}
       {/* <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <p>Aquí iría la paginación si hay muchos resultados.</p>
       </div> */}


    </div>
  );
};

export default EventosPage;