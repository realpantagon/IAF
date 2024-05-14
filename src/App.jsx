import React, { useState } from 'react';
import './App.css';

const HallSeats = () => {
  const [availableSeats, setAvailableSeats] = useState(100);

  const handleDoorScanIn = () => {
    if (availableSeats > 0) {
      setAvailableSeats(availableSeats - 1);
    }
  };

  const handleDoorScanOut = () => {
    if (availableSeats < 100) {
      setAvailableSeats(availableSeats + 1);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header className="bg-gradient-to-r from-purple-600 to-pink-600 py-8">
        <img
          src="path/to/your/banner-image.jpg"
          alt="Banner"
          className="w-full h-48 object-cover object-center"
        />
      </header>
      <div className="container mx-auto py-8">
        <h2 className="text-4xl font-bold mb-4 text-center">
          Available Seats in the Hall
        </h2>
        <p className="number-style mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          {availableSeats}
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleDoorScanIn}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-bold transition duration-300"
          >
            Door Scan In
          </button>
          <button
            onClick={handleDoorScanOut}
            className="px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-lg text-white font-bold transition duration-300"
          >
            Door Scan Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default HallSeats;