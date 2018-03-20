'use strict';

const IMAGE_WIDTH_THUMB = 360;

function _getImageSizeFull(videoWidth, videoHeight){
  return {
    imageWidth: videoWidth,
    imageHeight: videoHeight
  };
}

function _getImageSizeThumb(videoWidth, videoHeight){
  let imageWidth = IMAGE_WIDTH_THUMB;

  // calc the ratio
  let ratio = videoWidth / imageWidth;

  // calc the imageHeight
  let imageHeight = videoHeight / ratio;

  return {
    imageWidth,
    imageHeight
  };
}

function _getImageSize(videoWidth, videoHeight) {
  console.log('videoWidth', videoWidth)
  console.log('videoHeight', videoHeight)

  // return _getImageSizeFull(videoWidth, videoHeight)
  return _getImageSizeThumb(videoWidth, videoHeight);
}

function getDataUri(video) {

  let videoWidth = video.videoWidth
  let videoHeight = video.videoHeight;

  let {imageWidth, imageHeight} = _getImageSize(videoWidth, videoHeight)

  let canvas = document.createElement('canvas');
  canvas.width = imageWidth;
  canvas.height = imageHeight;
  let context = canvas.getContext('2d');

  context.drawImage(video, 0, 0, imageWidth, imageHeight);

  let dataUri = canvas.toDataURL('image/png');
  return dataUri;
}


function getConstraints(deviceId) {
  let constraints = {
    audio: false,
    video: {
      optional: [
        {sourceId: deviceId},
        // {minWidth: 320},
        // {minWidth: 640},
        // {minWidth: 800},
        // {minWidth: 900},
        // {minWidth: 1024},
        // {minWidth: 1280},
        // {minWidth: 1920},
        // {minWidth: 2560}
      ]
    }
  };

  // if deviceId add it to the constraints
  if(deviceId) {
    constraints.video.optional.unshift({sourceId: deviceId})
  }

  return constraints;
}
module.exports = {
  getDataUri,
  getConstraints
}
