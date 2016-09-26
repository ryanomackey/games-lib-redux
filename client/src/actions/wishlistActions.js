'use strict';

import axios from 'axios';

export function getWishlist() {
  const bearerToken = sessionStorage.getItem('token');
  const instance = axios.create({
    baseURL: 'https://games-lib-dev.us-west-2.elasticbeanstalk.com',
    headers: {'Authorization': 'Bearer ' + bearerToken}
  });
  return function(dispatch) {
    dispatch({type:'GET_WISHLIST_START'});
    instance.get('/wishlist/amazon')
    .then(function(results) {
      dispatch({type:'GET_WISHLIST_SUCCESS', payload: results.data});
    })
    .catch(function(err) {
      dispatch({type:'GET_WISHLIST_ERROR', payload:err});
    });
  };
}
