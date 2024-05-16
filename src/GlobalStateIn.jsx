import React, { createContext, useState, useEffect } from 'react';

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [attendeeData, setAttendeeData] = useState({
    name: '',
    refId: '',
    email: '',
  });

  const [availableSeats, setAvailableSeats] = useState(() => {
    const storedSeats = localStorage.getItem('availableSeats');
    return storedSeats ? parseInt(storedSeats) : 400;
  });

  const broadcastChannel = new BroadcastChannel('global_state_channel');

  useEffect(() => {
    broadcastChannel.onmessage = (event) => {
      if (event.data.type === 'UPDATE_ATTENDEE_DATA') {
        setAttendeeData(event.data.payload);
      } else if (event.data.type === 'UPDATE_AVAILABLE_SEATS') {
        setAvailableSeats(event.data.payload);
        localStorage.setItem('availableSeats', event.data.payload.toString());
      }
    };

    return () => {
      broadcastChannel.close();
    };
  }, [broadcastChannel]);

  const updateAttendeeData = (newData) => {
    const updatedData = { ...attendeeData, ...newData };
    setAttendeeData(updatedData);
    broadcastChannel.postMessage({
      type: 'UPDATE_ATTENDEE_DATA',
      payload: updatedData,
    });
  };

  const decreaseAvailableSeats = () => {
    if (availableSeats > 0) {
      const updatedSeats = availableSeats - 1;
      setAvailableSeats(updatedSeats);
      localStorage.setItem('availableSeats', updatedSeats.toString());
      broadcastChannel.postMessage({
        type: 'UPDATE_AVAILABLE_SEATS',
        payload: updatedSeats,
      });
    }
  };

  const increaseAvailableSeats = () => {
    if (availableSeats < 400) {
      const updatedSeats = availableSeats + 1;
      setAvailableSeats(updatedSeats);
      localStorage.setItem('availableSeats', updatedSeats.toString());
      broadcastChannel.postMessage({
        type: 'UPDATE_AVAILABLE_SEATS',
        payload: updatedSeats,
      });
    }
  };

  return (
    <GlobalStateContext.Provider
      value={{
        attendeeData,
        updateAttendeeData,
        availableSeats,
        decreaseAvailableSeats,
        increaseAvailableSeats,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};