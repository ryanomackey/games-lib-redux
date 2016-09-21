'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {closeTwitchModal} from '../actions/libraryActions';

@connect((store) => {
  return {
    library: store.library,
  };
})

export default class TwitchModal extends React.Component {
  closeTwitchModal() {
    this.props.dispatch(closeTwitchModal());
  }
  render() {
    const {library} = this.props;
    if (library.showTwitchModal) {
      const src = 'http://player.twitch.tv/?channel=' + library.currentStream.channel.name + '&autoplay=true';
      return (
        <div className="twitch-modal">
          <div className="col s12 m12 l6" style={{marginBottom:'1%'}}>
            <iframe
                src={src}
                height="200px"
                width="360px"
                frameBorder="0"
                scrolling="no"
                allowFullScreen="true">
            </iframe>
            <i className="material-icons twitch-close" onClick={this.closeTwitchModal.bind(this)}>close</i>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}
