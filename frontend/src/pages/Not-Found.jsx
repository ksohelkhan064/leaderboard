// src/components/NotFound.js
import React from 'react';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center max-h-screen bg-gray-100 mt-44">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500">404</h1>
        <p className="mt-4 text-lg text-gray-600">Page Not Found</p>
        <p className="mt-2">
          <a href="/" className="text-blue-500 hover:underline font-semibold text-lg">Go Back Home</a>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
