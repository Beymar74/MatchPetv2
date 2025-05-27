// src/app/refugios/[id]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link'; // Opcional, si hay una lista de refugios


// Interfaz para los datos de un refugio
interface DetalleRefugio {
  id: string; // ID del refugio
  nombre: string; // Nombre del refugio
  logoUrl?: string; // URL del logo o imagen (placeholder)
  descripcion: string; // Descripción del refugio
  telefono: string; // Teléfono de contacto (simulado)
  email: string; // Email de contacto (simulado)
  direccion: string; // Dirección física (simulada)
  horarioAtencion: string; // Horario (simulado)
  mascotasDisponiblesNombres: string[]; // Nombres de mascotas disponibles (simulado)
  comoApoyarTexto: string; // Información sobre donaciones/voluntariado (simulado)
  // Puedes añadir enlaces a redes sociales, mapa, etc.
  // redesSociales?: { facebook?: string, instagram?: string };
  // lat?: number; // Para mapa
  // lng?: number; // Para mapa
}

// Simulación de datos de refugios
const mockRefugios: DetalleRefugio[] = [
  {
    id: 'ref1',
    nombre: 'Refugio Esperanza Canina',
    logoUrl: '/placeholders/refugio1_logo.png', // Placeholder
    descripcion: 'Somos un refugio dedicado al rescate, rehabilitación y reubicación de perros abandonados en la región. Creemos en dar una segunda oportunidad a cada cola que encontramos.',
    telefono: '+123 456 7890',
    email: 'contacto@esperanzacanina.org',
    direccion: 'Calle Ficticia 123, Ciudad A',
    horarioAtencion: 'Lunes a Viernes: 10:00 - 17:00, Sábados: 10:00 - 14:00',
    mascotasDisponiblesNombres: ['Max', 'Rocky', 'Buddy', 'Daisy'],
    comoApoyarTexto: 'Tu ayuda es vital. Puedes donar insumos, dinero o ser voluntario. Visita nuestra sección "Cómo Ayudar" para más detalles.',
  },
   {
    id: 'ref2',
    nombre: 'El Hogar Gatuno Feliz',
    logoUrl: '/placeholders/refugio2_logo.png', // Placeholder
    descripcion: 'Nuestro hogar se especializa en el cuidado y adopción de gatos. Les ofrecemos un ambiente seguro y cariñoso mientras encuentran su familia ideal.',
    telefono: '+123 987 6543',
    email: 'info@hogargatunofeliz.com',
    direccion: 'Avenida Imaginaria 456, Ciudad B',
    horarioAtencion: 'Martes a Sábados: 11:00 - 16:00',
    mascotasDisponiblesNombres: ['Luna', 'Simba', 'Chloe', 'Leo'],
    comoApoyarTexto: 'Aceptamos donaciones de comida, arena y medicinas. También necesitamos voluntarios para socializar y cuidar a los gatitos.',
  },
    {
    id: 'ref3',
    nombre: 'Patitas Felices',
    logoUrl: '/placeholders/refugio3_logo.png', // Placeholder
    descripcion: 'Un pequeño refugio que rescata principalmente animales de granja y mascotas pequeñas. Nuestro objetivo es encontrarles hogares donde puedan vivir felices y seguros.',
    telefono: '+123 111 2222',
    email: 'adopta@patitasfelices.org',
    direccion: 'Camino Rural 789, Ciudad C',
    horarioAtencion: 'Sólo con cita previa',
    mascotasDisponiblesNombres: ['Mia', 'Polly (conejo)', 'Coco (perro)'],
    comoApoyarTexto: 'Dona para ayudarnos a cubrir los gastos de veterinario y alimentación. ¡Cada granito de arena cuenta!',
  },
  // Añadir más mock data de refugios
];


const PerfilRefugioPage = () => {
  const params = useParams();
  const refugioId = params.id as string; // Obtener el ID de la URL

  const [refugio, setRefugio] = useState<DetalleRefugio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Cargar los datos del refugio específico
  useEffect(() => {
    if (!refugioId) {
        setLoading(false);
        setError('ID de refugio no proporcionado.');
        return;
    }

    const fetchRefugio = async () => {
      setLoading(true);
      setError('');
      try {
        // Aquí iría la llamada API real para obtener los datos del refugio
        // const response = await fetch(`/api/refugios/${refugioId}`);
        // if (!response.ok) {
        //    if (response.status === 404) {
        //       throw new Error('Refugio no encontrado.');
        //    }
        //    throw new Error('Error al cargar el perfil del refugio.');
        // }
        // const data: DetalleRefugio = await response.json();
        // setRefugio(data);

        // Simular la carga con mock data
        const foundRefugio = mockRefugios.find(r => r.id === refugioId);
        if (foundRefugio) {
          setRefugio(foundRefugio);
        } else {
          setError('Refugio no encontrado.');
        }

      } catch (err: any) {
        setError(err.message || 'Error al cargar el perfil del refugio.');
      } finally {
        setLoading(false);
      }
    };
    fetchRefugio();
  }, [refugioId]); // Dependencia: el efecto se ejecuta cuando cambia el refugioId


  if (loading) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>Cargando perfil del refugio...</div>;
  }

  if (error) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px', color: 'red' }}>{error}</div>;
  }

  if (!refugio) {
     return <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>No se encontró el refugio.</div>;
  }


  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px', color: '#333', textAlign: 'center' }}>Perfil de {refugio.nombre}</h1>

       {/* Imagen/Logo del Refugio */}
       <div style={{ textAlign: 'center', marginBottom: '30px' }}>
           <div style={{
               width: '150px', // Tamaño fijo para el logo/imagen
               height: '150px',
               backgroundColor: '#eee', // Color de fondo para placeholder
               borderRadius: '50%', // Forma circular (opcional)
               margin: '0 auto',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               fontSize: '1rem',
               color: '#555',
               backgroundImage: `url(${refugio.logoUrl})`, // Usar URL si existe
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               border: '1px solid #ddd',
           }}>
               {!refugio.logoUrl && 'Logo'} {/* Texto si no hay imagen */}
           </div>
       </div>


      {/* Descripción del Refugio */}
       <div style={{ marginBottom: '20px', backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '8px' }}>
           <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Sobre Nosotros</h2>
            <p style={{ whiteSpace: 'pre-wrap', margin: '0' }}>{refugio.descripcion}</p>
       </div>


      {/* Información de Contacto */}
       <div style={{ marginBottom: '20px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #eee' }}>
           <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Contacto y Ubicación</h2>
            <p style={{ margin: '5px 0' }}><strong>Teléfono:</strong> {refugio.telefono}</p>
            <p style={{ margin: '5px 0' }}><strong>Email:</strong> {refugio.email}</p>
            <p style={{ margin: '5px 0' }}><strong>Dirección:</strong> {refugio.direccion}</p>
            <p style={{ margin: '5px 0' }}><strong>Horario de Atención:</strong> {refugio.horarioAtencion}</p>
            {/* Aquí podrías integrar un mapa incrustado */}
            {/* <div style={{ width: '100%', height: '300px', backgroundColor: '#ddd', marginTop: '15px' }}>Mapa Simulador</div> */}
       </div>

        {/* Mascotas Disponibles */}
         <div style={{ marginBottom: '20px', backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '8px' }}>
           <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Mascotas Disponibles</h2>
             {refugio.mascotasDisponiblesNombres && refugio.mascotasDisponiblesNombres.length > 0 ? (
                 <>
                    <p style={{ marginBottom: '10px' }}>Actualmente tenemos estas mascotas buscando hogar:</p>
                    <ul style={{ paddingLeft: '20px', margin: '0' }}>
                        {refugio.mascotasDisponiblesNombres.map((nombre, index) => (
                            <li key={index} style={{ marginBottom: '5px' }}>{nombre}</li>
                        ))}
                    </ul>
                     {/* Aquí podrías añadir un enlace a la lista filtrada de mascotas de este refugio */}
                     {/* <Link href={`/adopcion?refugioId=${refugio.id}`} style={{ display: 'inline-block', marginTop: '15px', color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>Ver todas las mascotas de este refugio &gt;</Link> */}
                 </>
             ) : (
                 <p>Actualmente no tenemos mascotas disponibles para adopción en este refugio. ¡Vuelve pronto!</p>
             )}
       </div>

       {/* Cómo Apoyar */}
       <div style={{ marginBottom: '20px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #eee' }}>
           <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Cómo Puedes Ayudar</h2>
            <p style={{ whiteSpace: 'pre-wrap', margin: '0' }}>{refugio.comoApoyarTexto}</p>
            {/* Aquí podrías añadir enlaces específicos a páginas de donación o voluntariado */}
            {/* <div style={{ marginTop: '15px' }}>
                <Link href="/donar" style={{ marginRight: '15px', color: '#28a745', textDecoration: 'none', fontWeight: 'bold' }}>Hacer una Donación</Link>
                <Link href="/voluntariado" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>Ser Voluntario</Link>
            </div> */}
       </div>


    </div>
  );
};

export default PerfilRefugioPage;