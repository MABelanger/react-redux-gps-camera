'use strict';
import React from 'react';
import { IndexLink, Link } from 'react-router';

require('./styles/placeList.scss');
const constants = require('./constants');

const Place = ({place, distance, onPlaceClick}) => {
  if(distance){
    distance = parseFloat(Math.round(place.distance * 10) / 10).toFixed(1);
  }

  let distanceM = distance
    ? <small>({distance}m)</small>
    : null
  return (
    <li>
      <Link to='/itemDetail' onClick={(e)=>{
        onPlaceClick(place);
        }}>{place.properties.tags.name} {distanceM}
      </Link>
    </li>
  )
}

const OtherPlace = ({onPlaceClick}) => {
  let place = constants.OTHER_PLACE;
  let distance = null;
  return (
    <Place place={place} distance={distance} onPlaceClick={onPlaceClick}/>
  )
}

function _isOtherPlaceInPlaceList(placeList){
  if(placeList.length > 0 ) {
    return (constants.OTHER_PLACE.properties.tags.name == placeList[0].properties.tags.name);
  }
  return false;
}

const Places = ({placeList, onPlaceClick}) => {

  // TODO:. tempory hack, need to find solution to add other...
  if(placeList.length > 0 && !_isOtherPlaceInPlaceList(placeList)) {
    placeList = [...placeList, constants.OTHER_PLACE];
  }
  return placeList.length > 0
    ? <div>
        <h3>Places Near You</h3>
        <ul className="col-centered">
          { placeList.map((place)=>{
            return (
              <Place key={place.properties.tags.name} place={place} distance={place.distance} onPlaceClick={onPlaceClick}/>
            )
          })}
        </ul>
      </div>
  : <ul className="col-centered"><li>Searching places...</li></ul>
}

const PlaceList = function ({places, onPlaceClick}) {
  return (
    <div className="row">
      <div className="col-sm-12">
        <Places placeList={places} onPlaceClick={onPlaceClick}/>
      </div>
    </div>
  );
}

export default PlaceList;
