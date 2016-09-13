'use strict';

import React from 'react';
import { connect } from 'react-redux';
import AddGame from './AddGame';
import {toggleGameSearch} from '../actions/libraryActions';
import LibraryGame from './LibraryGame';
import {getLibrary} from '../actions/libraryActions';

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

  componentWillMount() {
    this.props.dispatch(getLibrary());
  }

  render() {
    const {user, library} = this.props;
    if (!user.login) {
      return null
    }else {
      return (
        <main>
          <div className="container">
            <div className="row" style={{marginTop:'5%'}}>
              <div className="col s10">
                <h2 style={{margin:0}}>Library</h2>
              </div>
              <div className="col s2 right-align">
                <a onClick={this.toggleGameSearch.bind(this)}
                   className="btn-floating btn-large waves-effect waves-light">
                  <i className="material-icons">
                    add
                  </i>
                </a>
              </div>
            </div>
            <AddGame />
            <LibraryGame />
          </div>
        </main>
      )
    }
  }
}
