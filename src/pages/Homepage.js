import EventsList from 'components/EventsList';
import LocationFinder from 'components/LocationFinder';
import Playlist from 'components/Playlist';
import DatePicker from 'components/DatePicker';
import { makeStyles } from '@material-ui/core/styles';
import { EVENTS_QUERY } from 'utils/queries';
import { useQuery } from '@apollo/client';

const eventListStyles = makeStyles({
  homepage: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    justifySelf: 'center',
  },
  homepage__locationDateContainer: {
    display: 'grid',
    gridTemplateRows: '150px 1fr',
    gridColumn: '6 /span 2',
    justifyContent: 'center',
  },
});

function Homepage() {
  const classes = eventListStyles();
  const { data: eventsData, loading: loadingEvents } = useQuery(EVENTS_QUERY);
  if (loadingEvents) {
    return <p className={classes.eventLists__loading}>'loading'</p>;
  } else {
    return (
      <div className={classes.homepage}>
        <EventsList eventsData={eventsData} />
        <div className={classes.homepage__locationDateContainer}>
          <LocationFinder />
          <DatePicker />
        </div>
        <Playlist />
      </div>
    );
  }
}

export default Homepage;
