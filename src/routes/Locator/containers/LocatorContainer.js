import { connect } from 'react-redux'
import { savePosition, setPositionError } from '../modules/locator'

import Locator from '../components/Locator'

const mapDispatchToProps = {
  savePosition,
  setPositionError
}

const mapStateToProps = (state) => ({
  locator : state.locator
})

export default connect(mapStateToProps, mapDispatchToProps)(Locator)
