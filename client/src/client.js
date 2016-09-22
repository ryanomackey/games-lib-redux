'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {Router, Route, hashHistory} from 'react-router';
import Layout from './components/Layout';
import About from './components/About';
import store from './store';

const app =  document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Layout}/>
      <Route path="/about" component={About}/>
    </Router>
  </Provider>, app);
