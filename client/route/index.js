/**
 * Created by dantegg on 2017/1/1.
 */
import Home from '../container/home'
import React from 'react'
import Space from '../component/space'
import {Router,Route,browserHistory} from 'react-router'


export default (
    <Router history={browserHistory}>
        <Route path="/" component={Home} >
            <Route path="space" component={Space} />
        </Route>
    </Router>
)