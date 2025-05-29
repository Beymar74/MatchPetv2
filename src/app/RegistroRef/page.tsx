'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import FormularioRegistroSection from './FormularioRegistroSection';
import { useRouter } from 'next/navigation';

export default function RegistroPage() {
  const router = useRouter();
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);

  useEffect(() => {
    if (registrationSuccessful) {
      // Redirigir al inicio tras registro exitoso
      router.push('/');
    }
  }, [registrationSuccessful, router]);

  return (
    <div>
      {/* Encabezado */}
      <Header />
      
      {/* Formulario visible solo si no se ha registrado */}
      {!registrationSuccessful && (
        <FormularioRegistroSection onRegisterSuccess={() => setRegistrationSuccessful(true)} />
      )}
    </div>
  );
}
