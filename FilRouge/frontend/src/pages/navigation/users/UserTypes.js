import React from 'react';

const UserTypes = () => {
  return (
    <div className=" bg-cover bg-center" style={{ backgroundImage: "url('https://img.freepik.com/photos-gratuite/design-interieur-du-milieu-du-siecle_23-2151902073.jpg?ga=GA1.1.1292537042.1733437772&semt=ais_hybrid')" }}>
      {/* Overlay semi-transparent */}
      <div className="absolute inset-0  opacity-50"></div>

      <div className="container mx-auto px-1 text-center relative z-10">
        <h2 className="text-3xl font-extrabold text-white mb-8">Que voulez-vous faire ?</h2>

        <div className="flex flex-col sm:flex-row justify-center items-center space-y-8 sm:space-y-0 sm:space-x-8">

          {/* Client Section */}
          <div className="w-full sm:w-80 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Vous êtes client ?</h3>
            <p className="text-lg text-gray-600 mb-6">
              Recherchez des prestataires ou suivez l’organisation de vos événements professionnels.
            </p>
            <a
              href="/usertypes/signup"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
            >
              Espace client
            </a>
          </div>

          {/* Partner Section */}
          <div className="w-full sm:w-80 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Vous êtes partenaire ?</h3>
            <p className="text-lg text-gray-600 mb-6">
              Editez vos fiches, consultez vos demandes de devis ou dialoguez avec les clients.
            </p>
            <a
              href="/singin"
              className="px-8 py-3 bg-green-600 text-white rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
            >
             Espace prestataire 
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserTypes;
