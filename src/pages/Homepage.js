import { useState } from 'react';

import DatePicker from 'components/DatePicker';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EventsList from 'components/EventsList';
import LocationFinder from 'components/LocationFinder';
import Playlist from 'components/Playlist';

const eventListStyles = makeStyles({
  homepage: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    justifySelf: 'center',
  },
  homepage__locationDateContainer: {
    display: 'grid',
    gridColumn: '6 /span 2',
    justifyContent: 'center',
    maxHeight: '50%',
  },
});

function Homepage() {
  const classes = eventListStyles();

  const [latLng, setLatLng] = useState({});
  const [selectedDate, setSelectedDate] = useState();

  const handleSubmit = () => {
    console.log('LATLNG', latLng);
    console.log('current date', selectedDate);
  };

  return (
    <div className={classes.homepage}>
      <EventsList startDate={selectedDate} />
      <div className={classes.homepage__locationDateContainer}>
        <LocationFinder setLatLng={setLatLng} />
        <DatePicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <Button onClick={handleSubmit} variant='contained'>
          Submit
        </Button>
      </div>
      <Playlist />
    </div>
  );
}

export default Homepage;
