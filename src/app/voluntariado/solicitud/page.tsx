// src/app/voluntariado/solicitud/page.tsx
'use client';

import React, { useState } from 'react';

const areasDeInteres = [
    'Cuidado Directo de Animales',
    'Eventos y Recaudación',
    'Administración y Oficina',
    'Transporte de Animales',
    'Educación y Concientización',
    'Fotografía/Video',
];

const SolicitudVoluntariadoPage = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [availability, setAvailability] = useState(''); // Usaremos un textarea por simplicidad inicial
    const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
    const [previousExperience, setPreviousExperience] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleAreaChange = (area: string) => {
        setSelectedAreas(prevSelected =>
            prevSelected.includes(area)
                ? prevSelected.filter(item => item !== area)
                : [...prevSelected, area]
        );
         setMessage(''); // Limpiar mensajes al cambiar selección
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validación básica
        if (!fullName.trim() || !email.trim() || !phoneNumber.trim() || !availability.trim() || selectedAreas.length === 0) {
            setMessage('Por favor, completa todos los campos obligatorios (Nombre Completo, Email, Teléfono, Disponibilidad y Áreas de Interés).');
            return;
        }

         if (!/\S+@\S+\.\S+/.test(email)) {
             setMessage('Por favor, introduce un email válido.');
             return;
         }


        setIsSubmitting(true);
        setMessage(''); // Limpiar mensajes al enviar

        const formData = {
            fullName: fullName.trim(),
            email: email.trim(),
            phoneNumber: phoneNumber.trim(),
            availability: availability.trim(),
            areasOfInterest: selectedAreas,
            previousExperience: previousExperience.trim(),
        };

        console.log('Simulando envío de solicitud de voluntariado:', formData);

        // --- Integración Real del Backend ---
        // Aquí harías una llamada a tu API para enviar la solicitud.
        /*
        try {
            const response = await fetch('/api/voluntariado/solicitudes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Error al enviar la solicitud de voluntariado.');
            }

            // const result = await response.json(); // Si el backend devuelve una respuesta


            setMessage('¡Tu solicitud de voluntariado ha sido enviada con éxito! Nos pondremos en contacto contigo pronto.');
            // Opcional: Limpiar el formulario
            setFullName('');
            setEmail('');
            setPhoneNumber('');
            setAvailability('');
            setSelectedAreas([]);
            setPreviousExperience('');

        } catch (error: any) {
            console.error('Error submitting volunteer application:', error);
            setMessage(`Hubo un error al enviar tu solicitud: ${error.message || 'Inténtalo de nuevo más tarde.'}`);
        } finally {
            setIsSubmitting(false);
        }
        */

        // --- Simulación (mantener para el ejemplo sin backend) ---
         // Simular un pequeño retraso de red
         await new Promise(resolve => setTimeout(resolve, 1000));
         setMessage('¡Tu solicitud de voluntariado simulada ha sido enviada con éxito!');
         setIsSubmitting(false);
         // Opcional: Limpiar el formulario después de la simulación
         setFullName('');
         setEmail('');
         setPhoneNumber('');
         setAvailability('');
         setSelectedAreas([]);
         setPreviousExperience('');
        // -------------------------------------------------------

    };

    return (
        <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '700px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>Sé Voluntario</h1>

            <p style={{ marginBottom: '30px', textAlign: 'center', lineHeight: '1.6' }}>
                ¿Amas a los animales y quieres ayudar? El voluntariado es una forma increíble de marcar una diferencia. Únete a nuestro equipo y contribuye al bienestar de nuestros residentes peludos. Completa el siguiente formulario para postularte.
            </p>

            {message && (
                <p style={{ color: message.includes('éxito') ? 'green' : 'red', marginBottom: '15px', textAlign: 'center' }}>
                    {message}
                </p>
            )}

            <form onSubmit={handleSubmit} style={{ backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '8px' }}>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="fullName" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>Nombre Completo:</label>
                    <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => { setFullName(e.target.value); setMessage(''); }}
                        required
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
                        placeholder="Tu nombre completo"
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setMessage(''); }}
                        required
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
                        placeholder="tu.email@example.com"
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="phoneNumber" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>Teléfono:</label>
                    <input
                        type="tel" // Usar tel para teléfonos
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => { setPhoneNumber(e.target.value); setMessage(''); }}
                        required
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
                        placeholder="Tu número de teléfono"
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="availability" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>Disponibilidad (Días y Horarios):</label>
                    <textarea
                        id="availability"
                        value={availability}
                        onChange={(e) => { setAvailability(e.target.value); setMessage(''); }}
                        rows={4}
                        required
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
                        placeholder="Ej: Lunes y Miércoles por la tarde, Fines de semana flexible..."
                    ></textarea>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '12px', fontWeight: 'bold', color: '#555' }}>Áreas de Interés:</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                        {areasDeInteres.map(area => (
                            <div key={area} style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    id={`area-${area}`}
                                    value={area}
                                    checked={selectedAreas.includes(area)}
                                    onChange={() => { handleAreaChange(area); }}
                                    style={{ marginRight: '8px' }}
                                />
                                <label htmlFor={`area-${area}`}>{area}</label>
                            </div>
                        ))}
                    </div>
                </div>

                 <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="previousExperience" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>Experiencia Previa (Opcional):</label>
                    <textarea
                        id="previousExperience"
                        value={previousExperience}
                        onChange={(e) => setPreviousExperience(e.target.value)}
                        rows={4}
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
                        placeholder="¿Has sido voluntario antes? Cuéntanos..."
                    ></textarea>
                </div>


                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                            backgroundColor: isSubmitting ? '#ccc' : '#28a745', // Verde para acción principal
                            color: '#fff',
                            padding: '12px 30px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            transition: 'background-color 0.3s ease',
                        }}
                    >
                        {isSubmitting ? 'Enviando Solicitud...' : 'Enviar Solicitud'}
                    </button>
                </div>
            </form>

             {/* Información adicional (Comentado) */}
             {/*
              <div style={{ marginTop: '40px', textAlign: 'center', fontSize: '0.9rem', color: '#777' }}>
                  <p>Una vez recibida tu solicitud, nuestro equipo la revisará y te contactará.</p>
              </div>
             */}


        </div>
    );
};

export default SolicitudVoluntariadoPage;