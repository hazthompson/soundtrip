import EventsList from 'components/EventsList';
import LocationFinder from 'components/LocationFinder';
import Playlist from 'components/Playlist';
import DatePicker from 'components/DatePicker';
import { makeStyles } from '@material-ui/core/styles';

const eventListStyles = makeStyles({
  homepage: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    justifySelf: 'center',
  },
});

function Homepage() {
  const classes = eventListStyles();

  return (
    <div className={classes.homepage}>
      <EventsList />
      <LocationFinder />
      <DatePicker />
      <Playlist />
    </div>
  );
}

export default Homepage;
