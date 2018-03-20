let Request = require('superagent');
let utils = require('./utils')
// ------------------------------------
// Constants
// ------------------------------------
export const ITEMS_RECEIVED = 'ITEMS_RECEIVED';
export const ITEM_NAMES_RECEIVED = 'ITEM_NAMES_RECEIVED';
export const CLEAR_STORE = 'CLEAR_STORE';
export const SET_ITEMS_RADIUS_SEARCH = 'SET_ITEMS_RADIUS_SEARCH';
export const SET_INPUT_SEARCH_VALUE = 'SET_INPUT_SEARCH_VALUE';
export const SET_SUGGESTIONS = 'SET_SUGGESTIONS';

// ------------------------------------
// Actions
// ------------------------------------
export const getAllItems = () => {
  let url = '/api/items/';
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      Request
        .get(url)
        .accept('application/json')
        .type('application/json')
        .end((err, res) => {
          if (! err ) {
            dispatch({
              type    : ITEMS_RECEIVED,
              payload : res.body
            });
            resolve();
          }
        });
    })
  }
}

export const search = () => {
  return (dispatch, getState) => {
    let itemsRadiusSearch = getState().searchItem.itemsRadiusSearch + 'km';
    console.log('inputSearchValue', getState().searchItem)
    let inputSearchValue = getState().searchItem.inputSearchValue;
    let {latitude, longitude} = getState().gps.position;
    let positionStr = [latitude, longitude].join();
    let url = utils.searchUrl(inputSearchValue, positionStr, itemsRadiusSearch);
    return new Promise((resolve) => {
      Request
        .get(url)
        .accept('application/json')
        .type('application/json')
        .end((err, res) => {
          if (! err ) {
            dispatch({
              type    : ITEMS_RECEIVED,
              payload : res.body
            });
            resolve();
          }
        });
    });
  }
}

export const getAutocompleteItemNames = () => {
  return (dispatch, getState) => {
    let inputSearchValue = getState().searchItem.inputSearchValue;
    let itemsRadiusSearch = getState().searchItem.itemsRadiusSearch + 'km';
    let {latitude, longitude} = getState().gps.position;
    let positionStr = [latitude, longitude].join();

    let url = utils.getAutocompleteItemNamesUrl(inputSearchValue, positionStr, itemsRadiusSearch);
    return new Promise((resolve) => {
      Request
        .get(url)
        .accept('application/json')
        .type('application/json')
        .end((err, res) => {
          if (! err ) {
            dispatch({
              type    : ITEM_NAMES_RECEIVED,
              payload : res.body
            });
            let {itemNames} = res.body;
            resolve(itemNames);
          }
        });
    });
  }
}



// ------------------------------------
// Actions
// ------------------------------------
export function setItemsRadiusSearch (value = {}) {
  return {
    type    : SET_ITEMS_RADIUS_SEARCH,
    payload : value
  }
}

export function setSuggestions (value = {}) {
  return {
    type    : SET_SUGGESTIONS,
    payload : value
  }
}

export function setInputSearchValue (value = {}) {
  return {
    type    : SET_INPUT_SEARCH_VALUE,
    payload : value
  }
}


export const actions = {
  getAllItems,
  search,
  setItemsRadiusSearch,
  setInputSearchValue
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ITEMS_RECEIVED] : (state, action) => {
    let newState = {
      ...state,
      items: action.payload.items
    }
    return newState;
  },
  [ITEM_NAMES_RECEIVED] : (state, action) => {
    let newState = {
      ...state,
      itemNames: action.payload.itemNames
    }
    return newState;
  },
  [SET_ITEMS_RADIUS_SEARCH] : (state, action) => {
    let newState = {
      ...state,
      itemsRadiusSearch: action.payload
    }
    return newState;
  },
  [SET_INPUT_SEARCH_VALUE] : (state, action) => {
    let newState = {
      ...state,
      inputSearchValue: action.payload
    }
    return newState;
  },
  [SET_SUGGESTIONS] : (state, action) => {
    let newState = {
      ...state,
      suggestions: action.payload
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

const initialState = {searchItem: {}, itemsRadiusSearch: 30}
export default function searchItemReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
