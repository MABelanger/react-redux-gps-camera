let Request = require('superagent');

// ------------------------------------
// Constants
// ------------------------------------
export const SAVE_FORM = 'SAVE_FORM';
export const CLEAR_STORE = 'CLEAR_STORE';

// ------------------------------------
// Actions
// ------------------------------------
export function saveForm (value = {}) {
  return {
    type    : SAVE_FORM,
    payload : value
  }
}

// export const saveForm = () => {
//   return (dispatch, getState) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         dispatch({
//           type    : SAVE_FORM,
//           payload : getState().itemDetail
//         })
//         resolve()
//       }, 200)
//     })
//   }
// }



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
  saveForm
}


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SAVE_FORM] : (state, action) => {
    return Object.assign({},
      state.itemDetail,
      action.payload
    );
  },
  [CLEAR_STORE] : (state, action) => {
    return {};
  }
}

// const ACTION_HANDLERS = {
//   [SAVE_FORM] : (state, action) => {
//     return {
//       ...state,
//       itemDetail: {
//         ...action.payload
//       }
//     }
//   }
// }




// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {itemDetail: {}}
export default function itemDetailReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
