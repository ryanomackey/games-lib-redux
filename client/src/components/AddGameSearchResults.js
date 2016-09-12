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
  componentDidUpdate() {
    $('select').material_select();
  }

  render() {
    const { library } = this.props;
    console.log(library.searchResults);
    return (
      <div className="row" style={{marginTop:'2%',height:'75%',overflow:'auto'}}>
        {library.searchResults.map((searchResult) => {
          if (searchResult.image) {
            var image_url = 'http' + searchResult.image.small_url.substr(5);
          } else {
            image_url = null;
          }
          if (searchResult.platforms) {
            var platforms = searchResult.platforms;
          } else {
            platforms = [{id:0, name:'N/A'}];
          }
          return (
            <div className="col s6 m4 l3" style={{height:'85%',marginTop:'2%',marginBottom:'2%'}} key={searchResult.id}>
              <div className="card search-result">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator" src={image_url}/>
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">{searchResult.name}</span>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">{searchResult.name}<i className="material-icons right">close</i></span>
                  <p>{searchResult.deck}</p>
                  <div className="input-field" style={{marginTop:'10%'}}>
                    <select>
                      <option value="" disabled defaultValue>Select your platform</option>
                      {platforms.map((platform) => {
                        return <option key={platform.id}>{platform.name}</option>
                      })}
                    </select>
                    <label>Select your platform</label>
                  </div>
                  <button className="waves-effect waves-light btn">Add to library</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    );
  }
}
