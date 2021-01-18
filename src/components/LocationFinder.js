import { useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

// const useStyles = makeStyles({
//   eventLists__container: {
//     gridColumn: '5 /span 3',
//     width: '100%',
//     height: '500px',
//   },
// });

function LocationFinder() {
  // const classes = useStyles();
  const [address, setAddress] = useState('');

  function handleChange(value) {
    console.log('CHANGE', value);
    setAddress(value);
  }

  function handleSelect(value) {
    console.log('SELECT', value);
    geocodeByAddress(value)
      .then(
        (results) => console.log('results', results) && getLatLng(results[0])
      )
      .then((latLng) => console.log('Success', latLng))
      .catch((error) => console.error('Error', error));
  }

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...getInputProps({
              placeholder: 'Search Places ...',
              className: 'location-search-input',
            })}
          />
          <div className='autocomplete-dropdown-container'>
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                : { backgroundColor: '#ffffff', cursor: 'pointer' };
              return (
                <div
                  key={suggestion.placeId}
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}

export default LocationFinder;
