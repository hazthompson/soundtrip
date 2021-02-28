import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import DatePicker from 'components/SearchBox/DatePicker';
import { getDate, getMonth, getYear } from 'date-fns';
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
    console.log('search box', startDate);
    setSelectedDate(startDate);
  }, [startDate]);

  const handleSubmit = () => {
    if (latLng.lat && latLng.lng) {
      console.log('date', selectedDate);
      const year = getYear(selectedDate);
      const month = getMonth(selectedDate) + 1;
      const day = getDate(selectedDate);
      console.log('year', { year: year, month: month, day: day });

      history.push(
        `/search/${latLng.lat}/${latLng.lng}/${year}/${month}/${day}`
      );
    } else {
      console.log('latlng', latLng);
    }
  };

  useEffect(() => {
    console.log('changing');
  }, [landingPage]);

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
