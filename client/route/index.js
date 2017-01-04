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