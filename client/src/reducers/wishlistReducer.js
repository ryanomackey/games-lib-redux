'use strict';

import {buildWishlist} from '../library/helperFunctions';

const initialState = {
  wishlist: [],
};

export default function reducer(state=initialState, action) {
  switch(action.type) {
    default: {
      return state;
    }
  }
}
