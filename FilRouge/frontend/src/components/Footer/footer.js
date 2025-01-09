import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="text-sm">
            <p>&copy; 2024 WorkthequeHub. Tous droits réservés.</p>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/privacy"
              className="text-gray-300 hover:text-white text-sm"
            >
              Politique de confidentialité
            </Link>
            <Link
              to="/terms"
              className="text-gray-300 hover:text-white text-sm"
            >
              Termes et conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
