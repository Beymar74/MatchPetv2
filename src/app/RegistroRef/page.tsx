import React from 'react';
import Header from '@/components/layout/Header';
import FormularioRegistroSection from './FormularioRegistroSection';

export default function RegistroPage() {
  return (
    <div >
      
      {/* Header arriba */}
      <Header />

      {/* Formulario de registro */}
      <FormularioRegistroSection />
    </div>
  );
}