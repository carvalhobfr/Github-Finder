import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import User from '../pages/UserPage';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/users/:user" component={User} />
    </Switch>
  );
};

export default Routes;
