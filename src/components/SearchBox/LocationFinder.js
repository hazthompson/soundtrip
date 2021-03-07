import { useState, useEffect, useMemo } from 'react';
import TextField from '@material-ui/core/TextField';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';
import { geocodeByAddress } from 'react-places-autocomplete';
import { useWindowSize } from 'utils/hooks';

const autocompleteService = { current: null };

const useStyles = makeStyles((theme) => ({
  locationFinder: {
    marginTop: 16, //matching materialUI datepicker margin top and bottom for alignement
    marginBottom: 8, //matching materialUI datepicker margin top and bottom for alignement
    [theme.breakpoints.up('s')]: {
      paddingRight: 15,
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: 15,
      PaddingRight: 0,
    },
  },
  locationFinder__icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
  input: {
    backgroundColor: theme.palette.grey[200],
  },
}));

export default function LocationFinder({ onChange, initialInputValue }) {
  const classes = useStyles();
  const { isMobile } = useWindowSize();
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState(initialInputValue || '');
  const [options, setOptions] = useState([]);

  const fetch = useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 200),
    []
  );

  useEffect(() => {
    setInputValue(initialInputValue || '');
  }, [initialInputValue]);

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  function handleSelect(value) {
    geocodeByAddress(value)
      .then((results) => {
        onChange({
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
          name: results[0].formatted_address,
        });
      })
      .catch((error) => console.error('Error', error));
  }

  const handleChange = (event, newValue) => {
    setOptions(newValue ? [newValue, ...options] : options);
    setValue(newValue);
    if (newValue) {
      handleSelect(newValue.description);
    }
  };

  return (
    <Autocomplete
      className={classes.locationFinder}
      fullWidth
      id='google-map-location-search'
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      inputValue={inputValue}
      onChange={handleChange}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={isMobile ? '' : 'Choose your location'}
          variant={isMobile ? 'outlined' : 'standard'}
          fullWidth
          InputProps={{
            className: classes.input,
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
      renderOption={(option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length])
        );

        return (
          <Grid container alignItems='center'>
            <Grid item>
              <LocationOnIcon className={classes.locationFinder__icon} />
            </Grid>
            <Grid item xs>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{ fontWeight: part.highlight ? 700 : 400 }}
                >
                  {part.text}
                </span>
              ))}

              <Typography variant='body2' color='textSecondary'>
                {option.structured_formatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
}
