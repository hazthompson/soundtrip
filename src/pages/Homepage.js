import { useContext, useEffect, useState } from 'react';

import DatePicker from 'components/DatePicker';
import { makeStyles } from '@material-ui/core/styles';
import EventsList from 'components/EventsList';
import LocationFinder from 'components/LocationFinder';
import Playlist from 'components/Playlist';
import EventContext from 'utils/EventContext';
import {
  deleteTempPlaylist,
  createTempPlaylist,
  replacePlaylistTracks,
  getArtistId,
  getArtistsTopSongs,
} from 'utils/spotifyHelpers';

const eventListStyles = makeStyles({
  homepage: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    justifySelf: 'center',
  },
  homepage__locationDateContainer: {
    display: 'grid',
    gridColumn: '6 /span 2',
    justifyContent: 'center',
    maxHeight: '50%',
  },
});

const fetchTopSongs = async (artistNames) => {
  const topSongs = await Promise.all(
    artistNames.map(async (artist) => {
      const id = await getArtistId(artist);
      return id ? await getArtistsTopSongs(id) : [];
    })
  );

  // Spread into a Set to ensure there are no duplicates
  return [...new Set(topSongs.flat())];
};

const repopuateTempPlaylist = async (
  spotifyUserId,
  tempPlaylistId,
  artistNames
) => {
  // Delete the current temporary playlist if one exists
  if (tempPlaylistId) {
    await deleteTempPlaylist(tempPlaylistId);
  }

  const playlistId = await createTempPlaylist(spotifyUserId);
  const topTracks = await fetchTopSongs(artistNames);
  await replacePlaylistTracks(playlistId, topTracks.join(','));
  return playlistId;
};

function Homepage() {
  const classes = eventListStyles();
  const [latLng, setLatLng] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const { globalState, setGlobalState } = useContext(EventContext);

  const { currentUser, artistNames, tempPlaylistId } = globalState;

  useEffect(() => {
    if (currentUser?.id && artistNames.length) {
      repopuateTempPlaylist(currentUser.id, tempPlaylistId, artistNames).then(
        (newPlaylistId) => {
          setGlobalState((currentState) => ({
            ...currentState,
            tempPlaylistId: newPlaylistId,
          }));
        }
      );
    }
  }, [currentUser, artistNames, setGlobalState]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={classes.homepage}>
      {latLng && <EventsList startDate={selectedDate} latLng={latLng} />}
      <div className={classes.homepage__locationDateContainer}>
        <LocationFinder setLatLng={setLatLng} />
        <DatePicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>

      {tempPlaylistId && <Playlist playlistId={tempPlaylistId} />}
    </div>
  );
}

export default Homepage;
