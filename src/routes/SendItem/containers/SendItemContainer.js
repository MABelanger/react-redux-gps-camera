import { connect } from 'react-redux'
import { postDataItem, clearStore, setPlaces, setPosition } from '../modules/sendItem'

const SendItem = require('../components/SendItem').default;

const mapDispatchToProps = {
  postDataItem,
  clearStore,
  setPlaces,
  setPosition
}

const mapStateToProps = (state) => {
  let { itemDetail, placeLocator, mediaStream, locator, sendItem, gps } = state;
  return {
    itemDetail,
    placeLocator,
    mediaStream,
    locator,
    sendItem,
    gps
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendItem)
