import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../containers/home';
import Login from '../containers/login';
import Artist from '../containers/artist';
import Track from '../containers/track';

const Routes = () => {
  return (
    <Switch>
      <Route component={Home} path="/" exact />
      <Route component={Artist} path="/artist/:id" exact />
      <Route component={Track} path="/track/:id" exact />
      <Route component={Login} path="/login" exact />
    </Switch>
  );
};

export default Routes;
