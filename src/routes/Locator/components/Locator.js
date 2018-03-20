import React from 'react';
import PropTypes from 'prop-types';

const Form = require('./forms/Form').default;
const Locations = require('./Locations').default;
export default class Locator extends React.Component {

  constructor(props) {
    super(props);

    this.isSearching = false;
    this.watchId = null;
    this.isPositionFound = false;

    this.options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    };
    this.locations = [];

    this.onWatchPosition = this.onWatchPosition.bind(this);
    this.onStop = this.onStop.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onApply = this.onApply.bind(this);
    this.onError = this.onError.bind(this);

  }

  componentDidMount() {

  }

  isSuccess(position) {
    return (position && !!position.latitude);
  }

  isError(positionError) {
    return (positionError && !!positionError.code);
  }

  onSuccess(position) {

    this.isSearching = false;
    this.isPositionFound = true;
    let {latitude, longitude, accuracy, altitude, altitudeAccuracy, heading, speed} = position.coords;
    let timestamp = position.timestamp;

    let newCoordinate = {
      latitude,
      longitude,
      accuracy,
      altitude,
      altitudeAccuracy,
      heading,
      speed,
      timestamp
    };

    let {enableHighAccuracy, timeout, maximumAge} = this.options;

    enableHighAccuracy = enableHighAccuracy || false;
    let newLocation = Object.assign(newCoordinate,{
      enableHighAccuracy,
      timeout,
      maximumAge
    });


    this.props.savePosition(newCoordinate);
    this.locations.push(newLocation);
    this.props.setPositionError({})
  }

  onError(positionError) {
    this.isSearching = false;
    this.isPositionFound = false;
    let {code, message} = positionError;

    let newPositionError = {
      code,
      message
    };

    this.props.setPositionError(newPositionError)
    this.props.savePosition({});
  };

  onApply(options) {
    this.options = options;
  }

  onWatchPosition() {
    // Clear all position and error
    this.props.savePosition({});
    this.props.setPositionError({});
    this.isSearching = true;

    this.watchId = navigator.geolocation.watchPosition(this.onSuccess, this.onError, this.options);
  }

  onStop() {
    navigator.geolocation.clearWatch(this.watchId);
    this.isPositionFound = false;
    this.setState({})
  }

  renderCoordinates(position) {
    let {latitude, longitude, accuracy, altitude, altitudeAccuracy, heading, speed, timestamp} = position;
    return (
      <div>
        Latitude : {latitude}<br/>
        Longitude: {longitude}<br/>
        More or less {accuracy} meters.<br/>
        altitude: {altitude}<br/>
        altitudeAccuracy: {altitudeAccuracy}<br/>
        heading: {heading}<br/>
        speed: {speed}<br/>
        timestamp: {timestamp}<br/>
      </div>
    );
  }

  renderError(positionError) {
    let {code, message} = positionError;
    return (
      <div>
        Error code : {positionError.code} <br/>
        Error Message : {positionError.message}
      </div>
    );
  }

  renderButton(onClick, label) {
    return (
      <button onClick={onClick}>{label}</button>
    );
  }

  render() {
    let renderResult = null;
    let button = null;
    let cb = this.onStop;
    if (this.isSuccess(this.props.locator.position)) {
      renderResult = this.renderCoordinates(this.props.locator.position);

    }else if(this.isError(this.props.locator.positionError)) {
      renderResult = this.renderError(this.props.locator.positionError);
    }

    if(!this.isSearching) {
      if(this.isPositionFound){
        button = this.renderButton(this.onStop, 'stop...');
      } else {
        button = this.renderButton(this.onWatchPosition, 'watchPosition');
      }
    } else {
      button = (<span> Searching... </span>)
    }
    return (
      <div>
        <Form apply={this.onApply}/>
        {button}
        {renderResult} <br/>
        <Locations locations={this.locations}/>
      </div>
    );
  }
}
