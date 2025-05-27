'use client';

import React, { useState } from 'react';

const RecuperarContrasenaPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here would be the logic to send the password recovery request
    console.log('Recovery request sent for:', email);

    // Basic email format validation (example)
    if (!email) {
      setError('Please enter your email address.');
      setMessage('');
      return;
    }

    // Simulation of successful sending (replace with real logic)
    setMessage('A recovery link has been sent to your email address.');
    setError('');
    setEmail(''); // Clear the field after sending
  };

  return (
    <div style={{ fontFamily: 'sans-serif', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', backgroundColor: '#f0f0f0' }}>
      <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '20px', color: '#333' }}>Recuperar Contraseña</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', textAlign: 'left' }}>Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
            />
          </div>
          <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold', transition: 'background-color 0.2s ease-in-out' }}>
            Enviar enlace de recuperación
          </button>
        </form>
        {message && <p style={{ color: 'green', marginTop: '15px' }}>{message}</p>}
        {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}
      </div>
    </div>
  );
};

export default RecuperarContrasenaPage;