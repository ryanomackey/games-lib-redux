'use strict';

import React from 'react';
import { connect } from 'react-redux';
import AddGame from './AddGame';
import {toggleGameSearch} from '../actions/libraryActions';
import LibraryGame from './LibraryGame';
import FilterBar from './FilterBar';
import GameModal from './GameModal';
import SteamModal from './SteamModal';

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
            <div className="row" style={{margin:'5% 0 0 0'}}>
              <div className="col s10">
                <h1 style={{margin:'0 0 1% 0'}}><strong>Library</strong></h1>
              </div>
              <div className="col s2 right-align">
                <a onClick={this.toggleGameSearch.bind(this)}
                   className="btn-floating btn-large waves-effect waves-light">
                  <i className="material-icons">
                    add
                  </i>
                </a>
              </div>
              <AddGame />
              <GameModal />
              <FilterBar />
            </div>
            <hr/>
            <LibraryGame />
            <SteamModal />
          </div>
        </main>
      )
    }
  }
}
