import React, { useState } from 'react';
import Plus from './plus';
import Minus from './minus';

function Doorscan() {
  const [availableSeats, setAvailableSeats] = useState(0);
  const [currentPage, setCurrentPage] = useState('home');

  const handlePlusClick = () => {
    setCurrentPage('plus');
  };

  const handleMinusClick = () => {
    setCurrentPage('minus');
  };

  const handleBackClick = () => {
    setCurrentPage('home');
  };

  if (currentPage === 'plus') {
    return <Plus />;
  }

  if (currentPage === 'minus') {
    return <Minus />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Doorscan</h1>
      <Display availableSeats={availableSeats} />
      <div className="mt-8 space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handlePlusClick}
        >
          Plus
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleMinusClick}
        >
          Minus
        </button>
      </div>
    </div>
  );
}

function Display({ availableSeats }) {
  return (
    <div className="flex items-center justify-center h-64">
      <h1 className="text-8xl font-bold">{availableSeats}</h1>
    </div>
  );
}

export default Doorscan;
