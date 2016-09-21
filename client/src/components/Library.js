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
import {toggleControlBar} from '../actions/libraryActions';

@connect((store) => {
  return {
    user: store.user,
    library: store.library
  };
})

export default class Library extends React.Component {

  toggleControlBar() {
    this.props.dispatch(toggleControlBar());
  }

  toggleGameSearch() {
    this.props.dispatch(toggleGameSearch());
  }

  render() {
    const {user, library} = this.props;
    if (!user.login) {
      return null
    }else {
      let controlBarAnimation = ''
      let controlBarToggle = 'expand_more';
      if (library.showControlBar) {
        controlBarToggle = 'expand_more';
        controlBarAnimation = 'raise 0.5s linear forwards';
      } else {
        controlBarToggle = 'expand_less';
        controlBarAnimation = 'lower 0.5s linear forwards';
      }
      return (
        <main>
          <div className="container-fluid">
            <div className="row">
              <div className="col s12">
                <h1><strong>Library</strong></h1>
              </div>
            </div>
            <div className="row z-depth-5" id="control-bar" style={{animation:controlBarAnimation}}>
              <div style={{cursor:'pointer'}} onClick={this.toggleControlBar.bind(this)}>
                <i className="material-icons medium teal-text">{controlBarToggle}</i>
              </div>
              <a onClick={this.toggleGameSearch.bind(this)} id="add-game-button"
                 className="btn-floating btn-large waves-effect waves-light">
                <i className="material-icons">add</i>
              </a>
              <AddGame />
              <FilterBar />
            </div>
            <LibraryGame />
            <GameModal />
            <SteamModal />
            <TwitchModal />
          </div>
        </main>
      )
    }
  }
}
