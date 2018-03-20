'use strict';

const React = require('react');

export const Locations = function ({locations}) {

  return (
    <div>
      latitude |
      longitude |
      accuracy |
      altitude |
      altitudeAccuracy |
      heading |
      speed |
      timestamp ||
      enableHighAccuracy |
      timeout |
      maximumAge <br/>
      {
        locations.map((location)=>{
          let {latitude, longitude, accuracy, altitude, altitudeAccuracy, heading, speed, timestamp, enableHighAccuracy, timeout, maximumAge} = location;
          return (
            <div key={timestamp}>
              {latitude} |
              {longitude} |
              {accuracy} |
              {altitude} |
              {altitudeAccuracy} |
              {heading} |
              {speed} |
              {timestamp} |
              {enableHighAccuracy} |
              {timeout} |
              {maximumAge}
            </div>
          );
        })
      }
    </div>
  );
}

export default Locations;
