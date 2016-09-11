'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/userActions';

@connect((store) => {
  return {
    user: store.user
  };
})

export default class Login extends React.Component {

  login(event) {
    event.preventDefault();
    const email = this._email.value;
    const password = this._password.value;
    this.props.dispatch(login(email, password));
  }

  render() {
    const { user } = this.props;
    if (!user.login) {
      return (
        <div className="container">
          <div className="row login-form">
            <form className="col s8 push-s2" onSubmit={this.login.bind(this)}>
              <div className="row">
                <div className="col s12">
                  <h3>Login</h3>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input id="email" type="email" className="validate" ref={c => this._email = c}/>
                  <label htmlFor="email">Email</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input id="password" type="password" className="validate" ref={c => this._password = c}/>
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <div className="row">
                <div className="col s12 right-align">
                  <button className="btn waves-effect waves-light" type="submit">Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}
