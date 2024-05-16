// Dashboard.jsx
import React, { useState, useContext } from 'react';
import './App.css';
import { GlobalStateContext } from './GlobalStateIn';

const Dashboard = () => {
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
    <div className="bg-gradient-to-r from-green-700 to-green-900 min-h-screen">
      <header className="bg-gradient-to-r from-green-700 to-green-900 py-4 flex justify-center">
        <img src="/Nan.jpg" alt="Banner" className="w-2/5 object-cover object-center  border-4 border-white shadow-lg" />
      </header>
      <div className="container mx-auto py-8">
        <h1 className="text-6xl font-bold mb-8 text-center text-white drop-shadow-lg">
          Available Seats
        </h1>
        <p className="number-style text-9xl mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-rose-700 to-amber-300 drop-shadow-lg">
          {availableSeats}
        </p>
        {attendeeData.name && (
          <div className=" text-center">
            {/* <h2 className="text-5xl font-semibold mb-4 text-white drop-shadow-lg">
              Attendee Details:
            </h2> */}
            <div className="bg-white  p-6 rounded-lg shadow-lg">
              <p className="text-3xl text-green-800 mb-2 font-semibold">
                Name: {attendeeData.name}
              </p>
              <p className="text-3xl text-green-800 mb-2 font-semibold">
                REF ID: {attendeeData.refId}
              </p>
              <p className="text-3xl text-green-800 mb-2 font-semibold">
                Email: {attendeeData.email}
              </p>
              <p className="text-3xl text-green-800 font-semibold">
                Room: {attendeeData.roomName}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;