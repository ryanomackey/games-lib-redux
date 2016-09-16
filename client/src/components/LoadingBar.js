'use strict';

import React from 'react';
import {connect} from 'react-redux';

@connect((store) => {
  return {
    library: store.library
  };
})

export default class LoadingBar extends React.Component {
  render() {
    const {library} = this.props;
    if (library.searching) {
      return (
        <div className="progress" style={{marginTop:'22.5%'}}>
          <div className="indeterminate"></div>
        </div>
      )
    } else {
      return null;
    }
  }
}
