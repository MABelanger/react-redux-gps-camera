let Request = require('superagent');

// ------------------------------------
// Constants
// ------------------------------------
export const IS_POSTING = 'IS_POSTING';
export const IS_POSTED = 'IS_POSTED';
export const CLEAR_STORE = 'CLEAR_STORE';
export const SET_ERRORS = 'SET_ERRORS';

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

// ------------------------------------
// Actions
// ------------------------------------
export const postDataItem = (item) => {
  let url = 'http://localhost:9001/api/items/';
  return (dispatch, getState) => {
    _dispatchIsPosting(dispatch, true);
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
          } else {
            _dispatchIsPosted(dispatch, false);
            setErrors({
              statusCode : res.statusCode,
              err : err,
              resBody : res.body
            })
          }
          resolve();
        });
    })
  }
}

export function clearStore () {
  return (dispatch, getState) => {
    dispatch({
      type    : CLEAR_STORE,
      payload : null
    });
  }
}

export function setErrors (errors) {
  return (dispatch, getState) => {
    dispatch({
      type    : SET_ERRORS,
      payload : errors
    });
  }
}

export const actions = {
  postDataItem,
  clearStore
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
  [SET_ERRORS] : (state, action) => {
    let newState = {
      ...state,
      errors : action.payload
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
const initialState = {test: {}}
export default function testReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
