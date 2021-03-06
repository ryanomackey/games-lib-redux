'use strict';

import React from 'react';
import { connect } from 'react-redux';
import AddGameSearch from './AddGameSearch';
import AddGameSearchResults from './AddGameSearchResults';
import {toggleGameSearch} from '../actions/libraryActions';
import LoadingBar from './LoadingBar';
import SteamImport from './SteamImport';

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
  toggleGameSearchAlt(event) {
    var modal = document.getElementById('modal');
    if (modal == event.target) {
      this.props.dispatch(toggleGameSearch());
    }
  }
  render() {
    const {library} = this.props;
    if (library.showGameSearch) {
      return (
        <div className="add-game-modal" id="modal" onClick={this.toggleGameSearchAlt.bind(this)}>
          <div className="add-game-modal-content">
            <div style={{marginBottom:'5%'}}>
              <h4 style={{display:'inline'}}><strong>Search titles to add to library</strong></h4>
              <i className="material-icons small"
                 style={{float:'right'}}
                 onClick={this.toggleGameSearch.bind(this)}
                 >close</i>
            </div>
            <AddGameSearch />
            <LoadingBar />
            <SteamImport />
            <AddGameSearchResults />
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}
