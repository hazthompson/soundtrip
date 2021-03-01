import { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import EventsList from 'components/EventsList/EventsList';
import SearchBox from 'components/SearchBox/SearchBox';
import Playlist from 'components/Playlist';
import EventContext from 'utils/EventContext';
import {
  deleteTempPlaylist,
  createTempPlaylist,
  replacePlaylistTracks,
  getArtistId,
  getArtistsTopSongs,
} from 'utils/spotifyHelpers';

const eventListStyles = makeStyles((theme) => ({
  eventsPage: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    justifySelf: 'center',
  },
}));

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

function EventsPage() {
  const classes = eventListStyles();
  const history = useHistory();
  const location = useLocation();
  const [latLng, setLatLng] = useState();
  const [startDate, setStartDate] = useState();
  const [locationName, setLocationName] = useState();
  const { globalState, setGlobalState } = useContext(EventContext);

  const { currentUser, artistNames, tempPlaylistId } = globalState;

  useEffect(() => {
    const lat = location.state?.lat || localStorage.getItem('location-lat');
    const lng = location.state?.lng || localStorage.getItem('location-lng');
    const startDate =
      location.state?.startDate || localStorage.getItem('start-date');
    const locationName =
      location.state?.locationName || localStorage.getItem('location-name');

    if (lat && lng && startDate && locationName) {
      setLatLng({ lat, lng });
      setStartDate(startDate);
      setLocationName(locationName);
    } else {
      history.replace('/');
    }
  }, [history, location.state]);

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
    <div className={classes.eventsPage}>
      <SearchBox startDate={startDate} initialLocationName={locationName} />
      {tempPlaylistId && <Playlist playlistId={tempPlaylistId} />}
      {latLng && <EventsList startDate={startDate} latLng={latLng} />}
    </div>
  );
}

export default EventsPage;
