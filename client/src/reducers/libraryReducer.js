'use strict';

const initialState = {
  library: [],
  searchResults: [],
  showGameSearch: false,
  searching: false,
  libraryOrder: 'ASC',
  platforms: [],
  platformArrow: 'arrow_drop_down',
  platformDropdown: false,
  platformArray: [],
  gameModalShow: false,
  gameModalContent: {},
  streams: []
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
      console.log(action.payload.results);
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
      return Object.assign({}, state, {
        libraryOrder: state.libraryOrder === 'ASC' ? 'DESC' : 'ASC'
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
        library: filter(state.library, state.platformArray)
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
    default: {
      return state;
    }
  }
}

function arrayToggle(array, platform) {
  var spliced = false;
  for (var i = 0; i < array.length; i++) {
    if (array[i] === platform) {
      array.splice(array.indexOf(platform), 1);
      spliced = true;
    }
  }
  if (spliced === true) {
    return array;
  } else {
    array.push(platform);
    return array;
  }
}

function filter(library, array) {
  if (array.length > 0) {
    library.map((game) => {
      game.is_visible = false;
    });
    library.map((game) => {
      for (var i = 0; i < array.length; i++) {
        if (game.platform_name === array[i]) {
          game.is_visible = true;
        }
      }
    });
  } else {
    library.map((game) => {
      game.is_visible = true;
    });
  }
  return library;
}

function buildPlatformArray(arr) {
  var newArr = [];
  arr.forEach((game) => {
    newArr.push(game.platform_name);
  });
  function unique(arr) {
    return arr.filter(function(x, i) {
      return arr.indexOf(x) === i;
    });
  }
  newArr = unique(newArr);
  newArr.sort(function(a,b) {
    var nameA = a.toUpperCase();
    var nameB = b.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  return newArr;
}
