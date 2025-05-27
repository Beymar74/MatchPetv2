"use client";

import Link from 'next/link';

const HeaderAdoptante = () => {
  return (
    <div className="bg-gray-100 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold">Bienvenido</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/adoptante/editar-perfil" className="text-gray-600 hover:text-blue-500">
                Editar Perfil
              </Link>
            </li>
            <li>
              <Link href="/adoptante/historial-solicitudes" className="text-gray-600 hover:text-blue-500">
                Historial de Solicitudes
              </Link>
            </li>
            <li>
              <Link href="/adoptante/preferencias-adopcion" className="text-gray-600 hover:text-blue-500">
                Preferencias de Adopción
              </Link>
            </li>
            <li>
              <Link href="/adoptante/verificacion-documentos" className="text-gray-600 hover:text-blue-500">
                Verificación de Documentos
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <Link href="/" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cerrar Sesión</Link>
    </div>
  );
};

export default HeaderAdoptante;