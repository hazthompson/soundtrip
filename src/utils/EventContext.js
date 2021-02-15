import { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const defaultGlobalState = {
  currentUser: null,
  artistNames: [],
  tempPlaylistId: Cookies.get('tempPlaylistId') || null,
};
const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState(defaultGlobalState);

  const { tempPlaylistId } = globalState;

  useEffect(() => {
    if (tempPlaylistId) {
      Cookies.set('tempPlaylistId', tempPlaylistId);
    } else {
      Cookies.remove('tempPlaylistId');
    }
  }, [tempPlaylistId]);

  return (
    <EventContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </EventContext.Provider>
  );
};

export { EventContext as default, EventProvider };
