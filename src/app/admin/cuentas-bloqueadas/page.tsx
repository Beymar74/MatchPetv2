// src/app/admin/cuentas-bloqueadas/page.tsx
'use client';

import React, { useState, useEffect } from 'react';

interface Account {
  id: string;
  usuario: string;
  estado: 'Bloqueada' | 'Inactiva';
  fecha: string;
}

// Simulación de datos de cuentas bloqueadas/inactivas
const mockAccounts: Account[] = [
  { id: '1', usuario: 'usuario1', estado: 'Bloqueada', fecha: '2023-10-26' },
  { id: '2', usuario: 'usuario2', estado: 'Inactiva', fecha: '2023-09-15' },
  { id: '3', usuario: 'usuario3', estado: 'Bloqueada', fecha: '2023-11-01' },
];

const CuentasBloqueadasPage = () => {
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // En un caso real, aquí cargarías los datos de las cuentas desde tu backend
  // useEffect(() => {
  //   const fetchAccounts = async () => {
  //     setLoading(true);
  //     try {
  //       // const response = await fetch('/api/admin/cuentas-bloqueadas'); // Ejemplo de API route
  //       // const data = await response.json();
  //       // setAccounts(data);
  //     } catch (err) {
  //       // setError('Error al cargar las cuentas.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchAccounts();
  // }, []);

  const handleAction = (accountId: string, action: 'desbloquear' | 'activar') => {
    console.log(`Realizar acción "${action}" en cuenta con ID: ${accountId}`);
    // Aquí iría la lógica para llamar a tu backend y realizar la acción
    // Después de la acción exitosa, podrías actualizar el estado 'accounts'
    // Ejemplo: setAccounts(accounts.filter(account => account.id !== accountId)); // Simular eliminación o cambio de estado
  };

  if (loading) {
    return <p>Cargando cuentas...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1 style={{ marginBottom: '20px', color: '#333' }}>Gestión de Cuentas Bloqueadas/Inactivas</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Usuario</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Estado</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Fecha</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map(account => (
            <tr key={account.id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{account.usuario}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{account.estado}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{account.fecha}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                {account.estado === 'Bloqueada' && (
                  <button
                    onClick={() => handleAction(account.id, 'desbloquear')}
                    style={{ backgroundColor: '#28a745', color: '#fff', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '5px' }}
                  >
                    Desbloquear
                  </button>
                )}
                {account.estado === 'Inactiva' && (
                   <button
                    onClick={() => handleAction(account.id, 'activar')}
                    style={{ backgroundColor: '#007bff', color: '#fff', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Activar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CuentasBloqueadasPage;