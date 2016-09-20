'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {openGameModal} from '../actions/libraryActions';

@connect((store) => {
  return {
    user: store.user,
    library: store.library,
    filteredLibrary: store.library.library.filter((game) => {
      return game.game_name.toLowerCase().indexOf(store.library.searchQuery) !== -1;
    })
  };
})

export default class LibraryGame extends React.Component {

  openGameModal(game) {
    this.props.dispatch(openGameModal(game));
  }

  addStyle(event) {
    event.target.style.transform = 'translate(-2.5px, -2.5px)';
    event.target.className = 'card-image z-depth-3'
  }

  removeStyle(event) {
    event.target.style.transform = 'translate(2.5px, 2.5px)';
    event.target.className = 'card-image z-depth-4'
  }

  render() {
    const {library, filteredLibrary} = this.props;
    filteredLibrary.sort(function(a,b) {
      var nameA = a.game_name.toUpperCase(); // ignore upper and lowercase
      var nameB = b.game_name.toUpperCase(); // ignore upper and lowercase
      var dateA = a.game_release_date;
      var dateB = b.game_release_date;
      if (library.libraryOrder === 'TITLE_ASC') {
        if (nameA < nameB) {return -1;}
        if (nameA > nameB) {return 1;}
        return 0;
      } else if (library.libraryOrder === 'TITLE_DESC') {
        if (nameA > nameB) {return -1;}
        if (nameA < nameB) {return 1;}
        return 0;
      } else if (library.libraryOrder === 'RELEASE_ASC') {
        if (dateA && dateB) {
          if (dateA < dateB) {return -1;}
          if (dateA > dateB) {return 1;}
          return 0;
        }
      } else if (library.libraryOrder === 'RELEASE_DESC') {
        if (dateA && dateB) {
          if (dateA > dateB) {return -1;}
          if (dateA < dateB) {return 1;}
          return 0;
        }
      }
    });
    return (
      <div className="row">
        {filteredLibrary.map((game, index) => {
          const url = 'url(' + game.game_image + ')';
          {if (game.is_visible) {
            return (
              <div
                key={index}
                className="col s4 m3 l2"
                style={{
                  height:'350px',
                  marginTop:'1%',
                  marginBottom:'1%'
                }}
                onClick={this.openGameModal.bind(this, game)}>
                <div
                  className="card-image z-depth-4"
                  onMouseEnter={this.addStyle.bind(this)}
                  onMouseLeave={this.removeStyle.bind(this)}
                  style={{
                    backgroundImage: url,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'auto 100%',
                  }}>
                </div>
              </div>
            )
          }}
        })}
      </div>
    )
  }
}
