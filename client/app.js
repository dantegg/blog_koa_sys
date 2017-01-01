/**
 * Created by dantegg on 16-12-27.
 */
import React from 'react'
import ReactDOM from 'react-dom'
// import routes from '../../app/routes'
import Head from './component/head'
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
       <Head />
    </Provider>,
    document.getElementById('root')
)