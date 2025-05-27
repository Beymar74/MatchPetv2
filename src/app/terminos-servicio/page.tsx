// src/app/terminos-servicio/page.tsx
'use client';

import React from 'react';

// Simulación de contenido de los Términos de Servicio
const simulatedTermsContent = `
## 1. Introducción

Bienvenido a ConectaMascotas. Estos Términos de Servicio ("Términos") rigen el acceso y uso de nuestra plataforma en línea, sitio web y cualquier servicio relacionado (colectivamente, la "Plataforma"). Al acceder o utilizar la Plataforma, usted acepta estar legalmente obligado por estos Términos y por nuestra Política de Privacidad. Si no está de acuerdo con estos Términos, por favor, no utilice la Plataforma.

**Fecha de Última Actualización:** 6 de Diciembre de 2023

## 2. Uso de la Plataforma

La Plataforma está destinada a conectar personas interesadas en la adopción de mascotas, el voluntariado, la donación y el apoyo a refugios y organizaciones de bienestar animal. Usted acepta utilizar la Plataforma únicamente para fines lícitos y de acuerdo con estos Términos.

Usted no deberá:
a) Violar leyes o regulaciones locales, nacionales o internacionales.
b) Usar la Plataforma para enviar publicidad no solicitada o spam.
c) Intentar interferir, dañar o interrumpir la Plataforma o servidores/redes conectadas.
d) Utilizar cualquier robot, araña u otro dispositivo, proceso o medio automatizado para acceder a la Plataforma para cualquier propósito.
e) Suplantar o intentar suplantar a ConectaMascotas, a un empleado de ConectaMascotas, a otro usuario o a cualquier otra persona o entidad.

## 3. Cuentas de Usuario

Para acceder a ciertas funciones de la Plataforma, es posible que deba crear una cuenta. Usted es responsable de mantener la confidencialidad de la información de su cuenta y de todas las actividades que ocurran bajo su cuenta. Usted acepta notificarnos inmediatamente de cualquier uso no autorizado de su cuenta.

Usted se compromete a proporcionar información precisa, actual y completa al registrarse y a mantenerla actualizada.

## 4. Contenido del Usuario

Usted puede publicar, cargar, enlazar, almacenar, compartir y poner a disposición cierta información, texto, gráficos, videos u otro material ("Contenido del Usuario"). Usted es el único responsable del Contenido del Usuario que publique en o a través de la Plataforma y declara y garantiza que tiene todos los derechos necesarios para hacerlo.

ConectaMascotas no respalda ni se hace responsable de ningún Contenido del Usuario. Nos reservamos el derecho (pero no la obligación) de, a nuestra entera discreción, eliminar o modificar cualquier Contenido del Usuario por cualquier motivo.

## 5. Propiedad Intelectual

La Plataforma y su contenido original (excluyendo el Contenido del Usuario), características y funcionalidad son y seguirán siendo propiedad exclusiva de ConectaMascotas y sus licenciantes. Están protegidos por derechos de autor, marcas registradas y otras leyes de propiedad intelectual.

## 6. Enlaces a Otros Sitios Web

Nuestra Plataforma puede contener enlaces a sitios web o servicios de terceros que no son propiedad ni están controlados por ConectaMascotas. No tenemos control ni asumimos responsabilidad por el contenido, políticas de privacidad o prácticas de sitios web o servicios de terceros.

## 7. Terminación

Podemos terminar o suspender su cuenta y acceso a la Plataforma inmediatamente, sin previo aviso ni responsabilidad, por cualquier motivo, incluyendo, sin limitación, si usted incumple estos Términos.

## 8. Limitación de Responsabilidad

En la máxima medida permitida por la ley aplicable, en ningún caso ConectaMascotas, ni sus afiliados, directores, empleados, socios, agentes, proveedores o licenciantes, serán responsables de daños indirectos, incidentales, especiales, consecuentes o punitivos, incluyendo, sin limitación, pérdida de beneficios, datos, uso, buena voluntad u otras pérdidas intangibles, resultantes de (i) su acceso o uso o incapacidad para acceder o usar la Plataforma; (ii) cualquier conducta o contenido de terceros en la Plataforma; (iii) cualquier contenido obtenido de la Plataforma; y (iv) acceso, uso o alteración no autorizados de sus transmisiones o contenido, ya sea basado en garantía, contrato, agravio (incluyendo negligencia) o cualquier otra teoría legal, hayamos sido o no informados de la posibilidad de tales daños.

## 9. Indemnización

Usted acepta defender, indemnizar y eximir de responsabilidad a ConectaMascotas y sus licenciantes y licenciatarios, y sus empleados, contratistas, agentes, funcionarios y directores, de y contra cualquier y todas las reclamaciones, daños, obligaciones, pérdidas, responsabilidades, costos o deudas y gastos (incluyendo, entre otros, honorarios de abogados), resultantes de a) su uso y acceso a la Plataforma, por usted o cualquier persona que utilice su cuenta y contraseña, o b) un incumplimiento de estos Términos.

## 10. Cambios a Estos Términos

Nos reservamos el derecho, a nuestra entera discreción, de modificar o reemplazar estos Términos en cualquier momento. Le notificaremos de cualquier cambio publicando los nuevos Términos en esta página. Es su responsabilidad revisar estos Términos periódicamente para ver si hay cambios.

## 11. Información de Contacto

Si tiene alguna pregunta sobre estos Términos, por favor, contáctenos a través de la información proporcionada en nuestra página de Contacto.
`;


const TerminosServicioPage = () => {
  // Comentario: En una aplicación real, este contenido legal podría cargarse
  // dinámicamente desde un CMS, un archivo Markdown, o una API para facilitar
  // actualizaciones y gestión.

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6', color: '#333' }}>
      <h1 style={{ marginBottom: '30px', color: '#333', textAlign: 'center' }}>Términos de Servicio</h1>

      {/* Inyectar el contenido HTML simulado */}
      <div dangerouslySetInnerHTML={{ __html: simulatedTermsContent.replace(/\n## (.*)/g, '</h2>\n<h2 style="margin-top: 30px; margin-bottom: 15px; color: #555; border-bottom: 1px solid #eee; padding-bottom: 5px;">$1</h2>') }}>
          {/* Esto simula la renderización de un string con formato Markdown/HTML básico */}
      </div>

       {/* Comentario sobre la fecha de actualización */}
       <p style={{ fontSize: '0.9rem', color: '#777', marginTop: '30px', textAlign: 'center' }}>
            (El contenido anterior es un ejemplo simulado. La fecha de última actualización real sería la del documento válido.)
       </p>
    </div>
  );
};

export default TerminosServicioPage;