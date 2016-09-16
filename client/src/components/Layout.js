'use strict';

import React from 'react';
import { connect } from 'react-redux';
import Nav from './Navbar';
import Login from './Login';
import Library from './Library';
import Footer from './Footer';
import {getLibrary} from '../actions/libraryActions';

@connect((store) => {
  return {
    user: store.user,
    library: store.library
  };
})

export default class Layout extends React.Component {
  componentWillMount() {
    if (this.props.user.login) {
      this.props.dispatch(getLibrary());
    }
  }
  render () {
    const {user, library} = this.props;
    return (
      <div>
        <Nav />
        <Login/>
        <Library />
      </div>
    )
  }
}
