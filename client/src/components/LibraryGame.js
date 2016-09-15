'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {openGameModal} from '../actions/libraryActions';

@connect((store) => {
  return {
    user: store.user,
    library: store.library
  };
})

export default class LibraryGame extends React.Component {
  openGameModal(game) {
    this.props.dispatch(openGameModal(game));
  }
  render() {
    const { library} = this.props;
    library.library.sort(function(a,b) {
      if (library.libraryOrder === 'ASC') {
        var nameA = a.game_name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.game_name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // names must be equal
        return 0;
      } else {
        var nameA = a.game_name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.game_name.toUpperCase(); // ignore upper and lowercase
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
        // names must be equal
        return 0;
      }
    });
    return (
      <div className="row">
        {library.library.map((game) => {
          {if (game.is_visible) {
            return (
              <div key={game.game_id} className="col s12 m6 l3" style={{height:'350px',marginTop:'1%',marginBottom:'1%'}} onClick={this.openGameModal.bind(this, game)}>
                <div className="card-image" style={{height:'350px', display:'flex',alignItems:'center'}}>
                  <img src={game.game_image} style={{width:'100%'}}/>
                </div>
              </div>
            )
          }}
        })}
      </div>
    )
  }
}
