import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const Dashboard2 = () => {
  const navigate = useNavigate();
  const [availableSeats, setAvailableSeats] = useState(0);
  const [maxSeats, setMaxSeats] = useState(0);
  const [roomName, setRoomName] = useState('');

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get(
          'https://api.airtable.com/v0/appo4h23QGedx6uR0/ROOM%20count',
          {
            headers: {
              Authorization: 'Bearer pat9aDF4Eh2hSEl8g.442a2a6963b0964593b0e1f8f0469049b275073158fc366e1187ff184f1beb7c',
            },
          }
        );
        const records = response.data.records;
        const selectedRoom = records.find((record) => record.fields['Room Name'] === 'PITCHING');
        console.log(selectedRoom);

        if (selectedRoom) {
          setAvailableSeats(selectedRoom.fields['Available Seat']);
          setMaxSeats(selectedRoom.fields['Max Seat']);
          setRoomName(selectedRoom.fields['Room Name']);
        }
      } catch (error) {
        console.error('Error fetching data from Airtable:', error);
      }
    };

    fetchSeats(); // Initial fetch

    const interval = setInterval(fetchSeats, 1000); // Fetch every second

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, []);

  const handleScanInClick = () => {
    navigate('/scanin2');
  };

  const handleScanOutClick = () => {
    navigate('/scanout2');
  };

  return (
    <div className="bg-green-500 min-h-screen">
      <header className="pb-4 flex justify-center">
        <a href="/"> 
          <img
            src="/nannnnnn.jpg"
            alt="Banner"
            className="w-full object-cover object-center border-4 border-white shadow-lg cursor-pointer" // Added cursor-pointer to indicate clickable
          />
        </a>
      </header>
      <div className="container mx-auto py-8 relative">
        <h1 className="text-6xl font-bold mb-8 text-center text-green-800">
          {roomName} ROOM
        </h1>
        <p className="number-style text-9xl mb-12 text-center text-transparent bg-clip-text bg-green-800">
          {availableSeats}
        </p>
        <div className="flex justify-center mt-8" id="button-container">
          <button
            className="scan-button scan-in opacity-0 transition-opacity duration-300 hover:opacity-100"
            onClick={handleScanInClick}
          >
            Scan In
          </button>
          <button
            className="scan-button scan-out opacity-0 transition-opacity duration-300 hover:opacity-100"
            onClick={handleScanOutClick}
          >
            Scan Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard2;
