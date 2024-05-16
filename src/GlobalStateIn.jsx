// GlobalStateContext.js
import React, { createContext, useState, useEffect } from 'react';

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [attendeeData, setAttendeeData] = useState({
    name: '',
    refId: '',
    email: '',
    roomName: ''
  });

  const broadcastChannel = new BroadcastChannel('global_state_channel');

  useEffect(() => {
    broadcastChannel.onmessage = (event) => {
      if (event.data.type === 'UPDATE_ATTENDEE_DATA') {
        setAttendeeData(event.data.payload);
      }
    };

    return () => {
      broadcastChannel.close();
    };
  }, [broadcastChannel]);

  const updateAttendeeData = (newData) => {
    const updatedData = {
      ...attendeeData,
      ...newData
    };
    setAttendeeData(updatedData);
    broadcastChannel.postMessage({
      type: 'UPDATE_ATTENDEE_DATA',
      payload: updatedData
    });
  };

  return (
    <GlobalStateContext.Provider value={{ attendeeData, updateAttendeeData }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
