'use strict';

import React from 'react';
import { connect } from 'react-redux';
import AddGameSearch from './AddGameSearch';
import AddGameSearchResults from './AddGameSearchResults';

@connect((store) => {
  return {
    user: store.user,
    library: store.library
  };
})

export default class AddGame extends React.Component {
  render() {
    const {user, library} = this.props;
    if (library.showGameSearch) {
      return (
        <div className="add-game">
          <div className="row">
            <div className="col s12">
              <h4>Search titles to add to library</h4>
            </div>
          </div>
          <AddGameSearch />
          <AddGameSearchResults />
        </div>
      )
    } else {
      return null;
    }
  }
}
