// src/app/eventos/[id]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// Interfaz para los datos detallados de un evento
interface EventoDetalle {
  id: string; // ID único
  nombre: string;
  fechaHora: string; // Fecha y hora completa como string
  ubicacion: string; // Descripción completa de la ubicación
  organizador: string; // Nombre del organizador
  organizadorInfo?: string; // Info opcional del organizador
  descripcionCompleta: string; // Descripción detallada
  imagenPrincipalUrl?: string; // URL de la imagen principal
  // galleryUrls?: string[]; // Opcional: URLs de galería
  // costo?: string; // Opcional: Costo del evento
  // requiereRegistro?: boolean; // Opcional: Si requiere registro
  // coordenadasMapa?: { lat: number; lng: number }; // Opcional: Coordenadas para un mapa real
}

// Simulación de datos detallados de eventos (más detallados que los de la lista)
const mockEventosDetalle: EventoDetalle[] = [
  {
    id: 'evento1',
    nombre: 'Jornada de Adopción - Primavera Feliz',
    fechaHora: 'Sábado, 9 de Diciembre de 2023, de 10:00 AM a 4:00 PM',
    ubicacion: 'Parque Central de la Ciudad, específicamente en el Área de Mascotas designada cerca de la fuente principal.',
    organizador: 'Refugio "Esperanza Animal"',
    organizadorInfo: 'Un refugio local dedicado al rescate y rehabilitación de animales abandonados.',
    descripcionCompleta: '¡Ven a conocer a nuestros adorables perritos y gatitos que buscan un hogar para siempre! Habrá actividades para toda la familia, stands informativos sobre tenencia responsable, y la oportunidad de interactuar con nuestros rescatados. ¡Quizás encuentres a tu nuevo mejor amigo!',
    imagenPrincipalUrl: '/placeholders/event_adoption1_large.jpg' // Placeholder más grande
  },
  {
    id: 'evento2',
    nombre: 'Taller de Cuidado Básico para Mascotas',
    fechaHora: 'Domingo, 10 de Diciembre de 2023, de 03:00 PM a 05:30 PM',
    ubicacion: 'Sala de Usos Múltiples del Centro Comunitario "El Roble", Calle Falsa 123.',
    organizador: 'Veterinaria "Patitas Felices"',
    organizadorInfo: 'Clínica veterinaria con enfoque en la salud preventiva y el bienestar animal.',
    descripcionCompleta: 'Este taller está diseñado para nuevos dueños de mascotas y para aquellos que quieran refrescar sus conocimientos. Cubriremos temas esenciales como nutrición adecuada, calendario de vacunación, desparasitación, rutinas de higiene y cómo reconocer signos básicos de enfermedad. Incluye sesión de preguntas y respuestas con un veterinario certificado.',
    imagenPrincipalUrl: '/placeholders/event_workshop1_large.jpg' // Placeholder más grande
  },
    {
    id: 'evento3',
    nombre: 'Caminata Solidaria "Pasos por la Vida"',
    fechaHora: 'Sábado, 16 de Diciembre de 2023, inicio a las 09:00 AM',
    ubicacion: 'Punto de Encuentro: Entrada Principal del Circuito del Lago. La caminata recorrerá 5 km alrededor del lago.',
    organizador: 'Asociación "Amigos de los Animales"',
    organizadorInfo: 'Organización sin fines de lucro enfocada en la defensa de los derechos animales.',
    descripcionCompleta: 'Participa en nuestra caminata anual para recaudar fondos y concienciar sobre el bienestar animal. Invita a tu perro (con correa y respetando las normas) o camina por aquellos que no tienen voz. Habrá puestos informativos, venta de productos solidarios y refrigerios al finalizar. La inscripción incluye una camiseta conmemorativa.',
     imagenPrincipalUrl: '/placeholders/event_walk1_large.jpg' // Placeholder más grande
  },
     {
    id: 'evento4',
    nombre: 'Feria de Recaudación - Invierno Cálido',
    fechaHora: 'Sábado, 23 de Diciembre de 2023, de 11:00 AM a 6:00 PM',
    ubicacion: 'Plaza Cívica Principal, Área Central de la Ciudad.',
    organizador: 'Plataforma "ConectaMascotas" y Refugios Locales',
    organizadorInfo: 'Evento colaborativo para apoyar a varios refugios de la región.',
    descripcionCompleta: 'Una feria llena de actividades para toda la familia. Encuentra regalos únicos en nuestros puestos de artesanías y productos solidarios, disfruta de deliciosa comida vegana y vegetariana, y compra accesorios y juguetes para tu mascota. Todo lo recaudado será destinado a cubrir las necesidades de los animales en los refugios participantes.',
     imagenPrincipalUrl: '/placeholders/event_fair1_large.jpg' // Placeholder más grande
  },
];


const DetalleEventoPage = () => {
  const params = useParams();
  const eventId = params.id as string; // Obtener el ID de la URL

  const [evento, setEvento] = useState<EventoDetalle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Cargar los detalles del evento
  useEffect(() => {
    if (!eventId) {
        setLoading(false);
        setError('ID de evento no proporcionado.');
        return;
    }

    const fetchEventoDetalle = async () => {
      setLoading(true);
      setError('');
      try {
        // Aquí iría la llamada API real para obtener los detalles del evento
        // const response = await fetch(`/api/eventos/${eventId}`);
        // if (!response.ok) {
        //    if (response.status === 404) {
        //       throw new Error('Evento no encontrado.');
        //    }
        //    throw new Error('Error al cargar los detalles del evento.');
        // }
        // const data: EventoDetalle = await response.json();
        // setEvento(data);

        // Simular la carga con mock data
        await new Promise(resolve => setTimeout(resolve, 400)); // Simular retraso
        const foundEvent = mockEventosDetalle.find(e => e.id === eventId);
        if (foundEvent) {
          setEvento(foundEvent);
        } else {
          setError('Evento no encontrado.');
        }

      } catch (err: any) {
        setError(err.message || 'Error al cargar los detalles del evento.');
      } finally {
        setLoading(false);
      }
    };
    fetchEventoDetalle();
  }, [eventId]); // Dependencia: se ejecuta cuando cambia el ID


    // Función simulada para la acción principal (Registrarse/Asistir)
    const handlePrimaryAction = () => {
        alert(`Simulando acción para el evento: "${evento?.nombre}"\n(Aquí iría el proceso de registro o confirmación real)`);
        // Aquí se integraría la lógica real: redirigir a un formulario, abrir un modal de registro, etc.
    };


  if (loading) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>Cargando detalles del evento...</div>;
  }

  if (error) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px', color: 'red' }}>{error}</div>;
  }

  if (!evento) {
     return <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>No se pudo cargar la información del evento.</div>;
  }


  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Enlace de regreso al listado de eventos */}
        <div style={{ marginBottom: '20px' }}>
             <Link href="/eventos" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>
                 &lt; Volver a Eventos
             </Link>
        </div>

      <h1 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>{evento.nombre}</h1>

       {/* Imagen Principal del Evento */}
       {evento.imagenPrincipalUrl && (
           <div style={{ marginBottom: '30px', textAlign: 'center' }}>
               <img
                   src={evento.imagenPrincipalUrl}
                   alt={`Póster del evento ${evento.nombre}`}
                   style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
               />
           </div>
       )}


        {/* Información Clave del Evento */}
        <div style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', marginBottom: '30px', borderLeft: '4px solid #007bff' }}>
            <p style={{ margin: '0 0 10px 0', fontSize: '1.1rem', color: '#333' }}>
                <strong style={{color: '#007bff'}}>Fecha y Hora:</strong> {evento.fechaHora}
            </p>
             <p style={{ margin: '0 0 10px 0', fontSize: '1.1rem', color: '#333' }}>
                <strong style={{color: '#007bff'}}>Ubicación:</strong> {evento.ubicacion}
            </p>
            <p style={{ margin: '0', fontSize: '1.1rem', color: '#333' }}>
                 <strong style={{color: '#007bff'}}>Organiza:</strong> {evento.organizador}
                 {evento.organizadorInfo && <span style={{ fontSize: '0.9rem', color: '#555', marginLeft: '10px', fontStyle: 'italic' }}>({evento.organizadorInfo})</span>}
            </p>
        </div>


       {/* Descripción Completa */}
        <div style={{ marginBottom: '30px' }}>
           <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Sobre el Evento</h2>
            <p style={{ lineHeight: '1.7', color: '#666' }}>
                {evento.descripcionCompleta}
            </p>
        </div>

         {/* Sección Placeholder para Mapa */}
        <div style={{ marginBottom: '30px' }}>
             <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Ubicación en el Mapa</h2>
             <div style={{ backgroundColor: '#e9ecef', height: '300px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6c757d', fontSize: '1.1rem' }}>
                 Placeholder de Mapa Interactivo (Aquí iría un componente de mapa)
             </div>
              {/* Comentario para la integración real del mapa */}
             <p style={{ fontSize: '0.9rem', color: '#777', marginTop: '10px', textAlign: 'center' }}>(Integrar aquí un mapa de Google Maps, Leaflet, etc., usando las coordenadas reales del evento si están disponibles.)</p>
         </div>

        {/* Botón de Acción Principal (Simulado) */}
         <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <button
                onClick={handlePrimaryAction}
                style={{
                    backgroundColor: '#28a745', // Color verde para una acción positiva
                    color: '#fff',
                    padding: '15px 30px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                     transition: 'background-color 0.2s ease-in-out',
                }}
                 onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#218838')}
                 onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#28a745')}
            >
                Registrarse al Evento (Simulado)
            </button>
             {/* Comentario para la integración real de registro */}
             <p style={{ fontSize: '0.9rem', color: '#777', marginTop: '10px' }}>(Este botón activaría un formulario de registro o enlazaría a una plataforma externa.)</p>
         </div>


         {/* Sección Placeholder para Galería de Imágenes (Opcional) */}
         {/*
         <div style={{ marginBottom: '30px' }}>
             <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Galería de Imágenes</h2>
              <div style={{ backgroundColor: '#e9ecef', height: '150px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6c757d', fontSize: '1rem' }}>
                 Placeholder para Galería de Imágenes
              </div>
              <p style={{ fontSize: '0.9rem', color: '#777', marginTop: '10px', textAlign: 'center' }}>(Mostrar aquí una galería de fotos relacionadas con el evento o el organizador.)</p>
         </div>
         */}

         {/* Comentarios para Información Adicional (Costo, Requisitos, etc.) */}
          {/*
          <div style={{ marginBottom: '30px' }}>
             <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Información Adicional</h2>
              <p style={{ margin: '0 0 10px 0', color: '#666' }}>Costo: {evento.costo || 'Gratis'}</p>
              <p style={{ margin: '0', color: '#666' }}>Requiere Registro: {evento.requiereRegistro ? 'Sí' : 'No'}</p>
              <p style={{ margin: '0', color: '#666' }}>Qué llevar: ...</p>
              <p style={{ fontSize: '0.9rem', color: '#777', marginTop: '10px' }}>(Mostrar aquí cualquier otra información relevante.)</p>
          </div>
          */}


    </div>
  );
};

export default DetalleEventoPage;