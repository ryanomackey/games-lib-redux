'use strict';

import axios from 'axios';

let bearerToken = sessionStorage.getItem('token');

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {'Authorization': 'Bearer ' + bearerToken}
});

export function initializeSteamImport(steamId) {
  bearerToken = sessionStorage.getItem('token');
  return function(dispatch) {
    dispatch({type:"STEAM_LIBRARY_FETCHING"});
    instance.get('/steamImport/' + steamId)
    .then(function(response) {
      dispatch({type:"STEAM_LIBRARY_SUCCESS", payload:response.data});
    })
    .catch(function(err) {
      dispatch({type:"STEAM_LIBRARY_ERR", payload:err});
    });
  };
}

export function toggleSteamModal() {
  return function(dispatch) {
    dispatch({type:"TOGGLE_STEAM_MODAL"});
  };
}

export function importSteamSingle(game) {
  return function(dispatch) {
    dispatch({type:"IMPORT_SINGLE_START", payload: game});
    instance.get('/steamImport/single/?game=' + game.name + '&appid=' + game.appid)
    .then(function() {
      dispatch({type:"IMPORT_SINGLE_SUCCESS"});
    })
    .catch(function(err) {
      dispatch({type:"IMPORT_SINGLE_ERROR", payload:err});
    });
  };
}
