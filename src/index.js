import React, { Component } from 'react';
import ReactDOM from 'react-dom';   // 渲染组件时需要
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'babel-polyfill';

import './assets/css/common.css';

import App from './component/App';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
    </Switch>
  </Router>,
  document.getElementById('app-root')
);