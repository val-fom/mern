import React, { ReactNode } from 'react';
import { AuthRoute } from 'routes/AuthRoute';
import { CreateRoute } from 'routes/CreateRoute';
import { Switch, Route, Redirect } from 'react-router-dom';

export const getRoutes = (isAuthenticated: boolean): ReactNode =>
  isAuthenticated ? (
    <Switch>
      <Route exact path="/create" component={CreateRoute} />
      <Redirect to="/create" />
    </Switch>
  ) : (
    <Switch>
      <Route exact path="/auth" component={AuthRoute} />
      <Redirect to="/auth" />
    </Switch>
  );
