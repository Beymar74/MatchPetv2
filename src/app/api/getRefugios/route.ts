import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const resolvedPath = path.join(process.cwd(), 'public', 'Refugios'); // Ruta a la subcarpeta 'Refugios' dentro de 'public'
  
  try {
    const files = fs.readdirSync(resolvedPath); // Leer los archivos en la subcarpeta 'Refugios'
    return NextResponse.json(files, { status: 200 });
  } catch (error) {
    console.error('Error leyendo la carpeta:', error);
    return NextResponse.json({ error: 'Error al leer la carpeta.' }, { status: 500 });
  }
}
