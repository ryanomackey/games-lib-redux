'use strict';

const initialState = {
  showDropdown: true,
}

export default function  reducer(state=initialState, action) {
  switch(action.type) {
    case "TOGGLE_DROPDOWN": {
      return Object.assign({}, state, {
        showDropdown: state.showDropdown = !state.showDropdown,
      });
    }
    default: {
      return state;
    }
  }
}
