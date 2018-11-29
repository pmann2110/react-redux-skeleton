import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Dashboard from './dashboard/Dashboard';

import 'assets/css/sass/app.scss';

export const MainApp = ({match}) => (
    <div className='app-container'>
        <Switch>
            <Route path={`${match.url}dashboard`} component={Dashboard}/>
        </Switch>
    </div>
);

export default withRouter(MainApp);