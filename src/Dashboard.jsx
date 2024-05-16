import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { GlobalStateContext } from './GlobalStateIn';

const Dashboard = () => {
  const { attendeeData, availableSeats } = useContext(GlobalStateContext);
  const navigate = useNavigate();

  const handleScanInClick = () => {
    navigate('/scanin');
  };

  const handleScanOutClick = () => {
    navigate('/scanout');
  };

  return (
    <div className="bg-gradient-to-r from-green-500 to-green-900 min-h-screen">
      <header className="pb-4 flex justify-center">
        <img src="/nannnnnn.jpg" alt="Banner" className="w-full object-cover object-center border-4 border-white shadow-lg" />
      </header>
      <div className="container mx-auto py-8">
        <h1 className="text-6xl font-bold mb-8 text-center text-white drop-shadow-lg">
          Available Seats
        </h1>
        <p className="number-style text-9xl mb-12 text-center text-transparent bg-clip-text bg-white drop-shadow-lg">
          {availableSeats}
        </p>
        {attendeeData.name && (
          <div className="text-center">
            <div className="p-6 rounded-lg shadow-lg">
              <p className="text-3xl text-white mb-2 font-semibold">Name: {attendeeData.name}</p>
              <p className="text-3xl text-white mb-2 font-semibold">REF ID: {attendeeData.refId}</p>
              <p className="text-3xl text-white mb-2 font-semibold">Email: {attendeeData.email}</p>
            </div>
          </div>
        )}
        <div className="flex justify-center mt-8">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
            onClick={handleScanInClick}
          >
            Scan In
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleScanOutClick}
          >
            Scan Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;