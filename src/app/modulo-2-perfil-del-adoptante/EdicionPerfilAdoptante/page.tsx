"use client";

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { es } from 'date-fns/locale';

const EdicionPerfilAdoptante: React.FC = () => {
  const [profileData, setProfileData] = useState({
    fullName: '',
    dateOfBirth: null as Date | null,
    address: '',
    phoneNumber: '',
    lifestyleInfo: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setProfileData(prev => ({
      ...prev,
      dateOfBirth: date,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving profile data:', profileData);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-10">
      <h2 className="text-2xl font-bold text-[#30588C] mb-6">Edición de Perfil del Adoptante</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={profileData.fullName}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-[#BF3952] focus:border-[#BF3952] focus:outline-none"
            placeholder="Ej. Juan Pérez"
          />
        </div>

        {/* Fecha de nacimiento */}
        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
          <DatePicker
            id="dateOfBirth"
            locale={es}
            selected={profileData.dateOfBirth}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Seleccionar fecha"
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            className="w-full mt-1 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-[#BF3952] focus:border-[#BF3952]"
          />
        </div>

        {/* Dirección */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Dirección</label>
          <input
            type="text"
            id="address"
            name="address"
            value={profileData.address}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-[#BF3952] focus:border-[#BF3952] focus:outline-none"
            placeholder="Ej. Calle Falsa 123, La Paz"
          />
        </div>

        {/* Teléfono */}
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Número de Teléfono</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={profileData.phoneNumber}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-[#BF3952] focus:border-[#BF3952] focus:outline-none"
            placeholder="Ej. 71234567"
          />
        </div>

        {/* Estilo de vida */}
        <div>
          <label htmlFor="lifestyleInfo" className="block text-sm font-medium text-gray-700">Información del Estilo de Vida</label>
          <textarea
            id="lifestyleInfo"
            name="lifestyleInfo"
            value={profileData.lifestyleInfo}
            onChange={handleInputChange}
            rows={4}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-[#BF3952] focus:border-[#BF3952] focus:outline-none"
            placeholder="Describe tu rutina, tiempo disponible, si tienes patio, etc."
          />
        </div>

        {/* Botón */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#BF3952] text-white font-semibold px-6 py-2 rounded-md hover:bg-[#a32e45] transition"
          >
            Guardar Perfil
          </button>
        </div>
      </form>
    </div>
  );
};

export default EdicionPerfilAdoptante;
