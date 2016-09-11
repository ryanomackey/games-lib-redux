'use strict';

import React from 'react';
import Logout from './Logout';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper blue-grey darken-4">
          <a href="#" className="brand-logo center">games.lib</a>
          <ul className="right">
            <Logout />
          </ul>
        </div>
      </nav>
    )
  }
}
