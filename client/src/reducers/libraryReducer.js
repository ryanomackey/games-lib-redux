'use strict';

import {filter} from '../library/helperFunctions';
import {buildPlatformArray} from '../library/helperFunctions';
import {arrayToggle} from '../library/helperFunctions';
import {completedFilter} from '../library/helperFunctions';
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
  showIncomplete: false,
  deleteConfirm: false,
  searchQuery: ''
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
        library: filter(action.payload, state.platformArray),
        platforms: buildPlatformArray(action.payload)
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
        library: filter(state.library, state.platformArray),
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
        streams: {}
      });
    }
    case "STREAM_FETCH_SUCCESS": {
      return Object.assign({}, state, {
        streams: action.payload
      });
    }
    case "TOGGLE_COMPLETED_FILTER": {
      if (!state.showIncomplete) {
        return Object.assign({}, state, {
          library: completedFilter(state.library, 'HIDE_COMPLETE'),
          showIncomplete: state.showIncomplete = !state.showIncomplete
        });
      } else {
        return Object.assign({}, state, {
          library: completedFilter(state.library, 'SHOW_COMPLETE'),
          showIncomplete: state.showIncomplete = !state.showIncomplete
        });
      }
      break;
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
        ]
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
    default: {
      return state;
    }
  }
}
