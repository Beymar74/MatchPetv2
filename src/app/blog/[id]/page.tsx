// src/app/blog/[id]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// Interfaz detallada para los datos de un artículo
interface ArticuloDetalle {
  id: string; // ID único
  titulo: string;
  fechaPublicacion: string; // Fecha completa como string
  autor?: string; // Opcional: autor simulado
  categorias?: string[]; // Opcional: Categorías/etiquetas simuladas
  contenidoCompleto: string; // El texto completo del artículo (puede ser HTML/Markdown en una implementación real)
  imagenDestacadaUrl?: string; // URL de la imagen destacada principal (placeholder)
  // Puedes añadir más campos aquí: galería, videos, etc.
}

// Simulación de datos detallados de artículos
const mockArticulosDetalle: ArticuloDetalle[] = [
  {
    id: 'articulo1',
    titulo: 'Consejos para la llegada de un nuevo perro a casa: Una guía completa',
    fechaPublicacion: '01 de Diciembre de 2023',
    autor: 'Equipo ConectaMascotas',
    categorias: ['Consejos', 'Perros', 'Adopción', 'Hogar'],
    contenidoCompleto: `Adoptar un perro es una experiencia maravillosa que cambia la vida, tanto la tuya como la de tu nuevo amigo peludo. Para asegurar una transición suave y feliz, es fundamental prepararse adecuadamente antes de su llegada y durante los primeros días y semanas. Esta guía te ayudará a crear un ambiente acogedor y a establecer rutinas que faciliten la adaptación.

**Preparando tu Hogar:**
Antes de que llegue tu perro, asegúrate de que tu casa es un lugar seguro. Guarda objetos peligrosos o valiosos que puedan ser mordidos o ingeridos. Designa un espacio propio para él, que puede ser una cama en un rincón tranquilo, una jaula cómoda o un área con sus juguetes y manta. Este será su "refugio" donde podrá descansar y sentirse seguro.

Asegúrate de tener todos los suministros necesarios: un collar con identificación (¡muy importante!), correa, platos de comida y agua, comida adecuada para su edad y tamaño, juguetes masticables y de entretenimiento, productos de higiene (champú, cepillo) y bolsas para recoger sus heces.

**Los Primeros Días en Casa:**
La paciencia es clave. Los primeros días son de ajuste tanto para ti como para el perro. Permítele explorar su nuevo hogar a su propio ritmo, siempre bajo supervisión. Establece una rutina para las comidas, paseos al baño y momentos de juego. Esto le dará seguridad y le ayudará a entender las expectativas.

Presenta a los miembros de la familia (incluyendo otras mascotas, si las hay) de forma gradual y controlada. No fuerces las interacciones. Celebra los comportamientos deseados y sé comprensivo con los accidentes o miedos iniciales.

**Socialización y Entrenamiento:**
Una vez que tu perro se sienta más cómodo y haya visitado al veterinario para un chequeo, puedes empezar a socializarlo gradualmente con otros perros y personas. Inscríbelo en clases de obediencia básicas; no solo le enseñará comandos útiles, sino que fortalecerá vuestro vínculo y le ayudará a ser un miembro bien adaptado de la sociedad.

Recuerda que cada perro es un individuo con su propia personalidad y experiencias pasadas. Algunos se adaptarán rápidamente, mientras que otros necesitarán más tiempo y apoyo. Celebra los pequeños logros y disfruta del proceso de conocer a tu nuevo mejor amigo. La recompensa de ver a un perro rescatado florecer en un hogar amoroso no tiene precio.`,
    imagenDestacadaUrl: '/placeholders/blog_dog_arrival_large.jpg', // Placeholder grande
  },
  {
    id: 'articulo2',
    titulo: 'Historia de Éxito: Cómo Rocky el Gato Tímido Encontró Su Hogar Eterno',
    fechaPublicacion: '28 de Noviembre de 2023',
    autor: 'Refugio "Patitas Felices"',
    categorias: ['Historias de Éxito', 'Gatos', 'Adopción', 'Inspiración'],
    contenidoCompleto: `Rocky llegó a nuestro refugio hace ocho meses, un manojito de nervios escondido en el fondo de su transportín. Había sido rescatado de una situación difícil y la confianza en los humanos era algo que simplemente no tenía. Cada vez que alguien se acercaba a su jaula, se encogía y bufaba suavemente, con los ojos llenos de miedo. Era desgarrador verlo así.

Durante semanas, nuestros voluntarios trabajaron con él con una paciencia infinita. Se sentaban tranquilamente junto a su jaula, hablándole en voz baja, sin intentar tocarlo. Le ofrecían premios y juguetes, respetando siempre su espacio. Poco a poco, Rocky empezó a mostrar curiosidad. Primero, asomaba la nariz. Luego, salía lentamente de su escondite para comer cuando el voluntario estaba cerca.

El gran avance llegó cuando un día, después de meses de visitas constantes, Rocky se frotó contra la mano de uno de nuestros voluntarios. Fue un momento de pura alegría y esperanza en el refugio. A partir de ahí, su progreso fue más rápido. Empezó a disfrutar de las caricias suaves y a jugar con los juguetes. Aunque seguía siendo un poco reservado con extraños, la chispa en sus ojos había regresado.

Fue entonces cuando Sarah y David visitaron el refugio. No buscaban un gato particularmente extrovertido; de hecho, habían oído hablar de Rocky y se sintieron atraídos por su historia y su naturaleza reservada. Pasaron tiempo con él en una sala tranquila, permitiéndole acercarse a ellos en sus propios términos. Rocky, sorprendentemente, se sintió cómodo con ellos. Les permitió acariciarlo y hasta se sentó en el regazo de Sarah.

La conexión fue instantánea. Sarah y David entendieron que Rocky necesitaría tiempo y un ambiente tranquilo, y estaban más que dispuestos a dárselo. Hace un mes, Rocky dejó el refugio para ir a su hogar eterno.

Hemos recibido actualizaciones regulares de Sarah y David. Rocky se ha adaptado maravillosamente. Le encanta su rascador gigante, pasar las tardes tomando el sol en la ventana y, por supuesto, recibir caricias de sus humanos. Aunque sigue siendo un gato tranquilo y no el alma de la fiesta, ha encontrado su lugar en el mundo y es profundamente amado.

La historia de Rocky es un recordatorio poderoso de que cada animal tiene el potencial de amar y ser amado, sin importar su pasado. Solo necesitan una oportunidad y la paciencia de una familia dispuesta a esperar. ¡Felicidades, Rocky!`,
    imagenDestacadaUrl: '/placeholders/blog_cat_story_large.jpg', // Placeholder grande
  },
    {
    id: 'articulo3',
    titulo: 'Los Indispensables: La Importancia de la Esterilización en Gatos y Perros',
    fechaPublicacion: '25 de Noviembre de 2023',
    autor: 'Dra. Ana Gómez (Veterinaria)',
    categorias: ['Consejos', 'Salud', 'Veterinaria', 'Responsabilidad'],
    contenidoCompleto: `La decisión de esterilizar o castrar a tu mascota es una de las más importantes que tomarás por su salud y bienestar a largo plazo, además de ser un acto de responsabilidad social crucial. A menudo, la gente piensa en ello solo en términos de control de la población, pero los beneficios van mucho más allá.

**Beneficios para la Salud de tu Mascota:**
En las hembras, la esterilización (extirpación de ovarios y útero) elimina el riesgo de desarrollar cáncer de útero y reduce drásticamente el riesgo de cáncer de mama, que es maligno en un alto porcentaje de perras y gatas. También previene infecciones uterinas potencialmente mortales (piometra).

En los machos, la castración (extirpación de los testículos) previene el cáncer testicular y reduce el riesgo de problemas de próstata y hernias perianales. También puede disminuir la tendencia a escapar en busca de hembras en celo, reduciendo el riesgo de accidentes (atropellos, peleas).

**Beneficios en el Comportamiento:**
La esterilización puede reducir ciertos comportamientos no deseados. En machos, disminuye la agresividad territorial, el marcaje con orina y el impulso de vagar. En hembras, elimina los ciclos de celo, que pueden atraer machos no deseñados y causar estrés en la mascota y el dueño (maullidos constantes, inquietud).

**Control de la Población:**
Por supuesto, el beneficio más amplio es la contribución al control de la superpoblación de mascotas. Millones de perros y gatos terminan en refugios cada año, y lamentablemente, muchos no encuentran un hogar. Esterilizar a tu mascota es un paso fundamental para evitar que más animales nazcan en un mundo donde ya hay demasiados sin un hogar.

**¿Cuándo Esterilizar?**
Tu veterinario es la mejor persona para aconsejarte sobre el momento óptimo para esterilizar a tu mascota, ya que puede variar según la raza, el tamaño y la salud individual. Generalmente, se realiza antes de que alcancen la madurez sexual.

En resumen, la esterilización es un procedimiento seguro y rutinario con enormes beneficios para la salud individual de tu mascota, su comportamiento y para la comunidad en general. Habla con tu veterinario sobre cómo programar este importante paso.`,
     imagenDestacadaUrl: '/placeholders/blog_vet_advice_large.jpg', // Placeholder grande
  },
     {
    id: 'articulo4',
    titulo: 'Voluntariado en Refugios: Una Experiencia que Transforma Vidas (La Tuya y la de Ellos)',
    fechaPublicacion: '20 de Noviembre de 2023',
    autor: 'María Rodríguez (Voluntaria Apasionada)',
    categorias: ['Voluntariado', 'Refugios', 'Cómo Ayudar', 'Experiencias'],
    contenidoCompleto: `He sido voluntaria en el Refugio "Esperanza Animal" durante los últimos dos años, y honestamente puedo decir que ha sido una de las experiencias más gratificantes de mi vida. La mayoría de las personas piensan que el voluntariado en un refugio consiste solo en pasear perros y acariciar gatos, y si bien eso es una parte maravillosa, hay mucho más involucrado, y el impacto que puedes tener es inmenso.

Desde limpiar jaulas y áreas de juego, hasta ayudar en eventos de adopción, preparar comidas especiales para animales con necesidades dietéticas, o simplemente pasar tiempo de calidad con un animal asustado para ayudarlo a confiar de nuevo, cada tarea, por pequeña que parezca, contribuye directamente al bienestar de los animales.

Lo más impactante para mí ha sido ser testigo de la transformación de un animal. Ver a un perro o gato que llegó temeroso y desconfiado, abrirse gradualmente, empezar a confiar en ti, a jugar, y finalmente, encontrar un hogar amoroso... no hay palabras para describir la emoción. Sabes que fuiste una pequeña parte de ese viaje hacia la felicidad.

Además del impacto en los animales, el voluntariado en un refugio también te transforma a ti. Desarrollas paciencia, empatía y resiliencia. Conoces a otras personas increíbles que comparten tu pasión por los animales y construyes una comunidad. Es un recordatorio constante de la bondad que existe en el mundo y de la capacidad de recuperación de los seres vivos.

Si amas a los animales y tienes algo de tiempo libre, considera seriéndote voluntario en tu refugio local. No necesitas experiencia previa, solo ganas de ayudar y un corazón grande. Te aseguro que recibirás mucho más de lo que das. Es una experiencia humillante, desafiante a veces, pero sobre todo, increíblemente gratificante. Anímate a dar el primer paso; las patitas que esperas te lo agradecerán eternamente.`,
    imagenDestacadaUrl: '/placeholders/blog_volunteer_large.jpg', // Placeholder grande
  },
];


const DetalleArticuloPage = () => {
  const params = useParams();
  const articuloId = params.id as string; // Obtener el ID de la URL

  const [articulo, setArticulo] = useState<ArticuloDetalle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  // Cargar los detalles completos del artículo
  useEffect(() => {
    if (!articuloId) {
        setLoading(false);
        setError('ID de artículo no proporcionado.');
        return;
    }

    const fetchArticuloDetalle = async () => {
      setLoading(true);
      setError('');
      try {
        // Aquí iría la llamada API real para obtener los detalles completos del artículo
        // const response = await fetch(`/api/blog/${articuloId}`);
        // if (!response.ok) {
        //    if (response.status === 404) {
        //       throw new Error('Artículo no encontrado.');
        //    }
        //    throw new Error('Error al cargar los detalles del artículo.');
        // }
        // const data: ArticuloDetalle = await response.json();
        // setArticulo(data);

        // Simular la carga con mock data
        await new Promise(resolve => setTimeout(resolve, 500)); // Simular retraso de red
        const foundArticulo = mockArticulosDetalle.find(a => a.id === articuloId);
        if (foundArticulo) {
          setArticulo(foundArticulo);
        } else {
          setError('Artículo no encontrado.');
        }

      } catch (err: any) {
        setError(err.message || 'Error al cargar los detalles del artículo.');
      } finally {
        setLoading(false);
      }
    };
    fetchArticuloDetalle();
  }, [articuloId]); // Dependencia: se ejecuta cuando cambia el ID


  if (loading) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>Cargando artículo...</div>;
  }

  if (error) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px', color: 'red' }}>{error}</div>;
  }

  if (!articulo) {
     return <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>No se pudo cargar la información del artículo.</div>;
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>

       {/* Enlace de regreso al listado del blog */}
        <div style={{ marginBottom: '20px' }}>
             <Link href="/blog" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>
                 &lt; Volver al Blog
             </Link>
        </div>

      <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>

           {/* Título del Artículo */}
           <h1 style={{ marginBottom: '15px', color: '#333', textAlign: 'center' }}>{articulo.titulo}</h1>

           {/* Información de Publicación (Fecha, Autor) */}
           <div style={{ marginBottom: '20px', textAlign: 'center', fontSize: '0.95rem', color: '#777' }}>
                <span>Publicado el {articulo.fechaPublicacion}</span>
                {articulo.autor && <span> por {articulo.autor}</span>}
           </div>

            {/* Imagen Destacada Principal */}
           <img
               src={articulo.imagenDestacadaUrl || '/placeholders/blog-placeholder-large.jpg'} // Usar un placeholder genérico grande
               alt={`Imagen destacada para ${articulo.titulo}`}
               style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px', marginBottom: '25px', display: 'block' }}
           />

           {/* Categorías/Etiquetas */}
           {articulo.categorias && articulo.categorias.length > 0 && (
                <div style={{ marginBottom: '25px', textAlign: 'center' }}>
                    {articulo.categorias.map(cat => (
                        <span key={cat} style={{ display: 'inline-block', backgroundColor: '#e9ecef', color: '#495057', fontSize: '0.85rem', padding: '5px 10px', borderRadius: '15px', margin: '0 5px 5px 0' }}>
                            {cat}
                        </span>
                    ))}
                </div>
           )}


           {/* Contenido Completo del Artículo */}
           <div style={{ marginBottom: '30px', lineHeight: '1.8', color: '#555' }}>
                {/* En una implementación real, manejarías HTML o Markdown aquí */}
               <p style={{ whiteSpace: 'pre-wrap' }}>{articulo.contenidoCompleto}</p> {/* whiteSpace para respetar saltos de línea si los hay en mock data */}
                {/* Comentario para manejo de contenido enriquecido */}
                <p style={{ fontSize: '0.9rem', color: '#777', marginTop: '15px', fontStyle: 'italic' }}>(Nota: En un sistema real, el contenido podría formatearse con HTML, Markdown, etc.)</p>
           </div>

            {/* Placeholder para Galería de Imágenes/Multimedia Adicional */}
            {/* <div style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid #eee', textAlign: 'center' }}>
                 <h3 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Imágenes Adicionales (Simulado)</h3>
                 <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                     <div style={{ width: '100px', height: '100px', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '8px', color: '#888', fontSize: '0.9rem' }}>Img 1</div>
                      <div style={{ width: '100px', height: '100px', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '8px', color: '#888', fontSize: '0.9rem' }}>Img 2</div>
                      <div style={{ width: '100px', height: '100px', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '8px', color: '#888', fontSize: '0.9rem' }}>Img 3</div>
                 </div>
                 <p style={{ fontSize: '0.9rem', color: '#777', marginTop: '10px' }}>(Aquí iría una galería de imágenes o videos relacionados.)</p>
            </div> */}


            {/* Placeholder para Sección de Comentarios */}
            <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #dee2e6' }}>
                 <h3 style={{ marginTop: '0', marginBottom: '15px', color: '#555', textAlign: 'center' }}>Comentarios (Simulado)</h3>
                 <div style={{ textAlign: 'center', color: '#888' }}>
                      [ Placeholder para Sistema de Comentarios ]
                 </div>
                 <p style={{ fontSize: '0.9rem', color: '#777', marginTop: '15px', textAlign: 'center' }}>(Aquí se integraría un sistema de comentarios real, con formulario para añadir comentarios y listado de comentarios existentes.)</p>
            </div>


            {/* Placeholder para Artículos Relacionados */}
             <div style={{ padding: '20px', backgroundColor: '#e9ecef', borderRadius: '8px' }}>
                 <h3 style={{ marginTop: '0', marginBottom: '15px', color: '#555', textAlign: 'center' }}>Artículos Relacionados (Simulado)</h3>
                 <div style={{ textAlign: 'center', color: '#888' }}>
                      [ Placeholder para Lista de Artículos Relacionados ]
                 </div>
                  <p style={{ fontSize: '0.9rem', color: '#777', marginTop: '15px', textAlign: 'center' }}>(Aquí se mostrarían enlaces a otros artículos relevantes del blog.)</p>
            </div>


       </div>

    </div>
  );
};

export default DetalleArticuloPage;