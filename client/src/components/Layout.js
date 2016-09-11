'use strict';

import React from 'react';
import { connect } from 'react-redux';
import Nav from './Navbar';
import Login from './Login';

@connect((store) => {
  return {
    user: store.user,
    library: store.library
  };
})

export default class Layout extends React.Component {
  render () {
    const {user, library} = this.props;
    return (
      <div>
        <Nav />
        <Login/>
      </div>
    )
  }
}
