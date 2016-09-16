'use strict';

import { combineReducers } from 'redux';
import library from './libraryReducer';
import user from './userReducer';

export default combineReducers({
  library,
  user,
});
