// src/app/donaciones/apadrinar/[id]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// Interfaz para los datos de la mascota necesarios para el apadrinamiento
interface MascotaApadrinableDetalle {
  id: string; // ID único
  nombre: string;
  fotoUrl?: string; // URL de la foto (placeholder)
  razonApadrinar: string; // Por qué necesita apadrinamiento
  montoMensualSugerido: string; // Monto sugerido en formato string
}

// Simulación de datos detallados de mascotas apadrinables (debe coincidir con IDs de la lista)
const mockMascotasApadrinablesDetalle: MascotaApadrinableDetalle[] = [
  {
    id: 'padrino1',
    nombre: 'Max',
    fotoUrl: '/placeholders/pet_dog1.jpg', // Placeholder
    razonApadrinar: 'Max es un abuelito de 10 años que necesita medicación diaria para su artritis. El apadrinamiento ayuda a cubrir sus gastos médicos.',
    montoMensualSugerido: '$40'
  },
  {
    id: 'padrino2',
    nombre: 'Luna',
    fotoUrl: '/placeholders/pet_cat1.jpg', // Placeholder
    razonApadrinar: 'Luna llegó con una pata rota que requirió cirugía. Todavía está en recuperación y necesita cuidados especiales y fisioterapia.',
    montoMensualSugerido: '$50'
  },
   {
    id: 'padrino3',
    nombre: 'Rocky',
    fotoUrl: '/placeholders/pet_dog2.jpg', // Placeholder
    razonApadrinar: 'Rocky es muy tímido y le cuesta adaptarse. Lleva mucho tiempo en el refugio y necesita un padrino que lo apoye mientras espera su hogar.',
    montoMensualSugerido: '$25'
  },
   {
    id: 'padrino4',
    nombre: 'Mia',
    fotoUrl: '/placeholders/pet_cat2.jpg', // Placeholder
    razonApadrinar: 'Mia es una gata joven con un problema crónico en el ojo que necesita revisiones veterinarias regulares. Tu apadrinamiento asegura su seguimiento médico.',
    montoMensualSugerido: '$35'
  },
    {
    id: 'padrino5',
    nombre: 'Coco',
    fotoUrl: '/placeholders/pet_other1.jpg', // Placeholder
    razonApadrinar: 'Coco fue rescatado en malas condiciones y necesita una dieta especial y cuidados constantes para recuperar peso y salud.',
    montoMensualSugerido: '$20'
  },
];


const ProcesoApadrinamientoPage = () => {
  const params = useParams();
  const mascotaId = params.id as string; // Obtener el ID de la URL

  const [mascotaInfo, setMascotaInfo] = useState<MascotaApadrinableDetalle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Estado para los datos del formulario de apadrinamiento
  const [formData, setFormData] = useState({
      nombreCompleto: '',
      email: '',
      telefono: '',
      frecuenciaContribucion: 'Mensual', // Default a Mensual
  });

    // Estado para el mensaje de confirmación después de enviar
    const [mensajeConfirmacion, setMensajeConfirmacion] = useState('');
    // Estado para errores de validación del formulario
    const [erroresFormulario, setErroresFormulario] = useState<{[key: string]: string}>({});


  // Cargar la información detallada de la mascota
  useEffect(() => {
    if (!mascotaId) {
        setLoading(false);
        setError('ID de mascota no proporcionado.');
        return;
    }

    const fetchMascotaInfo = async () => {
      setLoading(true);
      setError('');
      try {
        // Aquí iría la llamada API real para obtener los datos detallados de la mascota para apadrinar
        // const response = await fetch(`/api/mascotas/apadrinables/${mascotaId}`);
        // if (!response.ok) {
        //    if (response.status === 404) {
        //       throw new Error('Mascota no encontrada para apadrinar.');
        //    }
        //    throw new Error('Error al cargar la información de la mascota.');
        // }
        // const data: MascotaApadrinableDetalle = await response.json();
        // setMascotaInfo(data);

        // Simular la carga con mock data
        await new Promise(resolve => setTimeout(resolve, 500)); // Simular retraso de red
        const foundInfo = mockMascotasApadrinablesDetalle.find(m => m.id === mascotaId);
        if (foundInfo) {
          setMascotaInfo(foundInfo);
        } else {
          setError('Mascota no encontrada para apadrinar.');
        }

      } catch (err: any) {
        setError(err.message || 'Error al cargar la información de la mascota.');
      } finally {
        setLoading(false);
      }
    };
    fetchMascotaInfo();
  }, [mascotaId]); // Dependencia: se ejecuta cuando cambia el ID


    // Manejar cambios en los inputs del formulario
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
         // Limpiar el error de ese campo al empezar a escribir
        if (erroresFormulario[name]) {
            setErroresFormulario({ ...erroresFormulario, [name]: '' });
        }
    };

     // Validar el formulario (simulado)
    const validateForm = () => {
        const newErrors: {[key: string]: string} = {};
        if (!formData.nombreCompleto.trim()) {
            newErrors.nombreCompleto = 'El nombre completo es obligatorio.';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'El email es obligatorio.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) { // Validación simple de formato de email
            newErrors.email = 'El formato del email no es válido.';
        }
        // No validamos teléfono o frecuencia por ahora para la simulación básica
        return newErrors;
    };


    // Manejar el envío del formulario (simulado)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Evitar el envío por defecto de la página

         const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErroresFormulario(validationErrors);
            setMensajeConfirmacion(''); // Asegurarse de que no haya mensaje de éxito si hay errores
            return; // Detener el envío si hay errores
        }


        // Aquí iría la llamada API real para enviar la solicitud de apadrinamiento
        // Incluiría los datos del padrino, detalles del apadrinamiento y procesar el pago
        // try {
        //    const response = await fetch('/api/apadrinamientos', {
        //       method: 'POST',
        //       headers: { 'Content-Type': 'application/json' },
        //       body: JSON.stringify({ mascotaId, ...formData, /* datos de pago */ }),
        //    });
        //    if (!response.ok) {
        //       throw new Error('Error al procesar tu apadrinamiento.');
        //    }
        //    const result = await response.json();
        //    setMensajeConfirmacion('¡Gracias por apadrinar a ' + mascotaInfo?.nombre + '! Hemos recibido tu solicitud.');
        //    // Opcional: Redirigir a una página de confirmación final
        //    // router.push('/apadrinamiento-confirmado/' + result.id);
        // } catch (err: any) {
        //    setError(err.message || 'Error al procesar tu apadrinamiento.');
        //    setMensajeConfirmacion(''); // Limpiar mensaje de éxito si hay error
        // }

        // Simular envío exitoso
        setMensajeConfirmacion(`¡Gracias por apadrinar a ${mascotaInfo?.nombre}! Hemos recibido tu solicitud (simulado).`);
         setErroresFormulario({}); // Limpiar errores si el envío es "exitoso"
        // Opcional: resetear el formulario
        // setFormData({
        //      nombreCompleto: '',
        //      email: '',
        //      telefono: '',
        //      frecuenciaContribucion: 'Mensual',
        //  });
    };


  if (loading) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>Cargando información para apadrinar...</div>;
  }

  if (error) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px', color: 'red' }}>{error}</div>;
  }

  if (!mascotaInfo) {
     return <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>No se pudo cargar la información de la mascota para apadrinar.</div>;
  }


  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '700px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>Apadrina a {mascotaInfo.nombre}</h1>

        {/* Enlace de regreso a la lista de apadrinables */}
        <div style={{ marginBottom: '20px' }}>
             <Link href="/donaciones/apadrinar" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>
                 &lt; Volver a la lista de mascotas apadrinables
             </Link>
        </div>


       <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>

           {/* Información de la mascota */}
           <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
               <img
                   src={mascotaInfo.fotoUrl || '/placeholders/pet-placeholder.jpg'} // Placeholder
                   alt={`Foto de ${mascotaInfo.nombre}`}
                   style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px', marginRight: '20px', flexShrink: 0 }}
               />
               <div style={{ flexGrow: 1, minWidth: '200px' }}>
                   <h2 style={{ margin: '0 0 5px 0', fontSize: '1.8rem', color: '#333' }}>{mascotaInfo.nombre}</h2>
                   <p style={{ margin: '0', color: '#666', fontStyle: 'italic' }}>{mascotaInfo.razonApadrinar}</p>
                    {mascotaInfo.montoMensualSugerido && (
                        <p style={{ margin: '10px 0 0 0', fontSize: '1.1rem', fontWeight: 'bold', color: '#28a745' }}>
                            Monto Sugerido Mensual: {mascotaInfo.montoMensualSugerido}
                        </p>
                    )}
               </div>
           </div>

           {/* Mensaje de confirmación */}
           {mensajeConfirmacion && (
               <div style={{ backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb', borderRadius: '5px', padding: '15px', marginBottom: '20px', textAlign: 'center' }}>
                   {mensajeConfirmacion}
               </div>
           )}

           {/* Formulario de Apadrinamiento */}
           <form onSubmit={handleSubmit} noValidate>

               {/* Sección: Tus Datos como Padrino/Madrina */}
               <div style={{ marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
                   <h3 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Tus Datos como Padrino/Madrina</h3>

                    {/* Nombre Completo */}
                   <div style={{ marginBottom: '15px' }}>
                       <label htmlFor="nombreCompleto" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                           Nombre Completo: <span style={{ color: 'red' }}>*</span>
                       </label>
                       <input
                           type="text"
                           id="nombreCompleto"
                           name="nombreCompleto"
                           value={formData.nombreCompleto}
                           onChange={handleInputChange}
                           style={{ width: '100%', padding: '10px', borderRadius: '5px', border: `1px solid ${erroresFormulario.nombreCompleto ? 'red' : '#ccc'}` }}
                       />
                        {erroresFormulario.nombreCompleto && <p style={{ color: 'red', fontSize: '0.9rem', marginTop: '5px' }}>{erroresFormulario.nombreCompleto}</p>}
                   </div>

                   {/* Email */}
                    <div style={{ marginBottom: '15px' }}>
                       <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                           Email: <span style={{ color: 'red' }}>*</span>
                       </label>
                       <input
                           type="email"
                           id="email"
                           name="email"
                           value={formData.email}
                           onChange={handleInputChange}
                           style={{ width: '100%', padding: '10px', borderRadius: '5px', border: `1px solid ${erroresFormulario.email ? 'red' : '#ccc'}` }}
                       />
                        {erroresFormulario.email && <p style={{ color: 'red', fontSize: '0.9rem', marginTop: '5px' }}>{erroresFormulario.email}</p>}
                   </div>

                   {/* Teléfono (Opcional) */}
                   <div style={{ marginBottom: '15px' }}>
                       <label htmlFor="telefono" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                           Teléfono:
                       </label>
                       <input
                           type="tel"
                           id="telefono"
                           name="telefono"
                           value={formData.telefono}
                           onChange={handleInputChange}
                           style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                       />
                   </div>

                   {/* Aquí podrían ir más campos como dirección si es necesario */}
               </div>

               {/* Sección: Detalles del Apadrinamiento */}
                <div style={{ marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
                    <h3 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Detalles del Apadrinamiento</h3>

                    {/* Frecuencia de Contribución */}
                     <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="frecuenciaContribucion" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                            Frecuencia de Contribución:
                        </label>
                        <select
                            id="frecuenciaContribucion"
                            name="frecuenciaContribucion"
                            value={formData.frecuenciaContribucion}
                            onChange={handleInputChange}
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                        >
                            <option value="Mensual">Mensual</option>
                            <option value="Trimestral">Trimestral (Simulado)</option>
                            <option value="Anual">Anual (Simulado)</option>
                        </select>
                    </div>

                     {/* Monto Sugerido */}
                     <div style={{ marginBottom: '15px' }}>
                          <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', color: '#555' }}>Monto Sugerido:</p>
                           <p style={{ margin: '0', fontSize: '1.2rem', color: '#28a745' }}>
                               {mascotaInfo.montoMensualSugerido || 'No especificado'} por {formData.frecuenciaContribucion === 'Mensual' ? 'mes' : formData.frecuenciaContribucion.toLowerCase()}
                           </p>
                           {/* Aquí se podría permitir al usuario ingresar un monto diferente */}
                            {/* <label htmlFor="montoPersonalizado" style={{ display: 'block', marginTop: '15px', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>Monto Personalizado (Opcional):</label> */}
                            {/* <input type="number" id="montoPersonalizado" name="montoPersonalizado" ... /> */}
                     </div>

                </div>


               {/* Sección: Información de Pago (Simulado) */}
                <div style={{ marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
                    <h3 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Información de Pago</h3>
                     <div style={{ padding: '20px', backgroundColor: '#f8f9fa', border: '1px dashed #ccc', borderRadius: '8px', textAlign: 'center' }}>
                         <p style={{ color: '#6c757d', margin: 0 }}>
                             {/* Comentario para la integración real de pagos */}
                             Aquí se integrarían los campos seguros para ingresar los datos de tu tarjeta de crédito/débito
                             o las opciones de pago (PayPal, Mercado Pago, etc.) en una implementación real.
                         </p>
                         <p style={{ color: '#dc3545', fontWeight: 'bold', marginTop: '10px' }}>
                            (Este es un placeholder. No ingrese datos de pago reales aquí.)
                         </p>
                     </div>
                     {/* Aquí iría el componente de integración de pagos real */}
                </div>


                {/* Resumen de tu Apadrinamiento */}
                <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#e9ecef', borderRadius: '8px' }}>
                     <h3 style={{ marginTop: '0', marginBottom: '15px', color: '#555' }}>Resumen de tu Apadrinamiento</h3>
                     <p style={{ margin: '5px 0' }}><strong>Mascota:</strong> {mascotaInfo.nombre}</p>
                     <p style={{ margin: '5px 0' }}><strong>Padrino/Madrina:</strong> {formData.nombreCompleto || 'Pendiente'}</p>
                     <p style={{ margin: '5px 0' }}><strong>Contribución:</strong> {mascotaInfo.montoMensualSugerido || 'N/A'} ({formData.frecuenciaContribucion})</p>
                      {/* Aquí podrías añadir el método de pago seleccionado si se implementara */}
                      {/* <p style={{ margin: '5px 0' }}><strong>Método de Pago:</strong> [Método Seleccionado]</p> */}
                </div>


               {/* Botón de Confirmar */}
               <button
                   type="submit"
                   style={{
                       backgroundColor: '#fd7e14', // Color naranja para apadrinar
                       color: '#fff',
                       padding: '15px 30px',
                       border: 'none',
                       borderRadius: '8px',
                       cursor: 'pointer',
                       fontSize: '1.2rem',
                       fontWeight: 'bold',
                       width: '100%',
                       transition: 'background-color 0.2s ease-in-out',
                   }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e06a00')}
                   onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#fd7e14')}
                   disabled={loading || !!mensajeConfirmacion} // Deshabilitar mientras carga o si ya se envió
               >
                   {loading ? 'Cargando...' : mensajeConfirmacion ? 'Solicitud Enviada' : `Confirmar Apadrinamiento de ${mascotaInfo.nombre}`}
               </button>
                {/* Mostrar error de envío general si existe */}
                 {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '15px' }}>{error}</p>}

           </form>

       </div>


    </div>
  );
};

export default ProcesoApadrinamientoPage;