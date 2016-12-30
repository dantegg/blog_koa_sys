/**
 * Created by dantegg on 16-12-27.
 */
import React from 'react'
import ReactDOM from 'react-dom'
// import routes from '../../app/routes'
import Test from './component/test'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

const store = configureStore(window.__REDUX_STATE__)
// ReactDOM.render(
// <Provider store={store}>
//     {routes}
//     </Provider>,
//     document.querySelector('.react-container')
// )


ReactDOM.render(
    <Provider store={store}>
       <Test/>
    </Provider>,
    document.getElementById('root')
)