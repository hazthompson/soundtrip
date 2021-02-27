import { useContext, useEffect } from 'react';
import moment from 'moment';
import { EVENTS_QUERY } from 'utils/queries';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import GlobalStyles from 'assets/GlobalStyles';
import EventContext from 'utils/EventContext';
import Skeleton from '@material-ui/lab/Skeleton';

function CustomSkeleton({ classes }) {
  return (
    <div className={classes.eventLists__loadingContainer}>
      <Skeleton variant='rect' width={210} height={118} borderRadius={4} />
      <div className={classes.eventLists__loadingTextContainer}>
        <div style={{ gridColumn: '1 / span 2' }}>
          <Skeleton variant='text' />
          <Skeleton variant='text' />
        </div>
        <Skeleton style={{ gridColumn: '1/ span 1' }} variant='text' />
      </div>
    </div>
  );
}
const eventListStyles = makeStyles((theme) => ({
  eventLists__loadingContainer: {
    paddingTop: '10px',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    '& .MuiSkeleton-root': {
      backgroundColor: `${GlobalStyles.darkTeal}`,
      borderRadius: '4px',
    },
  },

  eventLists__loadingTextContainer: {
    gridColumn: '2/ span 2',
    paddingLeft: '10px',

    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    alignContent: 'space-between',
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
    background: `${GlobalStyles.darkTeal}`,
    color: 'white',
    marginBottom: '10px',
    borderRadius: '4px',
    height: '120px',
  },
  eventList__ticketLink: {
    color: 'white',
    fontFamily: `${GlobalStyles.headerFont}`,
    textDecoration: 'none',
    width: '50%',
    alignSelf: 'center',
    '&:hover': {
      cursor: 'pointer',
      color: `${GlobalStyles.accentOrange}`,
    },
  },
  eventList__image: {
    width: '100%',
    height: '120px',
  },
  eventList_infoContainer: {
    display: 'grid',
    textDecoration: 'none',
    gridColumn: '2 /span2',
    paddingLeft: '10px',
    paddingTop: '10px',
  },
  eventList_artistName: {
    fontWeight: 600,
  },
  eventList_eventInfo: {
    fontSize: '14px',
    fontWeight: 400,
    display: 'grid',
    alignContent: 'space-between',
  },
}));

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
  const numberOfSkeletons = 6;

  useEffect(() => {
    if (eventsData) {
      const newArtistArray = eventsData.events.map((event) => event.artistName);

      setGlobalState((currentState) => ({
        ...currentState,
        artistNames: newArtistArray,
      }));
    }
  }, [eventsData, setGlobalState]);

  return (
    <div className={classes.eventLists__container}>
      {loadingEvents
        ? [...Array(numberOfSkeletons)].map((e, i) => (
            <CustomSkeleton key={i} classes={classes} />
          ))
        : eventsData.events.map((event, index) => (
            <>
              <Card className={classes.eventLists__eventContainer} key={index}>
                <img
                  className={classes.eventList__image}
                  alt={event.artistName}
                  src={event.imageUrl}
                />
                <div className={classes.eventList_infoContainer}>
                  <div>
                    <div className={classes.eventList_artistName}>
                      {event.artistName}
                    </div>
                    <span className={classes.eventList_eventInfo}>
                      {moment(event.date).format('Do MMM')} | {event.venue}
                    </span>
                  </div>
                  <a
                    href={event.url}
                    target='_blank'
                    rel='noreferrer'
                    className={classes.eventList__ticketLink}
                  >
                    Buy tickets
                  </a>
                </div>
              </Card>
            </>
          ))}
    </div>
  );
}

export default EventsList;
