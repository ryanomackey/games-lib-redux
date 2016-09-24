'use strict';

import axios from 'axios';

let bearerToken = sessionStorage.getItem('token');

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {'Authorization': 'Bearer ' + bearerToken}
});

export function getWishlist() {
  return function(dispatch) {
    console.log('hit it');
  }
}
