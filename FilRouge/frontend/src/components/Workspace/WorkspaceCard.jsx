import React from 'react';

const WorkspaceCard = ({ workspace, onReserve}) => {

  const { workspace_type, capacity, availability, description, day } = workspace;

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-semibold">{workspace_type}</h3>
      <p>{description || 'Pas de description disponible.'}</p>
      <p>Capacité : {capacity}</p>
      <p>Disponibilité : {availability ? 'Disponible' : 'Indisponible'}</p>
      <p>Jour : {day}</p>
      <button onClick={() => onReserve={onReserve}}>
        Réserver
      </button>
    </div>


  );
};

export default WorkspaceCard;
