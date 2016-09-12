'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { giantBombSearch } from '../actions/libraryActions';

@connect((store) => {
  return {
    user: store.user,
    library: store.library
  };
})

export default class AddGameSearch extends React.Component {

  giantBombSearch(event) {
    event.preventDefault();
    const searchQuery = this.searchQuery.value;
    this.props.dispatch(giantBombSearch(searchQuery));
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper teal">
          <form onSubmit={this.giantBombSearch.bind(this)}>
            <div className="input-field">
              <input id="search" type="search" ref={c => this.searchQuery = c} />
              <label htmlFor="search"><i className="material-icons">search</i></label>
              <i className="material-icons">close</i>
            </div>
          </form>
        </div>
      </nav>
    )
  }
}
