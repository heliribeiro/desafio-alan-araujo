import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from './components/Layout/index';

import { Context } from './Context/AuthContext';
import CreateCompany from './pages/CreateCompany';
import Home from './pages/Home';

import Login from './pages/Login';

function CustomRoute({ isPrivate, children, ...rest }) {
  const { loading, authenticated } = useContext(Context);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (isPrivate && !authenticated) {
    return <Redirect to="/login" />
  }
  return <Route {...rest}>{children}</Route>;
}

export default function Routes() {
  return (
    <Switch>
      <CustomRoute exact path="/login" component={Login} />
      <CustomRoute isPrivate exact path="/home">
        <Layout><Home /></Layout>
      </CustomRoute>
      <CustomRoute isPrivate exact path='/createcompany' component={CreateCompany}>
        <Layout><CreateCompany /></Layout>
      </CustomRoute>
      <Redirect exact from="/" to="/login" />
    </Switch>
  );
}