'use strict';

import React from 'react';
import {connect} from 'react-redux';
import Navbar from './Navbar';
import {getWishlist} from '../actions/wishlistActions';
import WishlistItem from './WishlistItem';

@connect((store) => {
  return {
    library: store.library,
  }
})

export default class Wishlist extends React.Component{
  componentWillMount() {
    this.props.dispatch(getWishlist());
  }
  render() {
    return (
      <div>
        <Navbar/>
        <div className="container">
          <div className="row">
            <div className="col s12">
              <h1><strong>Wishlist</strong></h1>
              <hr/>
            </div>
          </div>
          <WishlistItem/>
        </div>
      </div>
    )
  }
}
