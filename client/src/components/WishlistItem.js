'use strict';

import React from 'react';
import {connect} from 'react-redux';

@connect((store) => {
  return {
    wishlist: store.wishlist,
  }
})

export default class WishlistItem extends React.Component {
  render() {
    const {wishlist} = this.props;
    return (
      <div>
        <div className="row">
          <div className="col s1">
          </div>
          <div className="col s2">
          </div>
          <div className="col s3">
            <p><strong>Title</strong></p>
          </div>
          <div className="col s3">
            <p><strong>Platform</strong></p>
          </div>
          <div className="col s3 right-align">
            <p><strong>Amazon</strong></p>
          </div>
        </div>
        {wishlist.wishlist.map((game) => {
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
              <div className="col s3">
                <p>{game.platform_name}</p>
              </div>
              <div className="col s3 right-align">
                <p><a href={game.amazon_url} target="_blank">{game.amazon_price || 'unavailable'}</a></p>
              </div>
              <hr/>
            </div>
          )
        })}
      </div>
    )
  }
}
