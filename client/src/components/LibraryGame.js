'use strict';

import React from 'react';
import {connect} from 'react-redux';

@connect((store) => {
  return {
    user: store.user,
    library: store.library
  };
})

export default class LibraryGame extends React.Component {
  render() {
    const { library} = this.props;
    return (
      <div className="row">

      </div>
    )
  }
}
