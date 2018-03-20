import { connect } from 'react-redux'
import { setDataUri, setStream, setVideoInputs, setVideoSrc, setVideoError } from '../modules/mediaStreamNew'

import MediaStreamNew from '../components/MediaStreamNew'

const mapDispatchToProps = {
  setDataUri,
  setStream,
  setVideoInputs,
  setVideoSrc,
  setVideoError
}

const mapStateToProps = (state) => ({
  mediaStream : state.mediaStream
})

export default connect(mapStateToProps, mapDispatchToProps)(MediaStreamNew)
