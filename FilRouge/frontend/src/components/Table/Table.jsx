import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Table = ({ columns }) => {
  const [tableData, setTableData] = useState([]); // Renommé pour éviter le conflit
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/workspace/')
      .then((response) => {
        setTableData(response.data); // Utilisation de tableData ici
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données:', error);
        setError('Erreur lors de la récupération des données');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border border-gray-300 w-full text-left">
        <thead className="bg-gray-200">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="border border-gray-300 px-4 py-2">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((workspace, index) => (
            <tr key={index}>
              <td className="border border-gray-400 px-4 py-2">{workspace.idWorkspace}</td>
              <td className="border border-gray-400 px-4 py-2">{workspace.workspace_type}</td>
              <td className="border border-gray-400 px-4 py-2">{workspace.capacity}</td>
              <td className="border border-gray-400 px-4 py-2">{workspace.availability ? "Disponible" : "Indisponible"}</td>
              <td className="border border-gray-400 px-4 py-2">{workspace.day}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
