'use strict';

import React from 'react';
import {connect} from 'react-redux';

@connect((store) => {
  return {
    steam: store.steam,
  };
})

export default class SteamImportLoader extends React.Component {
  render() {
    const {steam} = this.props;
    let style = {
      width: steam.importProgress,
    }
    if (steam.importAll) {
      return (
        <div className="row" style={{margin:'30% auto',width:'80%'}}>
          <div className="progress">
            <div className="determinate" style={style}></div>
          </div>
          <p className="center">{steam.currentImport}</p>
        </div>
      )
    } else {
      return null;
    }
  }
}
