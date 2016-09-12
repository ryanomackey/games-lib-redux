'use strict';

import axios from 'axios';

export function toggleGameSearch() {
  return function(dispatch) {
    dispatch({type: 'TOGGLE_GAME_SEARCH'});
  };
}

export function giantBombSearch(searchQuery) {
  return function(dispatch) {
    axios.get('http://localhost:3000/api/search?query=' + searchQuery)
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
  };
  // return function(dispatch) {
  //   axios.post('http://localhost:3000/games/', game)
  //   .then(function(response) {
  //     console.log(response);
  //   })
  //   .catch(function(err) {
  //     console.log(err);
  //   });
  // };
}
