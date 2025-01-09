import React from 'react';
import { MapPinIcon } from '@heroicons/react/24/outline';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className='relative'>
      <div className="flex items-center border border-black-100 bg-white rounded-md ">
        <MapPinIcon className="h-5 w-5 mx-2 bg-white" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher..."
          className="p-2 w-full border-none focus:outline-none"
        />
      </div>
    </div>

  );
};

export default SearchBar;
