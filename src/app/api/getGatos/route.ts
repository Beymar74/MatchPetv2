import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const resolvedPath = path.join(process.cwd(), 'public'); // Ruta al directorio 'public'

  try {
    const files = getFileNames(resolvedPath);
    const filteredFiles = filterFilesByPrefix(files, 'Gato'); // Filtrar solo los archivos que empiezan con 'Gato'
    return NextResponse.json(filteredFiles, { status: 200 });
  } catch (error) {
    console.error('Error leyendo la carpeta:', error);
    return NextResponse.json({ error: 'Error al leer la carpeta.' }, { status: 500 });
  }
}

function getFileNames(folderPath: string): string[] {
  try {
    const files = fs.readdirSync(folderPath);
    return files;
  } catch (error) {
    console.error('Error leyendo la carpeta:', error);
    throw error;
  }
}

function filterFilesByPrefix(files: string[], prefix: string): string[] {
  return files.filter(file => file.startsWith(prefix)); // Filtrar por prefijo
}
