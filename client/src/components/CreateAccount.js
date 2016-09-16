'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {toggleCreateAccount} from '../actions/userActions';
import CreateAccountForm from './CreateAccountForm';

@connect((store) => {
  return {
    user: store.user,
    library: store.library
  };
})

export default class CreateAccount extends React.Component {
  toggleCreateAccount() {
    this.props.dispatch(toggleCreateAccount());
  }
  toggleCreateAccountAlt(event) {
    var modal = document.getElementById('modal');
    if (event.target == modal) {
      this.props.dispatch(toggleCreateAccount());
    }
  }
  render() {
    const {user} = this.props;
    if (user.showCreateAccount) {
      return (
        <div className="create-account-modal" id="modal" onClick={this.toggleCreateAccountAlt.bind(this)}>
          <div className="create-account-modal-content">
            <div className="container-fluid">
              <div className="row">
                <div className="col s12">
                  <i className="material-icons right" onClick={this.toggleCreateAccount.bind(this)}>close</i>
                </div>
              </div>
              <div className="row">
                <CreateAccountForm/>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}
