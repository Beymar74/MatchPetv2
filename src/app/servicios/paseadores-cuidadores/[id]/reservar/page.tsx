// src/app/servicios/paseadores-cuidadores/[id]/reservar/page.tsx
'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// Interfaz para simular los datos del paseador/cuidador y sus servicios
interface PaseadorCuidadorInfo {
  id: string;
  nombre: string;
  serviciosOfrecidos: {
    tipo: string;
    precio: number; // Usamos number para simular cálculo
  }[];
}

// Simulación de datos de un paseador/cuidador específico (debe coincidir con el ID)
const mockPaseadorInfo: PaseadorCuidadorInfo[] = [
  {
    id: 'pc1',
    nombre: 'Ana Gómez',
    serviciosOfrecidos: [
      { tipo: 'Paseo de Perros (30 min)', precio: 18 },
      { tipo: 'Cuidado a Domicilio (1 hr)', precio: 25 },
      { tipo: 'Paseo Extendido (60 min)', precio: 30 },
    ],
  },
  {
    id: 'pc2',
    nombre: 'Carlos Rodríguez',
    serviciosOfrecidos: [
      { tipo: 'Paseo de Perros (45 min)', precio: 20 },
      { tipo: 'Alojamiento Nocturno (por noche)', precio: 35 },
    ],
  },
    {
    id: 'pc3',
    nombre: 'Sofía López',
    serviciosOfrecidos: [
      { tipo: 'Cuidado a Domicilio Gatos (45 min)', precio: 20 },
      { tipo: 'Visitas Cortas (20 min)', precio: 15 },
    ],
  },
       {
    id: 'pc4',
    nombre: 'Javier Martínez',
    serviciosOfrecidos: [
      { tipo: 'Paseo de Perros (Grupal 60 min)', precio: 15 },
      { tipo: 'Paseo de Perros (Individual 45 min)', precio: 25 },
    ],
  },
];

const ReservarServicioPage = () => {
  const params = useParams();
  const paseadorCuidadorId = params.id as string;

  const [paseadorInfo, setPaseadorInfo] = useState<PaseadorCuidadorInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    servicioSeleccionado: '',
    fechaServicio: '',
    horaServicio: '',
    nombreMascota: '',
    instruccionesAdicionales: '',
  });
  const [costoEstimado, setCostoEstimado] = useState<number | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Simular la carga de datos del paseador/cuidador y sus servicios
  useEffect(() => {
    if (!paseadorCuidadorId) {
      setLoading(false);
      setError('ID de paseador/cuidador no proporcionado.');
      return;
    }

    const fetchPaseadorInfo = async () => {
      setLoading(true);
      setError('');
      try {
        // --- INTEGRACIÓN REAL: Llamada API para obtener paseador/cuidador y sus servicios ---
        // const response = await fetch(`/api/paseadores-cuidadores/${paseadorCuidadorId}/servicios`);
        // if (!response.ok) { ... }
        // const data: PaseadorCuidadorInfo = await response.json();
        // setPaseadorInfo(data);

        // Simular con mock data
        await new Promise(resolve => setTimeout(resolve, 300)); // Simular retraso
        const foundInfo = mockPaseadorInfo.find(info => info.id === paseadorCuidadorId);
        if (foundInfo) {
          setPaseadorInfo(foundInfo);
           // Seleccionar el primer servicio por defecto si existe
           if(foundInfo.serviciosOfrecidos.length > 0) {
               setFormData(prev => ({ ...prev, servicioSeleccionado: foundInfo.serviciosOfrecidos[0].tipo }));
               setCostoEstimado(foundInfo.serviciosOfrecidos[0].precio);
           } else {
                setCostoEstimado(0); // O null, si no hay servicios
           }

        } else {
          setError('Información del paseador/cuidador no encontrada.');
        }

      } catch (err: any) {
        setError(err.message || 'Error al cargar la información.');
      } finally {
        setLoading(false);
      }
    };
    fetchPaseadorInfo();
  }, [paseadorCuidadorId]);

  // Actualizar costo estimado cuando cambia el servicio seleccionado
  useEffect(() => {
      if (paseadorInfo && formData.servicioSeleccionado) {
          const selectedService = paseadorInfo.serviciosOfrecidos.find(s => s.tipo === formData.servicioSeleccionado);
          setCostoEstimado(selectedService ? selectedService.precio : null);
      } else {
          setCostoEstimado(null);
      }
  }, [formData.servicioSeleccionado, paseadorInfo]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // --- VALIDACIÓN BÁSICA SIMULADA ---
    if (!formData.servicioSeleccionado || !formData.fechaServicio || !formData.horaServicio || !formData.nombreMascota) {
      alert('Por favor, completa todos los campos obligatorios (Servicio, Fecha, Hora, Nombre de la Mascota).');
      // --- INTEGRACIÓN REAL: Mostrar mensajes de validación en el formulario ---
      return;
    }

    setSubmissionStatus('submitting');

    // --- INTEGRACIÓN REAL: Llamada API para enviar la solicitud de reserva ---
    // try {
    //   const response = await fetch('/api/reservas', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ paseadorCuidadorId, ...formData }),
    //   });
    //   if (!response.ok) {
    //     throw new Error('Error al enviar la solicitud de reserva.');
    //   }
    //   // Manejar respuesta exitosa (ej. redirigir a página de confirmación o seguimiento)
    //   setSubmissionStatus('success');
    //   // Opcional: Redirigir a una página de "Mis Reservas" o "Confirmación"
    //   // router.push('/mis-reservas');
    // } catch (err) {
    //   setError(err.message || 'Error al enviar la solicitud.');
    //   setSubmissionStatus('error');
    // }


    // Simular envío exitoso con un retraso
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmissionStatus('success');
    // --- INTEGRACIÓN REAL: Limpiar formulario o redirigir ---
     // setFormData({ servicioSeleccionado: '', fechaServicio: '', horaServicio: '', nombreMascota: '', instruccionesAdicionales: '' });

  };


  if (loading) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>Cargando información de reserva...</div>;
  }

  if (error) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px', color: 'red' }}>{error}</div>;
  }

   if (!paseadorInfo) {
       return <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>No se encontró información para hacer la reserva.</div>;
   }

   if (submissionStatus === 'success') {
       return (
           <div style={{ fontFamily: 'sans-serif', padding: '40px', maxWidth: '600px', margin: '40px auto', textAlign: 'center', backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb', borderRadius: '8px' }}>
               <h2 style={{ color: '#155724' }}>¡Solicitud Enviada con Éxito!</h2>
               <p>Tu solicitud de reserva con {paseadorInfo.nombre} ha sido enviada.</p>
                <p>Te contactaremos pronto para confirmar los detalles.</p>
                <Link href={`/servicios/paseadores-cuidadores/${paseadorCuidadorId}`} style={{ display: 'inline-block', marginTop: '20px', color: '#155724', textDecoration: 'underline', fontWeight: 'bold' }}>
                   Volver al perfil de {paseadorInfo.nombre}
               </Link>
                 {/* O enlace a Mis Reservas */}
           </div>
       );
   }

    if (submissionStatus === 'error') {
       return (
            <div style={{ fontFamily: 'sans-serif', padding: '40px', maxWidth: '600px', margin: '40px auto', textAlign: 'center', backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb', borderRadius: '8px' }}>
               <h2 style={{ color: '#721c24' }}>Error al Enviar Solicitud</h2>
               <p>{error || 'Ocurrió un error al procesar tu solicitud. Por favor, inténtalo de nuevo.'}</p>
                <button
                   onClick={() => setSubmissionStatus('idle')}
                   style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                   }}
                >
                   Intentar de Nuevo
                </button>
           </div>
       );
   }


  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>Reservar Servicio con {paseadorInfo.nombre}</h1>

       {/* Enlace de regreso al perfil detallado */}
        <div style={{ marginBottom: '30px' }}>
             <Link href={`/servicios/paseadores-cuidadores/${paseadorCuidadorId}`} style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>
                 &lt; Volver al perfil de {paseadorInfo.nombre}
             </Link>
        </div>


       <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>

         {/* Campo: Tipo de Servicio */}
         <div style={{ marginBottom: '20px' }}>
           <label htmlFor="servicioSeleccionado" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
             Tipo de Servicio <span style={{color: 'red'}}>*</span>
           </label>
           <select
             id="servicioSeleccionado"
             name="servicioSeleccionado"
             value={formData.servicioSeleccionado}
             onChange={handleInputChange}
             required
             style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
           >
             <option value="">Selecciona un servicio</option>
             {paseadorInfo.serviciosOfrecidos.map((servicio, index) => (
               <option key={index} value={servicio.tipo}>
                 {servicio.tipo} - ${servicio.precio}
               </option>
             ))}
              {/* --- INTEGRACIÓN REAL: Cargar opciones de servicios reales desde el backend --- */}
           </select>
         </div>

         {/* Campo: Fecha y Hora */}
         <div style={{ marginBottom: '20px', display: 'flex', gap: '20px' }}>
           <div style={{ flex: 1 }}>
              <label htmlFor="fechaServicio" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                Fecha del Servicio <span style={{color: 'red'}}>*</span>
              </label>
              <input
                type="date" // Usar type date para mejor UX en móviles
                id="fechaServicio"
                name="fechaServicio"
                value={formData.fechaServicio}
                onChange={handleInputChange}
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
              />
               {/* --- INTEGRACIÓN REAL: Usar un selector de fechas más robusto --- */}
           </div>
            <div style={{ flex: 1 }}>
               <label htmlFor="horaServicio" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                 Hora del Servicio <span style={{color: 'red'}}>*</span>
               </label>
               <input
                 type="time" // Usar type time
                 id="horaServicio"
                 name="horaServicio"
                 value={formData.horaServicio}
                 onChange={handleInputChange}
                 required
                 style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
               />
                {/* --- INTEGRACIÓN REAL: Usar un selector de horas más preciso o con rangos disponibles --- */}
            </div>
         </div>

          {/* Campo: Nombre de la Mascota */}
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="nombreMascota" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
              Nombre de la Mascota <span style={{color: 'red'}}>*</span>
            </label>
            <input
              type="text"
              id="nombreMascota"
              name="nombreMascota"
              value={formData.nombreMascota}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
              placeholder="Ej: Max"
            />
            {/* --- INTEGRACIÓN REAL: Si el usuario está logueado, permitir seleccionar una mascota de su perfil --- */}
          </div>


         {/* Campo: Instrucciones Adicionales */}
         <div style={{ marginBottom: '30px' }}>
           <label htmlFor="instruccionesAdicionales" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
             Instrucciones Adicionales (Opcional)
           </label>
           <textarea
             id="instruccionesAdicionales"
             name="instruccionesAdicionales"
             value={formData.instruccionesAdicionales}
             onChange={handleInputChange}
             rows={4}
             style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem', resize: 'vertical' }}
             placeholder="Ej: La correa está en el gancho junto a la puerta, tiene una alergia a..."
           ></textarea>
         </div>

         {/* Resumen de la Reserva y Costo Estimado */}
         <div style={{ backgroundColor: '#f0f8ff', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px dashed #b0d0ff' }}>
            <h3 style={{ marginTop: '0', marginBottom: '15px', color: '#0056b3' }}>Resumen de la Reserva</h3>
            <p style={{ margin: '5px 0', color: '#555' }}>
                <strong>Servicio:</strong> {formData.servicioSeleccionado || 'No seleccionado'}
            </p>
             <p style={{ margin: '5px 0', color: '#555' }}>
                <strong>Fecha:</strong> {formData.fechaServicio || 'No especificada'}
            </p>
             <p style={{ margin: '5px 0 15px 0', color: '#555' }}>
                <strong>Hora:</strong> {formData.horaServicio || 'No especificada'}
            </p>
             <p style={{ margin: '5px 0', color: '#555' }}>
                <strong>Mascota:</strong> {formData.nombreMascota || 'No especificada'}
            </p>

             <div style={{ borderTop: '1px solid #b0d0ff', paddingTop: '15px', marginTop: '15px', textAlign: 'right' }}>
                 <p style={{ margin: '0', fontSize: '1.3rem', fontWeight: 'bold', color: '#28a745' }}>
                     Costo Estimado: {costoEstimado !== null ? `$${costoEstimado.toFixed(2)}` : '---'}
                 </p>
                  {/* --- INTEGRACIÓN REAL: Calcular costo basado en tipo de servicio, duración, etc. --- */}
             </div>
         </div>


         {/* Botón de Envío */}
         <button
           type="submit"
           disabled={submissionStatus === 'submitting'}
           style={{
             width: '100%',
             padding: '15px',
             backgroundColor: submissionStatus === 'submitting' ? '#cccccc' : '#007bff',
             color: '#fff',
             border: 'none',
             borderRadius: '8px',
             fontSize: '1.2rem',
             fontWeight: 'bold',
             cursor: submissionStatus === 'submitting' ? 'not-allowed' : 'pointer',
             transition: 'background-color 0.2s ease-in-out',
           }}
           onMouseOver={(e) => submissionStatus !== 'submitting' && (e.currentTarget.style.backgroundColor = '#0056b3')}
           onMouseOut={(e) => submissionStatus !== 'submitting' && (e.currentTarget.style.backgroundColor = '#007bff')}
         >
           {submissionStatus === 'submitting' ? 'Enviando Solicitud...' : 'Enviar Solicitud de Reserva'}
         </button>

          {/* Mostrar mensajes de estado si no son de éxito o error en una página dedicada */}
           {submissionStatus === 'submitting' && <p style={{ textAlign: 'center', marginTop: '15px', color: '#007bff' }}>Procesando tu solicitud...</p>}


       </form>
    </div>
  );
};

export default ReservarServicioPage;