import React from 'react';
import Header from '@/components/layout/Header';
import FormularioUsuarioSection from './FormularioUsuarioSection';

export default function RegistroPage() {
  return (
    <div >
      {/* Header arriba */}
      <Header />

      {/* Formulario de registro */}
      <FormularioUsuarioSection />
    </div>
  );
}