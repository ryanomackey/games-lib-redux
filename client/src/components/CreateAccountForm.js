'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {createAccount} from '../actions/userActions';

@connect((store) => {
  return {
    user: store.user
  };
})

export default class CreateAccountForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: {
        message: '',
        isValid: false
      },
      password: {
        message: '',
        isValid: false
      },
      rePassword: {
        message: '',
        isValid: false
      }
    }
  }
  validateEmail() {
    var emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (this.refs.email.value.search(emailRegex) === -1) {
      this.setState({
        email: {
          message: 'Invalid email address'
        }
      });
    } else {
      this.setState({
        email: {
          message: '',
          isValid: true,
          value: this.refs.email.value
        }
      });
    }
  }
  validatePassword() {
    if (this.refs.password.value) {
      this.setState({
        password: {
          message: '',
          isValid: true
        }
      })
    } else {
      this.setState({
        password: {
          message: 'Invalid password',
        }
      })
    }
  }
  matchPasswords() {
    if (this.refs.rePassword.value !== this.refs.password.value) {
      this.setState({
        rePassword: {
          message: 'Passwords do not match'
        }
      })
    } else {
      this.setState({
        rePassword: {
          message: '',
          isValid: true
        }
      })
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    const data = {
      email: this.refs.email.value,
      password: this.refs.password.value
    }
    this.props.dispatch(createAccount(data));
  }
  render() {
    const {user} = this.props;
    const {email, password, rePassword} = this.state;
    return (
      <form className="col s10 push-s1" onSubmit={this.handleSubmit.bind(this)}>
        <div className="row">
          <div className="col s12">
            <h3>Create an account</h3>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input type="email" ref="email" onBlur={() => this.validateEmail()}/>
            <label>Email</label>
            <p className="red-text right">{email.message}</p>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input type="password" ref="password" onBlur={() => this.validatePassword()}/>
            <label>Password</label>
            <p className="red-text right">{password.message}</p>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input type="password" ref="rePassword" onChange={() => this.matchPasswords()}/>
            <label>Re-type password</label>
            <p className="red-text right">{rePassword.message}</p>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <button type="submit" className="waves-effect waves-light btn right" disabled={!email.isValid || !password.isValid || !rePassword.isValid}>Submit</button>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <p className="red-text">{user.duplicateAccount}</p>
          </div>
        </div>
      </form>
    )
  }
}
