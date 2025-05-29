// src/app/contacto/page.tsx
'use client';

import React, { useState } from 'react';

const ContactoPage = () => {
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');

  const [submissionState, setSubmissionState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});


  // Simulación de validación básica
  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!nombreCompleto.trim()) {
      errors.nombreCompleto = 'El Nombre Completo es requerido.';
    }
    if (!correoElectronico.trim()) {
      errors.correoElectronico = 'El Correo Electrónico es requerido.';
    } else if (!/\S+@\S+\.\S+/.test(correoElectronico)) { // Regex básica para email
      errors.correoElectronico = 'Formato de correo electrónico inválido.';
    }
    if (!mensaje.trim()) {
      errors.mensaje = 'El Mensaje es requerido.';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // No envíes si hay errores de validación
      return;
    }

    setSubmissionState('submitting');
    setValidationErrors({}); // Limpiar errores previos al intentar enviar

    // Simular el envío a un backend
    // Aquí iría la llamada API real para enviar el formulario
    // try {
    //    const response = await fetch('/api/contacto', {
    //        method: 'POST',
    //        headers: {
    //            'Content-Type': 'application/json',
    //        },
    //        body: JSON.stringify({ nombreCompleto, correoElectronico, asunto, mensaje }),
    //    });
    //
    //    if (!response.ok) {
    //        throw new Error('Error al enviar el mensaje.');
    //    }
    //
    //    // Asumir éxito si response.ok
    //    setSubmissionState('success');
    //    // Opcional: Limpiar los campos del formulario después del éxito
    //    // setNombreCompleto('');
    //    // setCorreoElectronico('');
    //    // setAsunto('');
    //    // setMensaje('');
    //
    // } catch (error) {
    //    console.error('Error al enviar el formulario:', error);
    //    setSubmissionState('error');
    // } finally {
    //    // Si quieres resetear el estado después de un tiempo, usa setTimeout aquí
    // }


    // Simulación de retardo y resultado aleatorio (para testing)
    // Puedes modificar esto para que siempre sea éxito o siempre error para pruebas específicas
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simular retardo de red

    const simulatedSuccess = Math.random() > 0.2; // 80% de probabilidad de éxito simulado

    if (simulatedSuccess) {
      setSubmissionState('success');
        // Opcional: Limpiar los campos del formulario después del éxito simulado
        // setNombreCompleto('');
        // setCorreoElectronico('');
        // setAsunto('');
        // setMensaje('');
    } else {
      setSubmissionState('error');
    }

     // Opcional: resetear el estado de submission después de un tiempo para permitir nuevos envíos
     // setTimeout(() => setSubmissionState('idle'), 5000); // Reset después de 5 segundos

  };


  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>Contáctanos</h1>

      <div style={{ marginBottom: '30px', fontSize: '1.1rem', lineHeight: '1.6', color: '#555', textAlign: 'center' }}>
        <p>¿Tienes alguna pregunta, sugerencia o necesitas soporte? Utiliza el formulario a continuación para enviarnos un mensaje.</p>
      </div>

      <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>

          <form onSubmit={handleSubmit} noValidate> {/* noValidate desactiva la validación HTML por defecto */}
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="nombreCompleto" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                Nombre Completo <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                id="nombreCompleto"
                value={nombreCompleto}
                onChange={(e) => setNombreCompleto(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: `1px solid ${validationErrors.nombreCompleto ? 'red' : '#ccc'}`,
                  borderRadius: '4px',
                  boxSizing: 'border-box', // Incluir padding y border en el ancho total
                }}
                aria-describedby={validationErrors.nombreCompleto ? 'nombreCompletoError' : undefined}
              />
              {validationErrors.nombreCompleto && (
                <p id="nombreCompletoError" style={{ color: 'red', fontSize: '0.9rem', marginTop: '5px' }}>
                  {validationErrors.nombreCompleto}
                </p>
              )}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="correoElectronico" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                Correo Electrónico <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="email"
                id="correoElectronico"
                value={correoElectronico}
                onChange={(e) => setCorreoElectronico(e.target.value)}
                 style={{
                  width: '100%',
                  padding: '10px',
                  border: `1px solid ${validationErrors.correoElectronico ? 'red' : '#ccc'}`,
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                }}
                 aria-describedby={validationErrors.correoElectronico ? 'correoElectronicoError' : undefined}
              />
               {validationErrors.correoElectronico && (
                <p id="correoElectronicoError" style={{ color: 'red', fontSize: '0.9rem', marginTop: '5px' }}>
                  {validationErrors.correoElectronico}
                </p>
              )}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="asunto" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                Asunto (Opcional)
              </label>
              <input
                type="text"
                id="asunto"
                value={asunto}
                onChange={(e) => setAsunto(e.target.value)}
                 style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="mensaje" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                Mensaje <span style={{ color: 'red' }}>*</span>
              </label>
              <textarea
                id="mensaje"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                rows={6}
                 style={{
                  width: '100%',
                  padding: '10px',
                  border: `1px solid ${validationErrors.mensaje ? 'red' : '#ccc'}`,
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                   resize: 'vertical', // Permitir redimensionar verticalmente
                }}
                 aria-describedby={validationErrors.mensaje ? 'mensajeError' : undefined}
              ></textarea>
               {validationErrors.mensaje && (
                <p id="mensajeError" style={{ color: 'red', fontSize: '0.9rem', marginTop: '5px' }}>
                  {validationErrors.mensaje}
                </p>
              )}
            </div>

             {/* Aquí iría un placeholder para medidas anti-spam como reCAPTCHA */}
             {/* <div style={{ marginBottom: '20px', textAlign: 'center', fontSize: '0.9rem', color: '#777' }}>
                 [ Placeholder para reCAPTCHA o verificación anti-spam ]
             </div> */}


            <button
              type="submit"
              disabled={submissionState === 'submitting'}
              style={{
                backgroundColor: '#007bff',
                color: '#fff',
                padding: '12px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: submissionState === 'submitting' ? 'not-allowed' : 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold',
                transition: 'background-color 0.2s ease-in-out, opacity 0.2s ease-in-out',
                opacity: submissionState === 'submitting' ? 0.6 : 1,
                width: '100%', // Botón ancho completo
              }}
               onMouseOver={(e) => submissionState !== 'submitting' && (e.currentTarget.style.backgroundColor = '#0056b3')}
               onMouseOut={(e) => submissionState !== 'submitting' && (e.currentTarget.style.backgroundColor = '#007bff')}
            >
              {submissionState === 'submitting' ? 'Enviando...' : 'Enviar Mensaje'}
            </button>

             {/* Mensajes de retroalimentación */}
            {submissionState === 'success' && (
              <p style={{ color: 'green', textAlign: 'center', marginTop: '20px', fontWeight: 'bold' }}>
                ¡Mensaje enviado con éxito! Gracias por contactarnos.
              </p>
            )}
            {submissionState === 'error' && (
              <p style={{ color: 'red', textAlign: 'center', marginTop: '20px', fontWeight: 'bold' }}>
                Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.
              </p>
            )}
             {/* Comentario para mensajes de retroalimentación reales */}
            <p style={{ fontSize: '0.9rem', color: '#777', marginTop: '10px', textAlign: 'center' }}>(Los mensajes de éxito/error son simulados.)</p>

          </form>

      </div>

       {/* Información Adicional de Contacto (Simulada) */}
       <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
           <h3 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Información de Contacto Adicional</h3>
           <p style={{ margin: '5px 0', color: '#444' }}><strong>Teléfono (Simulado):</strong> +123 456 7890</p>
           <p style={{ margin: '5px 0', color: '#444' }}><strong>Correo Electrónico (Simulado):</strong> info@conectamascotas.com</p>
           <p style={{ margin: '5px 0', color: '#444' }}><strong>Dirección (Simulada):</strong> Calle Falsa 123, Ciudad Ejemplo, CP 12345</p>
           <p style={{ margin: '5px 0', color: '#444' }}><strong>Horario de Atención (Simulado):</strong> Lunes a Viernes, 9:00 AM - 6:00 PM</p>
       </div>


    </div>
  );
};

export default ContactoPage;