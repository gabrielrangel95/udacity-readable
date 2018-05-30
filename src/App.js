import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { MainContainer } from './components';
import { Root, Post, NotFound } from './screens';

const App = () => (
  <MainContainer>
    <Switch>
      <Route exact path="/" component={Root} />
      <Route exact path="/404" component={NotFound} />
      <Route exact path="/:category" component={Root} />
      <Route exact path="/:category/:id" component={Post} />
      <Route component={NotFound} />
    </Switch>
  </MainContainer>
);
export default withRouter(App);
