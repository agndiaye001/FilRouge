import React from 'react';
import { Link } from 'react-router-dom';



const SearchButton = ({ onClick }) => {
  return (
    <Link to="/results">
      <button
        onClick={onClick}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Chercher
      </button>

    </Link>
  );
};

export default SearchButton;
