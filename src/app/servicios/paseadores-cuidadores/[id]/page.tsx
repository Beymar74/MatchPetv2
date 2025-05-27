// src/app/servicios/paseadores-cuidadores/[id]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link'; // Para un enlace de regreso


// Interfaz para los datos detallados de un paseador/cuidador
interface PaseadorCuidadorDetalle {
  id: string; // ID único
  nombre: string;
  fotoUrl?: string; // URL de la foto (placeholder)
  sobreMi: string; // Descripción más detallada
  serviciosDetallados: { nombre: string, descripcion: string, precio: string }[]; // Lista detallada de servicios
  areasServicio: string; // Descripción detallada de áreas de servicio
  disponibilidad: string; // Ej: "Lunes a Viernes 9am - 6pm"
  calificacion: number; // Calificación promedio
  numResenas: number; // Número total de reseñas
  resenasEjemplo?: { autor: string, calificacion: number, comentario: string }[]; // Algunas reseñas de ejemplo
  telefonoContacto?: string; // Teléfono simulado
  emailContacto?: string; // Email simulado
  // Puedes añadir otros datos como certificaciones, experiencia adicional, etc.
}

// Simulación de datos detallados de paseadores y cuidadores
const mockPaseadoresCuidadoresDetalle: PaseadorCuidadorDetalle[] = [
  {
    id: 'pc1',
    nombre: 'Ana Gómez',
    fotoUrl: '/placeholders/user1_large.jpg', // Placeholder para foto más grande
    sobreMi: 'Soy una apasionada de los perros desde que tengo memoria. He trabajado en refugios y tengo formación en comportamiento canino básico. Mi prioridad es la seguridad y felicidad de tu mascota durante nuestros paseos o mientras la cuido en la comodidad de tu hogar.',
    serviciosDetallados: [
        { nombre: 'Paseo de Perros (30 min)', descripcion: 'Paseo energico por el barrio.', precio: '$18' },
        { nombre: 'Paseo de Perros (60 min)', descripcion: 'Paseo extendido con tiempo de juego en parque (si aplica).', precio: '$25' },
        { nombre: 'Cuidado a Domicilio', descripcion: 'Visita de 1 hora para alimentar, jugar y sacar a tu perro.', precio: '$30 por visita' },
    ],
    areasServicio: 'Principalmente Zona Centro y Zona Norte (barrios: La Arboleda, El Mirador, Las Cumbres).',
    disponibilidad: 'Lunes a Viernes de 9:00 a 18:00. Fines de semana bajo consulta.',
    calificacion: 4.9,
    numResenas: 55,
     resenasEjemplo: [
         { autor: 'María P.', calificacion: 5, comentario: 'Ana es maravillosa con Max. Siempre regresa feliz y cansado de sus paseos.' },
         { autor: 'Juan S.', calificacion: 5, comentario: 'Muy confiable y profesional. Deja la casa impecable después del cuidado a domicilio.' },
     ]
  },
  {
    id: 'pc2',
    nombre: 'Carlos Rodríguez',
    fotoUrl: '/placeholders/user2_large.jpg', // Placeholder
    sobreMi: 'Toda mi vida he tenido perros y entiendo lo importante que es dejarlos con alguien de confianza. Mi casa tiene un gran espacio cercado donde tu perro puede jugar libremente. Ofrezco un ambiente familiar y cariñoso para el alojamiento nocturno.',
    serviciosDetallados: [
         { nombre: 'Paseo de Perros (45 min)', descripcion: 'Paseos por zonas verdes cercanas a mi domicilio.', precio: '$20' },
         { nombre: 'Alojamiento Nocturno', descripcion: 'Tu perro se hospeda en mi casa, con acceso a patio y compañía constante.', precio: '$40 por noche (descuento por estancias largas)' },
     ],
    areasServicio: 'Zona Sur (barrios: Los Pinos, El Bosque) y Zona Este (barrios: Las Flores).',
    disponibilidad: 'Alojamiento: 7 días a la semana. Paseos: Lunes a Viernes por la tarde (16:00-18:00).',
    calificacion: 4.7,
    numResenas: 30,
     resenasEjemplo: [
         { autor: 'Laura R.', calificacion: 5, comentario: 'Carlos cuidó de Toby durante mis vacaciones, y Toby lo pasó genial en su casa. Lo recomiendo totalmente.' },
         { autor: 'Pedro G.', calificacion: 4, comentario: 'Buen servicio de paseos, aunque a veces llega un poco tarde. Mi perro igual disfruta.' },
     ]
  },
    {
    id: 'pc3',
    nombre: 'Sofía López',
    fotoUrl: '/placeholders/user3_large.jpg', // Placeholder
    sobreMi: 'Entiendo que los gatos son criaturas de hábito y prefieren su propio entorno. Me enfoco en proporcionar visitas tranquilas y atentas, asegurando que tus gatos reciban alimento, agua, limpieza de arenero y mucho cariño y juego según su personalidad.',
    serviciosDetallados: [
         { nombre: 'Visita de Cuidado para Gatos (30 min)', descripcion: 'Alimento, agua, limpieza de arenero y 15-20 min de juego/cariño.', precio: '$20 por visita' },
         { nombre: 'Visita Extendida para Gatos (45 min)', descripcion: 'Más tiempo de juego y atención, ideal para gatos muy sociales.', precio: '$28 por visita' },
     ],
    areasServicio: 'Toda la Zona Oeste (barrios: El Sol, Las Nubes, El Lago).',
    disponibilidad: 'Lunes a Domingo, mañanas y tardes (horario flexible, consultar).',
    calificacion: 5.0,
    numResenas: 15,
      resenasEjemplo: [
         { autor: 'Elena C.', calificacion: 5, comentario: 'Sofía es una angel. Mis gatos la adoran y estoy tranquila cuando estoy fuera sabiendo que ella los cuida.' },
         { autor: 'Ricardo M.', calificacion: 5, comentario: 'Excelente cuidado. Siempre recibo actualizaciones y fotos de mis gatos.' },
     ]
  },
];


const PerfilDetalladoPaseadorCuidadorPage = () => {
  const params = useParams();
  const paseadorCuidadorId = params.id as string; // Obtener el ID de la URL

  const [perfil, setPerfil] = useState<PaseadorCuidadorDetalle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Cargar los datos detallados del paseador/cuidador específico
  useEffect(() => {
    if (!paseadorCuidadorId) {
        setLoading(false);
        setError('ID de paseador/cuidador no proporcionado.');
        return;
    }

    const fetchPerfilDetallado = async () => {
      setLoading(true);
      setError('');
      try {
        // Aquí iría la llamada API real para obtener los datos detallados
        // const response = await fetch(`/api/paseadores-cuidadores/${paseadorCuidadorId}`);
        // if (!response.ok) {
        //    if (response.status === 404) {
        //       throw new Error('Perfil no encontrado.');
        //    }
        //    throw new Error('Error al cargar el perfil detallado.');
        // }
        // const data: PaseadorCuidadorDetalle = await response.json();
        // setPerfil(data);

        // Simular la carga con mock data
        const foundPerfil = mockPaseadoresCuidadoresDetalle.find(p => p.id === paseadorCuidadorId);
        if (foundPerfil) {
          setPerfil(foundPerfil);
        } else {
          setError('Perfil no encontrado.');
        }

      } catch (err: any) {
        setError(err.message || 'Error al cargar el perfil detallado.');
      } finally {
        setLoading(false);
      }
    };
    fetchPerfilDetallado();
  }, [paseadorCuidadorId]); // Dependencia: el efecto se ejecuta cuando cambia el ID


  if (loading) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>Cargando perfil...</div>;
  }

  if (error) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px', color: 'red' }}>{error}</div>;
  }

  if (!perfil) {
     return <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>No se pudo cargar el perfil del paseador/cuidador.</div>;
  }


  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px', color: '#333', textAlign: 'center' }}>Perfil de {perfil.nombre}</h1>

       {/* Enlace de regreso a la lista */}
        <div style={{ marginBottom: '20px' }}>
             <Link href="/servicios/paseadores-cuidadores" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>
                 &lt; Volver a la lista de paseadores y cuidadores
             </Link>
        </div>


       <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>

            {/* Foto del paseador/cuidador */}
           <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <img
                   src={perfil.fotoUrl || '/placeholders/user-placeholder-large.jpg'} // Placeholder genérico más grande
                   alt={`Foto de ${perfil.nombre}`}
                   style={{ maxWidth: '200px', height: 'auto', borderRadius: '8px', objectFit: 'cover' }}
               />
               {/* Reemplazar con un componente de imagen optimizado (ej: next/image) */}
           </div>


            {/* Calificación */}
            <div style={{ textAlign: 'center', marginBottom: '20px', fontSize: '1.2rem', color: '#007bff', fontWeight: 'bold' }}>
                 ⭐ {perfil.calificacion.toFixed(1)} ({perfil.numResenas} reseñas)
            </div>


            {/* Sobre Mí */}
            <div style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
                <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Sobre Mí</h2>
                 <p style={{ whiteSpace: 'pre-wrap', margin: '0', lineHeight: '1.6' }}>{perfil.sobreMi}</p>
            </div>


            {/* Servicios Detallados */}
            <div style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
                 <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Servicios Ofrecidos</h2>
                 {perfil.serviciosDetallados && perfil.serviciosDetallados.length > 0 ? (
                     <ul style={{ margin: '0', paddingLeft: '20px' }}>
                         {perfil.serviciosDetallados.map((servicio, index) => (
                             <li key={index} style={{ marginBottom: '10px' }}>
                                 <strong>{servicio.nombre}:</strong> {servicio.descripcion} - <span style={{ fontWeight: 'bold', color: '#28a745' }}>{servicio.precio}</span>
                             </li>
                         ))}
                     </ul>
                 ) : (
                     <p>Información detallada de servicios no disponible.</p>
                 )}
            </div>

             {/* Áreas de Servicio */}
            <div style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
                <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Áreas de Servicio</h2>
                 <p style={{ margin: '0', lineHeight: '1.6' }}>{perfil.areasServicio || 'Información de áreas de servicio no especificada.'}</p>
            </div>

            {/* Disponibilidad */}
             <div style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
                 <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Disponibilidad</h2>
                  <p style={{ margin: '0', lineHeight: '1.6' }}>{perfil.disponibilidad || 'Disponibilidad no especificada. Por favor, contactar.'}</p>
             </div>


             {/* Reseñas de Ejemplo */}
              {perfil.resenasEjemplo && perfil.resenasEjemplo.length > 0 && (
                 <div style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
                     <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Reseñas ({perfil.numResenas})</h2>
                     <div style={{ display: 'grid', gap: '15px' }}>
                         {perfil.resenasEjemplo.map((resena, index) => (
                             <div key={index} style={{ padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px', borderLeft: '3px solid #007bff' }}>
                                 <p style={{ margin: '0 0 8px 0', fontStyle: 'italic', color: '#555' }}>"{resena.comentario}"</p>
                                 <p style={{ margin: '0', fontSize: '0.9rem', color: '#777' }}>
                                     <strong>{resena.autor}</strong> - ⭐ {resena.calificacion.toFixed(1)}
                                 </p>
                             </div>
                         ))}
                          {/* Comentario para la lista completa de reseñas */}
                          {perfil.numResenas > (perfil.resenasEjemplo?.length || 0) && (
                              <p style={{ textAlign: 'right', fontSize: '0.9rem', color: '#777' }}>
                                  (Mostrar más reseñas...)
                              </p>
                          )}
                     </div>
                 </div>
              )}


            {/* Contacto (Simulado) */}
            <div style={{ marginBottom: '0', paddingBottom: '0' }}>
                 <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Contactar a {perfil.nombre}</h2>
                  {perfil.telefonoContacto && <p style={{ margin: '5px 0' }}><strong>Teléfono:</strong> {perfil.telefonoContacto}</p>}
                  {perfil.emailContacto && <p style={{ margin: '5px 0' }}><strong>Correo Electrónico:</strong> {perfil.emailContacto}</p>}

                  {/* Simulación de un botón o formulario de contacto */}
                   <div style={{ marginTop: '15px', textAlign: 'center' }}>
                       <button
                           style={{
                               backgroundColor: '#28a745', // Color verde para acción de contacto
                               color: '#fff',
                               padding: '12px 25px',
                               border: 'none',
                               borderRadius: '6px',
                               cursor: 'pointer',
                               fontSize: '1.1rem',
                               fontWeight: 'bold',
                               transition: 'background-color 0.2s ease-in-out',
                           }}
                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#218838')}
                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#28a745')}
                       >
                          Enviar Mensaje (Simulado)
                       </button>
                       {/* Aquí iría la lógica real para abrir un modal de chat, formulario, etc. */}
                       <p style={{ fontSize: '0.9rem', color: '#777', marginTop: '10px' }}>
                            (La funcionalidad de contacto es simulada.)
                        </p>
                   </div>
             </div>


       </div>


    </div>
  );
};

export default PerfilDetalladoPaseadorCuidadorPage;