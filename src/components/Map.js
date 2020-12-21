import React, { Component } from 'react';
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  InfoWindow,
} from 'react-google-maps';
import Autocomplete from 'react-google-autocomplete';
import Geocode from 'react-geocode';
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
Geocode.enableDebug();
const styles = require('assets/map.json');
// var headphone = require('./icons8-headphones-24.png');

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      city: '',
      area: '',
      state: '',
      mapPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng,
      },
      markerPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng,
      },
    };
  }
  /**
   * Get the current address from the default map position and set those values in the state
   */
  componentDidMount() {
    Geocode.fromLatLng(
      this.state.mapPosition.lat,
      this.state.mapPosition.lng
    ).then(
      (response) => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = this.getCity(addressArray),
          area = this.getArea(addressArray),
          state = this.getState(addressArray);
        this.setState({
          address: address ? address : '',
          area: area ? area : '',
          city: city ? city : '',
          state: state ? state : '',
        });
        this.props.setLocation(this.state);
      },

      (error) => {
        console.error('Geocode Error', error);
      }
    );
  }
  /**
   * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
   *
   * @param nextProps
   * @param nextState
   * @return {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.markerPosition.lat !== this.props.center.lat ||
      this.state.address !== nextState.address ||
      this.state.city !== nextState.city ||
      this.state.area !== nextState.area ||
      this.state.state !== nextState.state
    ) {
      this.props.setLocation(nextState);
      return true;
    } else if (this.props.center.lat === nextProps.center.lat) {
      return false;
    }
  }
  /**
   * Get the city and set the city input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getCity = (addressArray) => {
    let city = '';
    for (let i = 0; i < addressArray.length; i++) {
      if (
        addressArray[i].types[0] &&
        'administrative_area_level_2' === addressArray[i].types[0]
      ) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };
  /**
   * Get the area and set the area input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getArea = (addressArray) => {
    let area = '';
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if (
            'sublocality_level_1' === addressArray[i].types[j] ||
            'locality' === addressArray[i].types[j]
          ) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };
  /**
   * Get the address and set the address input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getState = (addressArray) => {
    let state = '';
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          'administrative_area_level_1' === addressArray[i].types[0]
        ) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  };

  /**
   * And function for city and address input
   * @param event
   */
  onChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };
  /**
   * This Event triggers when the marker window is closed
   *
   * @param event
   */
  onInfoWindowClose = (event) => {};

  /**
   * When the marker is dragged you get the lat and long using the functions available from event object.
   * Use geocode to get the address, city, area from the lat and lng positions.
   * And then set those values in the state.
   *
   * @param event
   */
  onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng();

    Geocode.fromLatLng(newLat, newLng).then(
      (response) => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = this.getCity(addressArray),
          area = this.getArea(addressArray),
          state = this.getState(addressArray);
        this.setState({
          address: address ? address : '',
          area: area ? area : '',
          city: city ? city : '',
          state: state ? state : '',
        });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  /**
   * When the user types an address in the search box
   * @param place
   */
  onPlaceSelected = (place) => {
    const address = place.formatted_address,
      addressArray = place.address_components,
      city = this.getCity(addressArray),
      area = this.getArea(addressArray),
      state = this.getState(addressArray),
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();
    // Set these values in the state.
    this.setState({
      address: address ? address : '',
      area: area ? area : '',
      city: city ? city : '',
      state: state ? state : '',
      markerPosition: {
        lat: latValue,
        lng: lngValue,
      },
      mapPosition: {
        lat: latValue,
        lng: lngValue,
      },
    });
  };

  render() {
    const AsyncMap = withScriptjs(
      withGoogleMap((props) => (
        <div className='map-container'>
          <Autocomplete
            onPlaceSelected={this.onPlaceSelected}
            types={['(regions)']}
            style={{
              width: '100%',
              height: '40px',
              display: 'flex',
              paddingleft: '16px',
              marginTop: '-40px',
            }}
          />
          <GoogleMap
            google={this.props.google}
            defaultZoom={this.props.zoom}
            defaultCenter={{
              lat: this.state.mapPosition.lat,
              lng: this.state.mapPosition.lng,
            }}
            defaultOptions={{ styles: styles }}
          >
            <InfoWindow
              onClose={this.onInfoWindowClose}
              position={{
                lat: this.state.markerPosition.lat,
                lng: this.state.markerPosition.lng,
              }}
            >
              <div>
                <span style={{ padding: 0, margin: 0 }}>
                  {this.state.area + ', ' + this.state.state}
                </span>
              </div>
            </InfoWindow>
            {/*Marker*/}
            <Marker
              google={this.props.google}
              options={{ icon: 'headphone' }}
              draggable={true}
              onDragEnd={this.onMarkerDragEnd}
              position={{
                lat: this.state.markerPosition.lat,
                lng: this.state.markerPosition.lng,
              }}
            />
            <Marker />
          </GoogleMap>
        </div>
      ))
    );
    let map;
    if (this.props.center.lat !== undefined) {
      map = (
        <div>
          <div></div>
          <div className='map-display'>
            <AsyncMap
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`}
              loadingElement={
                <div
                  style={{
                    height: `100%`,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                />
              }
              containerElement={<div style={{ height: this.props.height }} />}
              mapElement={
                <div
                  style={{
                    height: `95%`,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                />
              }
            />
          </div>
        </div>
      );
    } else {
      map = <div style={{ height: this.props.height }} />;
    }
    return map;
  }
}

export default Map;
