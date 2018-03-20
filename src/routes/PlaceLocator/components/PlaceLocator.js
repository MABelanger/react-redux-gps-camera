'use strict';
import React from 'react';
import PropTypes from 'prop-types';


import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import '../../../../node_modules/leaflet/dist/leaflet.css';

import Leaflet from 'leaflet';
Leaflet.Icon.Default.imagePath =
  '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.1.0/images/';

import Control from 'react-leaflet-control';

import utils from './utils';
import PlaceList from './PlaceList';

export default class PlaceLocator extends React.Component {

  constructor(props) {
    super(props);
    this.locateMe = this.locateMe.bind(this);
    this.onPlaceClick = this.onPlaceClick.bind(this);
  }

  onPlaceClick(place){
    this.props.setPlace(place);
  }


  locateMe() {
    this.props.clearOrderedPlaces();
    let promiseLocateMePositionStable = this.props.locateMe();

    promiseLocateMePositionStable.then(()=>{
      // trigger the PlaceList with radius of 200
      this.props.getOrderedPlaces(this.props.getPosition(), 200);
    });

    promiseLocateMePositionStable.catch((e)=>{
      console.log('catch error', e)
    });
  }

  onStop() {
    this.props.onStop();
  }

  render() {
    if(!this.props.placeLocator) {
      return(null);
    }

    let latlng = utils.getLatlng(this.props.gps.position);

    const marker = this.props.hasLocation()
      ? <Marker position={latlng}>
          <Popup>
            <div>
              <span>You are here</span><br/>
            </div>
          </Popup>
        </Marker>
      : null

    const button = this.props.gps.watchId
    ? <button onClick={ () => this.onStop() } >
         Stop
       </button>
    : <button onClick={ () => this.locateMe() } >
         Locate Me
       </button>
    const locateMeControl = this.props.gps.isSearching
     ? <span> Searching... </span>
     : button

    // onClick={this.locateMe}


    const positionError = this.props.isPositionError()
      ? <div><h4 style={{ color: 'red' }}>vous navez pas activer les permissions pour utiliser le GPS!</h4> {JSON.stringify(this.props.gps.positionError)}</div>
      : null

    /*
    zoom={19}
    */

    const orderedPlaces = this.props.placeLocator && this.props.placeLocator.orderedPlaces
      ? this.props.placeLocator.orderedPlaces
      : []

    // this.props.placeLocator.place.properties.tags.name
    // const placeListOrPlace = this.props.placeLocator.place
    //   ? <PlaceList places={[this.props.placeLocator.place]} onPlaceClick={this.onPlaceClick}/>
    //   : <PlaceList places={orderedPlaces} onPlaceClick={this.onPlaceClick}/>
    return (
      <div>
        <div className="row">
          <div className="col-sm-11">
              {positionError}
              <PlaceList places={orderedPlaces} onPlaceClick={this.onPlaceClick}/>
              <Map
                center={latlng}
                length={4}
                ref="map"
                zoom={16}>
                <TileLayer
                  attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                  url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
                {marker}
                <Control position="topleft">
                  {locateMeControl}
                </Control>
              </Map>
            </div>
            <div className="col-sm-11">

            </div>
        </div>
      </div>
    )
  }
}
