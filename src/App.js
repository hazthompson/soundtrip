import EventsList from 'components/EventsList';
import { makeStyles } from '@material-ui/core/styles';
import GlobalStyles from 'assets/GlobalStyles';

const appStyles = makeStyles({
  App: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    backgroundColor: `${GlobalStyles.backgroundColor}`,
    minHeight: '100vh',
  },
  App__header: {
    gridColumn: '1 /span 12',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '30px',
    color: `${GlobalStyles.titleColor}`,
    fontWeight: 'bolder',
  },
});

function App() {
  const classes = appStyles();
  return (
    <div className={classes.App}>
      <header className={classes.App__header}>
        <p>Soundtrip</p>
      </header>
      <EventsList />
    </div>
  );
}

export default App;
