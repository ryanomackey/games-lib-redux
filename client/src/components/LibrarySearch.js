'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {updateSearch} from '../actions/libraryActions';

@connect((store) => {
  return {
    library: store.library,
  };
})

export default class LibrarySearch extends React.Component {
  updateSearch(event) {
    this.props.dispatch(updateSearch(event.target.value.toLowerCase()));
  }
  render() {
    return(
      <nav className="teal">
        <div className="nav-wrapper">
          <form>
            <div className="input-field">
              <input type="search" onChange={this.updateSearch.bind(this)}/>
              <label><i className="material-icons">search</i></label>
              <i className="material-icons">close</i>
            </div>
          </form>
        </div>
      </nav>
    )
  }
}
