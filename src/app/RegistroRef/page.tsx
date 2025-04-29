import React, { useEffect } from 'react';
import Header from '@/components/layout/Header';
import FormularioRegistroSection from './FormularioRegistroSection';
import { useRouter } from 'next/navigation';

export default function RegistroPage() {
  const router = useRouter();
  
  // Simulate successful registration (replace with your actual registration logic)
  const registrationSuccessful = true; 

  useEffect(() => {
    if (registrationSuccessful) {
      router.push("/");
    }
  }, [registrationSuccessful, router]);

  return (
    <div >
      {/* Header arriba */}
      <Header />
      {/* Formulario de registro */}
      {!registrationSuccessful && <FormularioRegistroSection />}
    </div>
  );
}