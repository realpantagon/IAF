import React, { useState, useEffect } from "react";
import axios from "axios";

const Scanout = () => { // Changed component name from Scanin to ScanOut
  const [inputValue, setInputValue] = useState("");
  const [attendee, setAttendee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [roomName, setRoomName] = useState("");

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
    if (e.key === "Enter") {
      const refId = inputValue.trim();
      if (refId !== "") {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get(
            `https://api.airtable.com/v0/appo4h23QGedx6uR0/Attendee?filterByFormula=({REF ID} = '${refId}')`,
            {
              headers: {
                Authorization:
                  "Bearer patOd4nGMnuuS7uDe.f20d2a65a590973e273ca7f67ae13640a37ac53245f40c3c50d14f9a43f3b8fa",
              },
            }
          );
          console.log("Response data:", response.data);
          if (response.data.records.length > 0) {
            setAttendee(response.data.records[0]);
          } else {
            setAttendee(null);
            setError("No attendee found with the provided REF ID.");
          }
        } catch (error) {
          console.error("Error fetching attendee data:", error);
          setAttendee(null);
          setError("An error occurred while fetching the attendee data.");
        }
        setLoading(false);
        setInputValue("");
      }
    }
  };

  const handleRoomChange = (e) => {
    setRoomName(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
        <h1 className="text-4xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
          DoorScan ID
        </h1>
        <div className="mb-4">
          <label
            htmlFor="roomSelect"
            className="block text-lg font-semibold text-purple-600"
          >
            Select Room:
          </label>
          <select
            id="roomSelect"
            value={roomName}
            onChange={handleRoomChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
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
          className="w-full px-4 py-2 rounded-lg border-2 border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-lg text-gray-800 placeholder-gray-400"
        />
        {loading && (
          <p className="mt-4 text-lg text-center text-purple-600">Loading...</p>
        )}
        {error && (
          <p className="mt-4 text-lg text-center text-red-500">{error}</p>
        )}
        {attendee && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2 text-purple-600">
              Attendee Details:
            </h2>
            <p className="text-lg text-gray-800">
              Name: {attendee.fields.Name}
            </p>
            <p className="text-lg text-gray-800">
              REF ID: {attendee.fields["REF ID"]}
            </p>
            <p className="text-lg text-gray-800">
              Email: {attendee.fields.email}
            </p>
            <p className="text-lg text-gray-800">
              {roomName}
            </p>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Scanout; // Changed export default component name to ScanOut
