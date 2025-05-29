'use client';

import Link from 'next/link';
import HeaderAdoptante from '@/components/AdoptanteLayout/HeaderAdoptante';
import FooterAdoptante from '@/components/AdoptanteLayout/FooterAdoptante';

const DashboardModulo7 = () => {
  const secciones = [
    { nombre: 'Comparativa de Adopciones', ruta: '/Modulo7/ComparativaAdopciones' },
    { nombre: 'Evolución Histórica', ruta: '/Modulo7/EvolucionHistorica' },
    { nombre: 'Actividad por Región', ruta: '/Modulo7/ActividadRegion' },
    { nombre: 'Favoritos Frecuentes', ruta: '/Modulo7/FavoritosFrecuentes' },
    { nombre: 'Exportación de Reportes', ruta: '/Modulo7/ExportacionReportes' },
    { nombre: 'Vista Previa de Reporte', ruta: '/Modulo7/VistapreviaReporte' },
    { nombre: 'Logs y Auditorías', ruta: '/Modulo7/LogsAuditorias' },
  ];

  return (
    <>
      <HeaderAdoptante />

      <main className="min-h-screen bg-white p-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-pink-600">Reportes y Estadísticas</h1>
          <p className="mt-2 text-gray-600">Accede a herramientas para analizar y exportar datos importantes del sistema.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {secciones.map((sec, index) => (
            <Link
              key={index}
              href={sec.ruta}
              className="block bg-gray-100 hover:bg-pink-100 transition-all duration-200 rounded-xl shadow-md hover:shadow-xl p-6 border border-pink-200 hover:border-pink-400"
            >
              <h2 className="text-xl font-semibold text-pink-800 mb-2">{sec.nombre}</h2>
              <p className="text-gray-500 text-sm">Ver detalles, gráficas y opciones de exportación.</p>
            </Link>
          ))}
        </div>
      </main>

      <FooterAdoptante />
    </>
  );
};

export default DashboardModulo7;
