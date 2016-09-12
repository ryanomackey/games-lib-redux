'use strict';

const initialState = {
  library: [],
  searchResults: [],
  showGameSearch: false
};

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case "TOGGLE_GAME_SEARCH": {
      return Object.assign({}, state, {
        showGameSearch: state.showGameSearch = !state.showGameSearch,
        searchResults: []
      });
    }
    case "SEARCH_SUCCESS": {
      return Object.assign({}, state, {
        searchResults: action.payload.results
      });
    }
    default: {
      return state;
    }
  }
}
