import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const resolvedPath = path.join(process.cwd(), 'public', 'Adoptante'); // Ruta a la subcarpeta 'Adoptante' dentro de 'public'
  
  try {
    const files = fs.readdirSync(resolvedPath); // Leer los archivos en la subcarpeta 'Adoptante'
    return NextResponse.json(files, { status: 200 }); // Devuelve los nombres de los archivos
  } catch (error) {
    console.error('Error leyendo la carpeta:', error);
    return NextResponse.json({ error: 'Error al leer la carpeta.' }, { status: 500 });
  }
}
