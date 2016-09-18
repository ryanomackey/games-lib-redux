'use strict';

import React from 'react';
import {connect} from 'react-redux';

@connect((store) => {
  return {
    library: store.library,
    user: store.user
  };
})

export default class SteamImport extends React.Component {
  render() {
    return (
      <div className="row center" style={{marginTop:'5%'}}>
        <a className="btn waves-effect waves-light" href="http://localhost:3000/steam">
          <i className="fa fa-steam-square fa-5x right" aria-hidden="true"></i>
          Import Steam Library
        </a>
      </div>
    )
  }
}
