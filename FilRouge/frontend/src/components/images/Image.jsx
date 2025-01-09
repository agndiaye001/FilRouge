import React from 'react';

const Image = ({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt}
      className="h-48 w-full object-cover rounded-lg shadow-md"
    />
  );
};

export default Image;
