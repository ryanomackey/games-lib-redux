'use strict';

import React from 'react';
import {connect} from 'react-redux';

@connect((store) => {
  return {
    library: store.library,
    user: store.user,
    steam: store.steam,
  };
})

export default class SteamImport extends React.Component {
  render() {
    const {library} = this.props;
    if (!library.searching && !library.searchResults.length) {
      return (
        <div className="row center" style={{marginTop:'5%'}}>
          <a className="btn waves-effect waves-light" href="https://games-lib-dev.us-west-2.elasticbeanstalk.com/steam">
            <i className="fa fa-steam-square fa-5x right" aria-hidden="true"></i>
            Import Steam Library
          </a>
        </div>
      )
    } else {
      return null;
    }
  }
}
