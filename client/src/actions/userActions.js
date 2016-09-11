'use strict';

import axios from 'axios';

export function login(email, password) {
  return function(dispatch) {
    axios.post('http://localhost:3000/authenticate/login', {
      email: email,
      password: password
    })
    .then(function(response) {
      if (response.data.token) {
        sessionStorage.setItem('token',response.data.token);
        dispatch({type: 'LOGIN_SUCCESS', payload: response.data});
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
