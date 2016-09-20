'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {toggleLibraryOrder} from '../actions/libraryActions';
import {togglePlatformDropdown} from '../actions/libraryActions';
import {toggleReleaseOrder} from '../actions/libraryActions';
import {toggleCompletedFilter} from '../actions/libraryActions';
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

  toggleReleaseOrder() {
    this.props.dispatch(toggleReleaseOrder());
  }

  toggleCompletedFilter() {
    this.props.dispatch(toggleCompletedFilter());
  }

  render() {
    const {library} = this.props;
    return (
      <div>
        <div className="row" style={{marginBottom:'0'}}>
          <div className="col s6 m6 l3" style={{marginBottom:'1%'}}>
            <a onClick={this.toggleLibraryOrder.bind(this)} className="btn btn-large btn-block">
              <i className="material-icons right">sort_by_alpha</i>Title:
            </a>
          </div>
          <div className="col s6 m6 l3" style={{marginBottom:'1%'}}>
            <a onClick={this.toggleReleaseOrder.bind(this)} className="btn btn-large btn-block">
              <i className="material-icons right">history</i>Release:
            </a>
          </div>
          <div className="col s6 m6 l3">
            <a onClick={this.toggleCompletedFilter.bind(this)} className="btn btn-large btn-block">
              <i className="material-icons right">done</i>Incomplete:
            </a>
          </div>
          <div className="col s6 m6 l3">
            <a onClick={this.togglePlatformDropdown.bind(this)} className="btn btn-large btn-block">
              <i className="material-icons right">{library.platformArrow}</i>Platform:
            </a>
          </div>
        </div>
        <div className="row" style={{marginBottom:'0'}}>
          <div className="col s12">
            <Platform />
          </div>
        </div>
      </div>
    )
  }
}
