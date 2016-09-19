'use strict';

import axios from 'axios';

export function login(email, password) {
  return function(dispatch) {
    dispatch({type: 'LOGIN_INIT'});
    axios.post('http://localhost:3000/authenticate/login', {
      email: email,
      password: password
    })
    .then(function(response) {
      if (response.data.token) {
        sessionStorage.setItem('token',response.data.token);
        sessionStorage.setItem('userEmail',response.data.userEmail);
        dispatch({type: 'LOGIN_SUCCESS', payload: response.data});
        fetchLibrary(response.data.token, dispatch);
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
    axios.post('http://localhost:3000/authenticate/logout');
    dispatch({type: 'LOGOUT'});
  };
}

export function toggleCreateAccount() {
  return function(dispatch) {
    dispatch({type:'TOGGLE_CREATE_ACCOUNT'});
  };
}

export function createAccount(data) {
  return function(dispatch) {
    dispatch({type:'CREATE_ACCOUNT_INIT'});
    axios.post('http://localhost:3000/authenticate/signup', data)
    .then(function(response) {
      if (response.data.message === 'Email already exists.') {
        dispatch({type: 'CREATE_ACCOUNT_DUPLICATE', payload: response.data.message});
      } else if (response.data.message === 'Account successfully created.') {
        dispatch({type: 'CREATE_ACCOUNT_SUCCESS', payload: response.data.message});
      }
    })
    .catch(function(err) {
      dispatch({type: 'CREATE_ACCOUNT_ERROR', payload: err});
    });
  };
}

function fetchLibrary(token, dispatch) {
  const instance = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {'Authorization': 'Bearer ' + token}
  });
  instance.get('/games')
  .then(function(response) {
    dispatch({type: 'LIBRARY_FETCH_SUCCESS', payload: response.data});
  })
  .catch(function(err) {
    dispatch({type:'LIBRARY_FETCH_ERROR', payload: err});
  });
}
