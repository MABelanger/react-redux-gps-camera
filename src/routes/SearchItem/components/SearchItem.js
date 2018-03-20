'use strict';
import React from 'react';
import PropTypes from 'prop-types';

import Slider from './Slider';
import InputSearch from './forms/input-search';
import ItemList from './ItemList';

import { Map, TileLayer, Marker, Circle, Popup } from 'react-leaflet';
import '../../../../node_modules/leaflet/dist/leaflet.css';

import Leaflet from 'leaflet';
Leaflet.Icon.Default.imagePath =
  '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.1.0/images/';

import Control from 'react-leaflet-control';


function _getLatlng(position) {

  if(position){
    let {latitude, longitude, accuracy} = position;
    let latlng = {lat: latitude, lng: longitude};
    return latlng;
  }
  return {lat: 0, lng: 0};
}

function _getZoom(setItemsRadiusSearch) {
  if(setItemsRadiusSearch == 230){
    return 6;
  }else if(setItemsRadiusSearch == 30){
    return 9;
  }else if(setItemsRadiusSearch == 7){
    return 11;
  }else if(setItemsRadiusSearch == 1){
    return 14;
  }

}

export default class SearchItem extends React.Component {

  constructor(props) {
    super(props);
    this.locateMe = this.locateMe.bind(this);
  }


  locateMe() {
    let promiseLocateMePositionStable = this.props.locateMe();
    promiseLocateMePositionStable.then(()=>{
      console.log('Ok promiseLocateMePositionStable')
    });
    promiseLocateMePositionStable.catch((e)=>{
      console.log('catch error', e)
    });
  }

  onStop() {
    this.props.onStop();
  }

  render() {
    if(!this.props.searchItem || !this.props.gps) {
      return(null);
    }

    let latlng = _getLatlng(this.props.gps.position);

    const marker = this.props.hasLocation()
      ? <Marker position={latlng}>
          <Popup>
            <div>
              <span>You are here</span><br/>
            </div>
          </Popup>
        </Marker>
      : null

    const circle = this.props.hasLocation()
      ? <Circle center={latlng} radius={this.props.searchItem.itemsRadiusSearch * 1000}>

        </Circle>
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

    return (
      <div>
        <Slider setItemsRadiusSearch={this.props.setItemsRadiusSearch}/>
        {positionError}
        <Map
          center={latlng}
          scrollWheelZoom={false}
          touchZoom={false}
          dragging={false}
          length={4}
          ref="map"
          zoom={_getZoom(this.props.searchItem.itemsRadiusSearch)}
          >
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          {marker}
          {circle}
          <Control position="topleft" >
            {locateMeControl}
          </Control>
        </Map>
        <br/>
        <br/>
        <h4>Items</h4>
        <InputSearch
          search={this.props.search}
          inputSearchValue={this.props.searchItem.inputSearchValue}
          setInputSearchValue={this.props.setInputSearchValue}
          itemNames={this.props.searchItem.itemNames}
          getAutocompleteItemNames={this.props.getAutocompleteItemNames}
          setSuggestions={this.props.setSuggestions}
          suggestions={this.props.searchItem.suggestions}
        />
        <br/>
        <div>
          <ItemList items={this.props.searchItem.items}/>
        </div>
      </div>
    )
  }
}
