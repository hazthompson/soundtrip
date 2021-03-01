import { useContext, useEffect } from 'react';
import moment from 'moment';
import { EVENTS_QUERY } from 'utils/queries';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import GlobalStyles from 'assets/GlobalStyles';
import EventContext from 'utils/EventContext';
import EventsListSkeleton from './EventsListSkeleton';

const eventListStyles = makeStyles((theme) => ({
  eventLists__container: {
    height: '90vh',
    overflowY: 'scroll',
    gridColumn: '2 /span 4',
    gridRow: 2,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '2 /span 10',
      gridRow: 3,
    },
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

  const filterDuplicatedEvents = (events) => {
    let artistsNames = [];
    let returnArray = [];
    events.forEach((event) => {
      if (!artistsNames.includes(event.artistName)) {
        artistsNames.push(event.artistName);
        returnArray.push(event);
      }
    });
    return returnArray;
  };

  useEffect(() => {
    if (eventsData) {
      const newArtistArray = [
        ...new Set(eventsData.events.map((event) => event.artistName)),
      ];

      setGlobalState((currentState) => ({
        ...currentState,
        artistNames: newArtistArray,
      }));
    }
  }, [eventsData, setGlobalState]);

  return (
    <div className={classes.eventLists__container}>
      {loadingEvents
        ? [...Array(numberOfSkeletons)].map((e, i) => {
            return <EventsListSkeleton key={i} />;
          })
        : filterDuplicatedEvents(eventsData.events).map((event, index) => (
            <Card
              className={classes.eventLists__eventContainer}
              key={event.ticketmasterId}
            >
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
          ))}
    </div>
  );
}
// replace buyticket with ticket icon for mobile
export default EventsList;
