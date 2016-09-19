'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {toggleSteamModal} from '../actions/steamImportActions';
import {importSteamSingle} from '../actions/steamImportActions';
import {getLibrary} from '../actions/libraryActions';

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
  importSteamSingle(game) {
    this.props.dispatch(importSteamSingle(game));
  }
  render() {
    const {steam} = this.props;
    steam.steamResults.sort(function(a,b) {
      var nameA = a.name.toUpperCase();
      var nameB = b.name.toUpperCase();
      if (nameA < nameB) {return -1;}
      if (nameA > nameB) {return 1;}
      return 0;
    });
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
                    <button className="btn waves-effect waves-light">
                      Import All
                      <i className="material-icons left">file_download</i>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {steam.steamResults.map((game, index) => {
                  return (
                    <tr key={index}>
                      <td>{game.name}</td>
                      <td className="right-align">
                        <button className="btn waves-effect waves-light" disabled={game.disabled} onClick={this.importSteamSingle.bind(this, game)}>
                          Import
                          <i className="material-icons left">file_download</i>
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}
