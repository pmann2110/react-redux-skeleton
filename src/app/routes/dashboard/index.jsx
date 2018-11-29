import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import ChatContainer from './chat';

const DashboardRoutes = ({ match }) => {
    return (
        <Switch key={'dashboard'}>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/chat`} />
            <Route path={`${match.url}/chat`} exact={true} component={ChatContainer}/>
        </Switch>
    );
};

export default DashboardRoutes;
