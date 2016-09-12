'use strict';

import React from 'React';
import { connect } from 'react-redux';

@connect((store) => {
  return {
    user: store.user,
    library: store.library
  };
})

export default class AddGameSearchResults extends React.Component {
  render() {
    const { library } = this.props;
    return null;
  }
}
