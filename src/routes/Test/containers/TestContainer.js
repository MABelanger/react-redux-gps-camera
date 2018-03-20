import { connect } from 'react-redux'
import { postDataItem, clearStore, setErrors } from '../modules/test'

const Test = require('../components/Test').default;

const mapDispatchToProps = {
  postDataItem,
  clearStore,
  setErrors
}

const mapStateToProps = (state) => {
  let { itemDetail, placeLocator, mediaStream, locator, test } = state;
  return {
    itemDetail,
    placeLocator,
    mediaStream,
    locator,
    test
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Test)
