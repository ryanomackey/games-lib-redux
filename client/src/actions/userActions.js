'use strict';

import axios from 'axios';

const bearerToken = sessionStorage.getItem('token');

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {'Authorization': 'Bearer ' + bearerToken}
});

export function login(email, password) {
  return function(dispatch) {
    instance.post('http://localhost:3000/authenticate/login', {
      email: email,
      password: password
    })
    .then(function(response) {
      if (response.data.token) {
        sessionStorage.setItem('token',response.data.token);
        dispatch({type: 'LOGIN_SUCCESS', payload: response.data});
        fetchLibrary(dispatch);
      } else {
        dispatch({type: 'LOGIN_FAILURE', payload: response.data});
      }
    })
    .catch(function(err) {
      dispatch({type: 'LOGIN_ERROR', payload: err});
    });
  };
}

export function logout() {
  return function(dispatch) {
    sessionStorage.removeItem('token');
    dispatch({type: 'LOGOUT'});
  };
}

function fetchLibrary(dispatch) {
  instance.get('/games')
  .then(function(response) {
    dispatch({type: 'LIBRARY_FETCH_SUCCESS', payload: response.data});
  })
  .catch(function(err) {
    dispatch({type:'LIBRARY_FETCH_ERROR', payload: err});
  });
}
