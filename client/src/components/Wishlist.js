'use strict';

import React from 'react';
import {connect} from 'react-redux';
import Navbar from './Navbar';
import {fetchWishlist} from '../actions/wishlistActions';
import {getLibrary} from '../actions/libraryActions';
import WishlistItem from './WishlistItem';

@connect((store) => {
  return {
    library: store.library,
  }
})

export default class Wishlist extends React.Component{
  componentWillMount() {
    this.props.dispatch(getLibrary());
  }
  render() {
    const {library} = this.props;
    const wishlist = library.wishlist;
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
