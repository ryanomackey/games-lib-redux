'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {closeGameModal} from '../actions/libraryActions';
import {toggleComplete} from '../actions/libraryActions';
import {toggleOwn} from '../actions/libraryActions';
import Stream from './Stream';
import moment from 'moment';
import DeleteGame from './DeleteGame';

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
  toggleComplete() {
    this.props.dispatch(toggleComplete(this.props.library.gameModalContent));
  }
  toggleOwn() {
    this.props.dispatch(toggleOwn(this.props.library.gameModalContent));
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
                  <h1><strong>{library.gameModalContent.game_name}</strong></h1>
                  <hr/>
                  <p className="flow-text">{library.gameModalContent.game_deck}</p>
                  <p className="flow-text"><strong>Platform:</strong> {library.gameModalContent.platform_name}</p>
                  <p className="flow-text" style={{marginBottom:'0'}}><strong>Release Date:</strong> {releaseDate}</p>
                  <p className="flow-text" style={{display:'inline-block'}}><strong>Completed:</strong></p>
                  <div className="switch" style={{display:'inline-block',marginRight:'5%'}}>
                    <label>
                      <input type="checkbox" defaultChecked={library.gameModalContent.completed} onClick={this.toggleComplete.bind(this)}/>
                      <span className="lever"></span>
                    </label>
                  </div>
                  <p className="flow-text" style={{display:'inline-block'}}><strong>Own:</strong></p>
                  <div className="switch" style={{display:'inline-block'}}>
                    <label>
                      <input type="checkbox" defaultChecked={library.gameModalContent.own} onClick={this.toggleOwn.bind(this)}/>
                      <span className="lever"></span>
                    </label>
                  </div>
                </div>
                <div className="col s12 m6 center-align">
                  <img src={library.gameModalContent.game_image} style={{width:'80%',height:'100%'}}/>
                </div>
              </div>
              <div className="row">
                <h1 style={{marginTop:'0'}}><strong>Streams</strong></h1>
                <hr/>
                <Stream />
              </div>
              <div className="row center-align">
                <DeleteGame />
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
