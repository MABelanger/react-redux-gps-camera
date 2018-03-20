'use strict';
import React from 'react';

const ItemList = function ({items}) {
  items = items || [];
  return (
    <div>
      {items.map((item)=>{
        let data = JSON.parse(item.DataJson.S);

        const image = data.imageUrl
          ? <img src={data.imageUrl} width="300" />
          : null

        let position = data.position || {};
        let place = data.place || {};

        //let tagName = data.place.properties.tags.name;
        let {latitude, longitude, accuracy} = position;

        const tagName = place && place.properties && place.properties.tags && place.properties.tags.name
           ? place.properties.tags.name
           : null

        const itemName = data.itemName
          ? data.itemName
          : null

        if(!latitude) {
          latitude= data.coordinate.split(',')[0]
          longitude= data.coordinate.split(',')[1]
        }
        return (
          <div key={data.imageUrl}>
            {tagName} : {itemName} : {JSON.stringify({lat: latitude, lon: longitude, acc: accuracy})}
            <br/>
            {image}
          </div>
        )
      })}
    </div>
  );
}

export default ItemList;
