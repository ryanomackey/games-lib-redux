'use strict';

const initialState = {
  library: [],
  searchResults: [],
  showGameSearch: false,
  searching: false
};

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case "TOGGLE_GAME_SEARCH": {
      return Object.assign({}, state, {
        showGameSearch: state.showGameSearch = !state.showGameSearch,
        searchResults: []
      });
    }
    case "SEARCH_START": {
      return Object.assign({}, state, {
        searchResults: [],
        searching: true
      });
    }
    case "SEARCH_SUCCESS": {
      return Object.assign({}, state, {
        searchResults: action.payload.results,
        searching: false
      });
    }
    case "LIBRARY_FETCH_SUCCESS": {
      return Object.assign({}, state, {
        library: action.payload
      });
    }
    case "LIBRARY_OPTIMISTIC": {
      return Object.assign({}, state, {
        showGameSearch: false,
        library: [...state.library, action.payload]
      });
    }
    case "LOGOUT": {
      return Object.assign({}, state, {
        library: []
      });
    }
    default: {
      return state;
    }
  }
}
