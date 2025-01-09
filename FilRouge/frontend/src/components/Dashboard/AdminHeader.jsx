import React, { useState } from 'react';
import { FaUserCircle, FaBell, FaEnvelope, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <header className="bg-gray-800 text-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <span className="text-xl font-semibold">Worktheque</span>
      </div>

      {/* Menu de navigation et options utilisateur */}
      <div className="flex items-center space-x-6">
        {/* Icône Message */}
        <div className="relative">
          <FaEnvelope className="text-white text-2xl cursor-pointer" />
          <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full px-2">3</span>
        </div>

        {/* Icône Notifications */}
        <div className="relative">
          <FaBell className="text-white text-2xl cursor-pointer" />
          <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full px-2">5</span>
        </div>

        {/* Profil utilisateur */}
        <div className="relative">
          <Link to="/prestataire/profile" className="flex items-center hover:bg-gray-700 p-2 rounded">
            <FaUserCircle className="text-white text-2xl cursor-pointer" />

          </Link>
        </div>

        {/* Connexion/Déconnexion */}
        <div className="flex items-center">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-white bg-red-600 hover:bg-red-700 py-2 px-4 rounded-full text-sm flex items-center space-x-2"
            >
              <FaSignOutAlt /> <span>Déconnexion</span>
            </button>
          ) : (
            <button
              onClick={() => setIsLoggedIn(true)}
              className="text-white bg-green-600 hover:bg-green-700 py-2 px-4 rounded-full text-sm flex items-center space-x-2"
            >
              <FaSignInAlt /> <span>Connexion</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
