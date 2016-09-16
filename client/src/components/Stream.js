'use strict';

import React from 'react';
import {connect} from 'react-redux';
import Stagger from 'react-css-stagger';

@connect((store) => {
  return {
    library: store.library
  };
})

export default class Stream extends React.Component {
  render() {
    const {library} = this.props;
    if (library.streams.length) {
      return (
        <Stagger transition="fadeIn" delay={100}>
          {library.streams.map((stream) => {
            const src = 'http://player.twitch.tv/?channel=' + stream.channel.name + '&autoplay=false';
            return (
              <div className="col s12 m12 l6" style={{marginBottom:'1%'}} key={stream._id}>
                <iframe
                    src={src}
                    height="360"
                    width="100%"
                    frameBorder="0"
                    scrolling="no"
                    allowFullScreen="true">
                </iframe>
              </div>
            )
          })}
        </Stagger>
      )
    } else {
      return <p>Sorry, no streams currently.</p>;
    }
  }
}
