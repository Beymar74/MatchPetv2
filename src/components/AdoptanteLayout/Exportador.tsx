// components/Exportador.tsx
"use client";

import React from "react";
import { utils, writeFile } from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const reportes = [
  {
    nombre: "Adopciones por Mes",
    datos: [
      { mes: "Enero", total: 25 },
      { mes: "Febrero", total: 32 },
      { mes: "Marzo", total: 40 },
    ],
  },
  {
    nombre: "Mascotas Favoritas",
    datos: [
      { nombre: "Luna", tipo: "Perro", favoritos: 82 },
      { nombre: "Max", tipo: "Gato", favoritos: 75 },
    ],
  },
];

export default function Exportador() {
  const exportarExcel = (datos: any[], nombreArchivo: string) => {
    const hoja = utils.json_to_sheet(datos);
    const libro = utils.book_new();
    utils.book_append_sheet(libro, hoja, "Reporte");
    writeFile(libro, `${nombreArchivo}.xlsx`);
  };

  const exportarPDF = (datos: any[], nombreArchivo: string) => {
    const doc = new jsPDF();
    doc.text(nombreArchivo, 14, 16);
    // @ts-ignore
    doc.autoTable({ head: [Object.keys(datos[0])], body: datos.map(obj => Object.values(obj)) });
    doc.save(`${nombreArchivo}.pdf`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-6">
      <h2 className="text-2xl font-bold text-center text-[#A672E3] mb-6">Exportación de Reportes</h2>
      {reportes.map((reporte, idx) => (
        <div key={idx} className="mb-8">
          <h3 className="text-lg font-semibold text-[#4EDCD8] mb-2">{reporte.nombre}</h3>
          <table className="w-full table-auto text-left border border-gray-200 mb-2">
            <thead>
              <tr className="bg-[#FDCBFA] text-[#333]">
                {Object.keys(reporte.datos[0]).map((key, index) => (
                  <th key={index} className="px-3 py-2 border-b border-gray-300">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reporte.datos.map((fila, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  {Object.values(fila).map((valor, j) => (
                    <td key={j} className="px-3 py-2 border-b border-gray-200">{valor}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex gap-4">
            <button
              onClick={() => exportarExcel(reporte.datos, reporte.nombre)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Exportar Excel
            </button>
            <button
              onClick={() => exportarPDF(reporte.datos, reporte.nombre)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Exportar PDF
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
