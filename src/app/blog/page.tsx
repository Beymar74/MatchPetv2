// src/app/blog/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Para el enlace a detalles del artículo

// Interfaz para los datos de un artículo de blog
interface ArticuloBlog {
  id: string; // ID único
  titulo: string;
  fechaPublicacion: string; // Fecha como string para simulación
  resumen: string; // Breve resumen/extracto
  imagenDestacadaUrl?: string; // URL de la imagen destacada (placeholder)
  // Puedes añadir más campos aquí: autor, categorías, tiempo de lectura
}

// Simulación de datos de artículos de blog
const mockArticulosBlog: ArticuloBlog[] = [
  {
    id: 'blog1',
    titulo: 'Historias de Éxito: Rocky encontró su hogar para siempre',
    fechaPublicacion: '5 de Diciembre de 2023',
    resumen: 'Conoce la emotiva historia de Rocky, un perro que pasó años en el refugio y finalmente fue adoptado por una familia maravillosa.',
    imagenDestacadaUrl: '/placeholders/blog_story1.jpg' // Placeholder
  },
  {
    id: 'blog2',
    titulo: 'Consejos Esenciales para Adoptar un Gato Adulto',
    fechaPublicacion: '30 de Noviembre de 2023',
    resumen: 'Adoptar un gato adulto tiene muchas ventajas. Aquí te damos algunos consejos para facilitar la transición y asegurar una convivencia feliz.',
     imagenDestacadaUrl: '/placeholders/blog_tips1.jpg' // Placeholder
  },
   {
    id: 'blog3',
    titulo: 'La Importancia de la Esterilización en Mascotas',
    fechaPublicacion: '25 de Noviembre de 2023',
    resumen: 'La esterilización es clave para controlar la sobrepoblación animal y mejorar la salud y el comportamiento de tu mascota. Descubre por qué.',
     imagenDestacadaUrl: '/placeholders/blog_health1.jpg' // Placeholder
  },
    {
    id: 'blog4',
    titulo: 'Voluntariado en Refugios: Una Experiencia que Cambia Vidas',
    fechaPublicacion: '20 de Noviembre de 2023',
    resumen: '¿Has pensado en ser voluntario? Compartimos testimonios y la forma en que puedes aportar tu tiempo y esfuerzo para ayudar a los animales.',
     imagenDestacadaUrl: '/placeholders/blog_volunteer1.jpg' // Placeholder
  },
];


const BlogPage = () => {
  const [articulos, setArticulos] = useState<ArticuloBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Cargar la lista de artículos
  useEffect(() => {
    const fetchArticulos = async () => {
      setLoading(true);
      setError('');
      try {
        // Aquí iría la llamada API real para obtener la lista de artículos del blog
        // const response = await fetch('/api/blog/articulos');
        // if (!response.ok) {
        //    throw new Error('Error al cargar la lista de artículos.');
        // }
        // const data: ArticuloBlog[] = await response.json();
        // setArticulos(data);

        // Simular la carga con mock data
        await new Promise(resolve => setTimeout(resolve, 500)); // Simular retraso de red
        setArticulos(mockArticulosBlog);

      } catch (err: any) {
        setError(err.message || 'Error al cargar la lista.');
      } finally {
        setLoading(false);
      }
    };
    fetchArticulos();
  }, []); // El array vacío asegura que esto solo se ejecute una vez al montar


    // Aquí iría la lógica para filtrar o buscar artículos si se implementan esas funcionalidades


  if (loading) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>Cargando artículos del blog...</div>;
  }

  if (error) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px', color: 'red' }}>{error}</div>;
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>Nuestro Blog y Noticias</h1>

      <div style={{ marginBottom: '40px', fontSize: '1.1rem', lineHeight: '1.6', color: '#555', textAlign: 'center' }}>
        <p>Encuentra información útil, consejos de cuidado, noticias sobre el mundo animal e historias inspiradoras de rescate y adopción.</p>
      </div>


       {/* Aquí podrías añadir un campo de búsqueda o filtros por categoría */}
       {/* <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
            <h3>Filtros y Búsqueda (Simulados)</h3>
             <p>Aquí irían opciones para filtrar por categoría, autor, etc.</p>
       </div> */}


      <div style={{ display: 'grid', gap: '25px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {articulos.length > 0 ? (
          articulos.map((articulo) => (
            // Enlace a la página de detalles del artículo
            <Link key={articulo.id} href={`/blog/${articulo.id}`} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                    overflow: 'hidden', // Para que la imagen no se salga del borde redondeado
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
                    {/* Imagen Destacada */}
                    <img
                       src={articulo.imagenDestacadaUrl || '/placeholders/blog-placeholder.jpg'} // Usar un placeholder genérico
                       alt={`Imagen destacada del artículo: ${articulo.titulo}`}
                       style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }}
                   />

                    <div style={{ padding: '20px', flexGrow: 1 }}> {/* flexGrow para que ocupe el espacio restante */}
                        <h2 style={{ margin: '0 0 10px 0', fontSize: '1.3rem', color: '#333' }}>{articulo.titulo}</h2>
                         <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#777' }}>Publicado el: {articulo.fechaPublicacion}</p>
                        <p style={{ margin: '0', fontSize: '1rem', color: '#666', lineHeight: '1.5' }}>
                             {articulo.resumen.length > 150 ? articulo.resumen.substring(0, 150) + '...' : articulo.resumen} {/* Cortar resumen si es muy largo */}
                        </p>
                    </div>

                    {/* Botón de Leer Más */}
                    <div style={{ padding: '0 20px 20px 20px', textAlign: 'left', marginTop: 'auto' }}> {/* marginTop: auto para empujar al final */}
                         <button
                             style={{
                                 backgroundColor: 'transparent',
                                 color: '#007bff', // Color azul para enlace
                                 padding: '0', // Sin padding para parecer enlace
                                 border: 'none',
                                 cursor: 'pointer',
                                 fontSize: '1rem',
                                 fontWeight: 'bold',
                                  textDecoration: 'underline', // Subrayado para parecer enlace
                                 transition: 'color 0.2s ease-in-out',
                             }}
                              onMouseOver={(e) => (e.currentTarget.style.color = '#0056b3')}
                             onMouseOut={(e) => (e.currentTarget.style.color = '#007bff')}
                         >
                             Leer Más &gt;
                         </button>
                    </div>
                </div>
            </Link>
          ))
        ) : (
          <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>No hay artículos de blog o noticias disponibles en este momento.</p>
        )}
      </div>


       {/* Comentario para la paginación */}
       {/* <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <p>Aquí iría la paginación si hay muchos resultados.</p>
       </div> */}


    </div>
  );
};

export default BlogPage;