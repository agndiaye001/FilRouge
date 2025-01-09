import React, { useEffect, useState, navigate} from 'react';
import axios from 'axios';
import WorkspaceCard from '../../components/Workspace/WorkspaceCard';

const WorkspaceList = ({ columns }) => {
  const [data, setData] = useState([]); // Données récupérées de l'API
  const [loading, setLoading] = useState(true); // Etat de chargement
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("useEffect appelé");
    axios.get('http://127.0.0.1:8000/api/workspace/')
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données:', error);
        setError('Erreur lors de la récupération des données');
        setLoading(false);
      });
  }, []);

  const handleReserve = (idWorkspace) => {
    navigate(`/reserve/${idWorkspace}`);
  };
 


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader"></div> {/* Vous pouvez styliser cette "loader" selon vos besoins */}
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>; // Afficher l'erreur en cas de problème
  }

  return (
    <div className="overflow-x-auto bg-primary">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 py-8">
        {data.length === 0 ? (
          <p>Aucun espace de travail disponible.</p>
        ) : (
          data.map((workspace, index) => (
            <WorkspaceCard key={index} workspace={workspace} onReserve={handleReserve(workspace.id)} />
          ))
        )}
        
      </div>
    </div>
  );
};

export default WorkspaceList;
