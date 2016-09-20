'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {removeTitle} from '../actions/libraryActions';
import {toggleDeleteConfirm} from '../actions/libraryActions';

@connect((store) => {
  return {
    library: store.library,
  };
})

export default class DeleteGame extends React.Component {
  removeTitle() {
    this.props.dispatch(removeTitle(this.props.library.gameModalContent));
  }
  toggleDeleteConfirm() {
    this.props.dispatch(toggleDeleteConfirm());
  }
  render() {
    const {library} = this.props;
    if (!library.deleteConfirm) {
      return (
        <a className="btn red" style={{display:'inline-block'}} onClick={this.toggleDeleteConfirm.bind(this)}>Remove from library</a>
      )
    } else {
      return (
        <div>
          <p>Are you sure?</p>
          <a className="btn red" style={{marginRight:'5%'}} onClick={this.toggleDeleteConfirm.bind(this)}>No</a>
          <a className="btn green" onClick={this.removeTitle.bind(this)}>Yes</a>
        </div>
      )
    }
  }
}
