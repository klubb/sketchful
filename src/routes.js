import React from 'react';

import {Switch, Route} from 'react-router-dom'
import Login from './Components/Login/Login'
import Dashboard from './Components/Dashboard/Dashboard'
import Room from './Components/Room/Room'
import About from './Components/About/About'
import Contact from './Components/Contact/Contact'


export default <Switch>

    <Route exact path='/' component={Login} />
    <Route path='/dashboard' component={Dashboard} />
    <Route path='/about' component={About} />
    <Route path='/contact' component={Contact} />
</Switch>