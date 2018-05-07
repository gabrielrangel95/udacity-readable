import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Root } from './screens';

const App = () => (
  <Switch>
    <Route
      exact
      path="/"
      render={() =>
        <Root />
    }
    />
  </Switch>
);
export default withRouter(App);
