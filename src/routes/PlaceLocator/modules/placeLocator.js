let Request = require('superagent');
const utils = require('./utils');

// ------------------------------------
// Constants
// ------------------------------------
export const SET_PLACES = 'SET_PLACES';
export const SET_PLACE = 'SET_PLACE';


// ------------------------------------
// Actions
// ------------------------------------
export function setPlace (value = {}) {
  return {
    type    : SET_PLACE,
    payload : value
  }
}

export function setPlaces (value = {}) {
  return {
    type    : SET_PLACES,
    payload : value
  }
}

export const clearOrderedPlaces = () => {
  return setPlaces([]);
}

export const getOrderedPlaces = (position, offsetMeter) => {
  let url = utils.getOrderedPlacesUrl(position, offsetMeter);
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      Request
        .get(url)
        .accept('application/json')
        .type('application/json')
        .end((err, res) => {
          if (! err ) {
            dispatch({
              type    : SET_PLACES,
              payload : res.body.orderedPlaces
            });
            resolve();
          }
        });
    });
  }
}

export const actions = {
  getOrderedPlaces
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_PLACES] : (state, action) => {
    let newState = Object.assign(
      {},
      state,
      {
        orderedPlaces : action.payload
      }
    )
    return newState;
  },
  [SET_PLACE] : (state, action) => {
    let newState = Object.assign(
      {},
      state,
      {
        place : action.payload
      }
    )
    return newState;
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

export default function placeLocatorReducer (state = {}, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
