import { useEffect } from 'react';
import { useUser } from 'react-spotify-api';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Cookies from 'js-cookie';

import GlobalStyles from 'assets/GlobalStyles';
// import LogoutRoute from 'components/LogoutRoute';

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

function Navbar() {
  const classes = useStyles();
  const { data: userData, error, loading } = useUser();
  console.log('error', error);

  useEffect(() => {
    if (error?.status === 401) {
      console.log('1', Cookies.get('spotifyAuthToken'));
      //  Cookies.remove('spotifyAuthToken');
      // window.location.href = '/auth';
      console.log('2', Cookies.get('spotifyAuthToken'));
      // setHasRemovedCookie(true);
    }
  }, [error]);

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
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
