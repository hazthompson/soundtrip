import { EVENTS_QUERY } from 'utils/queries';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import GlobalStyles from 'assets/GlobalStyles';

const eventListStyles = makeStyles({
  eventLists__loading: {
    color: `${GlobalStyles.titleColor}`,
  },
  eventLists__container: {
    height: '90vh',
    overflowY: 'scroll',
    gridColumn: '2 /span 3',
  },
  eventLists__eventContainer: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',
  },
  eventList__ticketLink: {
    color: 'white',
    '&:hover': {
      cursor: 'pointer',
      color: 'pink',
    },
  },
  eventList__image: {
    width: '200px',
    height: '150px',
  },
});

function EventsList() {
  const classes = eventListStyles();
  const { loading, data } = useQuery(EVENTS_QUERY);

  return (
    <div className={classes.eventLists__container}>
      {loading ? (
        <p className={classes.eventLists__loading}>'loading'</p>
      ) : (
        data.events.map((event, index) => (
          <div className={classes.eventLists__eventContainer} key={index}>
            <img
              className={classes.eventList__image}
              alt={event.artistName}
              src={event.imageUrl}
            />
            <p>{event.artistName}</p>
            <p>{event.date}</p>
            <p>Venue: {event.venue}</p>
            <p>
              Buy tickets here:{' '}
              <a
                href={event.url}
                target='_blank'
                rel='noreferrer'
                className={classes.eventList__ticketLink}
              >
                {event.url}
              </a>
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default EventsList;
