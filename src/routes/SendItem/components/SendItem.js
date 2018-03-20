'use strict';

const React = require('react');
import { Link } from 'react-router';

const Position = function ({position}) {
  let {latitude, longitude, accuracy} = position;
  return (
    <div>
      Latitude : {latitude}<br/>
      Longitude: {longitude}<br/>
      More or less {accuracy} meters.
    </div>
  );
}

function isItemValid(dataItem) {
  console.log('dataItem', dataItem)
  return ( dataItem.dataUri &&
          dataItem.position &&
          dataItem.itemName );
}

export const SendItem = function ({itemDetail={}, placeLocator={}, mediaStream={}, locator={}, sendItem={}, gps={}, postDataItem, clearStore, setPlaces, setPosition}) {

  let dataItem = {
    dataUri : mediaStream.dataUri || "",
    position : gps.position || {},
    place : gps.place || {},
    itemName : itemDetail.itemName || ""
  }

  const placeName = gps.place
    ? <div>{gps.place.properties.tags.name}</div>
    : null

  const itemName = itemDetail.itemName
    ? <div>{dataItem.itemName}</div>
    : null

  const image = mediaStream.dataUri
    ? <img src={ mediaStream.dataUri} width="100" />
    : null

  const position = gps.position
    ? <Position position={gps.position}/>
    : null

   const buttonPost = sendItem.isPosting
     ? <span> posting ... </span>
     : sendItem.isPosted
        ? <span> thank You!
            <br/>
            <Link onClick={(e)=>{
              clearStore();
              setPlaces([dataItem.place]);
              setPosition(dataItem.position)
              }}
              to='/searchItem'><u>Search Your item</u>{'->'}
            </Link>
          </span>
        : <button onClick={ (e)=>{postDataItem(dataItem)} }> postDataItem </button>

    const error = sendItem.error && sendItem.error.msg
      ? <h4 style={{ color: 'red' }}>{sendItem.error.msg}</h4>
      : null

  return (
    <div className="container">
      {error}
      {placeName}
      {itemName}
      {position}
      {image}
      <br/>
      <br/>
      {buttonPost}
      <br/>
    </div>
  );
}

export default SendItem;
