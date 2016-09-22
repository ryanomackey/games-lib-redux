'use strict';

import React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="page-footer blue-grey darken-4" style={{marginTop:'350px'}}>
        <div className="footer-copyright">
          <div className="container">
            <span>&copy; 2016 Ryan Mackey</span>
          </div>
        </div>
      </footer>
    )
  }
}
