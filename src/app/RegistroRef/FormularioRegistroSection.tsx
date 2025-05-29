import React from 'react';

interface Props {
  onRegisterSuccess: () => void;
}

export default function FormularioRegistroSection({ onRegisterSuccess }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulación de registro (podrías validar aquí si usas tu backend luego)
    setTimeout(() => {
      alert("Registro exitoso. Serás redirigido...");
      onRegisterSuccess(); // Notifica éxito
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto', padding: '2rem' }}>
      <h2>Registro</h2>
      <div style={{ marginBottom: '1rem' }}>
        <label>Nombre:</label>
        <input type="text" required placeholder="Tu nombre" style={{ width: '100%' }} />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Correo:</label>
        <input type="email" required placeholder="Tu correo" style={{ width: '100%' }} />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Contraseña:</label>
        <input type="password" required placeholder="Tu contraseña" style={{ width: '100%' }} />
      </div>
      <button type="submit" style={{ width: '100%', padding: '0.5rem' }}>
        Registrarse
      </button>
    </form>
  );
}
