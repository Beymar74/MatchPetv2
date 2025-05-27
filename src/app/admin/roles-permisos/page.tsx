// src/app/admin/roles-permisos/page.tsx
'use client';

import React, { useState, useEffect } from 'react';

// Simulación de datos de usuarios con roles
const mockUsersWithRoles = [
  { id: 'user1', usuario: 'admin_user', role: 'admin' },
  { id: 'user2', usuario: 'refugio_user', role: 'refugio' },
  { id: 'user3', usuario: 'adoptante_user', role: 'adoptante' },
  { id: 'user4', usuario: 'guest_user', role: 'adoptante' }, // Otro adoptante
];

const RolesPermisosPage = () => {
  const [users, setUsers] = useState(mockUsersWithRoles);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // En un caso real, aquí cargarías los datos de los usuarios desde tu backend
  // useEffect(() => {
  //   const fetchUsersWithRoles = async () => {
  //     setLoading(true);
  //     try {
  //       // const response = await fetch('/api/admin/users-with-roles'); // Ejemplo de API route
  //       // const data = await response.json();
  //       // setUsers(data);
  //     } catch (err) {
  //       setError('Error al cargar los usuarios.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchUsersWithRoles();
  // }, []);

  const handleRoleChange = (userId: string, newRole: string) => {
    console.log(`Cambiar rol del usuario ${userId} a: ${newRole}`);
    // Aquí iría la lógica para llamar a tu backend y actualizar el rol del usuario
    // Después de la acción exitosa, podrías actualizar el estado 'users'
    setUsers(users.map(user =>
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const availableRoles = ['admin', 'refugio', 'adoptante']; // Roles disponibles (simulados)

  if (loading) {
    return <p>Cargando usuarios...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1 style={{ marginBottom: '20px', color: '#333' }}>Asignación de Roles y Permisos</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Usuario</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Rol Actual</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Cambiar Rol</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.usuario}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.role}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                  {availableRoles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RolesPermisosPage;