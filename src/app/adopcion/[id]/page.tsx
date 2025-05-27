// src/app/adopcion/[id]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link'; // Si quieres enlazar de vuelta a la lista


// Interfaz para el detalle completo de una mascota
interface DetalleMascota {
  id: string;
  nombre: string;
  especie: 'Perro' | 'Gato' | 'Otro';
  raza?: string; // Opcional
  edad: string; // Ejemplo: "2 años", "6 meses", "Adulto", "Cachorro"
  genero: 'Macho' | 'Hembra' | 'Desconocido';
  tamano: 'Pequeño' | 'Mediano' | 'Grande' | 'Extra Grande';
  colores: string; // Descripción de colores/apariencia
  ubicacionCiudad: string;
  refugioNombre: string; // Nombre del refugio (simulado)
  descripcionCompleta: string; // Historia, personalidad, etc.
  estadoSalud: string; // Vacunas, esterilización, condición médica
  compatibilidad: string; // Con niños, perros, gatos
  imagenesUrl: string[]; // URLs de imágenes
  fechaIngreso?: string; // Formato 'YYYY-MM-DD' (Opcional)
  // Otros campos relevantes
}

// Simulación de datos de detalle de mascotas
const mockDetalleMascotas: DetalleMascota[] = [
  {
    id: 'pet1',
    nombre: 'Max',
    especie: 'Perro',
    raza: 'Labrador Retriever',
    edad: '3 años',
    genero: 'Macho',
    tamano: 'Grande',
    colores: 'Dorado',
    ubicacionCiudad: 'Ciudad A',
    refugioNombre: 'Refugio Esperanza',
    descripcionCompleta: 'Max es un perro muy amigable y enérgico. Le encanta jugar a la pelota y salir a correr. Es bueno con otros perros y niños mayores. Necesita un hogar activo donde pueda hacer mucho ejercicio.',
    estadoSalud: 'Vacunado, desparasitado y castrado. Sin problemas de salud conocidos.',
    compatibilidad: 'Bueno con perros y niños (preferiblemente mayores de 8 años). No probado con gatos.',
    imagenesUrl: [
        '/placeholders/dog1_large.jpg', // Imagen principal
        '/placeholders/dog1_thumb1.jpg',
        '/placeholders/dog1_thumb2.jpg',
        // Más URLs de imágenes
    ],
    fechaIngreso: '2023-10-05',
  },
  {
    id: 'pet2',
    nombre: 'Luna',
    especie: 'Gato',
    raza: 'Siamés',
    edad: '1 año',
    genero: 'Hembra',
    tamano: 'Pequeño',
    colores: 'Crema y marrón oscuro (points)',
    ubicacionCiudad: 'Ciudad B',
    refugioNombre: 'Patitas Felices ONG',
    descripcionCompleta: 'Luna es una gata curiosa y cariñosa. Le gusta explorar y tomar siestas al sol. Es un poco tímida al principio, pero una vez que confía, es muy dulce. Disfruta jugando con juguetes de plumas.',
    estadoSalud: 'Vacunada, desparasitada y esterilizada. Salud excelente.',
    compatibilidad: 'Idealmente hogar sin otros gatos. Potencialmente buena con niños tranquilos. No probada con perros.',
    imagenesUrl: [
         '/placeholders/cat1_large.jpg', // Imagen principal
        '/placeholders/cat1_thumb1.jpg',
         '/placeholders/cat1_thumb2.jpg',
    ],
     fechaIngreso: '2023-11-01',
  },
   {
    id: 'pet3',
    nombre: 'Rocky',
    especie: 'Perro',
    raza: 'Pastor Alemán',
    edad: '5 años',
    genero: 'Macho',
    tamano: 'Grande',
    colores: 'Negro y fuego',
    ubicacionCiudad: 'Ciudad A',
    refugioNombre: 'Refugio Esperanza',
    descripcionCompleta: 'Rocky es un perro leal y protector. Necesita un dueño con experiencia en la raza que pueda proporcionarle entrenamiento y estructura. Es muy inteligente y disfruta aprendiendo. Es territorial con extraños pero forma un fuerte vínculo con su familia.',
    estadoSalud: 'Vacunado, desparasitado y castrado. Tiene una leve displasia de cadera manejable con suplementos.',
    compatibilidad: 'Mejor como mascota única en un hogar sin niños pequeños o con experiencia. Requiere presentación cuidadosa con otros perros.',
    imagenesUrl: [
         '/placeholders/dog2_large.jpg', // Imagen principal
        '/placeholders/dog2_thumb1.jpg',
    ],
     fechaIngreso: '2023-08-20',
  },
  // Añadir más mock data con diferentes IDs (pet3, pet4, etc.)
];


const PerfilMascotaPage = () => {
  const params = useParams();
  const mascotaId = params.id as string; // Obtener el ID de la URL

  const [detalleMascota, setDetalleMascota] = useState<DetalleMascota | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
   const [mainImage, setMainImage] = useState(''); // Para la imagen principal en la galería


  // Cargar los datos de la mascota específica
  useEffect(() => {
    if (!mascotaId) return;

    const fetchDetalleMascota = async () => {
      setLoading(true);
      setError('');
      try {
        // const response = await fetch(`/api/adopcion/mascotas/${mascotaId}`); // Ejemplo de API
        // if (!response.ok) {
        //    if (response.status === 404) {
        //       throw new Error('Mascota no encontrada.');
        //    }
        //    throw new Error('Error al cargar el perfil de la mascota.');
        // }
        // const data: DetalleMascota = await response.json();
        // setDetalleMascota(data);
        // if (data.imagenesUrl && data.imagenesUrl.length > 0) {
        //    setMainImage(data.imagenesUrl[0]); // Establecer la primera imagen como principal
        // }


        // Simular la carga con mock data
        const foundMascota = mockDetalleMascotas.find(m => m.id === mascotaId);
        if (foundMascota) {
          setDetalleMascota(foundMascota);
           if (foundMascota.imagenesUrl && foundMascota.imagenesUrl.length > 0) {
               setMainImage(foundMascota.imagenesUrl[0]);
           } else {
                // Placeholder si no hay imágenes
                setMainImage('');
           }

        } else {
          setError('Mascota no encontrada o no disponible.');
        }

      } catch (err: any) {
        setError(err.message || 'Error al cargar el perfil de la mascota.');
      } finally {
        setLoading(false);
      }
    };
    fetchDetalleMascota();
  }, [mascotaId]); // Dependencia: el efecto se ejecuta cuando cambia el mascotaId


    // Manejar clic en botón de Adoptar (Simulado)
    const handleAdoptClick = () => {
        if (detalleMascota) {
            console.log(`Simulando inicio del proceso de adopción para ${detalleMascota.nombre} (ID: ${detalleMascota.id})`);
            alert(`¡Estás interesado en adoptar a ${detalleMascota.nombre}! Este botón te llevaría al formulario de solicitud de adopción.`);
            // Aquí iría la lógica para redirigir al formulario de solicitud
            // Ejemplo: router.push(`/adopcion/solicitud/${mascotaId}`);
        }
    };


  if (loading) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>Cargando perfil de la mascota...</div>;
  }

  if (error) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px', color: 'red' }}>{error}</div>;
  }

  if (!detalleMascota) {
     return <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>No se pudo cargar el perfil de la mascota.</div>;
  }


  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>Conoce a {detalleMascota.nombre}</h1>

      {/* Galería de Imágenes Simulada */}
       <div style={{ marginBottom: '30px' }}>
           <div style={{
               width: '100%',
               height: '400px', // Altura fija para la imagen principal
               backgroundColor: '#eee', // Placeholder color
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               fontSize: '1.2rem',
               color: '#555',
               marginBottom: '10px',
               backgroundImage: mainImage ? `url(${mainImage})` : 'none',
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               borderRadius: '8px',
           }}>
              {!mainImage && 'Imagen Principal de Mascota'}
           </div>

           {/* Miniaturas (Thumbnails) */}
           <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
               {detalleMascota.imagenesUrl && detalleMascota.imagenesUrl.map((imgUrl, index) => (
                   <div
                       key={index}
                       style={{
                           width: '80px',
                           height: '80px',
                           backgroundColor: '#ccc', // Placeholder color
                           cursor: 'pointer',
                           border: imgUrl === mainImage ? '2px solid #007bff' : '1px solid #ddd',
                           borderRadius: '4px',
                           backgroundImage: `url(${imgUrl})`,
                           backgroundSize: 'cover',
                           backgroundPosition: 'center',
                           flexShrink: 0, // Evitar que se encojan
                       }}
                       onClick={() => setMainImage(imgUrl)}
                   >
                        {/* Puedes poner un texto o ícono si la imagen no carga */}
                   </div>
               ))}
           </div>
            {/* Comentario: Integrar una galería de imágenes real con carrusel, zoom, etc. */}
       </div>


      {/* Botón de Adoptar */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <button
              onClick={handleAdoptClick}
              style={{
                  backgroundColor: '#28a745', // Color verde
                  color: '#fff',
                  padding: '12px 25px',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#218838')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#28a745')}
          >
              Adoptar a {detalleMascota.nombre}
          </button>
           {/* Comentario: Este botón debe llevar a la página/formulario de solicitud de adopción */}
      </div>


      {/* Información Detallada */}
       <div style={{ marginBottom: '20px', backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '8px' }}>
           <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Datos Básicos</h2>
           <p style={{ marginBottom: '10px' }}><strong>Nombre:</strong> {detalleMascota.nombre}</p>
           <p style={{ marginBottom: '10px' }}><strong>Especie:</strong> {detalleMascota.especie}</p>
            {detalleMascota.raza && <p style={{ marginBottom: '10px' }}><strong>Raza:</strong> {detalleMascota.raza}</p>}
           <p style={{ marginBottom: '10px' }}><strong>Edad:</strong> {detalleMascota.edad}</p>
           <p style={{ marginBottom: '10px' }}><strong>Género:</strong> {detalleMascota.genero}</p>
            <p style={{ marginBottom: '10px' }}><strong>Tamaño:</strong> {detalleMascota.tamano}</p>
            <p style={{ marginBottom: '10px' }}><strong>Colores/Descripción Física:</strong> {detalleMascota.colores}</p>
       </div>

       <div style={{ marginBottom: '20px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #eee' }}>
           <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Ubicación</h2>
           <p style={{ marginBottom: '10px' }}><strong>Actualmente en:</strong> {detalleMascota.ubicacionCiudad} (Refugio: {detalleMascota.refugioNombre})</p>
            {/* Comentario: Podrías enlazar al perfil del refugio si existe */}
       </div>


        <div style={{ marginBottom: '20px', backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '8px' }}>
           <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Sobre {detalleMascota.nombre}</h2>
           <p style={{ whiteSpace: 'pre-wrap' }}>{detalleMascota.descripcionCompleta}</p> {/* pre-wrap respeta saltos de línea */}
       </div>

        <div style={{ marginBottom: '20px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #eee' }}>
           <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Salud y Cuidados</h2>
           <p style={{ whiteSpace: 'pre-wrap' }}>{detalleMascota.estadoSalud}</p>
        </div>

         <div style={{ marginBottom: '20px', backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '8px' }}>
           <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Compatibilidad</h2>
           <p style={{ whiteSpace: 'pre-wrap' }}>{detalleMascota.compatibilidad}</p>
         </div>


        {/* Enlace de regreso a la lista */}
         <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/adopcion" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem' }}>
                &larr; Volver a la lista de mascotas
            </Link>
         </div>

    </div>
  );
};

export default PerfilMascotaPage;