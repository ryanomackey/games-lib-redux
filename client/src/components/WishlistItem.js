'use strict';

import React from 'react';
import {connect} from 'react-redux'

@connect((store) => {
  return {
    library: store.library,
  }
})

export default class WishlistItem extends React.Component {
  render() {
    const {library} = this.props;
    const wishlist = library.wishlist.map((game) => {
      const url = 'url(' + game.game_image + ')';
      const style = {
        backgroundImage: url,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto',
        height: '60px'
      }
      return (
        <div className="row" key={game.game_id}>
          <div className="col s1">
          </div>
          <div className="col s2" style={style}>
          </div>
          <div className="col s3">
            <p>{game.game_name}</p>
          </div>
          <div className="col s2">
            <p>{game.platform_name}</p>
          </div>
          <div className="col s2 right-align">
            <p>$59.99</p>
          </div>
          <div className="col s2 right-align">
            <p>$59.99</p>
          </div>
        </div>
      )
    });
    return (
      <div>
        {wishlist}
      </div>
    )
  }
}
