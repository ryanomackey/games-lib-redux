'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {togglePlatform} from '../actions/libraryActions';
import Stagger from 'react-css-stagger';

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
        <Stagger transition="fadeIn" delay={75}>
          {library.platforms.map((platform, index) => {
            return (
              <p key={index} style={{display:'inline-block',width:'150px',marginRight:'1%'}}>
                <input type="checkbox" id={platform.name} defaultChecked={platform.selected} onClick={this.togglePlatform.bind(this)}/>
                <label htmlFor={platform.name}>{platform.name}</label>
              </p>
            )
          })}
        </Stagger>
      )
    } else {
      return null;
    }
  }
}
