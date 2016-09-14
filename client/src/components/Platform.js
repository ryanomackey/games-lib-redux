'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {togglePlatform} from '../actions/libraryActions';

@connect((store) => {
  return {
    library: store.library
  };
})

export default class Platform extends React.Component {
  togglePlatform(event) {
    this.props.dispatch(togglePlatform(event.target.id));
  }
  render() {
    const {library} = this.props;
    if (library.platformDropdown) {
      return (
        <ul>
          {library.platforms.map((platform, index) => {
            return (
              <p key={index} style={{paddingLeft:'5%'}}>
                <input type="checkbox" id={platform} onClick={this.togglePlatform.bind(this)}/>
                <label htmlFor={platform}>{platform}</label>
              </p>
            )
          })}
        </ul>
      )
    } else {
      return null;
    }
  }
}
