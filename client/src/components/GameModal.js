'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {closeGameModal} from '../actions/libraryActions';
import Stream from './Stream';
import moment from 'moment';

@connect((store) => {
  return {
    library: store.library
  };
})

export default class GameModal extends React.Component {
  closeGameModal() {
    this.props.dispatch(closeGameModal());
  }
  closeGameModalAlt(event) {
    var modal = document.getElementById('modal');
    if (event.target == modal) {
      this.props.dispatch(closeGameModal());
    }
  }
  render() {
    const {library} = this.props;
    const releaseDate = moment(library.gameModalContent.game_release_date).format('MMMM Do, YYYY');
    if (library.gameModalShow) {
      return (
        <div className="game-modal" id="modal" onClick={this.closeGameModalAlt.bind(this)}>
          <div className="game-modal-content">
            <div className="container-fluid">
              <div className="row game-modal-close">
                <i className="material-icons right" style={{marginRight:'10px'}} onClick={this.closeGameModal.bind(this)}>close</i>
              </div>
              <div className="row">
                <div className="col s12 m6">
                  <h3>{library.gameModalContent.game_name}</h3>
                  <hr/>
                  <p>{library.gameModalContent.game_deck}</p>
                  <p><strong>Platform:</strong> {library.gameModalContent.platform_name}</p>
                  <p><strong>Release Date:</strong> {releaseDate}</p>
                  <p><strong>Complete:</strong> Yes/No</p>
                </div>
                <div className="col s12 m6 center-align">
                  <img src={library.gameModalContent.game_image} style={{width:'80%',height:'100%'}}/>
                </div>
              </div>
              <div className="row">
                <hr/>
                <h5>Current streams:</h5>
                <Stream />
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
