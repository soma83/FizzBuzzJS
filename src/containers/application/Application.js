import React from 'react';
import Main from '../wrappers/Main';
import {Route, Switch} from 'react-router-dom';
import {AboutAsync, FizzBuzzAsync, HomeAsync, NotFoundAsync} from '../asyncLoad';

const Application = () => {
  return (<Main>
    <Switch>
      <Route exact path="/" component={HomeAsync} />
      <Route path="/fizzbuzz" component={FizzBuzzAsync} />
      <Route path="/about" component={AboutAsync} />
      <Route component={NotFoundAsync} />
    </Switch>
  </Main>)
};

export default Application;
