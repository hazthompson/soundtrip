import React from 'react';
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

  Navar__locationContainer: {
    fontFamily: `${GlobalStyles.headerFont}`,
    justifySelf: 'center',
    fontSize: '30px',
    color: `${GlobalStyles.titleColor}`,
    display: 'flex',
  },
  Navbar__icon: {
    fontFamily: `${GlobalStyles.headerFont}`,
    justifySelf: 'center',
    color: `${GlobalStyles.titleColor}`,
  },
  Navbar__location: {
    fontFamily: `${GlobalStyles.headerFont}`,
    justifySelf: 'center',
    fontSize: '30px',
    color: `${GlobalStyles.titleColor}`,
    display: 'inline',
    fontWeight: '300',
  },
}));

function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position='static' className={classes.Navbar__container}>
      <Toolbar className={classes.Navbar__toolbar}>
        <Typography variant='h6' className={classes.Navbar__title}>
          Soundtrip
        </Typography>
        <div className={classes.Navbar__locationContainer}>
          <LocationOnIcon />
          <p className={classes.Navbar__location}>Vancouver, BC</p>
        </div>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
