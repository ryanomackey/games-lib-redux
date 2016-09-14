'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {toggleLibraryOrder} from '../actions/libraryActions';
import {togglePlatformDropdown} from '../actions/libraryActions';
import Platform from './Platform';

@connect((store) => {
  return {
    library: store.library
  };
})

export default class FilterBar extends React.Component {
  toggleLibraryOrder() {
    this.props.dispatch(toggleLibraryOrder());
  }

  togglePlatformDropdown() {
    this.props.dispatch(togglePlatformDropdown());
  }

  render() {
    const {library} = this.props;
    return (
      <div className="row">
        <div className="col s3">
          <a onClick={this.toggleLibraryOrder.bind(this)} className="btn btn-large btn-block">
            <i className="material-icons right">sort_by_alpha</i>Title:
          </a>
        </div>
        <div className="col s3">
          <a onClick={this.togglePlatformDropdown.bind(this)} className="btn btn-large btn-block">
            <i className="material-icons right">{library.platformArrow}</i>Platform:
          </a>
          <Platform />
        </div>
      </div>
    )
  }
}
