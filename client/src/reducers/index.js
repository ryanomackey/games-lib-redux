'use strict';

import { combineReducers } from 'redux';
import library from './libraryReducer';
import nav from './navReducer';
import user from './userReducer';
import steam from './steamImportReducer';
import wishlist from './wishlistReducer';

export default combineReducers({
  library,
  nav,
  user,
  steam,
  wishlist,
});
