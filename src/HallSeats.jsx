// HallSeats.jsx
import React, { useState, useContext } from 'react';
import './App.css';
import { GlobalStateContext } from './GlobalState';

const HallSeats = () => {
  const [availableSeats, setAvailableSeats] = useState(400);
  const { attendeeData } = useContext(GlobalStateContext);

  const handleDoorScanIn = () => {
    if (availableSeats > 0) {
      setAvailableSeats(availableSeats - 1);
    }
  };

  const handleDoorScanOut = () => {
    if (availableSeats < 400) {
      setAvailableSeats(availableSeats + 1);
    }
  };

  return (
    <div className="bg-white text-purple-600 min-h-screen">
      <header className="bg-gradient-to-r from-green-700 to-green-900 py-2 flex justify-center">
        <img src="/Nan.jpg" alt="Banner" className="w-2/5 object-cover object-center" />
      </header>
      <div className="container mx-auto py-8">
        <p className="number-style text-8xl mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          {availableSeats}
        </p>
 
        {attendeeData.name && (
          <div className="mt-8 text-center">
            <h2 className="text-3xl font-semibold mb-2 text-purple-600">
              Attendee Details:
            </h2>
            <p className="text-xl text-gray-800">
              Name: {attendeeData.name}
            </p>
            <p className="text-xl text-gray-800">
              REF ID: {attendeeData.refId}
            </p>
            <p className="text-xl text-gray-800">
              Email: {attendeeData.email}
            </p>
            <p className="text-xl text-gray-800">
              Room: {attendeeData.roomName}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HallSeats;
