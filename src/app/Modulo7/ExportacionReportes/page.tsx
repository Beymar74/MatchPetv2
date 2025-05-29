// src/app/Modulo7/ExportacionReportes/page.tsx
"use client";

import dynamic from "next/dynamic";
import HeaderAdoptante from "@/components/AdoptanteLayout/HeaderAdoptante";

// Carga dinámica solo en cliente
const Exportador = dynamic(() => import("@/components/AdoptanteLayout/Exportador"), {
  ssr: false,
});

export default function ExportacionReportesPage() {
  return (
    <>
      <HeaderAdoptante />
      <Exportador />
    </>
  );
}
