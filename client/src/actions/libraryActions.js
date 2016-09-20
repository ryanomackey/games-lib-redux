'use strict';

import axios from 'axios';

let bearerToken = sessionStorage.getItem('token');

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {'Authorization': 'Bearer ' + bearerToken}
});

export function toggleGameSearch() {
  return function(dispatch) {
    dispatch({type: 'TOGGLE_GAME_SEARCH'});
  };
}

export function giantBombSearch(searchQuery) {
  bearerToken = sessionStorage.getItem('token');
  return function(dispatch) {
    dispatch({type: 'SEARCH_START'});
    instance.get('api/search?query=' + searchQuery)
    .then(function(response) {
      if (response.data.results.length) {
        dispatch({type: 'SEARCH_SUCCESS', payload: response.data});
      } else {
        dispatch({type: 'NO_SEARCH_RESULTS'});
      }
    })
    .catch(function(err) {
      dispatch({type: 'SEARCH_ERROR', payload: err});
    });
  };
}

export function addToLibrary(game) {
  bearerToken = sessionStorage.getItem('token');
  return function(dispatch) {
    dispatch({type: 'LIBRARY_OPTIMISTIC', payload: game});
    instance.post('games', game)
    .then(function() {
      dispatch({type: 'LIBRARY_POST_SUCCESS'});
    })
    .catch(function(err) {
      dispatch({type: 'LIBRARY_POST_ERROR', payload: err});
    });
  };
}

export function getLibrary() {
  bearerToken = sessionStorage.getItem('token');
  return function(dispatch) {
    dispatch({type: 'LIBRARY_FETCHING'});
    instance.get('/games')
    .then(function(response) {
      dispatch({type: 'LIBRARY_FETCH_SUCCESS', payload: response.data});
    })
    .catch(function(err) {
      dispatch({type:'LIBRARY_FETCH_ERROR', payload: err});
    });
  };
}

export function toggleLibraryOrder() {
  return function(dispatch) {
    dispatch({type:'TOGGLE_LIBRARY_ORDER'});
  };
}

export function togglePlatformDropdown() {
  return function(dispatch) {
    dispatch({type:'TOGGLE_PLATFORM_DROPDOWN'});
  };
}

export function togglePlatform(platform) {
  return function(dispatch) {
    dispatch({type:'TOGGLE_PLATFORM', payload:platform});
  };
}

export function openGameModal(game) {
  bearerToken = sessionStorage.getItem('token');
  return function(dispatch) {
    dispatch({type:'OPEN_GAME_MODAL', payload:game});
    instance.get('/api/twitch?q=' + game.game_name)
    .then(function(response) {
      dispatch({type:'STREAM_FETCH_SUCCESS', payload:response.data.streams});
    });
  };
}

export function closeGameModal() {
  return function(dispatch) {
    dispatch({type:'CLOSE_GAME_MODAL'});
  };
}

export function toggleReleaseOrder() {
  return function(dispatch) {
    dispatch({type: 'TOGGLE_RELEASE_ORDER'});
  };
}

export function toggleComplete(game) {
  bearerToken = sessionStorage.getItem('token');
  return function(dispatch) {
    game.completed = !game.completed;
    instance.put('/games', game)
    .then(function() {
      dispatch({type: 'UPDATE_SUCCESSFUL'});
    });
  };
}

export function toggleOwn(game) {
  bearerToken = sessionStorage.getItem('token');
  return function(dispatch) {
    game.own = !game.own;
    instance.put('/games', game)
    .then(function() {
      dispatch({type: 'UPDATE_SUCCESSFUL'});
    });
  };
}

export function toggleCompletedFilter() {
  return function(dispatch) {
    dispatch({type:'TOGGLE_COMPLETED_FILTER'});
  };
}

export function removeTitle(game) {
  bearerToken = sessionStorage.getItem('token');
  const instance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {'Authorization': 'Bearer ' + bearerToken},
    data: game,
  });
  return function(dispatch) {
    dispatch({type:'REMOVE_TITLE_OPTIMISTIC', payload: game});
    instance.delete('/games')
    .then(function(response) {
      dispatch({type:'DELETE_SUCCESSFUL', payload: response});
    })
    .catch(function(err) {
      dispatch({type:'DELETE_ERROR', payload: err});
    });
  };
}

export function toggleDeleteConfirm() {
  return function(dispatch) {
    dispatch({type:'TOGGLE_DELETE_CONFIRM'});
  };
}
