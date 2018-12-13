import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';

import HomeContainer from './home';

const DashboardRoutes = ({ match }) => {
  return (
    <Switch key={'dashboard'}>
      <Redirect exact={true} from={`${match.url}/`} to={`${match.url}/home`} />
      <Route path={`${match.url}/home`} exact={true} component={HomeContainer}/>
    </Switch>
  );
};

DashboardRoutes.propTypes = {
  match: PropTypes.object
};

export default DashboardRoutes;
