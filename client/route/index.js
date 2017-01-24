/**
 * Created by dantegg on 2017/1/1.
 */
import App from '../container/app'
import React from 'react'
import Login from '../container/login/login'
import Home from '../container/home/home'
import Space from '../container/space/space'
import Manage from '../container/manage/manage'
import Blog from '../container/blog/blog'
import {Router,Route,browserHistory,IndexRedirect} from 'react-router'

//TODO 按需加载-待解决
// const rootRoute = {
//     childRoutes: [ {
//         path: '/',
//         // component: require('../container/app'),
//         getComponent(nextState, cb) {
//             require.ensure([], (require) => {
//                 cb(null, require('../container/app').default)
//             }, 'app')
//         },
//         indexRoute: {
//             getComponent(nextState, cb) {
//                 require.ensure([], (require) => {
//                     cb(null, require('../container/home'))
//                 }, 'home')
//             },
//         },
//         childRoutes: [
//             require('../container/login'),
//             require('../container/home'),
//             require('../container/space'),
//             require('../container/manage'),
//             require('../container/blog')
//         ]
//     } ]
// }
// export default (
//     <Router history={browserHistory} routes={rootRoute}  />
// )

export default (
    <Router history={browserHistory}>
        <Route path="/" component={App} >
            <IndexRedirect to="/home" />
            <Route path="login" component={Login} />
            <Route path="home" component={Home} />
            <Route path="space" component={Space} />
            <Route path="manage" component={Manage}/>
            <Route path="blog/:id" component={Blog} />
        </Route>
    </Router>
)
