import { useContext, useEffect } from 'react';
import moment from 'moment';
import { EVENTS_QUERY } from 'utils/queries';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import GlobalStyles from 'assets/GlobalStyles';
import EventContext from 'utils/EventContext';

const eventListStyles = makeStyles({
  eventLists__loading: {
    color: `${GlobalStyles.titleColor}`,
  },
  eventLists__container: {
    height: '90vh',
    overflowY: 'scroll',
    gridColumn: '2 /span 4',
    gridRow: 2,
  },
  eventLists__eventContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',
    marginBottom: '10px',
    borderRadius: '15px',
  },
  eventList__ticketLink: {
    color: 'white',
    fontFamily: `${GlobalStyles.headerFont}`,
    '&:hover': {
      cursor: 'pointer',
      color: 'pink',
    },
  },
  eventList__image: {
    width: '100%',
    height: '100%',
  },
  eventList_infoContainer: {
    gridColumn: '2 /span2',
    paddingLeft: '10px',
  },
  eventList_artistName: {
    fontWeight: 600,
  },
});

function EventsList({ startDate, latLng }) {
  const classes = eventListStyles();
  const { setGlobalState } = useContext(EventContext);
  const { data: eventsData, loading: loadingEvents } = useQuery(EVENTS_QUERY, {
    variables: {
      startDate,
      lat: latLng.lat.toString(),
      lng: latLng.lng.toString(),
    },
  });

  useEffect(() => {
    if (eventsData) {
      const newArtistArray = eventsData.events.map((event) => event.artistName);

      setGlobalState((currentState) => ({
        ...currentState,
        artistNames: newArtistArray,
      }));
    }
  }, [eventsData, setGlobalState]);

  if (loadingEvents) {
    return <p className={classes.eventLists__loading}>'loading'</p>;
  } else {
    return (
      <div className={classes.eventLists__container}>
        {eventsData.events.map((event, index) => (
          <Card className={classes.eventLists__eventContainer} key={index}>
            <img
              className={classes.eventList__image}
              alt={event.artistName}
              src={event.imageUrl}
            />
            <div className={classes.eventList_infoContainer}>
              <div className={classes.eventList_artistName}>
                {event.artistName}
              </div>
              <p>{moment(event.date).format('MMM Do YYYY')}</p>
              <div>Venue: {event.venue}</div>

              <Button
                href={event.url}
                target='_blank'
                rel='noreferrer'
                className={classes.eventList__ticketLink}
              >
                Buy tickets
              </Button>
            </div>
          </Card>
        ))}
      </div>
    );
  }
}

export default EventsList;
