'use strict';

import {disableCurrent} from '../library/helperFunctions';
import {disableExisitingTitles} from '../library/helperFunctions';

const initialState = {
  currentImport: '',
  importAll: false,
  importProgress: '0%',
  library: [],
  steamResults: [],
  steamModalShow: false,
};

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case "CURRENT_IMPORT_UPDATE": {
      return Object.assign({}, state, {
        currentImport: action.payload.name,
        importProgress: action.payload.progress.toString() + '%'
      });
    }
    case "IMPORT_ALL_START": {
      return Object.assign({}, state, {
        importAll: state.importAll = !state.importAll
      });
    }
    case "IMPORT_COMPLETE": {
      return Object.assign({}, state, {
        steamModalShow: state.steamModalShow = !state.steamModalShow,
      });
    }
    case "IMPORT_SINGLE_START": {
      return Object.assign({}, state, {
        steamResults: disableCurrent(state.steamResults, action.payload)
      });
    }
    case "LIBRARY_FETCH_SUCCESS": {
      return Object.assign({}, state, {
        library: action.payload,
      });
    }
    case "STEAM_IMPORT_FINISHED": {
      return location.replace('/');
    }
    case "STEAM_LIBRARY_FETCHING": {
      return Object.assign({}, state, {
        steamModalShow: state.steamModalShow = !state.steamModalShow,
      });
    }
    case "STEAM_LIBRARY_SUCCESS": {
      return Object.assign({}, state, {
        steamResults: disableExisitingTitles(action.payload, state.library),
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
