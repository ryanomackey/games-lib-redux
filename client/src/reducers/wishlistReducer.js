'use strict';

const initialState = {
  wishlist: [],
};

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case "GET_WISHLIST_SUCCESS": {
      return Object.assign({}, state, {
        wishlist: action.payload,
      });
    }
    default: {
      return state;
    }
  }
}
