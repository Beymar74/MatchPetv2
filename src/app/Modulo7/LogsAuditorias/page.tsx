// src/app/Modulo7/LogsAuditorias/page.tsx
"use client";

import React, { useState } from "react";
import HeaderAdoptante from "@/components/AdoptanteLayout/HeaderAdoptante";

const logsFicticios = [
  { id: 1, usuario: "admin01", accion: "Editó mascota", tipo: "Mascota", fecha: "2025-05-30", hora: "10:15" },
  { id: 2, usuario: "refugio02", accion: "Registró adopción", tipo: "Adopción", fecha: "2025-05-30", hora: "10:25" },
  { id: 3, usuario: "usuarioX", accion: "Actualizó perfil", tipo: "Cuenta", fecha: "2025-05-29", hora: "21:12" },
];

const tipos = ["Todos", "Adopción", "Mascota", "Cuenta"];

export default function LogsAuditorias() {
  const [tipoSeleccionado, setTipoSeleccionado] = useState("Todos");

  const filtrados = logsFicticios.filter(log =>
    tipoSeleccionado === "Todos" || log.tipo === tipoSeleccionado
  );

  return (
    <>
      <HeaderAdoptante />
      <div className="max-w-6xl mx-auto mt-6 p-4 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-[#A672E3] text-center mb-4">Historial de Auditorías</h2>

        {/* Filtros */}
        <div className="flex gap-4 mb-4 justify-end">
          <select
            value={tipoSeleccionado}
            onChange={(e) => setTipoSeleccionado(e.target.value)}
            className="border px-3 py-1 rounded"
          >
            {tipos.map((tipo, i) => (
              <option key={i} value={tipo}>{tipo}</option>
            ))}
          </select>
        </div>

        {/* Tabla */}
        <table className="w-full text-sm text-left border border-gray-300">
          <thead className="bg-[#FDCBFA] text-[#333]">
            <tr>
              <th className="p-2 border">Usuario</th>
              <th className="p-2 border">Acción</th>
              <th className="p-2 border">Tipo</th>
              <th className="p-2 border">Fecha</th>
              <th className="p-2 border">Hora</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="p-2 border">{log.usuario}</td>
                <td className="p-2 border">{log.accion}</td>
                <td className="p-2 border">
                  <span className={`px-2 py-1 rounded-full text-white text-xs ${log.tipo === "Adopción" ? "bg-green-500" : log.tipo === "Mascota" ? "bg-purple-500" : "bg-blue-500"}`}>
                    {log.tipo}
                  </span>
                </td>
                <td className="p-2 border">{log.fecha}</td>
                <td className="p-2 border">{log.hora}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
