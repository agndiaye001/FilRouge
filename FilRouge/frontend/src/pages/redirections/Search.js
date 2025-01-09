import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '../../components/Table/Table';
import { columns } from '../../constants/columns';

const Search = () => {
  const [data, setData] = useState([]); // Données récupérées de l'API
  const [loading, setLoading] = useState(true); // Etat de chargement
  const [error, setError] = useState(null); // Gérer les erreurs de l'API

  useEffect(() => {
    // Appel API pour récupérer les données
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        setData(response.data); // Mettre à jour les données récupérées
        setLoading(false); // Désactiver le chargement
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données:', error);
        setError('Erreur lors de la récupération des données'); // Mettre à jour l'erreur
        setLoading(false); // Désactiver le chargement
      });
  }, []);

  if (loading) {
    return <p>Chargement...</p>; // Afficher un message de chargement
  }

  if (error) {
    return <p>{error}</p>; // Afficher l'erreur en cas de problème
  }

  return (
    <div className='bg-gray-800 text-white'>
      <h1 className='text'>Espaces</h1>
      <p>Recherchez des espaces de travail ici.</p>
      <section>
        <Table columns={columns} data={data} /> {/* Utiliser les données récupérées */}
      </section>
    </div>
  );
};

export default Search;
