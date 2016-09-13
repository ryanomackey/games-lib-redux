'use strict';

import axios from 'axios';

const bearerToken = sessionStorage.getItem('token');

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {'Authorization': 'Bearer ' + bearerToken}
});

export function toggleGameSearch() {
  return function(dispatch) {
    dispatch({type: 'TOGGLE_GAME_SEARCH'});
  };
}

export function giantBombSearch(searchQuery) {
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
  return function(dispatch) {
    dispatch({type: 'LIBRARY_OPTIMISTIC', payload: game});
    instance.post('games', game)
    .then(function(response) {
      dispatch({type: 'LIBRARY_POST_SUCCESS'});
    })
    .catch(function(err) {
      dispatch({type: 'LIBRARY_POST_ERROR', payload: err});
    });
  };
}

export function getLibrary() {
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
