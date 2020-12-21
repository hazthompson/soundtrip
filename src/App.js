import { makeStyles } from '@material-ui/core/styles';
import GlobalStyles from 'assets/GlobalStyles';
import EventsList from 'components/EventsList';
import LocationFinder from 'components/LocationFinder';
import Playlist from 'components/Playlist';
import Navbar from 'components/Navbar';

const useStyles = makeStyles({
  App: {
    fontFamily: `${GlobalStyles.bodyFont}`,
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    backgroundColor: `${GlobalStyles.backgroundColor}`,
    minHeight: '100vh',
  },
  App__header: {
    fontFamily: `${GlobalStyles.headerFont}`,
    gridColumn: '1 /span 12',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '30px',
    color: `${GlobalStyles.titleColor}`,
  },
});

function App() {
  const classes = useStyles();
  return (
    <div className={classes.App}>
      <Navbar />
      <EventsList />
      <LocationFinder />
      <Playlist />
    </div>
  );
}

export default App;
