'use strict';

const initialState = {
  login: (sessionStorage.token),
  showCreateAccount: false
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
    case "TOGGLE_CREATE_ACCOUNT": {
      return Object.assign({}, state, {
        showCreateAccount: state.showCreateAccount = !state.showCreateAccount
      });
    }
    default: {
      return state;
    }
  }
}
