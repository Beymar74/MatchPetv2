// src/app/politica-privacidad/page.tsx
'use client';

import React from 'react';

const PoliticaPrivacidadPage = () => {
  // Comentario: En una implementación real, este contenido extenso
  // idealmente se cargaría desde una fuente externa (CMS, archivo Markdown, API)
  // para facilitar las actualizaciones y asegurar que la política esté siempre al día.

  const politicaContent = `
  **1. Introducción**
  Bienvenido a la Política de Privacidad de ConectaMascotas. En ConectaMascotas, valoramos y protegemos su privacidad. Esta política describe cómo recopilamos, usamos, divulgamos y protegemos su información personal cuando utiliza nuestra Plataforma.

  **2. Información que Recopilamos**
  Podemos recopilar información personal que usted nos proporciona directamente, como cuando crea una cuenta, participa en eventos, se pone en contacto con nosotros o utiliza ciertas funciones de la Plataforma. Esta información puede incluir su nombre, dirección de correo electrónico, número de teléfono, información de perfil y cualquier otra información que elija proporcionar. También podemos recopilar automáticamente información sobre su uso de la Plataforma, como su dirección IP, tipo de navegador, páginas visitadas y tiempos de acceso.

  **3. Cómo Usamos su Información**
  Utilizamos la información que recopilamos para diversos fines, que incluyen:
  - Operar, mantener y mejorar la Plataforma.
  - Personalizar su experiencia en la Plataforma.
  - Comunicarnos con usted, responder a sus preguntas y proporcionarle soporte.
  - Enviarle información, actualizaciones y avisos relacionados con la Plataforma (con su consentimiento, si es necesario).
  - Analizar cómo se utiliza la Plataforma para comprender las tendencias y mejorar nuestros servicios.
  - Prevenir fraudes, proteger la seguridad de la Plataforma y cumplir con las obligaciones legales.

  **4. Compartir su Información**
  No vendemos ni alquilamos su información personal a terceros. Podemos compartir su información personal con:
  - Proveedores de servicios que realizan funciones en nuestro nombre (ej. alojamiento, análisis, soporte al cliente).
  - Socios afiliados o entidades dentro de nuestro grupo corporativo.
  - Autoridades legales o reguladoras cuando sea necesario para cumplir con la ley o proteger nuestros derechos.
  - Con su consentimiento, podemos compartir información con refugios o personas en el contexto de procesos de adopción o eventos.

  **5. Seguridad de Datos**
  Implementamos medidas de seguridad técnicas y organizativas razonables para proteger su información personal contra el acceso no autorizado, la divulgación, la alteración o la destrucción. Sin embargo, ninguna transmisión de datos por Internet o sistema de almacenamiento puede garantizar una seguridad del 100%.

  **6. Sus Derechos**
  Según las leyes de protección de datos aplicables, usted puede tener ciertos derechos con respecto a su información personal, como el derecho a acceder, corregir, eliminar o restringir el procesamiento de sus datos. Para ejercer estos derechos, contáctenos utilizando la información proporcionada a continuación.

  **7. Enlaces a Sitios de Terceros**
  Nuestra Plataforma puede contener enlaces a sitios web de terceros. Esta Política de Privacidad no se aplica a las prácticas de privacidad de estos sitios. Le recomendamos revisar las políticas de privacidad de los sitios de terceros antes de proporcionarles información personal.

  **8. Cambios a esta Política**
  Podemos actualizar esta Política de Privacidad periódicamente. Le notificaremos cualquier cambio publicando la Política de Privacidad revisada en esta página. Le recomendamos revisar esta política periódicamente para estar informado sobre cómo protegemos su información.

  **9. Información de Contacto**
  Si tiene preguntas sobre esta Política de Privacidad o nuestras prácticas de datos, contáctenos en privacy@conectamascotas.com (Simulado).

  Fecha de Última Actualización: 08 de Diciembre de 2023 (Simulada)
  `;

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto', lineHeight: '1.7' }}>
      <h1 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>Política de Privacidad</h1>

      {/* Comentario para la carga dinámica */}
       <p style={{ fontSize: '0.9rem', color: '#777', marginBottom: '20px', textAlign: 'center' }}>(El contenido de la política de privacidad idealmente se cargaría de forma dinámica para facilitar su actualización.)</p>


      {/* Contenido de la Política de Privacidad */}
      <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        {/* Renderizar el contenido del texto simulado */}
        {/* Usamos dangerouslySetInnerHTML con un placeholder.
            En una implementación real, usarías una librería para renderizar Markdown o HTML seguro. */}
        <div dangerouslySetInnerHTML={{ __html: politicaContent.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
         {/* Comentario para el manejo de formato */}
         <p style={{ fontSize: '0.9rem', color: '#777', marginTop: '20px' }}>(En una implementación real, el formato del texto (negritas, párrafos, listas) se manejaría al cargar el contenido desde una fuente externa, por ejemplo, utilizando una librería de Markdown o renderizando HTML seguro.)</p>
      </div>

    </div>
  );
};

export default PoliticaPrivacidadPage;