import React from 'react';
import SearchBarHome from '../../pages/navigation/search/SearchBarHome';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Bienvenue sur WorkspaceHub</h1>
        <p className="text-lg ">
          Trouvez l'espace de travail parfait pour vos besoins professionnels.
        </p>
        <div className="text-center px-5">
          <SearchBarHome />
        </div>
        <button
          onClick={() => window.location.href = '/usertypes/signup'}
          className="bg-blue-600 hover:bg-primaryHover text-white font-semibold  mr-4 py-2 px-6 rounded-lg shadow-md transition duration-300"
        >
          Rejoindre maintenant
        </button>
        <button
          onClick={() => window.location.href = '/usertypes/signup'}
          className="hover:bg-primaryHover text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
        >
          Voir nos abonnements
        </button>
      </div>
    </header>

  );
};

export default Header;
