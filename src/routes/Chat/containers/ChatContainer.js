import { connect } from 'react-redux'
import { savePosition, setPositionError } from '../modules/chat'

import Chat from '../components/Chat'

const mapDispatchToProps = {
  savePosition,
  setPositionError
}

const mapStateToProps = (state) => ({
  chat : state.chat
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
