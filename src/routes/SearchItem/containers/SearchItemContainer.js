import { connect } from 'react-redux'
import { getAllItems, search, setItemsRadiusSearch, setInputSearchValue, getAutocompleteItemNames, setSuggestions } from '../modules/searchItem';
import { hasLocation, isPositionError, locateMe, getPosition } from '../../../modules/gps';

const SearchItem = require('../components/SearchItem').default;

const mapDispatchToProps = {
  getAllItems,
  search,
  setItemsRadiusSearch,
  setInputSearchValue,
  getAutocompleteItemNames,
  setSuggestions,
  // gps
  hasLocation,
  isPositionError,
  locateMe,
  getPosition
}

const mapStateToProps = (state) => {
  let { gps, searchItem } = state;
  return {
    gps,
    searchItem
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchItem)
