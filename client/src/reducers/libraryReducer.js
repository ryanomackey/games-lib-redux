'use strict';

import {filter} from '../library/helperFunctions';
import {buildPlatformArray} from '../library/helperFunctions';
import {arrayToggle} from '../library/helperFunctions';
import {selectedToggle} from '../library/helperFunctions';

const initialState = {
  library: [],
  searchResults: [],
  showGameSearch: false,
  searching: false,
  libraryOrder: 'TITLE_ASC',
  platforms: [],
  platformArrow: 'arrow_drop_down',
  platformDropdown: false,
  platformArray: [],
  gameModalShow: false,
  gameModalContent: {},
  streams: [],
  showIncompleteOnly: false,
  deleteConfirm: false,
  searchQuery: '',
  currentStream: {},
  showTwitchModal: false,
  showControlBar: true,
};

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case "LOGOUT": {
      return Object.assign({}, state, initialState);
    }
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
        library: filter(action.payload, state.platformArray, state.showIncompleteOnly),
        platforms: buildPlatformArray(action.payload),
      });
    }
    case "LIBRARY_OPTIMISTIC": {
      return Object.assign({}, state, {
        showGameSearch: false,
        library: filter([...state.library, action.payload], state.platformArray, state.showIncompleteOnly)
      });
    }
    case "LOGOUT": {
      return Object.assign({}, state, {
        library: []
      });
    }
    case "TOGGLE_LIBRARY_ORDER": {
      if (state.libraryOrder === 'TITLE_ASC') {
        action.payload = 'TITLE_DESC';
      } else {
        action.payload = 'TITLE_ASC';
      }
      return Object.assign({}, state, {
        libraryOrder: action.payload
      });
    }
    case "TOGGLE_RELEASE_ORDER": {
      if (state.libraryOrder === 'RELEASE_DESC') {
        action.payload = 'RELEASE_ASC';
      } else {
        action.payload = 'RELEASE_DESC';
      }
      return Object.assign({}, state, {
        libraryOrder: action.payload
      });
    }
    case "TOGGLE_PLATFORM_DROPDOWN": {
      return Object.assign({}, state, {
        platformArrow: state.platformArrow === 'arrow_drop_down' ? 'arrow_drop_up' : 'arrow_drop_down',
        platformDropdown: state.platformDropdown = !state.platformDropdown
      });
    }
    case "TOGGLE_PLATFORM": {
      return Object.assign({}, state, {
        platformArray: arrayToggle(state.platformArray, action.payload),
        library: filter(state.library, state.platformArray, state.showIncompleteOnly),
        platforms: selectedToggle(state.platforms, action.payload)
      });
    }
    case "OPEN_GAME_MODAL": {
      return Object.assign({}, state, {
        gameModalShow: state.gameModalShow = !state.gameModalShow,
        gameModalContent: action.payload
      });
    }
    case "CLOSE_GAME_MODAL": {
      return Object.assign({}, state, {
        gameModalShow: state.gameModalShow = !state.gameModalShow,
        gameModalContent: {},
        streams: {},
        deleteConfirm: false,
      });
    }
    case "STREAM_FETCH_SUCCESS": {
      return Object.assign({}, state, {
        streams: action.payload
      });
    }
    case "TOGGLE_COMPLETED_FILTER": {
      return Object.assign({}, state, {
        showIncompleteOnly: state.showIncompleteOnly = !state.showIncompleteOnly,
        library: filter(state.library, state.platformArray, state.showIncompleteOnly)
      });
    }
    case "REMOVE_TITLE_OPTIMISTIC": {
      const index = state.library.indexOf(action.payload);
      return Object.assign({}, state, {
        gameModalShow: state.gameModalShow = !state.gameModalShow,
        gameModalContent: {},
        streams: {},
        deleteConfirm: false,
        library: [
          ...state.library.slice(0, index),
          ...state.library.slice(index + 1)
        ],
      });
    }
    case "TOGGLE_DELETE_CONFIRM": {
      return Object.assign({}, state, {
        deleteConfirm: state.deleteConfirm === false ? true : false,
      });
    }
    case "UPDATE_SEARCH": {
      return Object.assign({}, state, {
        searchQuery: action.payload,
      });
    }
    case "SET_CURRENT_STREAM": {
      return Object.assign({}, state, {
        currentStream: action.payload,
        showTwitchModal: true,
      });
    }
    case "CLOSE_TWITCH_MODAL": {
      return Object.assign({}, state, {
        showTwitchModal: false,
      });
    }
    case "TOGGLE_CONTROL_BAR": {
      return Object.assign({}, state, {
        showControlBar: state.showControlBar = !state.showControlBar,
        platformDropdown: false,
        platformArrow: 'arrow_drop_down',
      });
    }
    default: {
      return state;
    }
  }
}
