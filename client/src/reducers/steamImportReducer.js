'use strict';

const initialState = {
  steamResults: [],
  steamModalShow: false,
};

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case "STEAM_LIBRARY_FETCHING": {
      return Object.assign({}, state, {
        steamModalShow: state.steamModalShow = !state.steamModalShow,
      });
    }
    case "STEAM_LIBRARY_SUCCESS": {
      return Object.assign({}, state, {
        steamResults: action.payload,
      });
    }
    case "TOGGLE_STEAM_MODAL": {
      return Object.assign({}, state, {
        steamModalShow: state.steamModalShow = !state.steamModalShow,
      });
    }
    default: {
      return state;
    }
  }
}
