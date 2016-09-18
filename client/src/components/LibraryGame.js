'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {openGameModal} from '../actions/libraryActions';
import Stagger from 'react-css-stagger';

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
        if (dateA < dateB) {return -1;}
        if (dateA > dateB) {return 1;}
        return 0;
      } else if (library.libraryOrder === 'RELEASE_DESC') {
        if (dateA > dateB) {return -1;}
        if (dateA < dateB) {return 1;}
        return 0;
      }
    });
    return (
      <div className="row">
        <Stagger transition="fadeIn" initialDelay={200} delay={150}>
          {library.library.map((game) => {
            {if (game.is_visible) {
              return (
                <div key={game.game_id} className="col s6 m4 l3" style={{height:'350px',marginTop:'1%',marginBottom:'1%'}} onClick={this.openGameModal.bind(this, game)}>
                  <div className="card-image gradient-wrap" style={{objectFit:'scale-down',cursor:'pointer',display:'flex',justifyContent:'center'}}>
                    <img src={game.game_image} style={{height:'385px',width:'auto'}} crossOrigin="Anonymous"/>
                  </div>
                </div>
              )
            }}
          })}
        </Stagger>
      </div>
    )
  }
}
