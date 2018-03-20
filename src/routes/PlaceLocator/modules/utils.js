'use strict';
function getOrderedPlacesUrl(position, offsetMeter) {
  let {latitude, longitude, accuracy} = position;

  let url = '/api/places/positions/'


  if(latitude && longitude) {
    url += [latitude, longitude].join();
  }
  if(offsetMeter) {
    url += '/offsetmeters/' + offsetMeter;
  }

  return url;
}

module.exports = {
  getOrderedPlacesUrl
}
