'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {importSteamSingle} from '../actions/steamImportActions';

@connect((store) => {
  return {
    steam: store.steam,
  };
})

export default class SteamResults extends React.Component {
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
    if (!steam.importAll) {
      return (
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
      )
    } else {
      return null;
    }
  }
}
