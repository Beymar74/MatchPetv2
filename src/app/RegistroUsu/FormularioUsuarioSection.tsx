'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, XCircle } from 'lucide-react'; // Iconos
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'; // Componente de Alerta (asegúrate que la ruta sea correcta)
import { auth } from './firebase-config'; // Asegúrate de que el archivo de configuración esté correctamente importado
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Importa la función de Firebase Auth

export default function FormularioUsuarioSection() {
  // Estado combinado con todos los campos del segundo formulario
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    usuario: '', // Campo de usuario (distinto del email para autenticación)
    email: '', // Campo de email (usado para autenticación)
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

  // Estados del primer y segundo código
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(''); // Estado de error del primer código
  const [showModal, setShowModal] = useState(false); // Estado del modal del segundo código
  const [errorIntereses, setErrorIntereses] = useState(''); // Mantenido por si se usa en el futuro

  // Función handleChange genérica (del segundo código)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función handleFileChange (del segundo código)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, fotoPerfil: e.target.files[0] });
    }
  };

  // Función handleSubmit adaptada del PRIMER código para usar Firebase Auth
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Limpia errores previos

    // Validación de contraseñas (del primer código)
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    // Validar el formato de correo electrónico (del primer código, adaptado a campo 'email')
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Formato de correo inválido');
      return;
    }

    // Validación de contraseña (ejemplo: longitud mínima)
     if (formData.password.length < 6) {
       setError('La contraseña debe tener al menos 6 caracteres');
       return;
     }


    try {
      // Crear usuario con email y contraseña usando Firebase Auth (lógica del primer código, adaptada a campo 'email')
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      if (userCredential.user) {
        alert('Usuario registrado exitosamente');
        // Aquí podrías añadir lógica para guardar los datos adicionales (nombreCompleto, usuario, fechaNacimiento, intereses, etc.)
        // en Firestore u otra base de datos, asociándolos con el user.uid de userCredential.user.
        console.log('Usuario creado:', userCredential.user);
        // Podrías redirigir al usuario o limpiar el formulario
        // setFormData({ ...initialState }); // Necesitarías definir initialState
      }

    } catch (error: any) {
        // Manejo de errores de Firebase (del primer código)
        console.error("Error de Firebase:", error.code, error.message); // Log detallado para depuración
        if (error.code === 'auth/email-already-in-use') {
            setError('El correo electrónico ya está registrado.');
        } else if (error.code === 'auth/invalid-email') {
            setError('Formato de correo inválido.');
        } else if (error.code === 'auth/weak-password') {
            setError('La contraseña es demasiado débil. Debe tener al menos 6 caracteres.');
        }
        else {
            setError('Error al registrar usuario. Inténtalo de nuevo.'); // Mensaje genérico para el usuario
             // setError('Error al registrar usuario: ' + error.message); // Opción más detallada pero puede exponer info interna
        }
    }
  };

  // Función para cerrar la alerta de error (del primer código)
  const handleCloseError = () => {
    setError('');
  };

  // Variable para controlar la visibilidad del error (del primer código)
  const isErrorVisible = !!error;

  // Función para el modal (del segundo código, sin cambios)
   const toggleInterest = (group: keyof typeof formData.intereses, interest: string) => {
     setFormData((prev) => ({
       ...prev,
       intereses: {
         ...prev.intereses,
         // Lógica para permitir seleccionar solo uno por grupo en el modal
          [group]: interest, // Simplemente asigna el nuevo interés
        // Si quisieras deseleccionar al hacer clic de nuevo:
        // [group]: prev.intereses[group] === interest ? '' : interest,
      },
    }));
  };


  // --- JSX (estructura del segundo código, con la alerta de error del primero) ---
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Iniciar Registro</h2>
      <p className="text-gray-600 mb-10">MatchPet te espera!</p>

      {/* Mensaje de error (del primer código, movido arriba del form para mejor visibilidad) */}
      {isErrorVisible && (
        <Alert variant="destructive" className="mb-6 w-full max-w-4xl bg-red-50 border-red-400">
           <XCircle className="h-5 w-5 text-red-500" /> {/* Ajuste de estilo opcional */}
           <AlertTitle className='text-red-700 font-semibold'>Error</AlertTitle> {/* Ajuste de estilo opcional */}
           <AlertDescription className='text-red-600'> {/* Ajuste de estilo opcional */}
               {error}
           </AlertDescription>
           {/* Botón para cerrar explícitamente si lo deseas, aunque el error se limpia en el siguiente submit */}
           {/* <button onClick={handleCloseError} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
               <XCircle size={18} />
           </button> */}
       </Alert>
      )}

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
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Ingrese su nombre completo"
              required
            />
          </div>

          {/* Fecha de Nacimiento */}
          <div>
            <label className="block text-gray-600 mb-2">Fecha de Cumpleaños</label>
            <div className="flex gap-2">
              <input
                type="number" // Usar number para validación básica
                name="diaNacimiento"
                value={formData.diaNacimiento}
                onChange={handleChange}
                className="w-1/3 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                placeholder="Día"
                min="1"
                max="31"
                required
              />
              <input
                type="number"
                name="mesNacimiento"
                value={formData.mesNacimiento}
                onChange={handleChange}
                className="w-1/3 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                placeholder="Mes"
                min="1"
                max="12"
                required
              />
              <input
                 type="number"
                 name="añoNacimiento"
                 value={formData.añoNacimiento}
                 onChange={handleChange}
                 className="w-1/3 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                 placeholder="Año"
                 min="1920" // Ejemplo de mínimo
                 max={new Date().getFullYear() - 18} // Ejemplo: Mayor de 18
                 required
              />
            </div>
          </div>

          {/* Usuario (Username) */}
          <div>
            <label className="block text-gray-600 mb-2">Nombre de Usuario</label>
            <input
              type="text"
              name="usuario" // Este es el nombre de usuario, no el email para login
              value={formData.usuario}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Elija un nombre de usuario"
              required
            />
          </div>

          {/* Sexo */}
          <div>
            <label className="block text-gray-600 mb-2">Sexo</label>
            <div className="flex gap-2">
              <button
                type="button"
                className={`w-1/2 border rounded px-3 py-2 transition-colors ${formData.sexo === 'Femenino' ? 'bg-pink-100 border-pink-400 text-pink-700' : 'border-gray-300 hover:bg-gray-100'}`}
                onClick={() => setFormData({ ...formData, sexo: 'Femenino' })}
              >
                Femenino
              </button>
              <button
                type="button"
                className={`w-1/2 border rounded px-3 py-2 transition-colors ${formData.sexo === 'Masculino' ? 'bg-blue-100 border-blue-400 text-blue-700' : 'border-gray-300 hover:bg-gray-100'}`}
                onClick={() => setFormData({ ...formData, sexo: 'Masculino' })}
              >
                Masculino
              </button>
            </div>
          </div>

          {/* Email (para autenticación) */}
          <div>
            <label className="block text-gray-600 mb-2">Email</label>
            <input
              type="email" // Tipo email para validación de navegador
              name="email" // Usado para Firebase Auth
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
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
                className={`w-1/2 border rounded px-3 py-2 transition-colors ${formData.preferenciaMascota === 'Gatos' ? 'bg-purple-100 border-purple-400 text-purple-700' : 'border-gray-300 hover:bg-gray-100'}`}
                onClick={() => setFormData({ ...formData, preferenciaMascota: 'Gatos' })}
              >
                Gatos 🐱
              </button>
              <button
                type="button"
                className={`w-1/2 border rounded px-3 py-2 transition-colors ${formData.preferenciaMascota === 'Perros' ? 'bg-yellow-100 border-yellow-400 text-yellow-700' : 'border-gray-300 hover:bg-gray-100'}`}
                onClick={() => setFormData({ ...formData, preferenciaMascota: 'Perros' })}
              >
                Perros 🐶
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
              className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Ingrese una contraseña (mín. 6 caracteres)"
              required
              minLength={6} // Añade validación HTML básica
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"> {/* Ajuste de top si es necesario */}
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
              className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Confirme su contraseña"
              required
               minLength={6}
            />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"> {/* Ajuste de top si es necesario */}
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Añadir intereses */}
          <div className="md:col-span-2">
            <label className="block text-gray-600 mb-2">Preferencias de Mascota:</label>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-100 transition-colors text-gray-700"
            >
              ➕ Añadir Preferencias
            </button>

            {/* Mostrar intereses seleccionados */}
            <div className="flex flex-wrap gap-2 mt-4">
              {Object.entries(formData.intereses)
                .filter(([_, value]) => value !== '') // Solo mostrar los que estén seleccionados
                .map(([key, value]) => (
                  <span key={key} className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                    {/* Opcional: Mostrar clave y valor o solo valor */}
                    {/* {`${key.replace(/([A-Z])/g, ' $1')}: ${value}`} */}
                     {value}
                  </span>
                ))}
             </div>

            {/* Mensaje de error de intereses (si se necesita validación específica aquí) */}
            {errorIntereses && <p className="text-red-500 text-sm mt-2">{errorIntereses}</p>}
          </div>

          {/* Añadir foto */}
          <div className="md:col-span-2">
            <label className="block text-gray-600 mb-2">Añade tu foto de perfil (Opcional)</label>
            <div className="flex items-center gap-4">
                {/* Input de archivo oculto */}
                <input
                    type="file"
                    id="fileInput" // ID para el label
                    onChange={handleFileChange}
                    className="hidden" // Ocultar el input por defecto
                    accept="image/png, image/jpeg, image/webp" // Aceptar tipos comunes
                 />
                 {/* Botón personalizado para seleccionar archivo */}
                 <label
                    htmlFor="fileInput" // Asocia el label con el input
                    className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center transition-colors"
                 >
                     Seleccionar Archivo
                 </label>

                 {/* Mostrar nombre del archivo seleccionado o vista previa */}
                 {formData.fotoPerfil ? (
                    <div className='flex items-center gap-2'>
                        <img
                            src={URL.createObjectURL(formData.fotoPerfil)}
                            alt="Vista previa"
                            className="h-10 w-10 rounded-full object-cover"
                        />
                        <span className="text-gray-700 text-sm">{formData.fotoPerfil.name}</span>
                        {/* Botón para remover foto */}
                         <button
                            type="button"
                            onClick={() => setFormData({...formData, fotoPerfil: null})}
                            className="text-red-500 hover:text-red-700 ml-2"
                            title="Eliminar foto"
                         >
                            <XCircle size={18} />
                         </button>
                    </div>
                ) : (
                    <span className="text-gray-500 text-sm">Ningún archivo seleccionado</span>
                )}
             </div>
          </div>
        </div> {/* Fin del grid */}

        {/* Botón Registrarme */}
        <div className="mt-8 flex flex-col items-center">
          <button type="submit" className="bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 text-white font-semibold py-3 px-8 rounded-full transition-transform transform hover:scale-105 shadow-md">
            Registrarme
          </button>
          <p className="text-sm mt-4 text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <a href="/login" className="text-pink-500 hover:underline font-medium">Iniciar Sesión</a>
          </p>
        </div>
      </form>

      {/* --- Modal de intereses (del segundo código, sin cambios funcionales internos) --- */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
            <h3 className="text-2xl font-semibold mb-4 text-center text-gray-800">Define tus Preferencias</h3>
             {/* <p className="text-gray-500 text-center mb-6">Selecciona una opción para cada categoría.</p> */}

             {/* CADA GRUPO */}
            <div className="flex flex-col gap-6">

              {/* Tamaño preferido */}
              <div>
                 <h4 className="font-semibold mb-2 text-gray-700">Tamaño preferido</h4>
                 <div className="flex flex-wrap gap-2">
                   {['Pequeño', 'Mediano', 'Grande'].map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={`border px-4 py-2 rounded-full transition-colors text-sm ${
                        formData.intereses.tamanoPreferido === item ? 'bg-pink-500 text-white border-pink-500 shadow-md' : 'border-gray-300 hover:bg-pink-100 hover:border-pink-300'
                      }`}
                      onClick={() => toggleInterest('tamanoPreferido', item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Edad preferida */}
              <div>
                 <h4 className="font-semibold mb-2 text-gray-700">Edad preferida</h4>
                 <div className="flex flex-wrap gap-2">
                   {['Cachorro', 'Joven', 'Adulto', 'Senior'].map((item) => ( // Añadido Senior
                    <button
                      key={item}
                      type="button"
                      className={`border px-4 py-2 rounded-full transition-colors text-sm ${
                        formData.intereses.edadPreferida === item ? 'bg-pink-500 text-white border-pink-500 shadow-md' : 'border-gray-300 hover:bg-pink-100 hover:border-pink-300'
                      }`}
                      onClick={() => toggleInterest('edadPreferida', item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nivel de energía */}
              <div>
                 <h4 className="font-semibold mb-2 text-gray-700">Nivel de energía</h4>
                 <div className="flex flex-wrap gap-2">
                   {['Tranquilo', 'Moderado', 'Muy Activo'].map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={`border px-4 py-2 rounded-full transition-colors text-sm ${
                        formData.intereses.nivelEnergia === item ? 'bg-pink-500 text-white border-pink-500 shadow-md' : 'border-gray-300 hover:bg-pink-100 hover:border-pink-300'
                      }`}
                       onClick={() => toggleInterest('nivelEnergia', item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Compatibilidad con niños */}
              <div>
                 <h4 className="font-semibold mb-2 text-gray-700">Compatibilidad con niños</h4>
                 <div className="flex flex-wrap gap-2">
                   {['Sí', 'No', 'Indiferente'].map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={`border px-4 py-2 rounded-full transition-colors text-sm ${
                        formData.intereses.compatibilidadNinos === item ? 'bg-pink-500 text-white border-pink-500 shadow-md' : 'border-gray-300 hover:bg-pink-100 hover:border-pink-300'
                      }`}
                      onClick={() => toggleInterest('compatibilidadNinos', item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Compatibilidad con otras mascotas */}
              <div>
                 <h4 className="font-semibold mb-2 text-gray-700">Compatibilidad con otras mascotas</h4>
                 <div className="flex flex-wrap gap-2">
                 {/* Opciones más claras */}
                   {['Bien con perros', 'Bien con gatos', 'Bien con ambos', 'Mejor solo', 'No importante'].map((item) => (
                     <button
                      key={item}
                      type="button"
                       className={`border px-4 py-2 rounded-full transition-colors text-sm ${
                         formData.intereses.compatibilidadMascotas === item ? 'bg-pink-500 text-white border-pink-500 shadow-md' : 'border-gray-300 hover:bg-pink-100 hover:border-pink-300'
                       }`}
                       onClick={() => toggleInterest('compatibilidadMascotas', item)}
                     >
                       {item}
                     </button>
                   ))}
                 </div>
               </div>


               {/* Tipo de vivienda */}
               <div>
                 <h4 className="font-semibold mb-2 text-gray-700">Tipo de vivienda</h4>
                 <div className="flex flex-wrap gap-2">
                   {['Casa con patio', 'Departamento pequeño', 'Departamento grande', 'Casa rural'].map((item) => (
                     <button
                       key={item}
                       type="button"
                       className={`border px-4 py-2 rounded-full transition-colors text-sm ${
                         formData.intereses.tipoVivienda === item ? 'bg-pink-500 text-white border-pink-500 shadow-md' : 'border-gray-300 hover:bg-pink-100 hover:border-pink-300'
                       }`}
                       onClick={() => toggleInterest('tipoVivienda', item)}
                     >
                       {item}
                     </button>
                   ))}
                 </div>
               </div>

               {/* Tiempo disponible */}
               <div>
                 <h4 className="font-semibold mb-2 text-gray-700">Tiempo disponible para dedicar</h4>
                 <div className="flex flex-wrap gap-2">
                   {['Pocas horas al día', 'Medio tiempo', 'Tiempo completo'].map((item) => (
                     <button
                       key={item}
                       type="button"
                       className={`border px-4 py-2 rounded-full transition-colors text-sm ${
                         formData.intereses.tiempoDisponible === item ? 'bg-pink-500 text-white border-pink-500 shadow-md' : 'border-gray-300 hover:bg-pink-100 hover:border-pink-300'
                       }`}
                      onClick={() => toggleInterest('tiempoDisponible', item)}
                     >
                       {item}
                     </button>
                   ))}
                 </div>
               </div>

             </div> {/* Fin del contenedor de grupos */}

             {/* Botón Guardar */}
            <div className="flex justify-center mt-8">
              <button
                type="button"
                 // Aquí podrías añadir validación antes de cerrar si es necesario
                 // Por ejemplo, verificar que se haya seleccionado al menos una opción por categoría si fuera un requisito.
                onClick={() => setShowModal(false)}
                className="bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 text-white font-semibold py-2 px-6 rounded-full transition-transform transform hover:scale-105 shadow-md"
              >
                Guardar Preferencias
              </button>
            </div>
          </div>
        </div>
      )} {/* Fin del Modal */}

    </section>
  );
}