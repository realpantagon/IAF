import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Scanout3 = () => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [attendeeData, setAttendeeData] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const sendDataToPitchingRoomStatus = async (refId, status) => {
    try {
      const response = await axios.post(
        "https://api.airtable.com/v0/appo4h23QGedx6uR0/PitchingRoomstatus",
        {
          records: [
            {
              fields: {
                ID: refId,
                Status: status,
              },
            },
          ],
        },
        {
          headers: {
            Authorization:
              "Bearer patOd4nGMnuuS7uDe.f20d2a65a590973e273ca7f67ae13640a37ac53245f40c3c50d14f9a43f3b8fa",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Data sent to PitchingRoomstatus:", response.data);
    } catch (error) {
      console.error("Error sending data to PitchingRoomstatus:", error);
    }
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      const refId = inputValue.trim();
      setInputValue(""); // Clear the input value immediately
      if (refId !== "") {
        setLoading(true);
        setError(null);
        setAttendeeData(null);
        console.log(refId);

        try {
          const attendeeResponse = await axios.get(
            `https://api.airtable.com/v0/appo4h23QGedx6uR0/Data%20Import%2022%20May?filterByFormula={Ref.%20ID}='${refId}'`,
            {
              headers: {
                Authorization:
                  "Bearer patOd4nGMnuuS7uDe.f20d2a65a590973e273ca7f67ae13640a37ac53245f40c3c50d14f9a43f3b8fa",
              },
            }
          );

          if (attendeeResponse.data.records.length > 0) {
            const attendee = attendeeResponse.data.records[0];
            setAttendeeData(attendee.fields);

            const roomResponse = await axios.get(
              'https://api.airtable.com/v0/appo4h23QGedx6uR0/ROOM%20count?filterByFormula=({Room Name} = "PITCHING")',
              {
                headers: {
                  Authorization:
                    "Bearer patOd4nGMnuuS7uDe.f20d2a65a590973e273ca7f67ae13640a37ac53245f40c3c50d14f9a43f3b8fa",
                },
              }
            );

            if (roomResponse.data.records.length > 0) {
              const room = roomResponse.data.records[0];
              const availableSeats = room.fields["Available Seat"];
              const maxSeats = room.fields["Max Seat"];

              if (availableSeats < maxSeats) {
                await axios.patch(
                  `https://api.airtable.com/v0/appo4h23QGedx6uR0/ROOM%20count/${room.id}`,
                  {
                    fields: {
                      "Available Seat": availableSeats + 1,
                    },
                  },
                  {
                    headers: {
                      Authorization:
                        "Bearer patOd4nGMnuuS7uDe.f20d2a65a590973e273ca7f67ae13640a37ac53245f40c3c50d14f9a43f3b8fa",
                      "Content-Type": "application/json",
                    },
                  }
                );
              }
            }

            await sendDataToPitchingRoomStatus(refId, "ScanOut");
          } else {
            setError("No attendee found with the provided REF ID.");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("An error occurred while fetching the data.");
        }

        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-image flex flex-col items-center justify-center">
      <div className="bg-white p-12 my-8 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300">
        <h1 className="text-5xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
          Scan Out TEST
        </h1>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter REF ID"
          className="w-full px-6 py-4 rounded-lg border-4 border-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:border-transparent text-2xl text-gray-800 placeholder-gray-400"
        />
        {loading && (
          <p className="mt-6 text-2xl text-center text-green-600 animate-pulse">
            Loading...
          </p>
        )}
        {error && (
          <p className="mt-6 text-2xl text-center text-red-500">{error}</p>
        )}
        {attendeeData && (
          <div className="mt-6 text-2xl text-center text-gray-800">
            <p>
              <strong>Name:</strong> {attendeeData.Firstname}{" "}
              {attendeeData.Surname}
            </p>
            <p>
              <strong>Badge:</strong> {attendeeData.Badge}
            </p>
            <p>
              <strong>Organization:</strong> {attendeeData.Organization}
            </p>
          </div>
        )}
      </div>
      <div className="mt-8">
        <Link
          to="/test"
          className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Scanout3;
