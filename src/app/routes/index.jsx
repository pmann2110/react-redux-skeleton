import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';

import Dashboard from './dashboard';

import 'assets/css/sass/app.scss';

export const MainApp = ({match}) => (
  <div className='app-container'>
    <Switch>
      <Route path={`${match.url}dashboard`} component={Dashboard}/>
    </Switch>
  </div>
);

MainApp.propTypes = {
  match: PropTypes.object
};

export default withRouter(MainApp);
