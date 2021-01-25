import React from 'react';
import { useUser } from 'react-spotify-api';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GlobalStyles from 'assets/GlobalStyles';
import LocationOnIcon from '@material-ui/icons/LocationOn';

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
  const { data: userData, loading } = useUser();

  if (loading) {
    <p>Loading</p>;
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
