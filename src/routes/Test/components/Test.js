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

export const Test = function ({itemDetail={}, placeLocator={}, mediaStream={}, locator={}, test={}, postDataItem, clearStore}) {

  let dataItem = {
    dataUri : mediaStream.dataUri || "",
    position : placeLocator.position || {},
    name : itemDetail.name || ""
  }

  const name = itemDetail.name
    ? <div>{dataItem.name}</div>
    : null

  const image = mediaStream.dataUri
    ? <img src={ mediaStream.dataUri} width="100" />
    : null

  const position = placeLocator.position
    ? <Position position={placeLocator.position}/>
    : null

   const buttonPost = test.isPosting
     ? <span> posting ... </span>
     : test.isPosted || !(dataItem.dataUri && dataItem.position && dataItem.name) && false
        ? <span> thank You <Link onClick={(e)=>{clearStore()}} to='/mediaStream'> {'<-'} Add another item</Link></span>
        : <button onClick={ (e)=>{postDataItem(dataItem)} }> postDataItem </button>

  return (
    <div className="container">

      {name}
      {position}
      {image}
      <br/>
      <br/>
      {buttonPost}

      <br/>
    </div>
  );
}

export default Test;
