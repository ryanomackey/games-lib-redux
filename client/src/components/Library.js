'use strict';

import React from 'react';
import { connect } from 'react-redux';
import AddGame from './AddGame';
import {toggleGameSearch} from '../actions/libraryActions';
import LibraryGame from './LibraryGame';
import FilterBar from './FilterBar';
import GameModal from './GameModal';
import SteamModal from './SteamModal';
import TwitchModal from './TwitchModal';

@connect((store) => {
  return {
    user: store.user,
    library: store.library
  };
})

export default class Library extends React.Component {

  toggleGameSearch() {
    this.props.dispatch(toggleGameSearch());
  }

  render() {
    const {user} = this.props;
    if (!user.login) {
      return null
    }else {
      return (
        <main>
          <div className="container-fluid">
            <div className="row">
              <div className="col s12">
                <h1><strong>Library</strong></h1>
              </div>
            </div>
            <div className="row z-depth-5" id="control-bar" style={{margin:'5% 0 0 0'}}>
              <i className="material-icons medium teal-text">expand_more</i>
              <a onClick={this.toggleGameSearch.bind(this)} id="add-game-button"
                 className="btn-floating btn-large waves-effect waves-light">
                <i className="material-icons">add</i>
              </a>
              <AddGame />
              <GameModal />
              <FilterBar />
            </div>
            <LibraryGame />
            <SteamModal />
            <TwitchModal />
          </div>
        </main>
      )
    }
  }
}
