'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react'; // Para iconos de contraseña y loading

// --- Toast Notification (Suggestion) ---
// You can integrate a library like react-toastify or sonner for better notifications
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// Or use simple alerts for now:
const showSuccessToast = (message: string) => alert(message);
const showErrorToast = (message: string) => alert(message);
// --------------------------------------

export default function FormularioUsuarioSection() {
  const [formData, setFormData] = useState({
    usuario: '',
    contraseña: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [formError, setFormError] = useState<string | null>(null); // State for general form errors

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- NEW REGISTRATION SUBMIT FUNCTION ---
  const handleRegistrationSubmit = async () => {
    setIsLoading(true);
    setFormError(null);

    // Basic Validations (Add more as needed)
    if (formData.contraseña !== formData.confirmPassword) {
      setFormError('Las contraseñas no coinciden.');
      setIsLoading(false);
      return;
    }

    // Prepare data for backend (map state fields to backend fields)
    const dataToSend = {
      usuario: formData.usuario,
      contraseña: formData.contraseña,
    };

    try {
      const response = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Error al registrar');

      showSuccessToast('¡Usuario registrado exitosamente!');
      // Optionally reset form or redirect
      setFormData({ usuario: '', contraseña: '', confirmPassword: '' }); // Reset form after success
    } catch (error) {
      console.error('Registration failed:', error);
      setFormError(`Error al registrar: ${error.message}`);
      showErrorToast(`Error al registrar: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  // ----------------------------------------

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Call the new registration function
    handleRegistrationSubmit();
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Iniciar Registro</h2>
      <p className="text-gray-600 mb-10">MatchPet te espera!</p>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        {/* Display General Form Error */}
        {formError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {formError}
          </div>
        )}

        {/* Usuario */}
        <div>
          <label htmlFor="usuario" className="block text-gray-600 mb-2">Usuario</label>
          <input
            id="usuario"
            type="text"
            name="usuario"
            value={formData.usuario}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-pink-300 focus:border-pink-400"
            placeholder="Ingrese su nombre de usuario"
            required
          />
        </div>

        {/* Contraseña */}
        <div className="relative">
          <label htmlFor="contraseña" className="block text-gray-600 mb-2">Contraseña</label>
          <input
            id="contraseña"
            type={showPassword ? 'text' : 'password'}
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:ring-2 focus:ring-pink-300 focus:border-pink-400"
            placeholder="Ingrese una contraseña"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Confirmar Contraseña */}
        <div className="relative">
          <label htmlFor="confirmPassword" className="block text-gray-600 mb-2">Confirmar Contraseña</label>
          <input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:ring-2 focus:ring-pink-300 focus:border-pink-400"
            placeholder="Confirme su contraseña"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Botón Registrarme */}
        <div className="mt-8 flex flex-col items-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 text-white font-semibold py-3 px-8 rounded-full transition-transform transform hover:scale-105 w-full md:w-auto flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Registrando...
              </>
            ) : (
              'Registrarme'
            )}
          </button>
          <p className="text-sm mt-4 text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <a href="/login" className="text-pink-500 hover:underline">Iniciar Sesión</a>
          </p>
        </div>
      </form>
    </section>
  );
}
