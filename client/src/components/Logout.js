'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/userActions';

@connect((store) => {
  return {
    user: store.user
  };
})

export default class Logout extends React.Component {
  logout() {
    this.props.dispatch(logout());
  }
  render() {
    const {user} = this.props;
    if (user.login) {
      return (
        <li><a className="waves-effect waves-light btn" onClick={this.logout.bind(this)}>Log out</a></li>
      )
    } else {
      return null;
    }
  }
}
