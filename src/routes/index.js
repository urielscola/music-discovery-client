import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from '../containers/login';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={LoginPage} path="/login" exact />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
