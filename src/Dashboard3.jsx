import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import "./Dashboard.css";

const Dashboard3 = () => {
  const navigate = useNavigate();
  const [availableSeats, setAvailableSeats] = useState(0);
  const [maxSeats, setMaxSeats] = useState(0);
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const roomResponse = await axios.get(
          "https://api.airtable.com/v0/appo4h23QGedx6uR0/ROOM%20count",
          {
            headers: {
              Authorization:
                "Bearer pat9aDF4Eh2hSEl8g.442a2a6963b0964593b0e1f8f0469049b275073158fc366e1187ff184f1beb7c",
            },
          }
        );
        const roomRecords = roomResponse.data.records;
        const selectedRoom = roomRecords.find(
          (record) => record.fields["Room Name"] === "PITCHING"
        );

        if (selectedRoom) {
          setMaxSeats(selectedRoom.fields["Max Seat"]);
          setRoomName(selectedRoom.fields["Room Name"]);
          setRoomId(selectedRoom.id); // Store the room id for later use
        }
      } catch (error) {
        console.error("Error fetching room data from Airtable:", error);
      }
    };

    const fetchSeatCounts = async () => {
      try {
        const [scanInResponse, scanOutResponse] = await Promise.all([
          axios.get(
            "https://api.airtable.com/v0/appo4h23QGedx6uR0/PitchingRoomstatus?view=ScanIn",
            {
              headers: {
                Authorization:
                  "Bearer pat9aDF4Eh2hSEl8g.442a2a6963b0964593b0e1f8f0469049b275073158fc366e1187ff184f1beb7c",
              },
            }
          ),
          axios.get(
            "https://api.airtable.com/v0/appo4h23QGedx6uR0/PitchingRoomstatus?view=ScanOut",
            {
              headers: {
                Authorization:
                  "Bearer pat9aDF4Eh2hSEl8g.442a2a6963b0964593b0e1f8f0469049b275073158fc366e1187ff184f1beb7c",
              },
            }
          ),
        ]);
    
        const scanInCount = scanInResponse.data.records.length;
        const scanOutCount = scanOutResponse.data.records.length;
    
        const calculatedAvailableSeats = maxSeats - scanInCount + scanOutCount;
        setAvailableSeats(calculatedAvailableSeats);
    
        // console.log("Room ID:", roomId);
        console.log("Available Seats:", calculatedAvailableSeats);
    
        // Update available seats in the pitching room
        await axios.patch(
          `https://api.airtable.com/v0/appo4h23QGedx6uR0/ROOM%20count/${roomId}`,
          {
            fields: {
              "Available Seat": calculatedAvailableSeats,
            },
          },
          {
            headers: {
              Authorization:
                "Bearer pat9aDF4Eh2hSEl8g.442a2a6963b0964593b0e1f8f0469049b275073158fc366e1187ff184f1beb7c",
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        console.error("Error fetching seat counts from Airtable:", error);
        console.error("Error details:", error.response?.data);
      }
    };

    fetchRoomData(); // Initial fetch for room data

    const interval = setInterval(() => {
      fetchSeatCounts();
    }, 500); // Fetch seat counts every 0.5 seconds

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, [maxSeats, roomId]); // Depend on maxSeats and roomId to ensure updates

  const handleScanInClick = () => {
    navigate("/scanintest");
  };

  const handleScanOutClick = () => {
    navigate("/scanouttest");
  };

  return (
    <div className="min-h-screen bg-image">
      <div className="container mx-auto py-8 relative">
        <h1 className="text-7xl font-bold mb-8 mt-72 text-center text-green-900 drop-shadow-lg">
          {roomName} ROOM TEST
        </h1>
        <a href="/">
          <p className="number-style text-9xl mb-12 text-center text-transparent bg-clip-text bg-green-800 drop-shadow-lg">
            {availableSeats}
          </p>
        </a>
        <h1 className="text-6xl font-bold mb-8 text-center text-green-900 drop-shadow-lg">
          Available Seats
        </h1>
        <div className="flex justify-center mt-8" id="button-container">
          <button
            className="scan-button scan-in opacity-0 transition-opacity duration-300 hover:opacity-100 text-6xl mr-8"
            onClick={handleScanInClick}
          >
            Scan In
          </button>
          <button
            className="scan-button scan-out opacity-0 transition-opacity duration-300 hover:opacity-100 text-6xl ml-8"
            onClick={handleScanOutClick}
          >
            Scan Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard3;
