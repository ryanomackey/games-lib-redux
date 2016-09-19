'use strict';

import React from 'react';
import Logout from './Logout';

export default class Navbar extends React.Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper blue-grey darken-4">
            <a href="#" className="brand-logo center">games.lib</a>
            <ul className="right hide-on-small-and-down">
              <Logout />
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}
