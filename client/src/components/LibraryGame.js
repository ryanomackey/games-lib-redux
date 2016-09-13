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
    return (
      <div className="row">
      {library.library.map((game) => {
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
                <span className="card-title grey-text text-darken-4">{game.game_name}<i className="material-icons right">close</i></span>
                <p>{game.game_deck}</p>
              </div>
            </div>
          </div>
        )
      })}
      </div>
    )
  }
}
