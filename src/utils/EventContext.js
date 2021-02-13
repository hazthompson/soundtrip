import { createContext, useState } from 'react';

const defaultEvents = {
  artists: [],
};
const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(defaultEvents);
  return (
    <EventContext.Provider value={{ events, setEvents }}>
      {children}
    </EventContext.Provider>
  );
};

export { EventContext as default, EventProvider };
