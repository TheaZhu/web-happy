import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'babel-polyfill';
import AppsData, { findAppByKey } from './const/AppsData';

import './assets/css/common.css';

import AppList from './component/AppList';
import { AppDetails } from './component/AppDetails';
import App from './component/AutoAnswer';

String.prototype.trim = function () {
  return this.replace(/(^\s*)|(\s*$)/g, '');
};

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={AppList} />
      <Route path="/autoanswer" component={App} />
      <Route path="/:appKey" render={({ match }) => <AppDetails app={findAppByKey(match.params.appKey) || AppsData[0]} />} />
    </Switch>
  </Router>,
  document.getElementById('app-root')
);
