'use strict';

import React from 'react';
import { connect } from 'react-redux';
import AddGameSearch from './AddGameSearch';
import AddGameSearchResults from './AddGameSearchResults';
import {toggleGameSearch} from '../actions/libraryActions';

@connect((store) => {
  return {
    user: store.user,
    library: store.library
  };
})

export default class AddGame extends React.Component {
  toggleGameSearch() {
    this.props.dispatch(toggleGameSearch());
  }
  render() {
    const {user, library} = this.props;
    if (library.showGameSearch) {
      return (
        <div className="add-game-modal">
          <div className="add-game-modal-content">
            <div style={{marginBottom:'5%'}}>
              <h4 style={{display:'inline'}}>Search titles to add to library</h4>
              <i className="material-icons medium"
                 style={{float:'right'}}
                 onClick={this.toggleGameSearch.bind(this)}
                 >close</i>
            </div>
            <AddGameSearch />
            <AddGameSearchResults />
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}
