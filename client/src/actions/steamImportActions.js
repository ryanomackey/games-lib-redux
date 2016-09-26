'use strict';

import axios from 'axios';
import {importCount} from '../library/helperFunctions';

let bearerToken = sessionStorage.getItem('token');

const instance = axios.create({
  baseURL: 'https://games-lib-dev.us-west-2.elasticbeanstalk.com',
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

export function importSteamAll(steamLibrary) {
  return function (dispatch){
    dispatch({type:"IMPORT_ALL_START"});
    let offset = 0;
    let count = 0;
    const importTotal = importCount(steamLibrary);
    steamLibrary.map((game) => {
      if (!game.disabled) {
        setTimeout(function() {
          instance.get('/steamImport/single/?game=' + game.name + '&appid=' + game.appid);
          count++;
          dispatch({type: "CURRENT_IMPORT_UPDATE", payload: {name: game.name, progress: count / importTotal * 100}});
          if (count / importTotal === 1) {
            dispatch({type: "IMPORT_COMPLETE"});
            location.replace('/');
          }
        }, 1000 + offset);
        offset += 1000;
      }
    });
  };
}
