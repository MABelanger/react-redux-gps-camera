let Request = require('superagent');

// ------------------------------------
// Constants
// ------------------------------------
export const IS_POSTING = 'IS_POSTING';
export const IS_POSTED = 'IS_POSTED';
export const CLEAR_STORE = 'CLEAR_STORE';
export const SET_ERROR = 'SET_ERROR';
export const SET_PLACES = 'SET_PLACES';
export const SET_POSITION = 'SET_POSITION';



// ------------------------------------
// Private Dispatch
// ------------------------------------
function _dispatchIsPosted(dispatch, value) {
  dispatch({
    type    : IS_POSTED,
    payload : value
  });
}

function _dispatchIsPosting(dispatch, value) {
  dispatch({
    type    : IS_POSTING,
    payload : value
  });
}

function _dispatchSetError(dispatch, value) {
  dispatch({
    type    : SET_ERROR,
    payload : value
  });
}

// ------------------------------------
// Actions
// ------------------------------------
export const postDataItem = (item) => {
  let url = '/api/items/';
  return (dispatch, getState) => {
    _dispatchIsPosting(dispatch, true);
    _dispatchSetError(dispatch, {});
    return new Promise((resolve) => {
      Request
        .post(url, {timeout: 1500})
        .accept('application/json')
        .type('application/json')
        .send({item})
        .end((err, res) => {
            _dispatchIsPosting(dispatch, false);
          if(! err && res.statusCode == 200){
            _dispatchIsPosted(dispatch, true);
          } else if(res){
            _dispatchIsPosted(dispatch, false);
            _dispatchSetError(dispatch, res.body);
          } else {
            _dispatchIsPosted(dispatch, false);
            _dispatchSetError(dispatch, {msg: err.toString()});
          }
          resolve();
        });
    })
  }
}

export function clearStore (place) {
  return (dispatch, getState) => {
    dispatch({
      type    : CLEAR_STORE,
      payload : null
    });
  }
}

export function setPlaces (value = {}) {
  return (dispatch, getState) => {
    dispatch({
      type    : SET_PLACES,
      payload : value
    });
  }
}

export function setPosition (value = {}) {
  return {
    type    : SET_POSITION,
    payload : value
  }
}

export const actions = {
  postDataItem,
  clearStore,
  setPlaces
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [IS_POSTED] : (state, action) => {
    let newState = {
      ...state,
      isPosted : action.payload
    }
    return newState;
  },
  [IS_POSTING] : (state, action) => {
    let newState = {
      ...state,
      isPosting : action.payload
    }
    return newState;
  },
  [SET_ERROR] : (state, action) => {
    let newState = {
      ...state,
      error : action.payload
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
const initialState = {sendItem: {}}
export default function sendItemReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
