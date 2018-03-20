'use strict';


function getLatlng(position) {

  if(position){
    let {latitude, longitude, accuracy} = position;
    let latlng = {lat: latitude, lng: longitude};
    return latlng;
  }
  return {lat: 0, lng: 0};
}

function getPosition(latlng){

  if(latlng) {
    let {lat, lng} = latlng
    let position = {
      latitude: lat,
      longitude: lng
    }
    return position;
  }
  return {
    latitude: 0,
    longitude: 0
  };
}

function getDataPosition(positionEvent) {
  let {
  latitude,
  longitude,
  accuracy,
  altitude,
  altitudeAccuracy,
  heading,
  speed } = positionEvent.coords;

  let {timestamp} = positionEvent;

  let dataPosition = {
    latitude,
    longitude,
    accuracy,
    altitude,
    altitudeAccuracy,
    heading,
    speed,
    timestamp
  };
  return dataPosition;
}

module.exports = {
  getLatlng,
  getPosition,
  getDataPosition
};
