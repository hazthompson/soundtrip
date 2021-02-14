import { createContext, useState } from 'react';

const defaultEvents = {
  artistsNames: [],
  tester: 'poo',
};
const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState(defaultEvents);

  return (
    <EventContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </EventContext.Provider>
  );
};

export { EventContext as default, EventProvider };
