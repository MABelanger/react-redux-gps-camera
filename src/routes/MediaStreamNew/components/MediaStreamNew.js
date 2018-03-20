import React from 'react';
import PropTypes from 'prop-types';

import VideoInputButtons from './VideoInputButtons';

import './styles/MediaStreamNew.scss';

const utils = require('./utils');
import ImageMedia from './ImageMedia';
import CircleButton from './CircleButton';

export default class MediaStreamNew extends React.Component {

  constructor(props, context) {
    super(props, context);

    // all states is handle by redux
    this.state = {};
    this.gotDevices = this.gotDevices.bind(this);
    this.getStream = this.getStream.bind(this);
    this.gotStream = this.gotStream.bind(this);
    this.handleError = this.handleError.bind(this);
    this.stopStreams = this.stopStreams.bind(this);
    this.playStream = this.playStream.bind(this);
    this.enumerateDevice = this.enumerateDevice.bind(this);
    this.closeImage = this.closeImage.bind(this);

    this.onClickVideo = this.onClickVideo.bind(this);

  }

  enumerateDevice() {
    navigator.mediaDevices.enumerateDevices()
        .then(this.gotDevices)
        .catch(this.handleError);
  }


  playStream() {
    this.props.setStream(null);
    let constraints = utils.getConstraints();
    navigator.mediaDevices.getUserMedia(constraints)
        .then(this.gotStream)
        .catch(this.handleError);
  }

  componentDidMount() {
    if(!(this.props.mediaStream.videoInputs && this.props.mediaStream.videoInputs.length)) {
      this.enumerateDevice();
    }
  }

  onClickVideo() {
    let dataUri = utils.getDataUri(this.refs.video);
    this.props.setDataUri(dataUri);
  }

  gotDevices(deviceInfos) {
    let videoInputs = [];
    for (let i = 0; i !== deviceInfos.length; ++i) {
      let deviceInfo = deviceInfos[i];
      if (deviceInfo.kind === 'videoinput') { // && deviceInfo.label.includes('back')
        videoInputs.push(deviceInfo);
      }
    }
    this.props.setVideoInputs(videoInputs);
  }

  stopStreams() {
    if (this.props.mediaStream && this.props.mediaStream.stream) {
      this.props.mediaStream.stream.getTracks().forEach(function(track) {
        track.stop();
      });
    }
  }

  getStream(deviceId) {
    this.stopStreams();
    let constraints = utils.getConstraints(deviceId);

    navigator.mediaDevices.getUserMedia(constraints)
        .then(this.gotStream)
        .catch(this.handleError);
  }

  gotStream(stream) {
    this.props.setStream(stream);
    // Update the state, triggering the component to re-render with the correct stream
    let videoSrc = window.URL.createObjectURL(stream);
    this.props.setVideoSrc(videoSrc);
  }

  handleError(error) {
    let {constraintName, message, name} = error;
    let errorStr = constraintName + message + name;
    this.props.setVideoError({msg: errorStr});
    this.stopStreams();
  }

  closeImage() {
    this.playStream();
    this.props.setDataUri("");
  }

  /*
  <button onClick={(e)=>{
    this.playStream();
    this.props.setDataUri("");
  }} >Redo Photo</button>
  */
  render() {
    let dataUri = this.props.mediaStream.dataUri || "";
    let videoInputs = this.props.mediaStream.videoInputs || [];
    let videoSrc = this.props.mediaStream.videoSrc || "";
    if(dataUri) {
      this.stopStreams();
      return (
        <div className="row">
          <ImageMedia closeImage={this.closeImage} dataUri={dataUri} />
        </div>
      );
    }

    const videoError = this.props.mediaStream && this.props.mediaStream.videoError
      ? <div>{JSON.stringify(this.props.mediaStream.videoError)}</div>
      : null
    return (
      <div>
        {videoError}
        <div>
          <CircleButton onClickVideo={this.onClickVideo}/>
          <VideoInputButtons videoInputs={videoInputs} onGetStream={this.getStream}/>
          <br/>
          <video src={videoSrc} ref="video" autoPlay="true"/>
        </div>
      </div>
    );
  }
}
