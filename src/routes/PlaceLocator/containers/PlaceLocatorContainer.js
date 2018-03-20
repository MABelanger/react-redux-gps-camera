import { connect } from 'react-redux';
import { getOrderedPlaces, clearOrderedPlaces, setPlace, setPlaces} from '../modules/placeLocator';
import { hasLocation, isPositionError, locateMe, getPosition, onStop } from '../../../modules/gps';

import PlaceLocator from '../components/PlaceLocator'


const mapDispatchToProps = {
  getOrderedPlaces,
  clearOrderedPlaces,
  setPlace,
  setPlaces,
  // gps
  hasLocation,
  isPositionError,
  locateMe,
  getPosition,
  onStop
};

const mapStateToProps = (state, ownProps) => {
  return ({
    placeLocator : state.placeLocator,
    gps : state.gps
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceLocator)
