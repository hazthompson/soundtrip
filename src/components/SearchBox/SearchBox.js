import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import DatePicker from 'components/SearchBox/DatePicker';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import LocationFinder from 'components/SearchBox/LocationFinder';

const eventListStyles = makeStyles((theme) => ({
  searchBox__Container: {
    gridColumn: '4 /span 6',
    gridRow: 1,
    justifyContent: 'center',
    backgroundColor: theme.palette.grey[200],
    borderRadius: '50px',
    marginBottom: '50px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 60px',
  },
}));

function SearchBox({ landingPage, startDate }) {
  const classes = eventListStyles();
  let history = useHistory();
  const [latLng, setLatLng] = useState();
  const [selectedDate, setSelectedDate] = useState(startDate);

  useEffect(() => {
    setSelectedDate(startDate);
  }, [startDate]);

  const handleSubmit = () => {
    if (latLng.lat && latLng.lng) {
      console.log('date', selectedDate);

      localStorage.setItem('location-lat', latLng.lat);
      localStorage.setItem('location-lng', latLng.lng);
      localStorage.setItem('start-date', selectedDate.toISOString());

      history.push(`/events`, {
        lat: latLng.lat,
        lng: latLng.lng,
        startDate: selectedDate.toISOString(),
      });
    }
  };

  return (
    <div className={classes.searchBox__Container}>
      <LocationFinder setLatLng={setLatLng} />
      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <IconButton onClick={handleSubmit} aria-label='search'>
        <SearchIcon />
      </IconButton>
    </div>
  );
}

export default SearchBox;
