'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
// import { signInWithEmailAndPassword } from 'firebase/auth'; // Importa las funciones necesarias para el login
// import { auth } from '../../../firebase-config'; // Asegúrate de importar la configuración de Firebase
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showLoginError, setShowLoginError] = useState<boolean>(false);

  const router = useRouter();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);
    setPasswordError(null);
    setLoginError(null);
    setShowLoginError(false);

    if (!email) {
      setEmailError("El campo es obligatorio");
    }
    if (!password) {
      setPasswordError("El campo es obligatorio");
    }
    if (email && !validateEmail(email)) {
      setEmailError("Formato de correo inválido");
    }

    if (!email || !password || !validateEmail(email)) return;

    // Commenting out Firebase login logic for design purposes
    // try {
    //   const userCredential = await signInWithEmailAndPassword(auth, email, password);
    //   if (userCredential?.user) {
    //     console.log('Usuario logueado:', userCredential.user);
    //     router.push("/");
    //   }

    // } catch (error) {
    //   setShowLoginError(true);
    //   if (typeof error === 'object' && error !== null && 'code' in error) {
    //     if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
    //       setLoginError('Credenciales no válidas');
    //     } else {
    //       setLoginError('Error al iniciar sesión');
    //     }
    //   } else {
    //     setLoginError('Error al iniciar sesión')
    //     setShowLoginError(true)
    //   }
    // }
    console.log('Formulario de login enviado (Firebase deshabilitado)');

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Iniciar Sesión</h1>
          <p className="text-gray-600">Bienvenido de nuevo a MatchPet</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Correo Electrónico
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="tu@email.com"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#30588C] focus:border-[#30588C]"
            />
              {emailError && (
                <Alert className="bg-red-100 border-red-400 mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500">
                    <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.598 4.5H4.645c-2.309 0-3.752-2.5-2.597-4.5L9.401 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                  </svg>
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    {emailError}
                  </AlertDescription>
                </Alert>
              )}
          </div>

          <div>
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              Contraseña
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#30588C] focus:border-[#30588C]"
            />
            {passwordError && (
                <Alert className="bg-red-100 border-red-400 mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500">
                    <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.598 4.5H4.645c-2.309 0-3.752-2.5-2.597-4.5L9.401 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                  </svg>
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    {passwordError}
                  </AlertDescription>
                </Alert>
              )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <Link href="#" className="text-sm text-[#30588C] hover:text-[#BF3952] hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {showLoginError && (
            <Alert className="bg-red-100 border-red-400 mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500">
                <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.598 4.5H4.645c-2.309 0-3.752-2.5-2.597-4.5L9.401 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
              </svg>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {loginError}
              </AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#BF3952] to-[#30588C] hover:from-[#a53147] hover:to-[#254559] text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BF3952]"
          >
            Iniciar Sesión
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600">
          ¿No tienes cuenta?{' '}
          <Link href="/register" className="font-medium text-[#30588C] hover:text-[#BF3952] hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
