import React, { useState } from 'react';
import Sidebar from './Sidebar';
import AdminHeader from './AdminHeader';

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Alice Brown', email: 'alice@example.com', role: 'Manager' },
  ];

  return (
    <div className="flex h-screen relative bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4 mt-20 absolute left-0 top-0 h-screen">
        <Sidebar />
      </div>

      {/* Contenu principal */}
      <div className="flex flex-col w-full ml-64">
        {/* Header */}
        <AdminHeader />

        {/* Tableau des utilisateurs */}
        <div className="flex-1 p-4 overflow-auto">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Liste des utilisateurs</h2>
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">ID</th>
                  <th className="px-4 py-2 border-b">Nom</th>
                  <th className="px-4 py-2 border-b">Email</th>
                  <th className="px-4 py-2 border-b">Rôle</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr key={row.id}>
                    <td className="px-4 py-2 border-b">{row.id}</td>
                    <td className="px-4 py-2 border-b">{row.name}</td>
                    <td className="px-4 py-2 border-b">{row.email}</td>
                    <td className="px-4 py-2 border-b">{row.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
