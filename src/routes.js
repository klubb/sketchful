import React from 'react';

import {Switch, Route} from 'react-router-dom'
import Login from './Components/Login/Login'
import Dashboard from './Components/Dashboard/Dashboard'
import Messages from './Components/Messages/Messages'





export default <Switch>

    <Route exact path='/' component={Login} />
    <Route path='/dashboard' component={Dashboard} />
    {/* <Route path='/dashboard/message/:id' component={Messages} /> */}
    
</Switch>