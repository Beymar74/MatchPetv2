import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Iniciar Sesión</h1>
          <p className="text-gray-600">
            Bienvenido de nuevo a MatchPet
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Correo Electrónico</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="tu@email.com"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#30588C] focus:border-[#30588C]"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">Contraseña</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#30588C] focus:border-[#30588C]"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
             <Link href="#" className="text-sm text-[#30588C] hover:text-[#BF3952] hover:underline">
              ¿Olvidaste tu contraseña?
             </Link>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#BF3952] to-[#30588C] hover:from-[#a53147] hover:to-[#254559] text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BF3952]"
          >
            Iniciar Sesión
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600">
          ¿No tienes cuenta?{' '}
          <Link href="/register" className="font-medium text-[#30588C] hover:text-[#BF3952] hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
