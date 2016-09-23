'use strict';

import React from 'react';
import Navbar from './Navbar';

export default class About extends React.Component {
  render() {
    return (
      <div>
        <Navbar/>
        <div className="container">
          <div className="row" style={{marginTop:'15%'}}>
            <div className="col s12">
              <h1><strong>About</strong></h1>
              <hr/>
            </div>
          </div>
          <div className="row">
            <div className="col s11 push-s1">
              <p className="flow-text">
                Games.lib was built by <a href="http://www.ryanomackey.com" target="_blank">Ryan Mackey</a> while attending a Web Development bootcamp at <a href="http://www.galvanize.com/" target="_blank">Galvanize</a>, using:
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col s11 push-s1">
              <h4 className="tech-stack"><a href="https://facebook.github.io/react/" target="_blank">React</a></h4>
              <h4 className="tech-stack"><a href="http://redux.js.org/" target="_blank">Redux</a></h4>
              <h4 className="tech-stack"><a href="https://nodejs.org/" target="_blank">Node</a></h4>
              <h4 className="tech-stack"><a href="https://expressjs.com/" target="_blank">Express</a></h4>
              <h4 className="tech-stack"><a href="https://www.postgresql.org/" target="_blank">PostgreSQL</a></h4>
            </div>
          </div>
          <div className="row">
            <div className="col s11 push-s1">
              <p className="flow-text">with APIs from:</p>
            </div>
          </div>
          <div className="row">
            <div className="col s11 push-s1">
              <h4 className="tech-stack"><a href="http://www.giantbomb.com/api/" target="_blank">GiantBomb</a></h4>
              <h4 className="tech-stack"><a href="https://steamcommunity.com/dev" target="_blank">Steam</a></h4>
              <h4 className="tech-stack"><a href="https://github.com/justintv/Twitch-API" target="_blank">Twitch</a></h4>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
