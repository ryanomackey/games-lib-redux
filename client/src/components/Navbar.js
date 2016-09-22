'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {toggleDropdown} from '../actions/navActions';
import {logout} from '../actions/userActions';

@connect((store) => {
  return {
    user: store.user,
  }
})

export default class Navbar extends React.Component {
  toggleDropdown() {
    this.props.dispatch(toggleDropdown());
  }
  logout() {
    this.props.dispatch(logout());
  }
  render() {
    const {user} = this.props;
    let logout;
     if (user.login) {
       logout = <li><a href='#' onClick={this.logout.bind(this)}>Logout</a></li>
     } else {
       logout = null;
     }
    return (
      <div>
        <div className="navbar z-depth-4">
          <nav>
            <div className="nav-wrapper blue-grey darken-4">
              <a href="#" className="brand-logo center">games.lib</a>
              <ul className="right">
                <li><a href="#/">Home</a></li>
                <li><a href="#/about">About</a></li>
                {logout}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    )
  }
}
