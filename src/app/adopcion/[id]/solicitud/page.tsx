// src/app/adopcion/[id]/solicitud/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link'; // Opcional: enlace de regreso

// Simulación de datos de mascotas para obtener el nombre
const mockMascotasParaNombre = [
    { id: 'pet1', nombre: 'Max' },
    { id: 'pet2', nombre: 'Luna' },
    { id: 'pet3', nombre: 'Rocky' },
    { id: 'pet4', nombre: 'Mia' },
    { id: 'pet5', nombre: 'Coco' },
    { id: 'pet6', nombre: 'Simba' },
    { id: 'pet7', nombre: 'Toby' },
    { id: 'pet8', nombre: 'Chloe' },
];

const FormularioSolicitudAdopcionPage = () => {
  const params = useParams();
  const mascotaId = params.id as string; // Obtener el ID de la URL

  const [nombreMascota, setNombreMascota] = useState('Mascota'); // Estado para el nombre
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState(''); // Mensajes de éxito o error
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para el botón de envío

  // Estado del formulario
  const [formData, setFormData] = useState({
      nombreCompleto: '',
      direccion: '',
      telefono: '',
      email: '',
      tipoVivienda: '', // Casa, Apartamento
      estadoPropiedad: '', // Propia, Alquiler
      tienePatio: '', // Si, No
      patioCercado: '', // Si, No (solo si tiene patio)
      numAdultos: '',
      numNinos: '',
      edadesNinos: '', // Texto libre o campo numérico(s)
      experienciaPrevia: '', // Si, No
      detallesExperienciaPrevia: '', // Texto libre
      tieneMascotasActuales: '', // Si, No
      detallesMascotasActuales: '', // Texto libre (tipo, raza, edad, etc.)
      horasSolo: '', // Texto o numérico
      quienCuida: '', // Texto libre
      preparadoGastos: '', // Si, No
      actividadesPlaneadas: '', // Texto libre
      motivosAdopcion: '', // Texto libre (por qué esta mascota)
      // Otros campos específicos de la mascota si aplican
  });

    // Cargar el nombre de la mascota
    useEffect(() => {
        if (!mascotaId) return;

        const fetchNombreMascota = async () => {
            // const response = await fetch(`/api/adopcion/mascotas/${mascotaId}/nombre`); // Ejemplo de API
            // if (response.ok) {
            //     const data = await response.json();
            //     setNombreMascota(data.nombre);
            // } else {
            //     setNombreMascota('Mascota Desconocida'); // Fallback
            // }
            // setLoading(false); // Marcar como cargado después de intentar obtener el nombre

             // Simular la carga con mock data
            const foundMascota = mockMascotasParaNombre.find(m => m.id === mascotaId);
            if (foundMascota) {
                setNombreMascota(foundMascota.nombre);
            } else {
                 // Podrías redirigir o mostrar un error si la mascota no existe
                 setError('Mascota no encontrada para solicitud.');
                 setNombreMascota('Mascota Desconocida');
            }
             setLoading(false);
        };
        fetchNombreMascota();
    }, [mascotaId]); // Dependencia: se ejecuta cuando cambia el ID de la mascota

   // Manejar cambios en los inputs del formulario
   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prevData => ({
         ...prevData,
         [name]: value
      }));
   };

    // Manejar el envío del formulario (simulación)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevenir recarga de la página

        // Simulación básica de validación
        if (!formData.nombreCompleto || !formData.email || !formData.telefono || !formData.tipoVivienda || !formData.preparadoGastos) {
            setError('Por favor, completa todos los campos obligatorios.');
            setMessage('');
            return;
        }

         setIsSubmitting(true);
         setMessage('');
         setError('');

         console.log(`Simulando envío de solicitud de adopción para ${nombreMascota} (ID: ${mascotaId})`);
         console.log('Datos del formulario:', formData);

         try {
            // Aquí iría la llamada API para enviar la solicitud
            // const response = await fetch(`/api/adopcion/solicitudes`, { // O a un endpoint específico de la mascota
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ ...formData, mascotaId: mascotaId }), // Incluir ID de la mascota
            // });

            // if (!response.ok) {
            //    // Aquí podrías leer response.json() para obtener un mensaje de error detallado del backend
            //    throw new Error('Error al enviar la solicitud. Inténtalo de nuevo.');
            // }

            // const result = await response.json(); // Si el backend devuelve algo (ej: ID de la solicitud)

            // Simular un pequeño retraso para la operación de envío
            await new Promise(resolve => setTimeout(resolve, 1500));

             setMessage('Tu solicitud ha sido enviada exitosamente. Nos pondremos en contacto contigo pronto.');
             // Opcional: Limpiar el formulario después del envío exitoso
             // setFormData({ ...valores iniciales ... });
             // Opcional: Redirigir a una página de confirmación
             // router.push('/adopcion/solicitud/confirmacion');


         } catch (err: any) {
             setError(`Error al enviar solicitud: ${err.message || 'Desconocido'}`);
             setMessage('');
         } finally {
             setIsSubmitting(false);
         }
    };


   if (loading) {
     return <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>Cargando formulario...</div>;
   }

    if (error && !nombreMascota) { // Mostrar error si la mascota no se encontró para el título
       return <div style={{ fontFamily: 'sans-serif', padding: '20px', color: 'red' }}>{error}</div>;
    }


  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '700px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>Solicitud de Adopción para {nombreMascota}</h1>

       {/* Enlace de regreso al perfil de la mascota (opcional) */}
        <div style={{ marginBottom: '20px' }}>
             <Link href={`/adopcion/${mascotaId}`} style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>
                 &lt; Volver al perfil de {nombreMascota}
             </Link>
        </div>

       {message && (
            <p style={{ color: message.includes('Error') ? 'red' : 'green', marginBottom: '15px', textAlign: 'center' }}>
                {message}
            </p>
       )}
        {error && !message && ( // Mostrar error si no hay mensaje de éxito
            <p style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>
                 {error}
            </p>
       )}


      <form onSubmit={handleSubmit} style={{ backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '8px' }}>

         {/* Información Personal */}
         <div style={{ marginBottom: '30px' }}>
            <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555', borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>Información Personal</h2>
             <div style={{ marginBottom: '15px' }}>
                <label htmlFor="nombreCompleto" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nombre Completo: <span style={{color: 'red'}}>*</span></label>
                <input type="text" id="nombreCompleto" name="nombreCompleto" value={formData.nombreCompleto} onChange={handleInputChange} required style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
             </div>
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="direccion" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Dirección Completa:</label>
                <input type="text" id="direccion" name="direccion" value={formData.direccion} onChange={handleInputChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
             </div>
              <div style={{ marginBottom: '15px', display: 'flex', gap: '20px' }}>
                 <div style={{ flex: 1 }}>
                    <label htmlFor="telefono" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Teléfono: <span style={{color: 'red'}}>*</span></label>
                    <input type="tel" id="telefono" name="telefono" value={formData.telefono} onChange={handleInputChange} required style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                 </div>
                  <div style={{ flex: 1 }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email: <span style={{color: 'red'}}>*</span></label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                 </div>
              </div>
              {/* Podrías añadir ocupación, edad (rangos), etc. */}
         </div>

         {/* Información del Hogar */}
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555', borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>Información del Hogar</h2>
            <div style={{ marginBottom: '15px' }}>
                 <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Tipo de Vivienda: <span style={{color: 'red'}}>*</span></label>
                 <div>
                     <label style={{ marginRight: '15px' }}>
                         <input type="radio" name="tipoVivienda" value="Casa" checked={formData.tipoVivienda === 'Casa'} onChange={handleInputChange} required /> Casa
                     </label>
                      <label>
                         <input type="radio" name="tipoVivienda" value="Apartamento" checked={formData.tipoVivienda === 'Apartamento'} onChange={handleInputChange} /> Apartamento
                     </label>
                     {/* Otros tipos si aplican */}
                 </div>
             </div>
              <div style={{ marginBottom: '15px' }}>
                 <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Estado de Propiedad: <span style={{color: 'red'}}>*</span></label>
                 <div>
                     <label style={{ marginRight: '15px' }}>
                         <input type="radio" name="estadoPropiedad" value="Propia" checked={formData.estadoPropiedad === 'Propia'} onChange={handleInputChange} required /> Propia
                     </label>
                      <label>
                         <input type="radio" name="estadoPropiedad" value="Alquiler" checked={formData.estadoPropiedad === 'Alquiler'} onChange={handleInputChange} /> Alquiler
                     </label>
                      {/* Si es alquiler, quizás preguntar si el propietario permite mascotas */}
                 </div>
             </div>

             <div style={{ marginBottom: '15px' }}>
                 <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>¿Tiene patio/jardín?</label>
                 <div>
                     <label style={{ marginRight: '15px' }}>
                         <input type="radio" name="tienePatio" value="Si" checked={formData.tienePatio === 'Si'} onChange={handleInputChange} /> Sí
                     </label>
                      <label>
                         <input type="radio" name="tienePatio" value="No" checked={formData.tienePatio === 'No'} onChange={handleInputChange} /> No
                     </label>
                 </div>
             </div>
              {formData.tienePatio === 'Si' && ( // Mostrar solo si tiene patio
                 <div style={{ marginBottom: '15px' }}>
                     <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>¿Está el patio cercado?</label>
                      <div>
                          <label style={{ marginRight: '15px' }}>
                              <input type="radio" name="patioCercado" value="Si" checked={formData.patioCercado === 'Si'} onChange={handleInputChange} /> Sí
                          </label>
                           <label>
                              <input type="radio" name="patioCercado" value="No" checked={formData.patioCercado === 'No'} onChange={handleInputChange} /> No
                          </label>
                      </div>
                 </div>
             )}

              <div style={{ marginBottom: '15px', display: 'flex', gap: '20px' }}>
                 <div style={{ flex: 1 }}>
                    <label htmlFor="numAdultos" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Número de Adultos en el hogar:</label>
                    <input type="number" id="numAdultos" name="numAdultos" value={formData.numAdultos} onChange={handleInputChange} min="0" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                 </div>
                  <div style={{ flex: 1 }}>
                    <label htmlFor="numNinos" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Número de Niños en el hogar:</label>
                    <input type="number" id="numNinos" name="numNinos" value={formData.numNinos} onChange={handleInputChange} min="0" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                 </div>
              </div>
               {parseInt(formData.numNinos) > 0 && ( // Mostrar solo si hay niños
                   <div style={{ marginBottom: '15px' }}>
                       <label htmlFor="edadesNinos" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Edades de los niños:</label>
                       <input type="text" id="edadesNinos" name="edadesNinos" value={formData.edadesNinos} onChange={handleInputChange} placeholder="Ej: 5, 8, 12" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                   </div>
               )}
          </div>

          {/* Experiencia con Mascotas */}
           <div style={{ marginBottom: '30px' }}>
            <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555', borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>Experiencia con Mascotas</h2>
             <div style={{ marginBottom: '15px' }}>
                 <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>¿Ha tenido mascotas antes?</label>
                 <div>
                     <label style={{ marginRight: '15px' }}>
                         <input type="radio" name="experienciaPrevia" value="Si" checked={formData.experienciaPrevia === 'Si'} onChange={handleInputChange} /> Sí
                     </label>
                      <label>
                         <input type="radio" name="experienciaPrevia" value="No" checked={formData.experienciaPrevia === 'No'} onChange={handleInputChange} /> No
                     </label>
                 </div>
             </div>
              {formData.experienciaPrevia === 'Si' && ( // Mostrar solo si tiene experiencia previa
                  <div style={{ marginBottom: '15px' }}>
                       <label htmlFor="detallesExperienciaPrevia" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Detalles de su experiencia previa (tipo de mascota, qué pasó con ella):</label>
                       <textarea id="detallesExperienciaPrevia" name="detallesExperienciaPrevia" value={formData.detallesExperienciaPrevia} onChange={handleInputChange} rows={3} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}></textarea>
                  </div>
              )}

               <div style={{ marginBottom: '15px' }}>
                 <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>¿Tiene mascotas actualmente?</label>
                 <div>
                     <label style={{ marginRight: '15px' }}>
                         <input type="radio" name="tieneMascotasActuales" value="Si" checked={formData.tieneMascotasActuales === 'Si'} onChange={handleInputChange} /> Sí
                     </label>
                      <label>
                         <input type="radio" name="tieneMascotasActuales" value="No" checked={formData.tieneMascotasActuales === 'No'} onChange={handleInputChange} /> No
                     </label>
                 </div>
             </div>
              {formData.tieneMascotasActuales === 'Si' && ( // Mostrar solo si tiene mascotas actuales
                  <div style={{ marginBottom: '15px' }}>
                       <label htmlFor="detallesMascotasActuales" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Detalles de sus mascotas actuales (tipo, raza, edad, temperamento, estado de esterilización/vacunas):</label>
                       <textarea id="detallesMascotasActuales" name="detallesMascotasActuales" value={formData.detallesMascotasActuales} onChange={handleInputChange} rows={3} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}></textarea>
                  </div>
              )}
               {/* Podrías añadir preguntas sobre veterinario actual, referencias, etc. */}
           </div>

           {/* Estilo de Vida */}
            <div style={{ marginBottom: '30px' }}>
            <h2 style={{ marginTop: '0', marginBottom: '15px', color: '#555', borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>Estilo de Vida</h2>
             <div style={{ marginBottom: '15px' }}>
                <label htmlFor="horasSolo" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>¿Cuántas horas al día, en promedio, estaría sola la mascota?</label>
                <input type="text" id="horasSolo" name="horasSolo" value={formData.horasSolo} onChange={handleInputChange} placeholder="Ej: 4-6 horas" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
             </div>
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="quienCuida" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>¿Quién sería el principal cuidador de la mascota?</label>
                <input type="text" id="quienCuida" name="quienCuida" value={formData.quienCuida} onChange={handleInputChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
             </div>
              <div style={{ marginBottom: '15px' }}>
                 <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>¿Está preparado para los gastos veterinarios y de manutención?</label>
                 <div>
                     <label style={{ marginRight: '15px' }}>
                         <input type="radio" name="preparadoGastos" value="Si" checked={formData.preparadoGastos === 'Si'} onChange={handleInputChange} required /> Sí
                     </label>
                      <label>
                         <input type="radio" name="preparadoGastos" value="No" checked={formData.preparadoGastos === 'No'} onChange={handleInputChange} /> No
                     </label>
                 </div>
             </div>
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="actividadesPlaneadas" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>¿Qué tipo de actividades planea realizar con la mascota? (paseos, juegos, entrenamiento, etc.)</label>
                <textarea id="actividadesPlaneadas" name="actividadesPlaneadas" value={formData.actividadesPlaneadas} onChange={handleInputChange} rows={3} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}></textarea>
             </div>
             <div style={{ marginBottom: '15px' }}>
                <label htmlFor="motivosAdopcion" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>¿Por qué está interesado(a) en adoptar a {nombreMascota} y qué espera de la adopción?</label>
                <textarea id="motivosAdopcion" name="motivosAdopcion" value={formData.motivosAdopcion} onChange={handleInputChange} rows={4} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}></textarea>
             </div>
              {/* Aquí podrías añadir preguntas específicas según la mascota o el refugio */}
           </div>


         {/* Botón de Envío */}
         <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button
               type="submit"
               disabled={isSubmitting || loading} // Deshabilitar mientras se envía o carga
               style={{
                  backgroundColor: (isSubmitting || loading) ? '#ccc' : '#007bff', // Gris cuando disabled
                  color: '#fff',
                  padding: '15px 30px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: (isSubmitting || loading) ? 'not-allowed' : 'pointer',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  transition: 'background-color 0.2s ease-in-out',
               }}
                onMouseOver={(e) => { if (!(isSubmitting || loading)) e.currentTarget.style.backgroundColor = '#0056b3'; }}
                onMouseOut={(e) => { if (!(isSubmitting || loading)) e.currentTarget.style.backgroundColor = '#007bff'; }}
            >
               {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
            </button>
         </div>

      </form>
         <p style={{textAlign: 'center', fontSize: '0.9rem', color: '#777', marginTop: '15px'}}><span style={{color: 'red'}}>*</span> Campos obligatorios</p>


    </div>
  );
};

export default FormularioSolicitudAdopcionPage;