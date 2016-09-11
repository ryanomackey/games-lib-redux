'use strict';

const initialState = {
  login: (sessionStorage.token)
};

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case "LOGIN_SUCCESS": {
      return Object.assign({}, state, {
        login: true
      });
    }
    case "LOGOUT": {
      return Object.assign({}, state, {
        login: false
      });
    }
    default: {
      return state;
    }
  }
}
