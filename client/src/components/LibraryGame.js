'use strict';

import React from 'react';
import {connect} from 'react-redux';

@connect((store) => {
  return {
    user: store.user,
    library: store.library
  };
})

export default class LibraryGame extends React.Component {
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
              <div key={game.game_id} className="col s12 m4 l3" style={{height:'500px',marginTop:'1%',marginBottom:'1%'}}>
                <div className="card search-result">
                  <div className="card-image" style={{height:'350px', display:'flex',alignItems:'center'}}>
                    <img className="activator" src={game.game_image}/>
                  </div>
                  <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">{game.game_name}</span>
                  </div>
                  <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4"><i className="material-icons right">close</i>{game.game_name}</span>
                    <p>{game.game_deck}</p>
                  </div>
                </div>
              </div>
            )
          }}
        })}
      </div>
    )
  }
}
