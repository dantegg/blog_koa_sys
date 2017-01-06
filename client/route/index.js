/**
 * Created by dantegg on 2017/1/1.
 */
import App from '../container/app'
import React from 'react'
import Login from '../component/login'
import Home from '../container/home'
import Space from '../container/space'
import {Router,Route,browserHistory,IndexRedirect} from 'react-router'


export default (
    <Router history={browserHistory}>
        <Route path="/" component={App} >
            <IndexRedirect to="/home" />
            <Route path="login" component={Login} />
            <Route path="home" component={Home} />
            <Route path="space" component={Space} />
        </Route>
    </Router>
)


// if (typeof require.ensure !== 'function') {
//     require.ensure = function(dependencies, callback) {
//         callback(require)
//     }
// }
//
// const routes = {
//     childRoutes: [{
//         path: '/',
//         component: require('../component/home'),
//         indexRoute: {
//             getComponent(nextState, callback) {
//                 require.ensure([], require => {
//                     callback(null, require('../component/test'))
//                 }, 'home')
//             }
//         },
//         childRoutes: [{
//             path: 'space',
//             getComponent(nextState, callback) {
//                 require.ensure([], require => {
//                     callback(null, require('../component/space'))
//                 }, 'space')
//             }
//         }]
//     }]
// }
//
// export default routes