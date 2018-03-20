'use strict';
import utils from './utils';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_POSITION = 'SET_POSITION';
export const SET_WATCH_ID = 'SET_WATCH_ID';
export const SET_POSITION_FOUND = 'SET_POSITION_FOUND';
export const SET_SEARCHING = 'SET_SEARCHING';
export const SET_POSITION_ERROR = 'SET_POSITION_ERROR';
export const CLEAR_STORE = 'CLEAR_STORE';
export const SET_END_COUNTER_WATCH_POSITION = 'SET_END_COUNTER_WATCH_POSITION';
export const SET_TIMEOUT_VAR = 'SET_TIMEOUT_VAR';



const INITIAL_STATE = {
  position: {
    latitude: 45.5016889,
    longitude: -73.56725599999999,
    accuracy : 200,
    isInitialState: true
  },
  positionFound : 0
}


const GPS_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

// ------------------------------------
// Actions
// ------------------------------------

// const CONST_INITIAL_VALUE_SET_POSITION = {
//   latitude: 45.5016889,
//   longitude: -73.56725599999999,
//   accuracy : 200,
//   isInitialState: true
// }

export function _setPosition (value = {}) {
  console.log('_setPosition, value', value)
  return {
    type    : SET_POSITION,
    payload : value
  }
}

export function _setWatchId (value = {}) {
  return {
    type    : SET_WATCH_ID,
    payload : value
  }
}

export function _setPositionFound (value = 0) {
  return {
    type    : SET_POSITION_FOUND,
    payload : value
  }
}

export function _setSearching (value = false) {
  return {
    type    : SET_SEARCHING,
    payload : value
  }
}

export function _setPositionError (value = {}) {
  console.log('_setPositionError value', value)
  return {
    type    : SET_POSITION_ERROR,
    payload : value
  }
}

function _dispatchStartCounterWatchPosition(timeout, dispatch){
  dispatch({
    type    : SET_END_COUNTER_WATCH_POSITION,
    payload : false
  });
  return new Promise((resolve) => {
    let timeoutVar = setTimeout(() => {
      dispatch({
        type    : SET_END_COUNTER_WATCH_POSITION,
        payload : true
      });
      resolve();
    }, timeout);
    dispatch({
      type    : SET_TIMEOUT_VAR,
      payload : timeoutVar
    });
  });
}

export const startCounterWatchPosition = (timeout) => {
  return (dispatch, getState) => {
    return _dispatchStartCounterWatchPosition(timeout, dispatch);
  }
}

export const getPosition = () => {
  return (dispatch, getState) => {
    return getState().gps.position;
  }
}

export const hasLocation = () => {
  return (dispatch, getState) => {
    let position = getState().gps.position;
    return (position && !position.isInitialState)
  }
}

function _isPositionErrorNofct(getState){
  let positionError = getState().gps.positionError;
  return (positionError && positionError.code);
}

export const isPositionError = () => {
  return (dispatch, getState) => {
    return _isPositionErrorNofct(getState)
  }
}

export const stopCounterWatchPosition = () => {
  return (dispatch, getState) => {
    let timeoutVar = getState().gps.timeoutVar;
    clearTimeout(timeoutVar);
  }
}

// Test

export const onStop = () => {
  return (dispatch, getState) => {
    return _onStop(dispatch, getState);
  }
}

function _onStop(dispatch, getState) {
  let watchId = getState().gps.watchId;
  navigator.geolocation.clearWatch(watchId);
  dispatch(_setWatchId(null));
  dispatch(_setPositionFound(0));
  dispatch(_setSearching(false));
  let timeoutVar = getState().gps.timeoutVar;
  clearTimeout(timeoutVar);
  console.log('stoped');
  //this.setState({})
}

function handleLocationFound(event, dispatch, getState, resolve) {

  let position = utils.getDataPosition(event);

  dispatch(_setPosition(position));
  dispatch(_setSearching(false));

  // stop searching
  if(position.accuracy <= 20){
    _onStop(dispatch, getState);
    resolve();
    // this.cbPositionStable(); // TODO
    console.log('stop searching because accuracy <= 20');
  }

}

function handleLocationError(event, dispatch, getState, reject) {
  dispatch(_setSearching(false));
  let {code, message} = event;
  dispatch(_setPositionError({
    code,
    message
  }))
  _onStop(dispatch, getState);
  reject({code, message});
}

export const locateMe = (timeout) => {
  return (dispatch, getState) => {

    // counter end after 10s
    return new Promise((resolve, reject) => {
      let primiseStartCounterWatchPosition =  _dispatchStartCounterWatchPosition(10*1000, dispatch);
      primiseStartCounterWatchPosition.then((e)=>{
        console.log('primiseStartCounterWatchPosition called')
        _onStop(dispatch, getState);
        if(!_isPositionErrorNofct(getState)){
          resolve();
        } else {
          reject('reject from !_isPositionErrorNofct()');
        }
      });

      // Notify the user that the GPS location is searching
      dispatch(_setSearching(true));
      dispatch(_setPositionError({}));

      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

      // Start the GPS watch
      let watchId = navigator.geolocation.watchPosition(
        function locationFound(event){
          handleLocationFound(event, dispatch, getState, resolve);
        },
        function locationError(event){
          handleLocationError(event, dispatch, getState, reject);
        },
        options
      );
      // Save the watchId into the store
      dispatch(_setWatchId(watchId));
    });
  }
}

export const actions = {

}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_POSITION] : (state, action) => {
    let newState = Object.assign(
      {},
      state,
      {
        position : action.payload
      }
    )
    return newState;
  },
  [SET_WATCH_ID] : (state, action) => {
    let newState = Object.assign(
      {},
      state,
      {
        watchId : action.payload
      }
    )
    return newState;
  },
  [SET_POSITION_FOUND] : (state, action) => {
    let newState = Object.assign(
      {},
      state,
      {
        positionFound : action.payload
      }
    )
    return newState;
  },
  [SET_SEARCHING] : (state, action) => {
    let newState = Object.assign(
      {},
      state,
      {
        isSearching : action.payload
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
  [SET_END_COUNTER_WATCH_POSITION] : (state, action) => {
    let newState = Object.assign(
      {},
      state,
      {
        isEndCounterWatchPosition : action.payload
      }
    )
    return newState;
  },
  [SET_TIMEOUT_VAR] : (state, action) => {
    let newState = Object.assign(
      {},
      state,
      {
        timeoutVar : action.payload
      }
    )
    return newState;
  },
    [CLEAR_STORE] : (state, action) => {
    return INITIAL_STATE;
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function geolocalisationReducer (state = INITIAL_STATE, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
