'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // iconos para mostrar/ocultar contraseña

export default function FormularioRegistroSection() {
  const [formData, setFormData] = useState({
    nombreRefugio: '',
    descripcionRefugio: '',
    usuario: '',
    email: '',
    password: '',
    confirmPassword: '',
    nombreResponsable: '',
    cargoResponsable: '',
    celularResponsable: '',
    tiposMascotas: '',
    numeroMascotas: '',
    visitasDomiciliarias: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    // Aquí puedes agregar validaciones y envío a backend
  };

  return (
    <section className="bg-pink-70 min-h-screen flex flex-col items-center justify-center bg-gray0-50 px-4 py-1">
      <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">Iniciar Registro</h2>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Columna izquierda: Datos del Refugio */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-gray-700">Datos del Refugio</h3>

            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Nombre del refugio o asociación</label>
              <input
                type="text"
                name="nombreRefugio"
                value={formData.nombreRefugio}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Ingrese su nombre completo"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Descripción breve del refugio</label>
              <textarea
                name="descripcionRefugio"
                value={formData.descripcionRefugio}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Ingrese una breve descripción"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Usuario</label>
              <input
                type="text"
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Ingrese su nombre de usuario"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Ingrese su email"
                required
              />
            </div>

            <div className="mb-4 relative">
              <label className="block text-gray-600 mb-2">Contraseña</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
                placeholder="Ingrese una contraseña"
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-10 text-gray-500">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="mb-4 relative">
              <label className="block text-gray-600 mb-2">Confirmar Contraseña</label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
                placeholder="Confirme su contraseña"
                required
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-10 text-gray-500">
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Columna derecha: Datos del Responsable */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-gray-700">Datos de Representante Legal o Responsable</h3>

            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Nombre completo del responsable</label>
              <input
                type="text"
                name="nombreResponsable"
                value={formData.nombreResponsable}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Ingrese su nombre completo"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Cargo en el refugio</label>
              <input
                type="text"
                name="cargoResponsable"
                value={formData.cargoResponsable}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Director, Coordinador, etc."
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Número de celular</label>
              <input
                type="text"
                name="celularResponsable"
                value={formData.celularResponsable}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Ingrese su número de celular"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Tipos de mascotas que maneja</label>
              <input
                type="text"
                name="tiposMascotas"
                value={formData.tiposMascotas}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Perros, gatos, aves, etc."
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Número aproximado de mascotas a cargo</label>
              <input
                type="text"
                name="numeroMascotas"
                value={formData.numeroMascotas}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Número aproximado"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 mb-2">¿Requieren visitas domiciliarias antes de adopciones?</label>
              <input
                type="text"
                name="visitasDomiciliarias"
                value={formData.visitasDomiciliarias}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Sí / No"
                required
              />
            </div>
          </div>
        </div>

        {/* Botón siguiente */}
        <div className="mt-8 flex flex-col items-center">
          <button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-full transition">
            Siguiente
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