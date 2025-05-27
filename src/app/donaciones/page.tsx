// src/app/donaciones/page.tsx
// Marcado como cliente por si se añaden funcionalidades interactivas en el futuro,
// aunque para esta versión inicial podría ser Server Component.
'use client';

import React from 'react';
import Link from 'next/link'; // Para el enlace de apadrinamiento simulado

const DonacionesPage = () => {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px', color: '#333', textAlign: 'center' }}>Apoya Nuestra Causa</h1>

      <div style={{ marginBottom: '40px', fontSize: '1.1rem', lineHeight: '1.6', color: '#555', textAlign: 'center' }}>
        <p>Tu generosidad hace una diferencia real en la vida de los animales que ayudamos. Hay muchas formas en las que puedes contribuir.</p>
      </div>

      {/* Sección: Donaciones Monetarias */}
      <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
        <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#007bff' }}>Donaciones Monetarias</h2>
        <p style={{ marginBottom: '20px', lineHeight: '1.6', color: '#666' }}>
          Las donaciones en efectivo nos permiten cubrir gastos esenciales como alimento, atención veterinaria, medicamentos y mantenimiento de nuestras instalaciones. Cada aporte, por pequeño que sea, suma enormemente.
        </p>
        <p style={{ marginBottom: '25px', fontStyle: 'italic', color: '#777' }}>
            Puedes elegir hacer una donación única o establecer una contribución mensual recurrente para apoyarnos de forma continua.
        </p>
        {/* Botón de Donar (Simulado) */}
        <div style={{ textAlign: 'center' }}>
            <button
                style={{
                    backgroundColor: '#28a745', // Color verde para donar
                    color: '#fff',
                    padding: '12px 25px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                     transition: 'background-color 0.2s ease-in-out',
                }}
                 onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#218838')}
                 onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#28a745')}
            >
                Donar Ahora (Simulado)
            </button>
             {/* Comentario para la integración real de pagos */}
             <p style={{ fontSize: '0.9rem', color: '#777', marginTop: '10px' }}>(Aquí se integraría un sistema de pago real como Stripe, PayPal, etc.)</p>
        </div>
      </div>

      {/* Sección: Donaciones en Especie */}
      <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
        <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#ffc107' }}>Donaciones en Especie</h2> {/* Color amarillo/naranja */}
        <p style={{ marginBottom: '15px', lineHeight: '1.6', color: '#666' }}>
          También necesitamos artículos para el día a día de los animales. Elementos como alimento de calidad, mantas, toallas, juguetes, productos de limpieza y medicamentos son siempre bienvenidos.
        </p>
        <p style={{ fontStyle: 'italic', color: '#777' }}>
            Si deseas donar en especie, por favor contáctanos para coordinar la entrega o recolección. ¡Agradecemos tu ayuda!
        </p>
         {/* Comentario para información más detallada */}
         <p style={{ fontSize: '0.9rem', color: '#777', marginTop: '10px' }}>(Aquí podría haber una lista detallada de artículos necesarios o un enlace a un formulario de contacto para coordinar.)</p>
      </div>

      {/* Sección: Voluntariado */}
       <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
        <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#17a2b8' }}>Voluntariado</h2> {/* Color turquesa */}
        <p style={{ marginBottom: '20px', lineHeight: '1.6', color: '#666' }}>
          Tu tiempo es un regalo invaluable. Necesitamos voluntarios para ayudar en diversas tareas, como pasear perros, socializar gatos, limpiar instalaciones, ayudar en eventos de adopción y más.
        </p>
        <p style={{ marginBottom: '25px', fontStyle: 'italic', color: '#777' }}>
            Únete a nuestro equipo y marca una diferencia directa en la vida de los animales.
        </p>
         {/* Botón de Voluntario (Simulado) */}
         <div style={{ textAlign: 'center' }}>
            <button
                style={{
                     backgroundColor: '#17a2b8',
                    color: '#fff',
                    padding: '12px 25px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                     transition: 'background-color 0.2s ease-in-out',
                }}
                 onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#138496')}
                 onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#17a2b8')}
            >
                Quiero Ser Voluntario (Simulado)
            </button>
             {/* Comentario para formulario de voluntariado */}
             <p style={{ fontSize: '0.9rem', color: '#777', marginTop: '10px' }}>(Aquí se integraría un formulario de inscripción de voluntarios o un enlace a más información.)</p>
        </div>
      </div>

       {/* Sección: Apadrinamiento de Mascotas */}
       <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
        <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#fd7e14' }}>Apadrinamiento de Mascotas</h2> {/* Color naranja */}
        <p style={{ marginBottom: '20px', lineHeight: '1.6', color: '#666' }}>
          Si no puedes adoptar en este momento, considera apadrinar a una mascota. Tu contribución mensual ayuda a cubrir los costos específicos de cuidado de un animal en particular mientras espera su hogar definitivo.
        </p>
         {/* Enlace de Apadrinar (Simulado) */}
         <div style={{ textAlign: 'center' }}>
             <Link href="/donaciones/apadrinar" passHref>
                 <button
                     style={{
                         backgroundColor: '#fd7e14',
                         color: '#fff',
                         padding: '12px 25px',
                         border: 'none',
                         borderRadius: '5px',
                         cursor: 'pointer',
                         fontSize: '1.1rem',
                         fontWeight: 'bold',
                          transition: 'background-color 0.2s ease-in-out',
                     }}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e06a00')}
                     onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#fd7e14')}
                 >
                     Apadrinar una Mascota (Simulado)
                 </button>
             </Link>
             {/* Comentario para el listado de mascotas apadrinables */}
             <p style={{ fontSize: '0.9rem', color: '#777', marginTop: '10px' }}>(Este enlace iría a una página donde puedes ver las mascotas disponibles para apadrinar.)</p>
         </div>
      </div>

       {/* Sección: Otras Formas de Apoyar */}
       <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#6c757d' }}>Otras Formas de Apoyar</h2> {/* Color gris */}
        <p style={{ lineHeight: '1.6', color: '#666' }}>
          Puedes ayudarnos también compartiendo nuestra misión en tus redes sociales, hablando a tus amigos y familiares sobre la adopción responsable, o asistiendo a nuestros eventos. ¡Correr la voz es fundamental!
        </p>
         {/* Comentario para enlaces a redes sociales, etc. */}
         <p style={{ fontSize: '0.9rem', color: '#777', marginTop: '10px' }}>(Aquí podrían ir enlaces a perfiles de redes sociales, calendario de eventos, etc.)</p>
      </div>

    </div>
  );
};

export default DonacionesPage;
