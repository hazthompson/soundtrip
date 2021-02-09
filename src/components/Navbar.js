import { useEffect } from 'react';
import { useUser } from 'react-spotify-api';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Button from '@material-ui/core/Button';
import Cookies from 'js-cookie';
import {
  deleteTempPlaylist,
  createTempPlaylist,
  replacePlaylistTracks,
  getArtistId,
  getArtistsTopSongs,
} from 'utils/spotifyHelpers';

import GlobalStyles from 'assets/GlobalStyles';

const useStyles = makeStyles((theme) => ({
  Navbar__container: {
    gridColumn: '1 /span 12',
    backgroundColor: `${GlobalStyles.backgroundColor}`,
    marginBottom: '10px',
  },
  Navbar__toolbar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    backgroundColor: `${GlobalStyles.backgroundColor}`,
  },

  Navbar__title: {
    fontFamily: `${GlobalStyles.headerFont}`,
    fontSize: '30px',
    color: `${GlobalStyles.titleColor}`,
  },

  Navbar__locationContainer: {
    fontFamily: `${GlobalStyles.headerFont}`,
    display: 'flex',
    justifyContent: 'center',
    fontSize: '30px',
  },
  Navbar__icon: {
    fontFamily: `${GlobalStyles.headerFont}`,
    alignSelf: 'center',
    display: 'inline',
  },
  Navbar__location: {
    fontFamily: `${GlobalStyles.headerFont}`,

    color: `${GlobalStyles.titleColor}`,
    display: 'inline',
  },
}));

async function handleLogout() {
  await deleteTempPlaylist(Cookies.get('tempPlaylistID'));
  Cookies.remove('spotifyAuthToken');
  Cookies.remove('tempPlaylistID');
  window.location.href = '/auth';
}

function Navbar() {
  const classes = useStyles();
  const { data: userData, error, loading } = useUser();

  useEffect(() => {
    if (error?.status === 401) {
      Cookies.remove('spotifyAuthToken');
    }
  }, [error]);

  const fetchTopSongs = async (artistsNames) => {
    const topSongs = await Promise.all(
      artistsNames.map(async (artist) => {
        const id = await getArtistId(artist);
        return await getArtistsTopSongs(id);
      })
    );
    return topSongs.flat();
  };

  //create initial playlist with initial tracks
  useEffect(() => {
    if (!Cookies.get('tempPlaylistID') && userData?.id) {
      const artistsNames = ['Madonna', 'Abba'];
      let tracklist = [];
      createTempPlaylist(userData.id).then(() => {
        const playlistID = Cookies.get('tempPlaylistID');
        fetchTopSongs(artistsNames).then((response) => {
          tracklist = response.join(',');
          console.log('tracks2322', tracklist);

          replacePlaylistTracks(playlistID, tracklist);
        });
      });
    }
  }, [userData]);

  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <AppBar position='static' className={classes.Navbar__container}>
      <Toolbar className={classes.Navbar__toolbar}>
        <Typography variant='h6' className={classes.Navbar__title}>
          {`Soundtrip - ${userData?.display_name}`}
        </Typography>
        <div className={classes.Navbar__locationContainer}>
          <LocationOnIcon />
          <span className={classes.Navbar__location}>Vancouver, BC</span>
        </div>
        <Button onClick={handleLogout} variant='contained'>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
