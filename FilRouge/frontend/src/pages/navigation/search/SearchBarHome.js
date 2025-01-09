import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';

import SearchButton from '../../../components/Search/SearchButton';
import SelectOne from '../../../components/Search/SelectOne';
import SearchBar from '../../../components/Search/SearchBar';
import Capacity from '../../../components/Search/Capacity';
import axios from 'axios';

// mettre les retrictions dans le backend CRUD: getOne, ...
// revoir workspace.js

const SearchBarHome = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState('option1');
  const [capacity, setCapacity] = useState(1);
  //const [availability, setAvailability] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // hooks
  const navigate = useNavigate(); 

  const handleSearch = () => {
    setLoading(true);
    setError(null);

    axios
      .get('http://127.0.0.1:8000/api/workspace/', {
        params: {
          searchTerm,
          workspace_type: selectedOption,
          capacity,
        }
      })
      .then((response) => {

          const filteredResults = response.data.filter(workspace => 
            workspace.capacity >= capacity && workspace.workspace_type === selectedOption
          );
  
          setResults(filteredResults); // Filtrer et stocker les résultats qui correspondent à la capacité et l'option
          setLoading(false);

 
      
        // Results.jsx
       navigate('/results', {
        state: { results: filteredResults }  // Passer les résultats avec `state`
      });

      })
      .catch((error) => {
        setError('Erreur lors de la recherche');
        setLoading(false);
      });
  };

  return (
    <div className="bg-gray-800 container mx-auto text-center p-10">
      <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-x-4 md:space-y-0 p-30">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <SelectOne selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
        <Capacity capacity={capacity} setCapacity={setCapacity} />
        <SearchButton onClick={handleSearch} />
      </div>
      
    </div>
  );
};

export default SearchBarHome;
