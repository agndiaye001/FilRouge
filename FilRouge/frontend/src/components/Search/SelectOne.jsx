import React from 'react';
import { BriefcaseIcon, HomeIcon, UsersIcon, MapPinIcon } from '@heroicons/react/24/outline'; 

const SelectOne = ({ selectedOption, setSelectedOption }) => {
    return (
        <div className="relative">
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="p-2 border border-gray-100 rounded-md w-full pr-10"
          >
            <option value="seminaireJournee">
              <MapPinIcon className="h-5 w-5 inline mr-2 text-gray-500" /> 
              Bureau 2-5
            </option>
            <option value="seminaireResidentiel">
              <MapPinIcon className="h-5 w-5 inline mr-2 text-gray-500" />
              Bureau individuel
            </option>
            <option value="cocktailsSoirees">
              <MapPinIcon className="h-5 w-5 inline mr-2 text-gray-500" />
              Open space
            </option>
            <option value="locationSeche">
              <MapPinIcon className="h-5 w-5 inline mr-2 text-gray-500" />
              Salle de réunion
            </option>
          </select>
     </div>
    )
};

export default SelectOne;
