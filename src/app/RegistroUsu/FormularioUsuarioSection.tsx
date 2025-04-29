'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // Para iconos de contraseña

export default function FormularioUsuarioSection() {
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    usuario: '',
    email: '',
    password: '',
    confirmPassword: '',
    diaNacimiento: '',
    mesNacimiento: '',
    añoNacimiento: '',
    sexo: '',
    preferenciaMascota: '',
    intereses: {
        tamanoPreferido: '',
        edadPreferida: '',
        nivelEnergia: '',
        compatibilidadNinos: '',
        compatibilidadMascotas: '',
        tipoVivienda: '',
        tiempoDisponible: '',
      },
    fotoPerfil: null as File | null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorIntereses, setErrorIntereses] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, fotoPerfil: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
    // Aquí puedes validar o enviar al servidor
  };

  const toggleInterest = (group: keyof typeof formData.intereses, interest: string) => {
    setFormData((prev) => ({
      ...prev,
      intereses: {
        ...prev.intereses,
        [group]: prev.intereses[group] === interest ? '' : interest,
      },
    }));
  };
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Iniciar Registro</h2>
      <p className="text-gray-600 mb-10">MatchPet te espera!</p>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nombre Completo */}
          <div>
            <label className="block text-gray-600 mb-2">Nombre Completo</label>
            <input
              type="text"
              name="nombreCompleto"
              value={formData.nombreCompleto}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Ingrese su nombre completo"
              required
            />
          </div>

          {/* Fecha de Nacimiento */}
          <div>
            <label className="block text-gray-600 mb-2">Fecha de Cumpleaños</label>
            <div className="flex gap-2">
              <input
                type="text"
                name="diaNacimiento"
                value={formData.diaNacimiento}
                onChange={handleChange}
                className="w-1/3 border border-gray-300 rounded px-3 py-2"
                placeholder="Día"
                maxLength={2}
                required
              />
              <input
                type="text"
                name="mesNacimiento"
                value={formData.mesNacimiento}
                onChange={handleChange}
                className="w-1/3 border border-gray-300 rounded px-3 py-2"
                placeholder="Mes"
                maxLength={2}
                required
              />
              <input
                type="text"
                name="añoNacimiento"
                value={formData.añoNacimiento}
                onChange={handleChange}
                className="w-1/3 border border-gray-300 rounded px-3 py-2"
                placeholder="Año"
                maxLength={4}
                required
              />
            </div>
          </div>

          {/* Usuario */}
          <div>
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

          {/* Sexo */}
          <div>
            <label className="block text-gray-600 mb-2">Sexo</label>
            <div className="flex gap-2">
              <button
                type="button"
                className={`w-1/2 border rounded px-3 py-2 ${formData.sexo === 'Femenino' ? 'bg-pink-100 border-pink-400' : 'border-gray-300'}`}
                onClick={() => setFormData({ ...formData, sexo: 'Femenino' })}
              >
                Femenino
              </button>
              <button
                type="button"
                className={`w-1/2 border rounded px-3 py-2 ${formData.sexo === 'Masculino' ? 'bg-blue-100 border-blue-400' : 'border-gray-300'}`}
                onClick={() => setFormData({ ...formData, sexo: 'Masculino' })}
              >
                Masculino
              </button>
            </div>
          </div>

          {/* Email */}
          <div>
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

          {/* Preferencia de Mascota */}
          <div>
            <label className="block text-gray-600 mb-2">Soy una persona de</label>
            <div className="flex gap-2">
              <button
                type="button"
                className={`w-1/2 border rounded px-3 py-2 ${formData.preferenciaMascota === 'Gatos' ? 'bg-purple-100 border-purple-400' : 'border-gray-300'}`}
                onClick={() => setFormData({ ...formData, preferenciaMascota: 'Gatos' })}
              >
                Gatos
              </button>
              <button
                type="button"
                className={`w-1/2 border rounded px-3 py-2 ${formData.preferenciaMascota === 'Perros' ? 'bg-yellow-100 border-yellow-400' : 'border-gray-300'}`}
                onClick={() => setFormData({ ...formData, preferenciaMascota: 'Perros' })}
              >
                Perros
              </button>
            </div>
          </div>

          {/* Contraseña */}
          <div className="relative">
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

          {/* Confirmar Contraseña */}
          <div className="relative">
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

          {/* Añadir intereses */}
          <div className="md:col-span-2">
            <label className="block text-gray-600 mb-2">Intereses que tengo:</label>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-100"
            >
              ➕ Añadir intereses
            </button>

            {/* Mostrar intereses seleccionados */}
            <div className="flex flex-wrap gap-2 mt-4">
                {Object.entries(formData.intereses)
                .filter(([_, value]) => value !== '') // Solo mostrar los que estén seleccionados
                    .map(([key, value]) => (
                <span key={key} className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-sm">
                {value}
                 </span>
                ))}
            </div>

            {/* Mensaje de error de intereses */}
            {errorIntereses && <p className="text-red-500 text-sm mt-2">{errorIntereses}</p>}
          </div>

          {/* Añadir foto */}
          <div className="md:col-span-2">
            <label className="block text-gray-600 mb-2">Añade tus fotos de perfil</label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                onChange={handleFileChange}
                className="border border-gray-300 rounded px-3 py-2"
                accept="image/*"
              />
              {formData.fotoPerfil && (
                <span className="text-gray-700 text-sm">{formData.fotoPerfil.name}</span>
              )}
            </div>
          </div>
        </div>

        {/* Botón Registrarme */}
        <div className="mt-8 flex flex-col items-center">
          <button type="submit" className="bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 text-white font-semibold py-3 px-8 rounded-full transition">
            Registrarme
          </button>
          <p className="text-sm mt-4 text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <a href="/login" className="text-pink-500 hover:underline">Iniciar Sesión</a>
          </p>
        </div>
      </form>

      {/* Modal de intereses */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <h3 className="text-2xl font-semibold mb-4 text-center">Añade tus intereses</h3>
      <p className="text-gray-500 text-center mb-6">Debes seleccionar 5 intereses en total</p>

      {/* CADA GRUPO */}
      <div className="flex flex-col gap-6">

        {/* Tamaño preferido */}
<div>
  <h4 className="font-semibold mb-2">Tamaño preferido</h4>
  <div className="flex flex-wrap gap-2">
    {['Pequeño', 'Mediano', 'Grande'].map((item) => (
      <button
        key={item}
        type="button"
        className={`border px-4 py-2 rounded-full ${
          formData.intereses.tamanoPreferido === item ? 'bg-pink-200 border-pink-500' : 'border-gray-300'
        }`}
        onClick={() => setFormData((prev) => ({
          ...prev,
          intereses: {
            ...prev.intereses,
            tamanoPreferido: item,
          }
        }))}
      >
        {item}
      </button>
    ))}
  </div>
</div>

        {/* Edad preferida */}
<div>
  <h4 className="font-semibold mb-2">Edad preferida</h4>
  <div className="flex flex-wrap gap-2">
    {['Cachorro', 'Joven', 'Adulto'].map((item) => (
      <button
        key={item}
        type="button"
        className={`border px-4 py-2 rounded-full ${
          formData.intereses.edadPreferida === item ? 'bg-pink-200 border-pink-500' : 'border-gray-300'
        }`}
        onClick={() => setFormData(prev => ({
          ...prev,
          intereses: { ...prev.intereses, edadPreferida: item }
        }))}
      >
        {item}
      </button>
    ))}
  </div>
</div>

{/* Nivel de energía */}
<div>
  <h4 className="font-semibold mb-2">Nivel de energía</h4>
  <div className="flex flex-wrap gap-2">
    {['Tranquilo', 'Moderado', 'Muy Activo'].map((item) => (
      <button
        key={item}
        type="button"
        className={`border px-4 py-2 rounded-full ${
          formData.intereses.nivelEnergia === item ? 'bg-pink-200 border-pink-500' : 'border-gray-300'
        }`}
        onClick={() => setFormData(prev => ({
          ...prev,
          intereses: { ...prev.intereses, nivelEnergia: item }
        }))}
      >
        {item}
      </button>
    ))}
  </div>
</div>

{/* Compatibilidad con niños */}
<div>
  <h4 className="font-semibold mb-2">Compatibilidad con niños</h4>
  <div className="flex flex-wrap gap-2">
    {['Sí', 'No', 'Indiferente'].map((item) => (
      <button
        key={item}
        type="button"
        className={`border px-4 py-2 rounded-full ${
          formData.intereses.compatibilidadNinos === item ? 'bg-pink-200 border-pink-500' : 'border-gray-300'
        }`}
        onClick={() => setFormData(prev => ({
          ...prev,
          intereses: { ...prev.intereses, compatibilidadNinos: item }
        }))}
      >
        {item}
      </button>
    ))}
  </div>
</div>

{/* Compatibilidad con otras mascotas */}
<div>
  <h4 className="font-semibold mb-2">Compatibilidad con otras mascotas</h4>
  <div className="flex flex-wrap gap-2">
    {['Sí (perros, gatos, ambos)', 'No', 'No importante'].map((item) => (
      <button
        key={item}
        type="button"
        className={`border px-4 py-2 rounded-full ${
          formData.intereses.compatibilidadMascotas === item ? 'bg-pink-200 border-pink-500' : 'border-gray-300'
        }`}
        onClick={() => setFormData(prev => ({
          ...prev,
          intereses: { ...prev.intereses, compatibilidadMascotas: item }
        }))}
      >
        {item}
      </button>
    ))}
  </div>
</div>

{/* Tipo de vivienda */}
<div>
  <h4 className="font-semibold mb-2">Tipo de vivienda</h4>
  <div className="flex flex-wrap gap-2">
    {['Casa con patio', 'Departamento pequeño', 'Departamento grande', 'Casa rural'].map((item) => (
      <button
        key={item}
        type="button"
        className={`border px-4 py-2 rounded-full ${
          formData.intereses.tipoVivienda === item ? 'bg-pink-200 border-pink-500' : 'border-gray-300'
        }`}
        onClick={() => setFormData(prev => ({
          ...prev,
          intereses: { ...prev.intereses, tipoVivienda: item }
        }))}
      >
        {item}
      </button>
    ))}
  </div>
</div>

{/* Tiempo disponible */}
<div>
  <h4 className="font-semibold mb-2">Tiempo disponible para dedicar a la mascota</h4>
  <div className="flex flex-wrap gap-2">
    {['Pocas horas al día', 'Medio tiempo', 'Tiempo completo'].map((item) => (
      <button
        key={item}
        type="button"
        className={`border px-4 py-2 rounded-full ${
          formData.intereses.tiempoDisponible === item ? 'bg-pink-200 border-pink-500' : 'border-gray-300'
        }`}
        onClick={() => setFormData(prev => ({
          ...prev,
          intereses: { ...prev.intereses, tiempoDisponible: item }
        }))}
      >
        {item}
      </button>
    ))}
  </div>
</div>

      </div>

      {/* Botón Guardar */}
      <div className="flex justify-center mt-8">
        <button
          type="button"
          onClick={() => setShowModal(false)}
          className="bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 text-white font-semibold py-2 px-6 rounded-full"
                    >
          Guardar
            </button>
        </div>
        </div>
        </div>
    )}

    </section>
  );
}