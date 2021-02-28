import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
  homepage: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    justifySelf: 'center',
  },
  homepage__locationDateContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridColumn: '4 /span 6',
    gridRow: 1,
    justifyContent: 'center',
    backgroundColor: theme.palette.grey[200],
    borderRadius: '40px',
    marginBottom: '50px',
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
  let { lat, lng, year, month, day } = useParams();
  const latLng = { lat: lat, lng: lng };
  const selectedDate = new Date(year, month - 1, day); //month is 0 indexed
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

      <SearchBox startDate={selectedDate} />

      {tempPlaylistId && <Playlist playlistId={tempPlaylistId} />}
    </div>
  );
}

export default EventsPage;
