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

function SearchBox({ landingPage, startDate, initialLocationName }) {
  const classes = eventListStyles();
  let history = useHistory();
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [locationName, setLocationName] = useState(initialLocationName);
  const [selectedDate, setSelectedDate] = useState(startDate);

  const handleLocationChange = (location) => {
    setLat(location.lat);
    setLng(location.lng);
    setLocationName(location.name);
  };

  useEffect(() => {
    setSelectedDate(startDate);
  }, [startDate]);

  useEffect(() => {
    setLocationName(initialLocationName);
  }, [initialLocationName]);

  const handleDateChange = (dateObject) => {
    setSelectedDate(dateObject.toISOString());
  };

  const handleSubmit = () => {
    if (lat && lng && locationName && selectedDate) {
      localStorage.setItem('location-lat', lat);
      localStorage.setItem('location-lng', lng);
      localStorage.setItem('start-date', selectedDate);
      localStorage.setItem('location-name', locationName);

      history.push(`/events`, {
        lat,
        lng,
        startDate: selectedDate,
        locationName,
      });
    }
  };

  return (
    <div className={classes.searchBox__Container}>
      <LocationFinder
        initialInputValue={locationName}
        onChange={handleLocationChange}
      />
      <DatePicker
        selectedDate={selectedDate ? Date.parse(selectedDate) : null}
        setSelectedDate={handleDateChange}
      />

      <IconButton onClick={handleSubmit} aria-label='search'>
        <SearchIcon />
      </IconButton>
    </div>
  );
}

export default SearchBox;
