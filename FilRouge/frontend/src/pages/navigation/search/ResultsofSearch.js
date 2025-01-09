import React from 'react';
import { useLocation } from 'react-router-dom';
import WorkspaceCard from '../../../components/Workspace/WorkspaceCard';

const ResultsofSearch = () => {

    // Récupérer les données passées
    const location = useLocation();
    // Récupérer les résultats ou une valeur par défaut
    const { results } = location.state || {};

    return (
        <div className="p-4">
            <div className="p-4 bg-gray-800">
                <h1 className="text-2xl text-white font-semibold">Résultats de la recherche</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 py-8">
                {results && results.length > 0 ? (
                    results.map((workspace, index) => (
                        <WorkspaceCard key={index} workspace={workspace} />
                    ))
                ) : (
                    <p>Aucun résultat trouvé.</p>
                )}
            </div>
        </div>
    );
};

export default ResultsofSearch;
