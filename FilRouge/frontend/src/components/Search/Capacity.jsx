import React, { useState } from 'react';
import { UsersIcon  } from '@heroicons/react/24/outline';

const Capacity = () => {
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const handleChange = (e) => {
    const value = Math.max(1, e.target.value); 
    setNumberOfPeople(value);
  };

  return (
    <div className="flex flex-col items-center space-x-2">
      <div className="flex items-center bg-white  rounded-md">
        <UsersIcon  className="h-5 w-5 text-black mr-2 ml-2" /> {/* Icône */}
        <input
          type="number"
          id="numberOfPeople"
          value={numberOfPeople}
          onChange={handleChange}
          min="1"
          className="w-24 p-2 border-0 outline-none"
        />
      </div>
  </div>
  );
};

export default Capacity;
