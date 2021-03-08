import { useEffect, useContext, useState } from 'react';
import { useUser } from 'react-spotify-api';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SettingsIcon from '@material-ui/icons/Settings';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Cookies from 'js-cookie';
import EventContext from 'utils/EventContext';
import { deleteTempPlaylist } from 'utils/spotifyHelpers';
import { useWindowSize } from 'utils/hooks';

import GlobalStyles from 'assets/GlobalStyles';

const useStyles = makeStyles((theme) => ({
  Navbar__container: {
    gridColumn: '1 /span 12',
    backgroundColor: `${GlobalStyles.backgroundColor}`,
    marginBottom: 10,
    boxShadow: 'none',
  },
  Navbar__toolbar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    backgroundColor: `${GlobalStyles.darkBlue}`,
  },

  Navbar__logo: {
    fontFamily: `${GlobalStyles.logo}`,
    fontSize: 40,
    color: `${GlobalStyles.accentOrange}`,
  },

  Navbar__locationContainer: {
    fontFamily: `${GlobalStyles.headerFont}`,
    display: 'flex',
    justifyContent: 'center',
    fontSize: 30,
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
  Navbar__optionsDropDown: {
    justifySelf: 'right',
    color: theme.palette.grey[200],
    border: `${GlobalStyles.accentOrange}`,
    fontFamily: `${GlobalStyles.bodyFont}`,
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
  const { isMobile } = useWindowSize();
  const { data: userData, error, loading } = useUser();
  const { globalState, setGlobalState } = useContext(EventContext);
  const [anchorEl, setAnchorEl] = useState(null);
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

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (loading) {
    return <p>Loading</p>;
  } else {
    return (
      <AppBar position='static' className={classes.Navbar__container}>
        <Toolbar className={classes.Navbar__toolbar}>
          <Typography variant='h6' className={classes.Navbar__logo}>
            Soundtrip
          </Typography>
          <Button
            variant='outlined'
            aria-controls='simple-menu'
            aria-haspopup='true'
            onClick={handleMenuClick}
            className={classes.Navbar__optionsDropDown}
          >
            {isMobile ? (
              <SettingsIcon />
            ) : (
              <>
                <span>{userData?.display_name.toUpperCase()}</span>
                <ArrowDropDownIcon style={{ fill: '#eeeeee' }} />
              </>
            )}
          </Button>
          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Saved playlists</MenuItem>
            <MenuItem onClick={handleLogout(tempPlaylistId)}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    );
  }
}
export default Navbar;
