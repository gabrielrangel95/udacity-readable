import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { MainContainer } from './components';
import { Root } from './screens';

const App = () => (
  <MainContainer>
    <Switch>
      <Route exact path="/" component={Root} />
      <Route path="/:category" component={Root} />
    </Switch>
  </MainContainer>
);
export default withRouter(App);
