let Request = require('superagent');

// ------------------------------------
// Constants
// ------------------------------------
export const SAVE_POSITION = 'SAVE_POSITION';
export const SET_POSITION_ERROR = 'SET_POSITION_ERROR';
export const CLEAR_STORE = 'CLEAR_STORE';

// ------------------------------------
// Actions
// ------------------------------------
export function savePosition (value = {}) {
  return {
    type    : SAVE_POSITION,
    payload : value
  }
}

export function setPositionError (value = {}) {
  return {
    type    : SET_POSITION_ERROR,
    payload : value
  }
}


export const actions = {
  savePosition,
  setPositionError
}


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SAVE_POSITION] : (state, action) => {
    let newState = Object.assign(
      {},
      state,
      {
        position : action.payload
      }
    )

    return newState;
  },
  [SET_POSITION_ERROR] : (state, action) => {
    let newState =  {
      ...state,
      positionError: {
        ...action.payload
      }
    }
    return newState
  },
  [CLEAR_STORE] : (state, action) => {
    return {};
  }
}




// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {toto: 'toto'}
export default function chatReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
