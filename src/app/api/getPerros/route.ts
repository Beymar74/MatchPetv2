import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const dogImageUrls: string[] = [];
    // Obtener 10 imágenes aleatorias de perros
    for (let i = 0; i < 10; i++) {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      if (!response.ok) {
        throw new Error(`Error HTTP! Estado: ${response.status}`);
      }
      const data = await response.json();
      dogImageUrls.push(data.message); // Extraer la URL de la imagen
    }
    return NextResponse.json(dogImageUrls, { status: 200 });
  } catch (error) {
    console.error('Error obteniendo imágenes de perros:', error);
    return NextResponse.json({ error: 'Error al obtener imágenes de perros.' }, { status: 500 });
  }
}
