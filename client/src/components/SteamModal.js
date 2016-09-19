'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {toggleSteamModal} from '../actions/steamImportActions';
import {importSteamAll} from '../actions/steamImportActions';
import {getLibrary} from '../actions/libraryActions';
import SteamResults from './SteamResults';
import SteamImportLoader from './SteamImportLoader';

@connect((store) => {
  return {
    steam: store.steam,
  };
})

export default class SteamModal extends React.Component {
  toggleSteamModal() {
    this.props.dispatch(toggleSteamModal());
    this.props.dispatch(getLibrary());
  }
  toggleSteamModalAlt(event) {
    var modal = document.getElementById('modal');
    if (modal == event.target) {
      this.props.dispatch(toggleSteamModal());
      this.props.dispatch(getLibrary());
    }
  }
  importSteamAll(steamLibrary) {
    this.props.dispatch(importSteamAll(steamLibrary));
  }
  render() {
    const {steam} = this.props;
    if (steam.steamModalShow) {
      return (
        <div id="modal" className="steam-modal" onClick={this.toggleSteamModalAlt.bind(this)}>
          <div className="steam-modal-content">
            <div className="row">
              <i className="material-icons right" onClick={this.toggleSteamModal.bind(this)}>close</i>
            </div>
            <table className="bordered highlight" style={{width:'80%',margin:'auto'}}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th className="right-align">
                    <button className="btn waves-effect waves-light" onClick={this.importSteamAll.bind(this, steam.steamResults)}>
                      Import All
                      <i className="material-icons left">file_download</i>
                    </button>
                  </th>
                </tr>
              </thead>
              <SteamResults />
            </table>
            <SteamImportLoader />
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}
