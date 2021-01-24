import moment from 'moment';
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
    padding: '1%',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',
    marginBottom: '10px',
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

  eventList_artistName: {
    fontWeight: 600,
  },
});

function EventsList({ eventsData }) {
  const classes = eventListStyles();
  const { data: eventsData, loading: loadingEvents } = useQuery(EVENTS_QUERY, {
    variables: { startDate },
  });

  if (loadingEvents) {
    return <p className={classes.eventLists__loading}>'loading'</p>;
  } else {
    return (
      <div className={classes.eventLists__container}>
        {eventsData.events.map((event, index) => (
          <div className={classes.eventLists__eventContainer} key={index}>
            <img
              className={classes.eventList__image}
              alt={event.artistName}
              src={event.imageUrl}
            />
            <div className={classes.eventList_artistName}>
              {event.artistName}
            </div>
            <p>{moment(event.date).format('MMM Do YYYY')}</p>
            <div>Venue: {event.venue}</div>
            <div>
              Buy tickets here:{' '}
              <a
                href={event.url}
                target='_blank'
                rel='noreferrer'
                className={classes.eventList__ticketLink}
              >
                {event.url}
              </a>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default EventsList;
