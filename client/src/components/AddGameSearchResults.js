'use strict';

import React from 'React';
import { connect } from 'react-redux';
import {addToLibrary} from '../actions/libraryActions';

@connect((store) => {
  return {
    user: store.user,
    library: store.library
  };
})

export default class AddGameSearchResults extends React.Component {
  componentDidUpdate() {
    $('select').material_select();
  }

  addToLibrary(searchResult, image_url, platform) {
    const game = {
      game_id: searchResult.id,
      game_name: searchResult.name,
      game_deck: searchResult.deck,
      game_image: image_url,
      platform_id: platform.id,
      platform_name: platform.name
    }
    this.props.dispatch(addToLibrary(game));
  }

  render() {
    const { library } = this.props;
    // console.log(library.searchResults);
    return (
      <div className="row" style={{marginTop:'2%',height:'75%',overflow:'auto'}}>
        {library.searchResults.map((searchResult) => {
          if (searchResult.image) {
            // var image_url = 'http' + searchResult.image.small_url.substr(5);
            var image_url = searchResult.image.small_url;
          } else {
            image_url = null;
          }
          if (searchResult.platforms) {
            var platforms = searchResult.platforms;
          } else {
            platforms = [{id:0, name:'N/A'}];
          }
          return (
            <div className="col s12 m4 l3" style={{height:'500px',marginTop:'1%',marginBottom:'1%'}} key={searchResult.id}>
              <div className="card search-result">
                <div className="card-image waves-effect waves-block waves-light" style={{display:'flex',alignItems:'center'}}>
                  <img className="activator" src={image_url}/>
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">{searchResult.name}</span>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4"><i className="material-icons right">close</i>{searchResult.name}</span>
                  <p>{searchResult.deck}</p>
                  <h5>Select a platform:</h5>
                  {platforms.map((platform) => {
                    return (
                      <a className="waves-effect waves-light btn right"
                        style={{margin:'0 0 1% 1%'}}
                        key={platform.id}
                        onClick={this.addToLibrary.bind(this, searchResult, image_url, platform)}
                        >{platform.name}</a>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    );
  }
}
