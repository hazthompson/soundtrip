import { useEffect, useContext } from 'react';
import { useUser } from 'react-spotify-api';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Cookies from 'js-cookie';
import EventContext from 'utils/EventContext';
import { deleteTempPlaylist } from 'utils/spotifyHelpers';

import GlobalStyles from 'assets/GlobalStyles';

const useStyles = makeStyles(() => ({
  Navbar__container: {
    gridColumn: '1 /span 12',
    backgroundColor: `${GlobalStyles.backgroundColor}`,
    marginBottom: '10px',
  },
  Navbar__toolbar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
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
  Navbar__logoutButton: {
    width: '25%',
    justifySelf: 'right',
  },
}));

const handleLogout = (tempPlaylistId) => async () => {
  if (tempPlaylistId) {
    await deleteTempPlaylist(tempPlaylistId);
  }
  Cookies.remove('spotifyAuthToken');
  Cookies.remove('tempPlaylistId');
  window.location.href = '/auth';
};

function Navbar() {
  const classes = useStyles();
  const { data: userData, error, loading } = useUser();
  const { globalState, setGlobalState } = useContext(EventContext);

  const { tempPlaylistId } = globalState;

  useEffect(() => {
    if (error?.status === 401) {
      Cookies.remove('spotifyAuthToken');
    }
  }, [error]);

  //set user data in global state
  useEffect(() => {
    setGlobalState((currentState) => ({
      ...currentState,
      currentUser: userData,
    }));
  }, [userData, setGlobalState]);

  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <AppBar position='static' className={classes.Navbar__container}>
      <Toolbar className={classes.Navbar__toolbar}>
        <Typography variant='h6' className={classes.Navbar__title}>
          {`Soundtrip - ${userData?.display_name}`}
        </Typography>
        <Button
          onClick={handleLogout(tempPlaylistId)}
          variant='contained'
          className={classes.Navbar__logoutButton}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
