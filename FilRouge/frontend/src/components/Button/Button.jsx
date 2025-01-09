import React from 'react';

const Button = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
    >
      {text}
    </button>
  );
};

export default Button;


