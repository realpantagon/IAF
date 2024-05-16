// Scanin.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalStateContext } from "./GlobalStateIn";

const Scanin = () => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [roomName, setRoomName] = useState("");
  

  const { updateAttendeeData, decreaseAvailableSeats } = useContext(GlobalStateContext);

  useEffect(() => {
    const storedRoomName = localStorage.getItem("roomName");
    if (storedRoomName) {
      setRoomName(storedRoomName);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("roomName", roomName);
  }, [roomName]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      const refId = inputValue.trim();
      if (refId !== '') {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get(
            `https://api.airtable.com/v0/appo4h23QGedx6uR0/Attendee?filterByFormula=({REF ID} = '${refId}')`,
            {
              headers: {
                Authorization:
                  'Bearer patOd4nGMnuuS7uDe.f20d2a65a590973e273ca7f67ae13640a37ac53245f40c3c50d14f9a43f3b8fa',
              },
            }
          );
          console.log('Response data:', response.data);
          if (response.data.records.length > 0) {
            const attendee = response.data.records[0];
            updateAttendeeData({
              name: attendee.fields.Name,
              refId: attendee.fields['REF ID'],
              email: attendee.fields.email,
              roomName,
            });
            decreaseAvailableSeats(); // Decrease available seats count
          } else {
            setError('No attendee found with the provided REF ID.');
          }
        } catch (error) {
          console.error('Error fetching attendee data:', error);
          setError('An error occurred while fetching the attendee data.');
        }
        setLoading(false);
        setInputValue('');
      }
    }
  };

  const handleRoomChange = (e) => {
    setRoomName(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-500 to-green-700 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300">
        <h1 className="text-5xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800">
          Scan In ID
        </h1>
        <div className="mb-6">
          <label
            htmlFor="roomSelect"
            className="block text-xl font-semibold text-green-700"
          >
            Select Room:
          </label>
          <select
            id="roomSelect"
            value={roomName}
            onChange={handleRoomChange}
            className="mt-2 block w-full py-3 px-4 border-2 border-green-500 bg-white rounded-md shadow-md focus:outline-none focus:ring-4 focus:ring-green-300 focus:border-transparent text-xl text-gray-800"
          >
            <option value="" disabled>
              {roomName ? `Selected: ${roomName}` : "Choose a room"}
            </option>
            <option value="Room 1">Room 1</option>
            <option value="Room 2">Room 2</option>
            <option value="Room 3">Room 3</option>
          </select>
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter REF ID"
          className="w-full px-6 py-4 rounded-lg border-4 border-green-500 focus:outline-none focus:ring-4 focus:ring-green-300 focus:border-transparent text-2xl text-gray-800 placeholder-gray-400"
        />
        {loading && (
          <p className="mt-6 text-2xl text-center text-green-600 animate-pulse">
            Loading...
          </p>
        )}
        {error && (
          <p className="mt-6 text-2xl text-center text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Scanin;