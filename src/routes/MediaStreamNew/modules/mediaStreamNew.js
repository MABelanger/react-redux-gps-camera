let Request = require('superagent');

// ------------------------------------
// Constants
// ------------------------------------
export const SET_DATA_URI = 'SET_DATA_URI';
export const SET_STREAM = 'SET_STREAM';
export const SET_VIDEO_INPUTS = 'SET_VIDEO_INPUTS';
export const SET_VIDEO_SRC = 'SET_VIDEO_SRC';
export const SET_VIDEO_ERROR = 'SET_VIDEO_ERROR';
export const CLEAR_STORE = 'CLEAR_STORE';

//export const SET_ITEMS = 'SET_ITEMS'

// ------------------------------------
// Actions
// ------------------------------------
export function setDataUri (value) {
  return {
    type    : SET_DATA_URI,
    payload : value
  }
}

export function setStream (value) {
  return {
    type    : SET_STREAM,
    payload : value
  }
}

export function setVideoInputs (value) {
  return {
    type    : SET_VIDEO_INPUTS,
    payload : value
  }
}

export function setVideoSrc (value) {
  return {
    type    : SET_VIDEO_SRC,
    payload : value
  }
}

export function setVideoError (value) {
  return {
    type    : SET_VIDEO_ERROR,
    payload : value
  }
}

// export const postItem = (dataUri) => {
//   let url = '/api/items';
//   return (dispatch, getState) => {
//     return new Promise((resolve) => {
//
//       Request
//         .post(url)
//         .accept('application/json')
//         .type('application/json')
//         .send({dataUri})
//         .end((err, res) => {
//           if (! err ) {
//             dispatch({
//               type    : SET_ITEMS,
//               payload : res.body
//             });
//             resolve();
//           }
//         });
//     })
//   }
// }


export const actions = {
  setDataUri,
  setStream,
  setVideoInputs,
  setVideoSrc,
  setVideoError
}


// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [SET_DATA_URI] : (state, action) => {
    let newState = {
      ...state,
      dataUri: action.payload
    }
    return newState;
  },
  [SET_STREAM] : (state, action) => {
    let newState = {
      ...state,
      stream: action.payload
    }
    return newState;
  },
  [SET_VIDEO_INPUTS] : (state, action) => {
    let newState = {
      ...state,
      videoInputs: action.payload
    }
    return newState;
  },
  [SET_VIDEO_SRC] : (state, action) => {
    let newState = {
      ...state,
      videoSrc: action.payload
    }
    return newState;
  },
  [SET_VIDEO_ERROR] : (state, action) => {
    let newState = {
      ...state,
      videoError: action.payload
    }
    return newState;
  },
  [CLEAR_STORE] : (state, action) => {
    return {};
  }
}


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function mediaStreamNewReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
