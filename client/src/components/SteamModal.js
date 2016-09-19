'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {toggleSteamModal} from '../actions/steamImportActions';

@connect((store) => {
  return {
    steam: store.steam,
  };
})

export default class SteamModal extends React.Component {
  toggleSteamModal() {
    this.props.dispatch(toggleSteamModal());
  }
  toggleSteamModalAlt(event) {
    var modal = document.getElementById('modal');
    if (modal == event.target) {
      this.props.dispatch(toggleSteamModal());
    }
  }
  render() {
    const {steam} = this.props;
    steam.steamResults.sort(function(a,b) {
      var nameA = a.name.toUpperCase(); // ignore upper and lowercase
      var nameB = b.name.toUpperCase(); // ignore upper and lowercase
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
                <th>Title</th>
                <th className="right-align">
                  <button className="btn waves-effect waves-light">
                    Import All
                    <i className="material-icons left">file_download</i>
                  </button>
                </th>
              </thead>
              <tbody>
                {steam.steamResults.map((game) => {
                  return (
                    <tr>
                      <td>{game.name}</td>
                      <td className="right-align">
                        <button className="btn waves-effect waves-light">
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
