'use strict';
function searchUrl(inputSearchValue, positionStr, itemsRadiusSearch) {

  let url = '/api/items';

  if(positionStr) {
    console.log('positionStr == true')
    url += '/positions/' + positionStr;
  }

  if(positionStr && itemsRadiusSearch) {
    console.log('itemsRadiusSearch == true')
    url += '/radius/' + itemsRadiusSearch;
  }

  if(positionStr && itemsRadiusSearch && inputSearchValue) {
    console.log('inputSearchValue == true')
    url += '/itemnames/' + inputSearchValue;
  }

  console.log('url', url)
  return url;
}


// api/autocomplete/position/123,123/radius/2km/itemnames/ab
function getAutocompleteItemNamesUrl(inputSearchValue, positionStr, itemsRadiusSearch){

  let url = '/api/autocomplete';

  if(positionStr) {
    console.log('positionStr == true')
    url += '/positions/' + positionStr;
  }

  if(positionStr && itemsRadiusSearch) {
    console.log('itemsRadiusSearch == true')
    url += '/radius/' + itemsRadiusSearch;
  }

  if(positionStr && itemsRadiusSearch && inputSearchValue) {
    console.log('inputSearchValue == true')
    url += '/itemnames/' + inputSearchValue;
  }

  console.log('url', url)
  return url;
}
module.exports = {
  searchUrl,
  getAutocompleteItemNamesUrl
}
