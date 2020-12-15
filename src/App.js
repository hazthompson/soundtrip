import { makeStyles } from '@material-ui/core/styles';
import GlobalStyles from 'assets/GlobalStyles';
import EventsList from 'components/EventsList';
import Playlist from 'components/Playlist';

const appStyles = makeStyles({
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
  const classes = appStyles();
  return (
    <div className={classes.App}>
      <header className={classes.App__header}>Soundtrip</header>
      <EventsList />
      <Playlist />
    </div>
  );
}

export default App;
