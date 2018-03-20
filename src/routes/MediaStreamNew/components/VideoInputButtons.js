'use strict';

const React = require('react');

const VideoInputButton = function ({videoInput, cameraNumber, onGetStream}) {
  let label = videoInput.label || 'camera #' +  cameraNumber;
  return (
    <button
      onClick= {(e)=>{
        onGetStream(videoInput.deviceId)
      }}>
        { label }
    </button>
  );
}

const VideoInputButtons = function ({videoInputs, onGetStream}) {
  let cameraNumber = 0;
  return (
    <div>
      {
        videoInputs.map((videoInput) => {
          cameraNumber += 1;
          return (
            <VideoInputButton
              key={cameraNumber}
              videoInput={videoInput}
              cameraNumber={cameraNumber}
              onGetStream={onGetStream}
            />
          )
        })
      }
    </div>
  );
}

export default VideoInputButtons;
