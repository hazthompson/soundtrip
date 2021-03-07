import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import DatePicker from 'components/SearchBox/DatePicker';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import LocationFinder from 'components/SearchBox/LocationFinder';
import { useWindowSize } from 'utils/hooks';

const searchBoxStyles = makeStyles((theme) => ({
  searchBox__Container: {
    gridColumn: '4 /span 6',
    gridRow: 1,
    justifyContent: 'center',
    backgroundColor: theme.palette.grey[200],
    borderRadius: 50,
    marginBottom: 50,
    paddingLeft: 25,
    display: 'grid',
    [theme.breakpoints.up('xs')]: {
      display: 'grid',
      gridTemplateColumns: '45% 45% 25px',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'grid',
      gridColumn: '2 /span 10',
    },
    searchBox__icon: {
      [theme.breakpoints.down('xs')]: {
        display: 'grid',
        justifySelf: 'center',
        gridColumn: '1 / span2',
      },
    },
  },
  searchBox__mobileContainer: {
    justifyContent: 'center',
    gridColumn: '3 / span 8',
    alignSelf: 'center',

    searchBox__icon: {
      [theme.breakpoints.down('xs')]: {
        display: 'grid',
        justifySelf: 'center',
        backgroundColor: theme.palette.grey[200],
      },
      MuiSvgIcon: {
        root: {
          color: theme.palette.grey[200],
        },
      },
    },
  },
}));

function SearchBox({ startDate, initialLocationName, landingPage }) {
  const classes = searchBoxStyles();
  const { isMobile } = useWindowSize();
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
    if (isMobile && !landingPage) {
      history.push('/');
    }
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

  return isMobile ? (
    <Box
      className={classes.searchBox__mobileContainer}
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
    >
      {landingPage && (
        <>
          <LocationFinder
            initialInputValue={locationName}
            onChange={handleLocationChange}
          />

          <DatePicker
            selectedDate={selectedDate ? Date.parse(selectedDate) : null}
            setSelectedDate={handleDateChange}
          />
        </>
      )}
      <Box mt={1} mb={5}>
        <Button
          size='large'
          onClick={handleSubmit}
          aria-label='search'
          className={classes.searchBox__icon}
          variant='contained'
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
      </Box>
    </Box>
  ) : (
    <div className={classes.searchBox__Container}>
      <LocationFinder
        initialInputValue={locationName}
        onChange={handleLocationChange}
      />
      <DatePicker
        selectedDate={selectedDate ? Date.parse(selectedDate) : null}
        setSelectedDate={handleDateChange}
      />

      <IconButton
        onClick={handleSubmit}
        aria-label='search'
        className={classes.searchBox__icon}
      >
        <SearchIcon />
      </IconButton>
    </div>
  );
}

export default SearchBox;
