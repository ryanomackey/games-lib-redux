'use strict';

export function toggleDropdown() {
  return function(dispatch) {
    dispatch({type:'TOGGLE_DROPDOWN'});
  }
}
