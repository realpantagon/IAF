import React, { useState, useContext } from "react";
import axios from "axios";
import { GlobalStateContext } from "./GlobalStateIn";

const Plus = () => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { updateAttendeeData, decreaseAvailableSeats } = useContext(GlobalStateContext);

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

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-500 to-green-700 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300">
        <h1 className="text-5xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800">
          Scan In ID
        </h1>
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

export default Plus;