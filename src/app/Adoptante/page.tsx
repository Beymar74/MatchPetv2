"use client";

import React from 'react';
import Image from 'next/image';
import HeaderAdoptante from '@/components/AdoptanteLayout/HeaderAdoptante';
import FooterAdoptante from '@/components/AdoptanteLayout/FooterAdoptante';

const AdoptantePage: React.FC = () => {
  // Mock user name for demonstration purposes
  const userName = "Usuario Adoptante";

  return (
    // Main container for the entire page
    <div className="bg-gray-100 min-h-screen">
      <HeaderAdoptante />
      {/* Content container */}
      <div className="container mx-auto py-10 px-4">
        {/* Welcome message */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Bienvenido, <span className="text-purple-600">{userName}</span>!
          </h1>
        </div>
         {/* Selection Section */}
         <div className="flex justify-center space-x-4 mb-8">
          {/* Button for cats */}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
          <Image
              src="/lindo gatito.jpg"
              alt="Imagen de un gato"
              width={50}
              height={50}
              className="mr-2 rounded-full"
            /> Gatos
          </button>
           {/* Button for dogs */}
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center">
          <Image
              src="/perros pug.jpg"
              alt="Imagen de un perro"
              width={50}
              height={50}
              className="mr-2 rounded-full" /> Perros
          </button>
        </div>
      </div>
      {/* Footer */}
      <FooterAdoptante />
    </div>
  );
};

export default AdoptantePage;