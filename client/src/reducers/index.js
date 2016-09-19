'use strict';

import { combineReducers } from 'redux';
import library from './libraryReducer';
import user from './userReducer';
import steam from './steamImportReducer';

export default combineReducers({
  library,
  user,
  steam
});
